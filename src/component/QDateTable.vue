<template>
  <q-table
    :dense="dense"
    :separator="separator"
    :color="color"
    :card-class="cardClass"
    :table-class="tableClass"
    :table-header-class="tableHeaderClass"
    :title="`${title} (${currentWeek.startOfWeek} - ${currentWeek.endOfWeek})`"
    :data="data"
    :columns="columns"
    :table-style="`max-height: ${tableHeight}px`"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    row-key="name"
    virtual-scroll
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="time" :props="props" :style="timeStyle" :class="timeClass">
        {{
        props.row.time.label
        }}
      </q-td>

      <q-td
        key="mon"
        :props="props"
        :class="itemClass(props.row.mon)"
        @click.native="pushSelected(props.row.mon)"
      ></q-td>

      <q-td
        key="tue"
        :props="props"
        :class="itemClass(props.row.tue)"
        @click.native="pushSelected(props.row.tue)"
      ></q-td>

      <q-td
        key="wed"
        :props="props"
        :class="itemClass(props.row.wed)"
        @click.native="pushSelected(props.row.wed)"
      ></q-td>
      <q-td
        key="thu"
        :props="props"
        :class="itemClass(props.row.thu)"
        @click.native="pushSelected(props.row.thu)"
      ></q-td>
      <q-td
        key="fri"
        :props="props"
        :class="itemClass(props.row.fri)"
        @click.native="pushSelected(props.row.fri)"
      ></q-td>
      <q-td
        key="sat"
        :props="props"
        :class="itemClass(props.row.sat)"
        @click.native="pushSelected(props.row.sat)"
      ></q-td>
      <q-td
        key="sun"
        :props="props"
        :class="itemClass(props.row.sun)"
        @click.native="pushSelected(props.row.sun)"
      ></q-td>
    </q-tr>

    <div slot="bottom" class="full-width">
      <div class="justify-between row">
        <q-btn
          :disable="!hasPreviousWeek"
          :label="`${$q.screen.lt.sm ? '' : prevWeekLabel}`"
          icon="fas fa-chevron-left"
          flat
          size="md"
          @click="setPage(false)"
        ></q-btn>
        <q-chip
          v-if="selected.length && $q.screen.gt.xs"
          v-model="selectedDate"
          :label="formatLabel()"
          :style="selectedChipStyle"
          :class="selectedChipClass"
          removable
        />
        <q-btn
          :disable="!hasNextWeek"
          :label="`${$q.screen.lt.sm ? '' : nextWeekLabel}`"
          icon-right="fas fa-chevron-right"
          flat
          size="md"
          @click="setPage(true)"
        ></q-btn>
      </div>
      <div v-if="$q.screen.lt.sm" class="row">
        <q-chip
          v-if="selected.length"
          v-model="selectedDate"
          :label="formatLabel()"
          :style="selectedChipStyle"
          :class="selectedChipClass"
          removable
        />
      </div>
    </div>
  </q-table>
</template>
<script>
import moment from "moment";
export default {
  props: {
    hours: {
      type: Array,
      default: () => []
    },
    activeDates: {
      type: Array,
      default: () => [],
      required: true,
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
      default: ""
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
    }
  },
  data() {
    return {
      selectedDate: true,
      page: 0,
      pagination: {
        rowsPerPage: 0
      },
      selected: [],
      data: [],
      dataCopy: [],
      columns: [
        {
          name: "time",
          label: `${this.lang === "hu" ? "Idő" : "Time"}`,
          field: "time",
          align: "left"
        },
        {
          name: "mon",
          label: `${moment('1900-01-01').lang(this.lang).format("dddd")}`,
          field: "mon",
          align: "left"
        },
        {
          name: "tue",
          label: `${moment('1900-01-02').lang(this.lang).format("dddd")}`,
          field: "tue",
          align: "left"
        },
        {
          name: "wed",
          label: `${moment('1900-01-03').lang(this.lang).format("dddd")}`,
          field: "wed",
          align: "left"
        },
        {
          name: "thu",
          label: `${moment('1900-01-04').lang(this.lang).format("dddd")}`,
          field: "thu",
          align: "left"
        },
        {
          name: "fri",
          label: `${moment('1900-01-05').lang(this.lang).format("dddd")}`,
          field: "fri",
          align: "left"
        },
        {
          name: "sat",
          label: `${moment('1900-01-06').lang(this.lang).format("dddd")}`,
          field: "sat",
          align: "left"
        },
        {
          name: "sun",
          label: `${moment('1900-01-07').lang(this.lang).format("dddd")}`,
          field: "sun",
          align: "left"
        }
      ]
    };
  },
  computed: {
    currentWeek() {
      const startOfWeek = moment
        .utc()
        .startOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      const endOfWeek = moment
        .utc()
        .endOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      return {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek
      };
    },
    hasNextWeek() {
      let dates = this.activeDates.map(date => moment.utc(date.dateTo));
      const maxDate = moment.max(dates);
      const endOfWeek = this.currentWeek.endOfWeek;
      const isAfter = moment.utc(endOfWeek).isAfter(maxDate);
      return !isAfter;
    },
    hasPreviousWeek() {
      let dates = this.activeDates.map(date => moment.utc(date.dateFrom));
      const minDate = moment.min(dates);
      const startOfWeek = this.currentWeek.startOfWeek;
      const isBefore = moment.utc(startOfWeek).isBefore(minDate);
      return !isBefore;
    }
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
  created() {
    this.hours.forEach(hour => {
      this.data.push({
        time: {
          label: `${moment.utc(hour.dateFrom).format("HH:mm")} - ${moment
            .utc(hour.dateTo)
            .format("HH:mm")}`,
          dateFrom: hour.dateFrom,
          dateTo: hour.dateTo
        },
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
      });
    });

    this.dataCopy = JSON.parse(JSON.stringify(this.data));

    this.setPossibleArrivalDates();
  },
  methods: {
    formatLabel() {
      const dateFrom = this.selected[0].time.dateFrom;
      const dateTo = this.selected[0].time.dateTo;
      return `
      ${moment.utc(dateFrom).format("YYYY/MM/DD")} 
      ${moment.utc(dateFrom).format("HH:mm")} - ${moment
        .utc(dateTo)
        .format("HH:mm")} 
      ${moment
        .utc(dateFrom)
        .lang(this.lang)
        .format("dddd")}`;
    },
    setPage(increment) {
      if (increment) {
        this.page++;
      } else this.page--;
      this.setPossibleArrivalDates();
    },
    setPossibleArrivalDates() {
      const copy = JSON.parse(JSON.stringify(this.dataCopy));

      this.activeDates.forEach(date => {
        if (
          moment
            .utc(date.dateFrom)
            .isBetween(this.currentWeek.startOfWeek, this.currentWeek.endOfWeek)
        ) {
          const match = copy.find(
            el =>
              moment.utc(el.time.dateFrom).format("HH:mm") ===
                moment.utc(date.dateFrom).format("HH:mm") &&
              moment.utc(el.time.dateTo).format("HH:mm") ===
                moment.utc(date.dateTo).format("HH:mm")
          );
          const day = moment(date.dateFrom)
            .format("ddd")
            .toLowerCase();
          this.$set(match, day, { isEnabled: true, time: date });
        }
      });
      this.data = copy;
    },

    pushSelected(row) {
      if (!row.isEnabled) return;
      this.selected = [];
      this.selected.push(row);
    },
    itemClass(row) {
      const selectedClass = this.selectedClass;
      const disabledClass = this.disabledClass;
      const activeClass = this.activeClass;
      let classStr = "";
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
</script>