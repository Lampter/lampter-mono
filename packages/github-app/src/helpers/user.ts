import { GithubUser } from "../types/models";

export const getUser = (author: any): GithubUser => ({
  applicationId: 1, //GITHUB
  originalId: author.id,
  login: author.login,
  type: author.type,
});
