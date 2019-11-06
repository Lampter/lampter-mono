import { EventAction } from "@lampter/server";

export type WebhookCommon = {
  action?: string;
};

enum GithubUserType {
  USER = "USER",
  ORGANIZATION = "ORGANIZATION",
}

export interface GithubUser {
  applicationId: 1; //GITHUB
  originalId: number;
  login: string;
  type: GithubUserType;
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

export interface GithubPullRequest {
  applicationId: 1; //GITHUB
  originalId: number;
  repository: GithubRepository;
  title: string;
  body: string;
  head: PullRequestRef;
  base: PullRequestRef;
  labels: Label[];
  user: GithubUser;
  assignees: GithubUser[];
  requestedReviewers: GithubUser[];
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

type GithubReviewPullRequest = Pick<
  GithubPullRequest,
  "applicationId" | "originalId" | "title" | "body" | "user" | "url"
>;

export interface GithubReview {
  applicationId: 1; //GITHUB
  originalId: number;
  body: string;
  commitId: string;
  pullRequest: GithubReviewPullRequest;
  submittedAt: string;
  state: string;
  url: string;
}

export interface GithubRepository {
  applicationId: 1; // GITHUB
  originalId: number;
  title: string;
  url: string;
  owner: GithubUser;
}

export interface PullRequestPayload {
  pullRequest: GithubPullRequest;
  sender: GithubUser;
}

export interface PullRequestReviewPayload {
  review: GithubReview;
  sender: GithubUser;
}

export interface Event {
  applicationId: 1; // GITHUB
  action: EventAction;
  payload: PullRequestPayload | any; // add the other event structures here
}
