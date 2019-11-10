import { Context } from "probot";
import { GithubIssue, Label, IssuePayload } from "../types/models";
import Webhooks from "@octokit/webhooks";
import { getUser } from "./user";
import { getRepository } from "./repository";

const getLabels = (issue: Webhooks.WebhookPayloadIssuesIssue): Label[] =>
  issue.labels
    ? (issue.labels.map(label => ({
        applicationId: 1,
        originalId: label.id,
        name: label.name,
        color: label.color,
      })) as Label[])
    : [];

const getIssue = ({
  issue,
  repository,
}: Webhooks.WebhookPayloadIssues): GithubIssue => ({
  applicationId: 1, //GITHUB
  originalId: issue.id,
  title: issue.title,
  body: issue.body,
  repository: getRepository(repository),
  user: getUser(issue.user),
  assignees: issue.assignees
    ? issue.assignees.map((author: any) => getUser(author))
    : [],
  labels: getLabels(issue),
  state: issue.state,
  url: issue.html_url,
  comments: issue.comments,
  createdAt: issue.created_at,
  updatedAt: issue.updated_at,
});

export const getIssuePayload = ({
  payload,
}: Context<Webhooks.WebhookPayloadIssues>): IssuePayload => ({
  issue: getIssue(payload),
  sender: getUser(payload.sender),
});
