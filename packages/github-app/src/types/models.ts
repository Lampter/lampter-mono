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

export interface Review {
  applicationId: 1; //GITHUB
  originalId: number;
  commitId: string;
  submittedAt: string;
  state: string;
  url: string;
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

export interface PullRequestReviewPayload {
  pullRequest: PullRequest;
  repository: GithubRepository;
  review: Review;
  contributors: GithubContributor[];
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
