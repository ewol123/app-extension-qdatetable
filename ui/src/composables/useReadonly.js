import { readonly } from "vue";
import moment from "moment";

export function useReadonly(lang) {
  const daysMap = readonly({
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
  });
  const cols = readonly([
    {
      name: "time",
      label: `${lang === "hu" ? "Idő" : "Time"}`,
      field: "time",
      align: "left",
    },
    {
      name: "mon",
      label: `${moment("1900-01-01").locale(lang).format("dddd")}`,
      field: "mon",
      align: "left",
    },
    {
      name: "tue",
      label: `${moment("1900-01-02").locale(lang).format("dddd")}`,
      field: "tue",
      align: "left",
    },
    {
      name: "wed",
      label: `${moment("1900-01-03").locale(lang).format("dddd")}`,
      field: "wed",
      align: "left",
    },
    {
      name: "thu",
      label: `${moment("1900-01-04").locale(lang).format("dddd")}`,
      field: "thu",
      align: "left",
    },
    {
      name: "fri",
      label: `${moment("1900-01-05").locale(lang).format("dddd")}`,
      field: "fri",
      align: "left",
    },
    {
      name: "sat",
      label: `${moment("1900-01-06").locale(lang).format("dddd")}`,
      field: "sat",
      align: "left",
    },
    {
      name: "sun",
      label: `${moment("1900-01-07").locale(lang).format("dddd")}`,
      field: "sun",
      align: "left",
    },
  ]);
  return {
    daysMap,
    cols,
  };
}
