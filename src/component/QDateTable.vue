<template>
  <q-table
    :dense="dense"
    :separator="separator"
    :color="color"
    :card-class="cardClass"
    :table-class="tableClass"
    :title="`${title} (${currentWeek.startOfWeek} - ${currentWeek.endOfWeek})`"
    :data="possibleArrivalDates"
    :columns="columns"
    :table-style="`max-height: ${tableHeight}px`"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    row-key="name"
    virtual-scroll
  >

    <template v-if="mode === 'edit'" v-slot:top>
      <span>{{title}} ({{currentWeek.startOfWeek}} - {{currentWeek.endOfWeek}})</span>
      <q-btn :label="defQuantityBtnLabel"  icon="fas fa-boxes" class="q-ml-sm" color="primary">
        <q-menu>
          <q-card>
            <q-card-section>
              <q-input v-model.number="defQuantityToSet" :label="defQuantityInputLabel" type="number"/>
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup/>
              <q-btn :label="saveLabel" flat v-close-popup @click="$emit('setDefQuantity',defQuantityToSet)"/>
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn> 
      <q-btn :label="setHoursBtnLabel" class="q-ml-sm" color="primary">
       <q-menu>
        <q-card>
          <q-card-section>
            <q-select
              :label="setHoursInputLabel"
              filled
              v-model="hoursCopy"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add"
              style="width: 250px"
              class="q-ml-sm"
          />
          </q-card-section>
          <q-card-actions class="row justify-end">
            <q-btn :label="cancelLabel" flat v-close-popup/>
            <q-btn :label="saveLabel" flat v-close-popup @click="$emit('setHours', hoursCopy )"/>
          </q-card-actions>
        </q-card>
       </q-menu>
      </q-btn>

    </template>    

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
                  <q-checkbox
                    v-if="col.name !== 'time'"
                    :value="isDayEnabled(col.name)"
                    @input="
                      val =>
                        $emit('setDayException', {
                          enable: val,
                          el: getHeaderDate(col.name)
                        })
                    "
                  />
                  <q-input
                    v-if="col.name === 'time'"
                    v-model.number="intervalCopy"
                    type="number"
                    filled
                    use-chips
                    style="width: 250px"
                  />
                </q-card-section>
                <q-card-actions
                  v-if="col.name === 'time'"
                  class="row justify-end"
                >
                  <q-btn v-close-popup flat :label="cancelLabel"></q-btn>
                  <q-btn
                    v-close-popup
                    flat
                    :label="saveLabel"
                    @click="$emit('setInterval', intervalCopy)"
                  ></q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
        </q-th>
      </q-tr>
    </template>

    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="time" :props="props" :style="timeStyle" :class="timeClass">
        {{ props.row.time.label }}
      </q-td>

      <template v-if="mode === 'edit'">
        <q-td
          v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']"
          :key="day"
          :props="props"
          :class="itemClass(props.row[day])"
        >
          <div
            v-if="props.row[day].isEnabled"
            style="width:40px"
          >
            <span :class="itemQuantityDisplayClass"
              >{{ props.row[day].time.currentItems }} /
              {{ props.row[day].time.maxItems }}</span
            >
            <q-icon
              :class="rowEditIconClass"
              name="fas fa-box q-ml-sm"
            ></q-icon>
            <q-btn
              :color="rowEditBtnColor"
              icon="fas fa-edit"
              flat
              round
              size="md"
            >
              <q-menu>
                <q-card>
                  <q-card-section>
                    <q-input
                      v-model.number="quantityToSet"
                      type="number"
                      :label="quantityInputLabel"
                      class="q-pa-sm"
                    ></q-input>
                  </q-card-section>
                  <q-card-actions class="row justify-end q-pa-sm">
                    <q-btn v-close-popup flat :label="cancelLabel"></q-btn>
                    <q-btn
                      v-close-popup
                      flat
                      :label="saveLabel"
                      @click="
                        $emit('setQuantity', {
                          row: props.row[day],
                          quantity: quantityToSet,
                          shouldRemove: false
                        })
                      "
                    ></q-btn>
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
          <q-btn v-if="props.row[day].time.maxItems != defQuantity" icon="fas fa-trash" flat round @click="$emit('setQuantity', {row: props.row[day], shouldRemove: true})"/>
          </div>
        </q-td>
      </template>

      <template v-if="mode === 'normal'">
        <q-td
          v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']"
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
    setHoursBtnLabel:{
      type: String,
      required: false,
      default: "Órák beállítása"
    },
    setHoursInputLabel: {
      type: String,
      required: false,
      default: "Órák"
    },
    quantityInputLabel:{
      type: String,
      required: false,
      default: "Új mennyiség"
    },
    saveLabel: {
      type: String,
      required: false,
      default: "Mentés"
    },
    cancelLabel: {
      type: String,
      required: false,
      default: "Mégse"
    },
    defQuantityBtnLabel:{
      type: String,
      required: false,
      default: "alapért. mennyiség"
    },
    defQuantityInputLabel:{
      type: String,
      required:false,
      default: "mennyiség"
    },
    defQuantity:{
      type: Number,
      required: false,
    },
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
        if(values.length !== 2) return false;
        if(values[0] > values[1]) return false;
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
       daysMap: {
        mon: 0,
        tue: 1,
        wed: 2,
        thu: 3,
        fri: 4,
        sat: 5,
        sun: 6
      },
      intervalCopy: this.interval,
      hoursCopy: this.hours,
      quantityToSet: null,
      defQuantityToSet: null,
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
    possibleArrivalDates() {
      if(this.dataCopy){
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
              el.time.dateFrom ===
                moment(date.dateFrom).format("HH:mm") &&
              el.time.dateTo ===
                moment(date.dateTo).format("HH:mm")
          );
          const day = moment(date.dateFrom)
            .locale("en")
            .format("ddd")
            .toLowerCase();

          if (match) {
            let isAllowed;
            const setData = { isEnabled: true, time: date };
            if ("maxItems" in date && "currentItems" in date) {
              isAllowed =
                date.maxItems >= date.currentItems + this.itemsInOrder;
            } else isAllowed = true;

            if (isAllowed || this.mode === "edit")
              this.$set(match, day, setData);
          }
        }
      });
      return copy;
      } else return [];
    },
    currentWeek() {
      let startOfWeek;
      let endOfWeek;

      if(this.mode === "edit"){
        startOfWeek = moment()
        .startOf("isoWeek")
        .add(this.page,"week")
        .format("YYYY/MM/DD");

        endOfWeek = moment()
        .endOf("isoWeek")
        .add(this.page,"week")
        .format("YYYY/MM/DD");
      } else {
        let dates = this.activeDates.map(date => moment(date.dateFrom));
        const firstDate = moment.min(dates);

       startOfWeek = firstDate
        .startOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
       endOfWeek = firstDate
        .endOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      }
      return {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek
      };
    },
    hasNextWeek() {
      if(this.mode === "edit") return true;
      let dates = this.activeDates.map(date => moment(date.dateTo));
      const maxDate = moment.max(dates);
      const endOfWeek = this.currentWeek.endOfWeek;
      const isAfter = moment(endOfWeek).isAfter(maxDate);
      return !isAfter;
    },
    hasPreviousWeek() {
      if(this.mode === "edit") return true;
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
    interval: function() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let date = moment("0:00", "HH:mm").add(this.hours[0], "hours");
      const runTo = moment("0:00", "HH:mm").add(this.hours[1], "hours");
      const data = [];
      const interval = this.interval;
      

      while(moment(date, "HH:mm").add(interval,"minutes").isSameOrBefore(runTo)){
        const dateFrom = moment(date, "HH:mm").format("HH:mm"); 
        const dateTo = moment(date, "HH:mm").add(interval,"minutes").format("HH:mm");
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
      const day = this.daysMap[name];
      const date = moment(this.currentWeek.startOfWeek)
        .add(day, "days")
        .format("YYYY/MM/DD");
      return date;
    },
    isDayEnabled(name) {
      if (name === "time") return;
      const date = this.getHeaderDate(name);
      const match = this.exceptions.find(
        el =>
          moment(el).format("YYYY/MM/DD") === moment(date).format("YYYY/MM/DD")
      );
      if (match) return false;
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
