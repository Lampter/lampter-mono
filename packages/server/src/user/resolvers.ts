import { Query, Resolver } from "type-graphql";
import { User } from "../models/User";

@Resolver(User)
export default class UserResolver {
  @Query(returns => null)
  public async users() {
    //   const users = await User.findAll();
    //   console.log(users, "HELLO");
    return null;
  }
}
