import { Context } from "probot"; 
import { Author, GithubContributor, ContributorRole, GithubRepository, PullRequest, Label, PullRequestPayload } from '../types/models'
import Webhooks from "@octokit/webhooks";

const getRepository =  (repo: Webhooks.PayloadRepository): GithubRepository => ({
  applicationId: 1, // GITHUB
  originalId: repo.id,
  title: repo.name,
  url: repo.html_url,
})

const getLabels = (pr: Webhooks.WebhookPayloadPullRequestPullRequest): Label[] => pr.labels.map(label => ({
  applicationId: 1,
  originalId: label.id,
  name: label.name,
  color: label.color,
})) as Label[];

const getGithubContributor = (
  author: Author,
  role: ContributorRole,
): GithubContributor => ({
  reference: "repository",
  referenceId: author.id,
  login: author.login,
  role,
});

const getContributors = (pr: Webhooks.WebhookPayloadPullRequestPullRequest): GithubContributor[] => {
  return [
    getGithubContributor(pr.user as Author, ContributorRole.PR_AUTHOR),
    ...pr.assignees.map(author => getGithubContributor(author as Author, ContributorRole.PR_ASSIGNEE)),
    ...pr.requested_reviewers.map(author => getGithubContributor(author as Author, ContributorRole.PR_REVIEW_REQUESTED)),
  ]
}

const getPullRequest =  (pr: Webhooks.WebhookPayloadPullRequestPullRequest): PullRequest => ({
  applicationId: 1, //GITHUB
  originalId: pr.id,
  title: pr.title,
  body: pr.body,
  head: {
    label: pr.head.label,
    ref: pr.head.ref,
    sha: pr.head.sha,
  },
  base: {
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
})

export const getPullRequestPayload = ({payload}: Context<
  Webhooks.WebhookPayloadPullRequest>): PullRequestPayload => ({
    repository: getRepository(payload.repository),
    pullRequest: getPullRequest(payload.pull_request),
    contributors: getContributors(payload.pull_request),
  })