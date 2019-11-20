import moment from "moment";

export default {
  name: "mixin",
  props: {
    itemQuantityDisplayClass: {
      type: String,
      required: false,
      default: "text-weight-bold"
    },
    rowEditBtnColor: {
      type: String,
      required: false,
      default: "white"
    },
    rowEditIconClass: {
      type: String,
      required: false,
      default: ""
    },
    exceptions: {
      type: Array,
      required: false,
      default: () => []
    },
    itemsInOrder: {
      type: Number,
      required: false,
      default: 0
    },
    interval: {
      type: Number,
      required: true,
      validator: value => value > 0
    },
    hours: {
      type: Array,
      required: true,
      validator: values => {
        values.forEach(value => {
          if (isNaN(value) || value < 0) return false;
        });
        if (values.length !== 2) return false;
        if (values[0] > values[1]) return false;
        return true;
      }
    },
    activeDates: {
      type: Array,
      default: () => [],
      required: false,
      validator: values => {
        values.forEach(val => {
          if ("dateFrom" in val === false || "dateTo" in val === false)
            return false;
        });
        return true;
      }
    },
    title: {
      type: String,
      default: "Allowed Dates"
    },
    color: {
      type: String,
      default: ""
    },
    cardClass: {
      type: String,
      default: ""
    },
    tableClass: {
      type: String,
      default: ""
    },
    tableHeaderClass: {
      type: String,
      default: "text-italic text-purple"
    },
    lang: {
      type: String,
      default: "en"
    },
    activeClass: {
      type: String,
      default: "bg-green"
    },
    selectedClass: {
      type: String,
      default: "cursor-pointer bg-green-8"
    },
    disabledClass: {
      type: String,
      default: "bg-grey-4"
    },
    tableHeight: {
      type: Number,
      default: 400
    },
    timeStyle: {
      type: String,
      default: "background-color: #00b9de"
    },
    timeClass: {
      type: String,
      default: "text-weight-bold text-white"
    },
    selectedChipStyle: {
      type: String,
      default: "background-color: #00b9de"
    },
    selectedChipClass: {
      type: String,
      default: "text-weight-bold text-white"
    },
    prevWeekLabel: {
      type: String,
      default: "Previous week"
    },
    nextWeekLabel: {
      type: String,
      default: "Next week"
    },
    dense: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "cell",
      validator: val => ["horizontal", "vertical", "cell", "none"].includes(val)
    },
    days: {
      type: Array,
      required: false,
      default: () => [1, 2, 3, 4, 5, 6, 7]
    }
  },
  data() {
    return {
      daysMap: {
        mon: 0,
        tue: 1,
        wed: 2,
        thu: 3,
        fri: 4,
        sat: 5,
        sun: 6
      },
      selectedDate: true,
      page: 0,
      pagination: {
        rowsPerPage: 0
      },
      selected: [],
      data: [],
      dataCopy: [],
      columnsCopy: [],
      columns: [
        {
          name: "time",
          label: `${this.lang === "hu" ? "Idő" : "Time"}`,
          field: "time",
          align: "left"
        },
        {
          name: "mon",
          label: `${moment("1900-01-01")
            .locale(this.lang)
            .format("dddd")}`,
          field: "mon",
          align: "left"
        },
        {
          name: "tue",
          label: `${moment("1900-01-02")
            .locale(this.lang)
            .format("dddd")}`,
          field: "tue",
          align: "left"
        },
        {
          name: "wed",
          label: `${moment("1900-01-03")
            .locale(this.lang)
            .format("dddd")}`,
          field: "wed",
          align: "left"
        },
        {
          name: "thu",
          label: `${moment("1900-01-04")
            .locale(this.lang)
            .format("dddd")}`,
          field: "thu",
          align: "left"
        },
        {
          name: "fri",
          label: `${moment("1900-01-05")
            .locale(this.lang)
            .format("dddd")}`,
          field: "fri",
          align: "left"
        },
        {
          name: "sat",
          label: `${moment("1900-01-06")
            .locale(this.lang)
            .format("dddd")}`,
          field: "sat",
          align: "left"
        },
        {
          name: "sun",
          label: `${moment("1900-01-07")
            .locale(this.lang)
            .format("dddd")}`,
          field: "sun",
          align: "left"
        }
      ]
    };
  },
  watch: {
    selected: function() {
      this.$emit("selection", this.selected);
    },
    selectedDate: function(val) {
      if (!val) {
        this.selected = [];
        this.selectedDate = true;
        this.$emit("selection", this.selected);
      }
    }
  },
  methods: {
    init() {
      //init columns
      this.columnsCopy = this.columns.filter(
        column =>
          this.days.includes(this.daysMap[column.name] + 2) ||
          column.name === "time"
      );
     
      //init
      let date = moment("0:00", "HH:mm").add(this.hours[0], "hours");
      const runTo = moment("0:00", "HH:mm").add(this.hours[1], "hours");
      const data = [];
      const interval = this.interval;

      while (
        moment(date, "HH:mm")
          .add(interval, "minutes")
          .isSameOrBefore(runTo)
      ) {
        const dateFrom = moment(date, "HH:mm").format("HH:mm");
        const dateTo = moment(date, "HH:mm")
          .add(interval, "minutes")
          .format("HH:mm");
        date = dateTo;

        data.push({
          time: {
            label: `${dateFrom} - ${dateTo}`,
            dateFrom,
            dateTo
          },
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        });
      }
      this.dataCopy = JSON.parse(JSON.stringify(data));
    },
    getHeaderDate(name) {
      if (name === "time") return "";
      const day = this.daysMap[name];
      const date = moment(this.currentWeek.startOfWeek)
        .add(day, "days")
        .format("YYYY/MM/DD");
      return date;
    },
    pushSelected(row) {
      if (!row.isEnabled) return;
      this.selected = [];
      this.selected.push(row);
      this.$emit("selected", this.selected);
    },
    formatLabel() {
      const dateFrom = this.selected[0].time.dateFrom;
      const dateTo = this.selected[0].time.dateTo;
      return `
      ${moment(dateFrom).format("YYYY/MM/DD")} 
      ${moment(dateFrom).format("HH:mm")} - ${moment(dateTo).format("HH:mm")} 
      ${moment(dateFrom)
        .locale(this.lang)
        .format("dddd")}`;
    },
    setPage(increment) {
      if (increment) {
        this.page++;
      } else this.page--;
    },
    itemClass(row) {
      const selectedClass = this.selectedClass;
      const disabledClass = this.disabledClass;
      const activeClass = this.activeClass;

      let classStr = "";
      if (row.isDraft) {
        classStr = classStr.concat(` ${disabledClass} cursor-pointer`);
        return classStr;
      }
      if (row.time && this.selected.length) {
        if (row.time === this.selected[0].time)
          classStr = classStr.concat(selectedClass);
      }
      if (row.isEnabled)
        classStr = classStr.concat(` ${activeClass} cursor-pointer`);
      if (!row.isEnabled) classStr = classStr.concat(disabledClass);
      return classStr;
    }
  }
};
