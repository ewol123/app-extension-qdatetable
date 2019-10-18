<template>
  <q-layout view="lHh lpr lFf" container :style="`height: ${tableHeight}px`" :class="tableClass">
    <q-header v-if="header" elevated>
      <q-toolbar>
        <q-icon name="fas fa-calendar-alt" size="20px"></q-icon>
        <q-toolbar-title>{{title}}</q-toolbar-title>

        <q-btn flat round dense icon="fas fa-question">
          <q-tooltip>
            <span class="text-caption">{{helpMsg}}</span>
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div v-if="!header" :class="titleClass">{{title}}</div>

        <div class="row justify-between text-grey-7">
          <template v-for="day in Object.keys(dates)">
            <div class="col q-pt-sm" :key="day" v-if="dates[day].length">
              <span :class="`text-caption col-auto q-ml-sm ${tblHeaderColor}`">{{findDayById(day)}}</span>

              <q-list bordered :dark="listDark" separator class="q-mt-sm">
                <q-item
                  v-for="(date, index) in dates[day]"
                  clickable
                  ripple
                  :key="index"
                  :disabled="!date.isEnabled"
                  :class="itemClass(date)"
                  @click.native="pushSelected(date)"
                >
                  <q-item-section>
                    <q-chip
                      v-if="!smallChip && !noChip"
                      :color="date.isEnabled ? chipEnabledColor: chipDisabledColor"
                      :class="dateClass"
                    >{{date.label}}</q-chip>
                    <div
                      v-if="smallChip && !noChip"
                      :class="`row ${centerChip ? 'text-center' : ''}`"
                    >
                      <div class="col-12">
                        <q-chip
                          :color="date.isEnabled ? chipEnabledColor: chipDisabledColor"
                          :class="dateClass"
                        >{{date.label}}</q-chip>
                      </div>
                    </div>
                    <span v-if="noChip" :class="dateClass">{{date.label}}</span>
                  </q-item-section>
                  <q-badge v-if="!date.isEnabled" floating class="q-mr-sm">{{notAvailableText}}</q-badge>
                </q-item>
              </q-list>
            </div>
          </template>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import moment from "moment";
export default {
  props: {
    dateOptions: {
      type: Array,
      default: () => [],
      required: true,
      validator: values => {
        values.forEach(val => {
          if ("label" in val === false || "isActive" in val === false)
            return false;
        });
        return true;
      }
    },
    title: {
      type: String,
      default: "Allowed Dates"
    },
    titleClass: {
      type: String,
      default: "text-h6 q-pa-sm"
    },
    cardClass: {
      type: String,
      default: "q-mt-lg"
    },
    notAvailableText: {
      type: String,
      default: "Not available"
    },
    badgeColor: {
      type: String,
      default: "blue"
    },
    lang: {
      type: String,
      validator: val => ["hu", "en"].includes(val.toLowerCase()),
      default: "en"
    },
    chipEnabledColor: {
      type: String,
      default: "teal"
    },
    chipDisabledColor: {
      type: String,
      default: "red"
    },
    dateClass: {
      type: String,
      default: "text-weight-bold text-white"
    },
    selectedClass: {
      type: String,
      default: "bg-green-6"
    },
    tblHeaderColor: {
      type: String,
      default: ""
    },
    listDark: {
      type: Boolean,
      default: false
    },
    smallChip: {
      type: Boolean,
      default: false
    },
    centerChip: {
      type: Boolean,
      default: false
    },
    noChip: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: Number,
      default: 400
    },
    tableClass: {
      type: String,
      default: "shadow-2 rounded-borders"
    },
    helpMsg: {
      type: String,
      default: "Click on desired date"
    }
  },
  watch: {
    selected: function(val) {
      if (val.length && !val[0].isEnabled) {
        this.selected = [];
      }
      this.$emit("selection", this.selected);
    }
  },
  created() {
    let dateObj = {};

    this.dateOptions.forEach(date => {
      const parsedDate = moment(date.label);
      const day = parsedDate.isoWeekday();
      const mappedDay = this.daysMap[day].id;
      const columnOpt = {
        name: mappedDay,
        label: this.daysMap[day].label[this.lang],
        field: mappedDay,
        align: "left",
        sortable: true
      };

      const hasSameColumn = this.columns.find(el => el.name === columnOpt.name);
      dateObj[columnOpt.name] = {};
      if (!hasSameColumn) {
        this.columns.push(columnOpt);
      }
    });

    const dates = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    };

    this.dateOptions.forEach(date => {
      const belongsTo = this.daysMap[moment(date.label).isoWeekday()].id;

      dates[belongsTo].push(date);
    });

    Object.keys(dates).forEach(key => {
      if (dates[key].length % 2 !== 0) {
        dates[key].splice(dates[key].length - 1, 1);
      }
      for (let i = 0; i < dates[key].length; i++) {
        if (!dates[key][i + 1]) {
          dates[key].splice(dates[key].length - 1, 1);
          break;
        }
        dates[key][i] = {
          isEnabled: dates[key][i].isEnabled,
          label: `${moment(dates[key][i].label).format("HH:mm")}-${moment(
            dates[key][i + 1].label
          ).format("HH:mm")}`,
          dateFrom: dates[key][i].label,
          dateTo: dates[key][i + 1].label
        };
      }
    });
    this.dates = dates;
  },
  methods: {
    pushSelected(row) {
      this.selected = [];
      this.selected.push(row);
    },
    itemClass(row) {
      const selectedClass = this.selectedClass;
      const disabledClass = " bg-grey-5";
      let classStr = "";
      if (row === this.selected[0]) classStr = classStr.concat(selectedClass);
      if (row.isEnabled) classStr = classStr.concat(" cursor-pointer");
      if (!row.isEnabled) classStr = classStr.concat(disabledClass);
      return classStr;
    },
    findDayById(id) {
      let dayLabel = "";
      Object.keys(this.daysMap).forEach(key => {
        if (this.daysMap[key].id === id) {
          dayLabel = this.daysMap[key].label[this.lang];
        }
      });
      return dayLabel;
    }
  },
  data() {
    return {
      parsedDates: [],
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
      pagination: {
        rowsPerPage: 0
      },
      columns: [],
      dates: []
    };
  }
};
</script>
