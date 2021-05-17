import { computed } from "vue";
import moment from "moment";

export function useComputed({
  strategy,
  activeDates,
  lang,
  days,
  cols,
  daysMap,
  selected,
  page,
}) {
  const dates = computed(() =>
    activeDates.value.map((date) => moment(date.dateFrom))
  );
  const columns = computed(() =>
    cols.filter(
      (col) => days.value.includes(daysMap[col.name] + 2) || col.name === "time"
    )
  );

  const currentWeek = computed(() => {
    const from = strategy === "NORMAL" ? moment.min(dates.value) : moment();

    return {
      startOfWeek: from
        .clone()
        .startOf("isoWeek")
        .add(page.value, "week")
        .format("YYYY/MM/DD"),
      endOfWeek: from
        .clone()
        .endOf("isoWeek")
        .add(page.value, "week")
        .format("YYYY/MM/DD"),
    };
  });
  const hasNextWeek = computed(
    () => !moment(currentWeek.value.endOfWeek).isAfter(moment.max(dates.value))
  );
  const hasPreviousWeek = computed(
    () =>
      !moment(currentWeek.value.startOfWeek).isBefore(moment.min(dates.value))
  );
  const formatLabel = computed(() => {
    const dateFrom = selected.value.length
      ? selected.value[0].time.dateFrom
      : null;
    const dateTo = selected.value.length ? selected.value[0].time.dateTo : null;

    if (!dateFrom || !dateTo) return "";

    return `
    ${moment(dateFrom).format("YYYY/MM/DD")} 
       ${moment(dateFrom).format("HH:mm")} - ${moment(dateTo).format("HH:mm")} 
    ${moment(dateFrom).locale(lang).format("dddd")}`;
  });

  return {
    columns,
    currentWeek,
    hasNextWeek,
    hasPreviousWeek,
    formatLabel,
  };
}
