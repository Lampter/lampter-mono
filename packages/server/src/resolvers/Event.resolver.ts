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
// import { IsEmail, Length } from "class-validator";
// import { Context, UserPayLoad, Role } from "../utils/Context";

// const expiresIn = "1d";

@ArgsType()
class CreateEventInputArgs {
  @Field()
  // @IsEmail()
  public applicationId!: number;

  @Field()
  // @Length(8, 255)
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
    action,
    payload,
  }: CreateEventInputArgs) {
    console.log(JSON.parse(payload));

    const newEvent = Event.create({
      applicationId,
      reference: "pull_request",
      referenceId: 10000,
      action,
      payload,
    });

    return newEvent;
    // Check if the event is valid ?
    // const event = await Event.findOne({ where: { email } });
    // if (user) {
    //   throw new Error("Event exists");
    // }
    // Check if the password is valid
    // const valid = await bcrypt.compare(password, user.password);
    // if (!valid) {
    //   throw new Error("Incorrect password");
    // }
    // const payload: EventPayLoad = {
    //   id: user.id,
    //   role: Role.USER,
    // };
    // // Generate a new token a save it
    // const token = jsonwebtoken.sign(payload, process.env.CRYPTO_KEY!, {
    //   expiresIn,
    // });
    // return { token };
  }
}
