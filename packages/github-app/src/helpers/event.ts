import { Context } from "probot";
import { Event, WebhookCommon } from "../types/models";

export const getEventBase = (context: Context<WebhookCommon>) => {
  const {
    id: originalId,
    name,
    payload: { action },
  } = context;

  return {
    applicationId: 1,
    originalId,
    name,
    action,
  } as Partial<Event>;
};
