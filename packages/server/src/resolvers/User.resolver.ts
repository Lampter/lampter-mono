import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  ArgsType,
  Field,
  Resolver,
  ObjectType
} from "type-graphql";
import User from "../models/User";
import { IsEmail, Length } from "class-validator";
import { Context, UserPayLoad, Role } from "../utils/Context";

const expiresIn = "1d";

@ArgsType()
class AuthInputArgs {
  @Field()
  @IsEmail()
  public email!: string;

  @Field()
  @Length(8, 255)
  public password!: string;
}

@ObjectType()
class Token {
  @Field()
  public token!: string;
}

@Resolver(User)
export default class UserResolver {
  @Authorized([Role.USER])
  @Query(returns => User)
  public async user(@Ctx() ctx: Context) {
    if (ctx.user && ctx.user.role === Role.USER) {
      const user = await User.findOne({
        where: { id: ctx.user.id }
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }
    throw new Error("User not found");
  }

  @Query(_ => User)
  public async userByEmail(@Arg("email") email: string) {
    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  @Mutation(() => Token)
  public async signIn(@Args()
  {
    email,
    password
  }: AuthInputArgs) {
    // Check if the user is valid
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("No user with that email");
    }

    // Check if the password is valid
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Incorrect password");
    }
    const payload: UserPayLoad = {
      id: user.id,
      role: Role.USER
    };
    // Generate a new token a save it
    const token = jsonwebtoken.sign(payload, process.env.CRYPTO_KEY!, {
      expiresIn
    });

    return { token };
  }

  @Mutation(() => Token)
  public async register(@Args()
  {
    email,
    password
  }: AuthInputArgs) {
    // Find if there is an existing account
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new Error("Email exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });
    const payload: UserPayLoad = {
      id: newUser.id,
      role: Role.USER
    };
    const token = jsonwebtoken.sign(payload, process.env.CRYPTO_KEY!, {
      expiresIn
    });
    return { token };
  }
}
