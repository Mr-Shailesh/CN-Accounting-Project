import moment from "moment";

export const group_by_month = (arr) => {
  return Object.values(
    arr.reduce((a, { x: date_string, y: value }) => {
      const monthandYear = moment(date_string).format("MM-YYYY");

      const key = monthandYear;
      if (a[key] === undefined) {
        a[key] = { y: 0, x: date_string };
      }
      a[key].y += value;
      return a;
    }, {})
  );
};
