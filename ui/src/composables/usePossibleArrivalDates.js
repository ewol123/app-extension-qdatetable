import { computed } from "vue";
import moment from "moment";

export function usePossibleArrivalDates({
  activeDates,
  currentWeek,
  strategy = "NORMAL",
  hours,
  interval,
}) {
  const _initData = () => {
    let date = moment("0:00", "HH:mm").add(hours.value[0], "hours");
    const runTo = moment("0:00", "HH:mm").add(hours.value[1], "hours");
    const data = [];

    while (
      moment(date, "HH:mm").add(interval.value, "minutes").isSameOrBefore(runTo)
    ) {
      const dateFrom = moment(date, "HH:mm").format("HH:mm");
      const dateTo = moment(date, "HH:mm")
        .add(interval.value, "minutes")
        .format("HH:mm");
      date = dateTo;

      data.push({
        time: {
          label: `${dateFrom} - ${dateTo}`,
          dateFrom,
          dateTo,
        },
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      });
    }
    return JSON.parse(JSON.stringify(data));
  };

  const possibleArrivalDates = computed(() => {
    const copy = _initData();

    activeDates.value.forEach((date) => {
      if (
        moment(date.dateFrom).isBetween(
          currentWeek.value.startOfWeek,
          currentWeek.value.endOfWeek
        )
      ) {
        const match = copy.find(
          (el) =>
            el.time.dateFrom === moment(date.dateFrom).format("HH:mm") &&
            el.time.dateTo === moment(date.dateTo).format("HH:mm")
        );
        const day = moment(date.dateFrom)
          .locale("en")
          .format("ddd")
          .toLowerCase();

        if (match) {
          let setData;
          switch (strategy) {
            case "NORMAL":
              setData = { isEnabled: true, time: date };
              if (date.isAllowed) Object.assign(match, { [day]: setData });
              break;
            case "EDIT":
              setData = {
                isEnabled: true,
                time: date,
                isDraft: date.isDraft,
              };
              Object.assign(match, { [day]: setData });
              break;
            default:
              break;
          }
        }
      }
    });
    return copy;
  });

  return { possibleArrivalDates };
}
