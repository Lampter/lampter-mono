import { Context } from "probot";
import { GithubReview, PullRequestReviewPayload } from "../types/models";
import Webhooks from "@octokit/webhooks";
import { getUser } from "./user";

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
