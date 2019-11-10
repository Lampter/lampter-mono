import { Context } from "probot";
import { GithubPullRequest, Label, PullRequestPayload } from "../types/models";
import Webhooks from "@octokit/webhooks";
import { getUser } from "./user";
import { getRepository } from "./repository";

const getLabels = (
  pr: Webhooks.WebhookPayloadPullRequestPullRequest,
): Label[] =>
  pr.labels
    ? (pr.labels.map(label => ({
        applicationId: 1,
        originalId: label.id,
        name: label.name,
        color: label.color,
      })) as Label[])
    : [];

const getPullRequest = ({
  pull_request: pr,
  repository,
}: Webhooks.WebhookPayloadPullRequest): GithubPullRequest => ({
  applicationId: 1, //GITHUB
  originalId: pr.id,
  title: pr.title,
  body: pr.body,
  head: pr.head && {
    label: pr.head.label,
    ref: pr.head.ref,
    sha: pr.head.sha,
  },
  base: pr.base && {
    label: pr.base.label,
    ref: pr.base.ref,
    sha: pr.base.sha,
  },
  repository: getRepository(repository),
  user: getUser(pr.user),
  assignees: pr.assignees ? pr.assignees.map(author => getUser(author)) : [],
  requestedReviewers: pr.requested_reviewers
    ? pr.requested_reviewers.map(author => getUser(author))
    : [],
  labels: getLabels(pr),
  state: pr.state,
  merged: pr.merged,
  mergeable: pr.mergeable,
  rebaseable: pr.rebaseable,
  mergeableState: pr.mergeable_state,
  url: pr.html_url,
  diffUrl: pr.diff_url,
  patchUrl: pr.patch_url,
  commits: pr.commits,
  comments: pr.comments,
  reviewComments: pr.review_comments,
});

export const getPullRequestPayload = ({
  payload,
}: Context<Webhooks.WebhookPayloadPullRequest>): PullRequestPayload => ({
  pullRequest: getPullRequest(payload),
  sender: getUser(payload.sender),
});
