import moment from "moment";

export function fromNow(date: string | moment.Moment) {
  return moment(date)
    .utc()
    .fromNow();
}

export function format(date: string | moment.Moment) {
  return moment(date)
    .utc()
    .format("MMM Do YYYY");
}

export function formatShort(date: string | moment.Moment) {
  return moment(date)
    .utc()
    .format("MMM YYYY");
}
