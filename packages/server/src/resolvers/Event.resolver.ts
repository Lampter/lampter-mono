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
import Issue from "../models/Issue";
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

      case EventAction.ISSUES__ASSIGNED:
      case EventAction.ISSUES__CLOSED:
      case EventAction.ISSUES__DELETED:
      case EventAction.ISSUES__DEMILESTONED:
      case EventAction.ISSUES__EDITED:
      case EventAction.ISSUES__LABELED:
      case EventAction.ISSUES__MILESTONED:
      case EventAction.ISSUES__OPENED:
      case EventAction.ISSUES__REOPENED:
      case EventAction.ISSUES__TRANSFERED:
      case EventAction.ISSUES__UNASSIGNED:
      case EventAction.ISSUES__UNLABELED: {
        reference = "issue";
        const {
          issue: { repository: repo, ...iss },
        }: any = JSON.parse(payload);

        // Find OR Create Trace
        const trace = await Trace.findOne({
          include: [
            {
              model: Issue,
              where: {
                originalId: iss.originalId,
                applicationId: iss.applicationId,
              },
            },
          ],
        });
        if (!trace) {
          const newTrace = await Trace.create({
            title: iss.title,
            description: iss.body,
          });
          iss.traceId = newTrace.id;
        } else {
          iss.traceId = trace.id;
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
          iss.repositoryId = newRepository.id;
        } else {
          iss.repositoryId = repository.id;
        }

        // Find OR Create Issue
        const issue = await Issue.findOne({
          where: {
            originalId: iss.originalId,
            applicationId: iss.applicationId,
          },
        });
        if (!issue) {
          const newIssue = await Issue.create({
            ...iss,
            labels: JSON.stringify(iss.labels),
          });
          referenceId = newIssue.id;
        } else {
          referenceId = issue.id;
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
