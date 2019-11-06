import { Application, Context } from "probot"; // eslint-disable-line no-unused-vars
import Webhooks from "@octokit/webhooks";

type WebhookCommon = {
  action?: string;
};

enum ContributorRole {
  PR_AUTHOR = "PR_AUTHOR",
  PR_ASSIGNEE = "PR_ASSIGNEE",
  PR_REVIEW = "PR_REVIEW",
  PR_REVIEW_REQUESTED = "PR_REVIEW_REQUESTED",
  PR_MERGE = "PR_MERGE",
}

interface GithubContributor {
  reference: "repository",
  referenceId: number;
  login: string;
  role: ContributorRole;
}

interface PullRequestRef {
  label: string;
  ref: string;
  sha: string;
}

interface PullRequest {
  applicationId: 1; //GITHUB
  originalId: number;
  title: string;
  body: string;
  head: PullRequestRef;
  base: PullRequestRef;
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

interface GithubRepository {
  applicationId: 1, // GITHUB
  originalId: number;
  title: string;
  url: string,
}
// @ts-ignore
interface PullRequestPayload {
  pullRequest: PullRequest;
  repository: GithubRepository;
  contributors: GithubContributor[];
}


interface Event {
  applicationId: 1, // GITHUB
  originalId: string;
  name: string;
  action: string;
  payload: PullRequestPayload | any // add the other event structures here
}

// @ts-ignore
export = (app: Application) => {
  let event:Partial<Event> = {applicationId: 1}
  app.on(`*`, async (context: Context<WebhookCommon>) => {
    const {
      id: originalId,
      name,
      payload: { action },
    } = context;

    event = {...event, originalId, name, action}

    app.log(`${originalId} - ${name}${action && `.${action}`}`);
  });

  app.on(
    [
      "pull_request",
      "pull_request.assigned",
      "pull_request.closed",
      "pull_request.edited",
      "pull_request.labeled",
      "pull_request.opened",
      "pull_request.reopened",
      "pull_request.review_request_removed",
      "pull_request.review_requested",
      "pull_request.unassigned",
      "pull_request.unlabeled",
      "pull_request.synchronize",
    ],
    async (context: Context<Webhooks.WebhookPayloadPullRequest>) => {
      // TODO: Pull Request Data Formating
      const {pull_request, repository, sender} = context.payload

      const payload: Partial<PullRequestPayload> = {
        repository: {
          applicationId: 1, // GITHUB
          originalId: repository.id,
          title: repository.name,
          url: repository.html_url
        },
        pullRequest: {
          applicationId: 1, //GITHUB
          originalId: pull_request.id,
          title: pull_request.title,
          body: pull_request.body,
          head: {
            label: pull_request.head.label,
            ref: pull_request.head.ref,
            sha: pull_request.head.sha,
          },
          base: {
            label: pull_request.base.label,
            ref: pull_request.base.ref,
            sha: pull_request.base.sha,
          },
          state: pull_request.state,
          merged: pull_request.merged,
          mergeable: pull_request.mergeable,
          rebaseable: pull_request.rebaseable,
          mergeableState: pull_request.mergeable_state,
          url: pull_request.html_url,
          diffUrl: pull_request.diff_url,
          patchUrl: pull_request.patch_url,
          commits: pull_request.commits,
          comments: pull_request.comments,
          reviewComments: pull_request.review_comments,
        },
      }

      event = {...event, payload}

      app.log(event)
    },
  );
  app.on(
    [
      "pull_request_review",
      "pull_request_review.dismissed",
      "pull_request_review.edited",
      "pull_request_review.submitted",
    ],
    async (_: Context<Webhooks.WebhookPayloadPullRequestReview>) => {
      // TODO: Pull Request Review Data Formating
    },
  );
  app.on(
    [
      "pull_request_review_comment",
      "pull_request_review_comment.created",
      "pull_request_review_comment.deleted",
      "pull_request_review_comment.edited",
    ],
    async (_: Context<Webhooks.WebhookPayloadPullRequestReviewComment>) => {
      // TODO: Pull Request Review Comment Data Formating
    },
  );
  app.on(
    [
      "project",
      "project.closed",
      "project.created",
      "project.deleted",
      "project.edited",
      "project.reopened",
    ],
    async (_: Context<Webhooks.WebhookPayloadProject>) => {
      // TODO: Project Data Formating
    },
  );
  app.on(
    [
      "project_column",
      "project_column.created",
      "project_column.deleted",
      "project_column.edited",
      "project_column.moved",
    ],
    async (_: Context<Webhooks.WebhookPayloadProjectColumn>) => {
      // TODO: Project Column Data Formating
    },
  );
  app.on(
    [
      "project_card",
      "project_card.converted",
      "project_card.created",
      "project_card.deleted",
      "project_card.edited",
      "project_card.moved",
    ],
    async (_: Context<Webhooks.WebhookPayloadProjectCard>) => {
      // TODO: Project Card Data Formating
    },
  );
  app.on(
    [
      "milestone",
      "milestone.closed",
      "milestone.created",
      "milestone.deleted",
      "milestone.edited",
      "milestone.opened",
    ],
    async (_: Context<Webhooks.WebhookPayloadMilestone>) => {
      // TODO: Milestone Data Formating
    },
  );
  app.on(
    ["label", "label.created", "label.deleted", "label.edited"],
    async (_: Context<Webhooks.WebhookPayloadLabel>) => {
      // TODO: Label Data Formating
    },
  );
  app.on(
    [
      "issues",
      "issues.assigned",
      "issues.closed",
      "issues.deleted",
      "issues.demilestoned",
      "issues.edited",
      "issues.labeled",
      "issues.milestoned",
      "issues.opened",
      "issues.reopened",
      "issues.transferred",
      "issues.unassigned",
      "issues.unlabeled",
    ],
    async (_: Context<Webhooks.WebhookPayloadIssues>) => {
      // TODO: Issues Data Formating
    },
  );
  app.on(
    ["deployment"],
    async (_: Context<Webhooks.WebhookPayloadDeployment>) => {
      // TODO: Deployment Data Formating
    },
  );
  app.on(
    ["deployment_status"],
    async (_: Context<Webhooks.WebhookPayloadDeploymentStatus>) => {
      // TODO: Deployment Status Data Formating
    },
  );
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
