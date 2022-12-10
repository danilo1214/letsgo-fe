import moment from 'moment';

export const dateTime = (date, time) => {
  return moment(date.format('YYYY-MM-DD') + ' ' + time);
};
