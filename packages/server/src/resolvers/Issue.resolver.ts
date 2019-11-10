import {
  Query,
  Resolver,
} from "type-graphql";
import Issue from "../models/Issue";

@Resolver(Issue)
export default class IssueResolver {
  @Query(() => [Issue])
  public async issues() {
    return await Issue.findAll();
  }
}
