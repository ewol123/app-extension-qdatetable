import moment from "moment";

export default ({app}) => {
  app.prototype.$moment = moment;
};
