import { Context } from "probot";
import { Event, WebhookCommon, EventAction } from "../types/models";

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
