import { Context } from "probot";
import {
  Author,
  GithubContributor,
  ContributorRole,
  GithubRepository,
  PullRequest,
  Review,
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
});

const getLabels = (
  pr: Partial<Webhooks.WebhookPayloadPullRequestPullRequest>,
): Label[] =>
  pr.labels
    ? (pr.labels.map(label => ({
        applicationId: 1,
        originalId: label.id,
        name: label.name,
        color: label.color,
      })) as Label[])
    : [];

const getGithubContributor = (
  author: Author,
  role: ContributorRole,
): GithubContributor => ({
  reference: "repository",
  referenceId: author.id,
  login: author.login,
  role,
});

const getPRContributors = (
  pr: Webhooks.WebhookPayloadPullRequestPullRequest,
): GithubContributor[] => {
  return [
    getGithubContributor(pr.user as Author, ContributorRole.PR_AUTHOR),
    ...pr.assignees.map(author =>
      getGithubContributor(author as Author, ContributorRole.PR_ASSIGNEE),
    ),
    ...pr.requested_reviewers.map(author =>
      getGithubContributor(
        author as Author,
        ContributorRole.PR_REVIEW_REQUESTED,
      ),
    ),
  ];
};

const getPullRequest = (
  pr: Partial<Webhooks.WebhookPayloadPullRequestPullRequest>,
): PullRequest =>
  ({
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
  } as PullRequest);

const getReview = (
  rw: Webhooks.WebhookPayloadPullRequestReviewReview,
): Review => ({
  applicationId: 1, //GITHUB
  originalId: rw.id,
  commitId: rw.commit_id,
  submittedAt: rw.submitted_at,
  state: rw.state,
  url: rw.html_url,
});

export const getPullRequestPayload = ({
  payload,
}: Context<Webhooks.WebhookPayloadPullRequest>): PullRequestPayload => ({
  repository: getRepository(payload.repository),
  pullRequest: getPullRequest(payload.pull_request),
  contributors: getPRContributors(payload.pull_request),
});

export const getPullRequestReviewPayload = ({
  payload,
}: Context<
  Webhooks.WebhookPayloadPullRequestReview
>): PullRequestReviewPayload => {
  const pullRequest: Partial<
    Webhooks.WebhookPayloadPullRequestPullRequest
  > = payload.pull_request as any;
  return {
    repository: getRepository(payload.repository),
    pullRequest: getPullRequest(pullRequest),
    review: getReview(payload.review),
    contributors: [
      getGithubContributor(payload.review.user, ContributorRole.PR_REVIEW),
    ],
  };
};
