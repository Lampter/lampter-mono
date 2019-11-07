import {
  Args,
  // Authorized,
  // Ctx,
  Mutation,
  // Query,
  ArgsType,
  Field,
  Resolver,
  // ObjectType,
} from "type-graphql";
import Event, { EventAction } from "../models/Event";
import PullRequest from "../models/PullRequest";
import Repository from "../models/Repository";
import Trace from "../models/Trace";
@ArgsType()
class CreateEventInputArgs {
  @Field()
  public applicationId!: number;

  @Field()
  public action!: EventAction;

  @Field()
  public payload!: string;
}

@Resolver(Event)
export default class EventResolver {
  @Mutation(() => Event)
  public async createEvent(@Args()
  {
    applicationId,
    action,
    payload,
  }: CreateEventInputArgs) {
    let referenceId: number | undefined = undefined;
    let reference: string | undefined = undefined;
    switch (action) {
      case EventAction.PULL_REQUEST__ASSIGNED:
      case EventAction.PULL_REQUEST__CLOSED:
      case EventAction.PULL_REQUEST__EDITED:
      case EventAction.PULL_REQUEST__LABELED:
      case EventAction.PULL_REQUEST__OPENED:
      case EventAction.PULL_REQUEST__REOPENED:
      case EventAction.PULL_REQUEST__REVIEW_REQUESTED_REMOVED:
      case EventAction.PULL_REQUEST__REVIEW_REQUESTED:
      case EventAction.PULL_REQUEST__UNASSIGNED:
      case EventAction.PULL_REQUEST__UNLABELED:
      case EventAction.PULL_REQUEST__SYNCHRONIZE: {
        reference = "pull_request";
        const {
          pullRequest: { repository: repo, ...pr },
        }: any = JSON.parse(payload);

        // Find OR Create Trace
        const trace = await Trace.findOne({
          include: [
            {
              model: PullRequest,
              where: {
                originalId: pr.originalId,
                applicationId: pr.applicationId,
              },
            },
          ],
        });
        if (!trace) {
          const newTrace = await Trace.create({
            title: pr.title,
            description: pr.body,
          });
          pr.traceId = newTrace.id;
        } else {
          pr.traceId = trace.id;
        }

        // FIXME: Dunno if we need this ?
        // Find OR Create Repository
        const repository = await Repository.findOne({
          where: {
            originalId: repo.originalId,
            applicationId: repo.applicationId,
          },
        });
        if (!repository) {
          const newRepository = await Repository.create({
            ...repo,
          });
          pr.repositoryId = newRepository.id;
        } else {
          pr.repositoryId = repository.id;
        }

        // Find OR Create PullRequest
        const pullRequest = await PullRequest.findOne({
          where: {
            originalId: pr.originalId,
            applicationId: pr.applicationId,
          },
        });
        if (!pullRequest) {
          const newPullRequest = await PullRequest.create({
            ...pr,
            labels: JSON.stringify(pr.labels),
            head: JSON.stringify(pr.head),
            base: JSON.stringify(pr.base),
          });
          referenceId = newPullRequest.id;
        } else {
          referenceId = pullRequest.id;
        }

        break;
      }

      // TODO: Deal with issue events
      // case "issue": {
      //   break;
      // }
    }

    if (!reference || !referenceId) {
      throw new Error("Event Not Supported yet...");
    }

    const newEvent = Event.create({
      applicationId,
      reference,
      referenceId,
      action,
      payload,
    });

    return newEvent;
  }
}
