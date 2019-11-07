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
// import { Context, UserPayLoad, Role } from "../utils/Context";

// const expiresIn = "1d";
@ArgsType()
class CreateEventInputArgs {
  @Field()
  public applicationId!: number;

  @Field()
  public reference!: string;

  @Field()
  public action!: EventAction;

  @Field()
  public payload!: string;
}

@Resolver(Event)
export default class EventResolver {
  // @Authorized([Role.USER])
  // @Query(() => Event)
  // public async me(@Ctx() ctx: Context) {
  //   if (ctx.user && ctx.user.role === Role.USER) {
  //     const user = await Event.findOne({
  //       where: { id: ctx.user.id },
  //     });
  //     if (!user) {
  //       throw new Error("Event not found");
  //     }
  //     return user;
  //   }
  //   throw new Error("Event not found");
  // }

  @Mutation(() => Event)
  public async createEvent(@Args()
  {
    applicationId,
    reference,
    action,
    payload,
  }: CreateEventInputArgs) {
    let referenceId: number;
    // FIXME: Use action directly instead of passing the reference ?
    switch (reference) {
      // Deal With pull_request events
      case "pull_request": {
        const { pullRequest: pr }: any = JSON.parse(payload);
        const pullRequest = await PullRequest.findOne({
          where: { originalId: pr.originalId, applicationId: pr.applicationId },
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
      default: {
        referenceId = 10000;
      }
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
