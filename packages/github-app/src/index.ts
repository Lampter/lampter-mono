import { Application, Context } from "probot"; // eslint-disable-line no-unused-vars
import Webhooks from "@octokit/webhooks";
import { getEventBase } from "./helpers/event";
import { getPullRequestPayload } from "./helpers/pullRequest";
import { getPullRequestReviewPayload } from "./helpers/review";
import { getIssuePayload } from "./helpers/issue";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

const CREATE_GITHUB_EVENT = gql`
  mutation CreateGithubEvent(
    $applicationId: Float!
    $action: String!
    $payload: String!
  ) {
    createEvent(
      applicationId: $applicationId
      action: $action
      payload: $payload
    ) {
      id
    }
  }
`;

const client = new ApolloClient({
  // @ts-ignore
  link: createHttpLink({ uri: "http://localhost:5000/graphql", fetch }),
  cache: new InMemoryCache(),
});

// @ts-ignore
export = (app: Application) => {
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
      // Pull Request Data Formating
      let event = getEventBase(context);
      const payload = getPullRequestPayload(context);
      event = { ...event, payload };
      app.log(event);
      app.log(JSON.stringify(event.payload));
    },
  );
  app.on(
    [
      "pull_request_review",
      "pull_request_review.dismissed",
      "pull_request_review.edited",
      "pull_request_review.submitted",
    ],
    async (context: Context<Webhooks.WebhookPayloadPullRequestReview>) => {
      // Pull Request Review Data Formating
      let event = getEventBase(context);
      const payload = getPullRequestReviewPayload(context);
      event = { ...event, payload };
      app.log(event);

      client.mutate({
        mutation: CREATE_GITHUB_EVENT,
        variables: {
          applicationId: event.applicationId,
          action: event.action,
          payload: JSON.stringify(event.payload),
        },
      });
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
  // app.on(
  //   [
  //     "project",
  //     "project.closed",
  //     "project.created",
  //     "project.deleted",
  //     "project.edited",
  //     "project.reopened",
  //   ],
  //   async (_: Context<Webhooks.WebhookPayloadProject>) => {
  //     // Project Data Formating
  //   },
  // );
  // app.on(
  //   [
  //     "project_column",
  //     "project_column.created",
  //     "project_column.deleted",
  //     "project_column.edited",
  //     "project_column.moved",
  //   ],
  //   async (_: Context<Webhooks.WebhookPayloadProjectColumn>) => {
  //     // Project Column Data Formating
  //   },
  // );
  // app.on(
  //   [
  //     "project_card",
  //     "project_card.converted",
  //     "project_card.created",
  //     "project_card.deleted",
  //     "project_card.edited",
  //     "project_card.moved",
  //   ],
  //   async (_: Context<Webhooks.WebhookPayloadProjectCard>) => {
  //     // Project Card Data Formating
  //   },
  // );
  // app.on(
  //   [
  //     "milestone",
  //     "milestone.closed",
  //     "milestone.created",
  //     "milestone.deleted",
  //     "milestone.edited",
  //     "milestone.opened",
  //   ],
  //   async (_: Context<Webhooks.WebhookPayloadMilestone>) => {
  //     // Milestone Data Formating
  //   },
  // );
  // app.on(
  //   ["label", "label.created", "label.deleted", "label.edited"],
  //   async (_: Context<Webhooks.WebhookPayloadLabel>) => {
  //     // Label Data Formating
  //   },
  // );
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
    async (context: Context<Webhooks.WebhookPayloadIssues>) => {
      // TODO: Issues Data Formating
      let event = getEventBase(context);
      const payload = getIssuePayload(context);
      event = { ...event, payload };
      app.log(event);
      app.log(JSON.stringify(event.payload));

      client.mutate({
        mutation: CREATE_GITHUB_EVENT,
        variables: {
          applicationId: event.applicationId,
          action: event.action,
          payload: JSON.stringify(event.payload),
        },
      });
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

  // app.on(`*`, async (context: Context<WebhookCommon>) => {
  //   const event = getEventBase(context);
  //   app.log(
  //     `${event.originalId} - ${event.name}${event.action &&
  //       `.${event.action}`}`,
  //   );
  // });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
