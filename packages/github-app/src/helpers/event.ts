import { Context } from "probot";
import { Event, WebhookCommon } from "../types/models";
import { EventAction } from "@lampter/server";

const getAction = (context: Context<WebhookCommon>) => {
  const {
    name,
    payload: { action },
  } = context;

  const eventAction = `${name}${action &&
    `__${action}`}`.toUpperCase() as EventAction;
  return eventAction;
};

export const getEventBase = (context: Context<WebhookCommon>) => {
  return {
    applicationId: 1,
    action: getAction(context),
  } as Partial<Event>;
};
