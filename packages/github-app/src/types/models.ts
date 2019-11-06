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

export enum EventAction {
  PULL_REQUEST__ASSIGNED = "PULL_REQUEST__ASSIGNED",
  PULL_REQUEST__CLOSED = "PULL_REQUEST__CLOSED",
  PULL_REQUEST__EDITED = "PULL_REQUEST__EDITED",
  PULL_REQUEST__LABELED = "PULL_REQUEST__LABELED",
  PULL_REQUEST__OPENED = "PULL_REQUEST__OPENED",
  PULL_REQUEST__REOPENED = "PULL_REQUEST_REOPENED",
  PULL_REQUEST__REVIEW_REQUESTED_REMOVED = "PULL_REQUEST__REVIEW_REQUESTED_REMOVED",
  PULL_REQUEST__REVIEW_REQUESTED = "PULL_REQUEST__REVIEW_REQUESTED",
  PULL_REQUEST__UNASSIGNED = "PULL_REQUEST__UNASSIGNED",
  PULL_REQUEST__UNLABELED = "PULL_REQUEST__UNLABELED",
  PULL_REQUEST__SYNCHRONIZE = "PULL_REQUEST__SYNCHRONIZE",
  PULL_REQUEST_REVIEW__EDITED = "PULL_REQUEST_REVIEW__EDITED",
  PULL_REQUEST_REVIEW__SUBMITTED = "PULL_REQUEST_REVIEW__SUBMITTED",
  PULL_REQUEST_REVIEW__DISMISSED = "PULL_REQUEST_REVIEW__DISMISSED",
  PULL_REQUEST_REVIEW_COMMENT__CREATED = "PULL_REQUEST_REVIEW_COMMENT__CREATED",
  PULL_REQUEST_REVIEW_COMMENT__EDITED = "PULL_REQUEST_REVIEW_COMMENT__EDITED",
  PULL_REQUEST_REVIEW_COMMENT__DELETED = "PULL_REQUEST_REVIEW_COMMENT__DELETED",
  ISSUES__ASSIGNED = "ISSUES__ASSIGNED",
  ISSUES__CLOSED = "ISSUES__CLOSED",
  ISSUES__DELETED = "ISSUES__DELETED",
  ISSUES__DEMILESTONED = "ISSUES__DEMILESTONED",
  ISSUES__EDITED = "ISSUES__EDITED",
  ISSUES__LABELED = "ISSUES__LABELED",
  ISSUES__MILESTONED = "ISSUES__MILESTONED",
  ISSUES__OPENED = "ISSUES__OPENED",
  ISSUES__REOPENED = "ISSUES__REOPENED",
  ISSUES__TRANSFERED = "ISSUES__TRANSFERED",
  ISSUES__UNASSIGNED = "ISSUES__UNASSIGNED",
  ISSUES__UNLABELED = "ISSUES__UNLABELED",
}
