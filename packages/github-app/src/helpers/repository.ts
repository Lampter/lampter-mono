import { GithubRepository } from "../types/models";
import Webhooks from "@octokit/webhooks";
import { getUser } from "./user";

export const getRepository = (
  repo: Webhooks.PayloadRepository,
): GithubRepository => ({
  applicationId: 1, // GITHUB
  originalId: repo.id,
  title: repo.name,
  url: repo.html_url,
  owner: getUser(repo.owner),
});
