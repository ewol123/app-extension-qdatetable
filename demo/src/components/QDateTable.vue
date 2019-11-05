<template>
  <q-table
    :dense="dense"
    :separator="separator"
    :color="color"
    :card-class="cardClass"
    :table-class="tableClass"
    :title="`${title} (${currentWeek.startOfWeek} - ${currentWeek.endOfWeek})`"
    :data="data"
    :columns="columns"
    :table-style="`max-height: ${tableHeight}px`"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    row-key="name"
    virtual-scroll
  >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :class="tableHeaderClass"
          >
            {{ col.label }} 
            <q-btn v-if="mode === 'edit'" icon="fas fa-edit" size="small" flat>
              <q-menu>
                <q-card>
                  <q-card-section>
                      <q-checkbox v-if="col.name !== 'time'" :value="isDayInExceptions(col.name)" @input="val => $emit('dayException',{enable: val, el :getHeaderDate(col.name)})" />
                      <q-select
                      v-if="col.name === 'time'"
                      filled
                      v-model="intervalCopy"
                      use-input
                      use-chips
                      multiple
                      maxlength="2"
                      hide-dropdown-icon
                      input-debounce="0"
                      new-value-mode="add"
                      style="width: 250px"
                    />
                  </q-card-section>
                  <q-card-actions v-if="col.name === 'time'" class="row justify-end">
                    <q-btn flat label="Mégse" v-close-popup>
                    </q-btn>
                    <q-btn flat label="Mentés" @click="$emit('intervalChanged', intervalCopy)" v-close-popup>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
          </q-th>
        </q-tr>
      </template>

    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="time" :props="props" :style="timeStyle" :class="timeClass">{{
        props.row.time.label
      }}</q-td>

      <template v-if="mode === 'edit'">
        <q-td
          v-for="day in ['mon','tue','wed','thu','fri','sat','sun']"
          :key="day"
          :props="props"
          :class="itemClass(props.row[day])"
        >
          <div v-if="props.row[day].isEnabled && props.row[day].time.maxItems" style="width:40px">
            <span
            :class="itemQuantityDisplayClass"
            >{{props.row[day].time.currentItems}} / {{props.row[day].time.maxItems}}</span>
            <q-icon name="fas fa-box q-ml-sm" :class="rowEditIconClass"></q-icon>
            <q-btn icon="fas fa-edit" flat round size="md" :color="rowEditBtnColor">
              <q-menu>
                <q-card>
                  <q-card-section>
                    <q-input
                      type="number"
                      v-model="quantityToSet"
                      label="Új mennyiség"
                      class="q-pa-sm"
                    ></q-input>
                  </q-card-section>
                  <q-card-actions class="row justify-end q-pa-sm">
                    <q-btn flat label="Mégse" v-close-popup></q-btn>
                    <q-btn
                      flat
                      label="Mentés"
                      v-close-popup
                      @click="$emit('setQuantity', {row: props.row[day], quantity: quantityToSet})"
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
          </div>
        </q-td>
      </template>

      <template v-if="mode === 'normal'">
        <q-td
          v-for="(day,index) in ['mon','tue','wed','thu','fri','sat','sun']"
          :key="day"
          :props="props"
          :class="itemClass(props.row[day])"
          @click.native="pushSelected(props.row[day])"
        ></q-td>
      </template>
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
    mode: {
      type: String,
      required: false,
      default: "normal",
      validator: value => ["normal", "edit"].includes(value)
    },
    interval: {
      type: Array,
      required: true,
      validator: values => {
        if (values[0] > values[1]) {
          return false;
        }
        values.forEach(value => {
          if (isNaN(value) || value < 0) return false;
        });

        if(values.length > 2) return false;

        return true;
      }
    },
    hours: {
      type: Array,
      required: true,
      validator: values => {
        values.forEach(value => {
          if (isNaN(value) || value < 0) return false;
        });
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
    }
  },
  data() {
    return {
      intervalCopy: this.interval,
      quantityToSet: null,
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
  computed: {
    currentWeek() {
      let dates = this.activeDates.map(date => moment(date.dateFrom));
      const firstDate = moment.min(dates);

      const startOfWeek = firstDate
        .startOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      const endOfWeek = firstDate
        .endOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      return {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek
      };
    },
    hasNextWeek() {
      let dates = this.activeDates.map(date => moment(date.dateTo));
      const maxDate = moment.max(dates);
      const endOfWeek = this.currentWeek.endOfWeek;
      const isAfter = moment(endOfWeek).isAfter(maxDate);
      return !isAfter;
    },
    hasPreviousWeek() {
      let dates = this.activeDates.map(date => moment(date.dateFrom));
      const minDate = moment.min(dates);
      const startOfWeek = this.currentWeek.startOfWeek;
      const isBefore = moment(startOfWeek).isBefore(minDate);
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
    },
    interval: function(val){
      this.init();
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      const interval = this.interval[1] - this.interval[0];
      const date = moment(new Date()).format("YYYY/MM");
      this.data = [];
    for (let i = 0; i < this.hours.length; i++) {
      const dateFrom = moment(date).add(this.hours[i], "hours");
      const dateTo = moment(date)
        .add(this.hours[i], "hours")
        .add(interval, "minutes");
      this.data.push({
        time: {
          label: `${moment(dateFrom).format("HH:mm")} - ${moment(dateTo).format(
            "HH:mm"
          )}`,
          dateFrom: dateFrom,
          dateTo: dateTo
        },
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
      });

      if (interval < 60) {
        this.data.push({
          time: {
            label: `${moment(dateTo).format("HH:mm")} - ${moment(dateFrom)
              .add(1, "hours")
              .format("HH:mm")}`,
            dateFrom: moment(dateTo),
            dateTo: moment(dateFrom).add(1, "hours")
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
    }

    this.dataCopy = JSON.parse(JSON.stringify(this.data));

    this.setPossibleArrivalDates();
    },
    getHeaderDate(name){
      let day = moment(name, 'ddd').isoWeekday();
      day = day - 1;
      const date = moment(this.currentWeek.startOfWeek).add(day, 'days').format("YYYY/MM/DD");
      return date;
    },
    isDayInExceptions(name) {
      if(name === "time") return;
      const date = this.getHeaderDate(name);
      const match = this.exceptions.find(el => el === date);
      if(match) return false
      else return true;
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
      this.setPossibleArrivalDates();
    },
    setPossibleArrivalDates() {
      const copy = JSON.parse(JSON.stringify(this.dataCopy));

      this.activeDates.forEach(date => {
        if (
          moment(date.dateFrom).isBetween(
            this.currentWeek.startOfWeek,
            this.currentWeek.endOfWeek
          )
        ) {
          const match = copy.find(
            el =>
              moment(el.time.dateFrom).format("HH:mm") ===
                moment(date.dateFrom).format("HH:mm") &&
              moment(el.time.dateTo).format("HH:mm") ===
                moment(date.dateTo).format("HH:mm")
          );
          const day = moment(date.dateFrom)
            .locale("en")
            .format("ddd")
            .toLowerCase();

          if (match) {
            let isAllowed;
            const setData = { isEnabled: true, time: date };
            if (date.maxItems && date.currentItems) {
              isAllowed =
                date.maxItems >= date.currentItems + this.itemsInOrder;
            } else isAllowed = true;

            if (isAllowed || this.mode === "edit")
              this.$set(match, day, setData);
          }
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