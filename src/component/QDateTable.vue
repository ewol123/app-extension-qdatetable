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
      <q-td key="time" :props="props" :style="timeStyle" :class="timeClass">{{
        props.row.time.label
      }}</q-td>

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
      validator: val => ["hu", "en"].includes(val.toLowerCase()),
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
    weekThreshold: {
      type: Number,
      default: 6
    },
    dense: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "cell",
      validator: val => ["horizontal", "vertical", "cell", "none"].includes(val),
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
      daysMap: {
        1: { id: "mon", label: { hu: "Hétfő", en: "Monday" } },
        2: { id: "tue", label: { hu: "Kedd", en: "Tuesday" } },
        3: { id: "wed", label: { hu: "Szerda", en: "Wednesday" } },
        4: { id: "thu", label: { hu: "Csütörtök", en: "Thursday" } },
        5: { id: "fri", label: { hu: "Péntek", en: "Friday" } },
        6: { id: "sat", label: { hu: "Szombat", en: "Saturday" } },
        7: { id: "sun", label: { hu: "Vasárnap", en: "Sunday" } }
      },
      data: [],
      columns: [
        {
          name: "time",
          label: `${this.lang === "hu" ? "Idő" : "Time"}`,
          field: "time",
          align: "left"
        },
        {
          name: "mon",
          label: `${this.lang === "hu" ? "Hétfő" : "Monday"}`,
          field: "mon",
          align: "left"
        },
        {
          name: "tue",
          label: `${this.lang === "hu" ? "Kedd" : "Tuesday"}`,
          field: "tue",
          align: "left"
        },
        {
          name: "wed",
          label: `${this.lang === "hu" ? "Szerda" : "Wednesday"}`,
          field: "wed",
          align: "left"
        },
        {
          name: "thu",
          label: `${this.lang === "hu" ? "Csütörtök" : "Thursday"}`,
          field: "thu",
          align: "left"
        },
        {
          name: "fri",
          label: `${this.lang === "hu" ? "Péntek" : "Friday"}`,
          field: "fri",
          align: "left"
        },
        {
          name: "sat",
          label: `${this.lang === "hu" ? "Szombat" : "Saturday"}`,
          field: "sat",
          align: "left"
        },
        {
          name: "sun",
          label: `${this.lang === "hu" ? "Vasárnap" : "Sunday"}`,
          field: "sun",
          align: "left"
        }
      ]
    };
  },
  computed: {
    currentWeek() {
      const startOfWeek = moment()
        .startOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      const endOfWeek = moment()
        .endOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      return {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek
      };
    },
    hasNextWeek() {

      let hasNext = false;
      this.activeDates.forEach(date => {
        const currentWeek = this.currentWeek;
 
        for (let i = 0; i < this.weekThreshold; i++) {
           const weekAccumulator = i + 1;
           const startOfWeek = moment(currentWeek.startOfWeek)
          .add(weekAccumulator, "week")
          .format("YYYY/MM/DD");
        const endOfWeek = moment(currentWeek.endOfWeek)
          .add(weekAccumulator, "week")
          .format("YYYY/MM/DD");

           if (moment(date.dateFrom).isBetween(startOfWeek, endOfWeek)) {

          hasNext = true;
          return hasNext;
        }
        }
      });
      return hasNext;
    },
    hasPreviousWeek() {
      let hasNext = false;
      this.activeDates.forEach(date => {
        const currentWeek = this.currentWeek;

      for (let i = 0; i < this.weekThreshold; i++) {
           const weekAccumulator = i + 1;
           const startOfWeek = moment(currentWeek.startOfWeek)
          .subtract(weekAccumulator, "week")
          .format("YYYY/MM/DD");
        const endOfWeek = moment(currentWeek.endOfWeek)
          .subtract(weekAccumulator, "week")
          .format("YYYY/MM/DD");

        if (moment(date.dateFrom).isBetween(startOfWeek, endOfWeek)) {
          hasNext = true;
          return hasNext;
        }
        }
      });
      return hasNext;
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
          label: `${moment(hour.dateFrom).format("HH:mm")} - ${moment(
            hour.dateTo
          ).format("HH:mm")}`,
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

    this.setPossibleArrivalDates();
  },
  methods: {
    formatLabel() {
      const dateFrom = this.selected[0].time.dateFrom;
      const dateTo = this.selected[0].time.dateTo;
      return `
      ${moment(dateFrom).format("YYYY/MM/DD")} 
      ${moment(dateFrom).format("HH:mm")} - ${moment(dateTo).format("HH:mm")} 
      ${this.daysMap[moment(dateFrom).isoWeekday()].label[this.lang]}`;
    },
    setPage(increment) {
      if (increment) {
        this.page++;
      } else this.page--;
      this.setPossibleArrivalDates();
    },
    setPossibleArrivalDates() {
      this.data.forEach(el => {
        const dateFrom = el.time.dateFrom;
        const dateTo = el.time.dateTo;

        Object.keys(this.daysMap).forEach(day => {
          this.$set(el, this.daysMap[day].id, false);
          const matchedDate = this.activeDates.find(date => {
            if (
              moment(dateFrom).format("HH:mm") ===
                moment(date.dateFrom).format("HH:mm") &&
              moment(dateTo).format("HH:mm") ===
                moment(date.dateTo).format("HH:mm") &&
              this.daysMap[moment(date.dateFrom).isoWeekday()].id ===
                this.daysMap[day].id &&
              moment(date.dateFrom).isBetween(
                this.currentWeek.startOfWeek,
                this.currentWeek.endOfWeek
              )
            ) {
              return true;
            } else return false;
          });

          if (matchedDate) {
            this.$set(el, this.daysMap[day].id, {
              isEnabled: true,
              time: matchedDate
            });
          }
        });
      });
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