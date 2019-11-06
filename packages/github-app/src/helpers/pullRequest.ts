import { Context } from "probot";
import {
  GithubUser,
  GithubRepository,
  GithubPullRequest,
  GithubReview,
  Label,
  PullRequestPayload,
  PullRequestReviewPayload,
} from "../types/models";
import Webhooks from "@octokit/webhooks";

const getRepository = (repo: Webhooks.PayloadRepository): GithubRepository => ({
  applicationId: 1, // GITHUB
  originalId: repo.id,
  title: repo.name,
  url: repo.html_url,
  owner: getUser(repo.owner),
});

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

const getUser = (author: any): GithubUser => ({
  applicationId: 1, //GITHUB
  originalId: author.id,
  login: author.login,
  type: author.type,
});

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

const getReview = ({
  review: rw,
  pull_request: pr,
}: Webhooks.WebhookPayloadPullRequestReview): GithubReview => ({
  applicationId: 1, //GITHUB
  body: `${rw.body}`,
  originalId: rw.id,
  pullRequest: {
    applicationId: 1,
    originalId: pr.id,
    title: pr.title,
    body: pr.body,
    user: getUser(pr.user),
    url: pr.html_url,
  },
  commitId: rw.commit_id,
  submittedAt: rw.submitted_at,
  state: rw.state,
  url: rw.html_url,
});

export const getPullRequestPayload = ({
  payload,
}: Context<Webhooks.WebhookPayloadPullRequest>): PullRequestPayload => ({
  pullRequest: getPullRequest(payload),
  sender: getUser(payload.sender),
});

export const getPullRequestReviewPayload = ({
  payload,
}: Context<
  Webhooks.WebhookPayloadPullRequestReview
>): PullRequestReviewPayload => {
  return {
    review: getReview(payload),
    sender: getUser(payload.sender),
  };
};
