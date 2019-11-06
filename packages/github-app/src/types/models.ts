export type WebhookCommon = {
  action?: string;
};

export type Author = {
  login: string;
  id: number;
  [key: string]: any;
};

export enum ContributorRole {
  PR_AUTHOR = "PR_AUTHOR",
  PR_ASSIGNEE = "PR_ASSIGNEE",
  PR_REVIEW = "PR_REVIEW",
  PR_REVIEW_REQUESTED = "PR_REVIEW_REQUESTED",
  PR_MERGE = "PR_MERGE",
}

export interface GithubContributor {
  reference: "repository";
  referenceId: number;
  login: string;
  role: ContributorRole;
}

export interface PullRequestRef {
  label: string;
  ref: string;
  sha: string;
}

export interface Label {
  applicationId: 1; //GITHUB
  originalId: number;
  name: string;
  color: string;
  [key: string]: any;
}

export interface PullRequest {
  applicationId: 1; //GITHUB
  originalId: number;
  title: string;
  body: string;
  head: PullRequestRef;
  base: PullRequestRef;
  labels: Label[];
  state: string;
  merged: boolean;
  mergeable: boolean | null;
  rebaseable: boolean | null;
  mergeableState: string;
  url: string;
  diffUrl: string;
  patchUrl: string;
  commits: number;
  comments: number;
  reviewComments: number;
}

export interface GithubRepository {
  applicationId: 1; // GITHUB
  originalId: number;
  title: string;
  url: string;
}

export interface PullRequestPayload {
  pullRequest: PullRequest;
  repository: GithubRepository;
  contributors: GithubContributor[];
}

export interface Event {
  applicationId: 1; // GITHUB
  originalId: string;
  name: string;
  action: string;
  payload: PullRequestPayload | any; // add the other event structures here
}
