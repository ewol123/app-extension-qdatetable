<template>
  <q-table
    :dense="dense"
    :separator="separator"
    :color="color"
    :card-class="cardClass"
    :table-class="tableClass"
    :title="`${title} (${currentWeek.startOfWeek} - ${currentWeek.endOfWeek})`"
    :data="possibleArrivalDates"
    :columns="columnsCopy"
    :table-style="`max-height: ${tableHeight}px`"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    row-key="name"
    virtual-scroll
  >
    <template v-slot:top>
      <span
        >{{ title }} ({{ currentWeek.startOfWeek }} -
        {{ currentWeek.endOfWeek }})</span
      >
      <q-btn
        :label="defQuantityBtnLabel"
        class="q-ml-sm"
        color="primary"
        dense
      >
        <q-menu>
          <q-card>
            <q-card-section>
              <q-input
                v-model.number="defQuantityToSet"
                :label="defQuantityInputLabel"
                type="number"
              />
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setDefQuantity', defQuantityToSet)"
              />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn :label="setHoursBtnLabel" class="q-ml-sm" color="primary" dense>
        <q-menu>
          <q-card>
            <q-card-section>
              <q-select
                :label="setHoursInputLabel"
                filled
                v-model="hoursCopy"
                type="number"
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
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setHours', hoursCopy)"
              />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
       <q-btn label="órák beállítása" class="q-ml-sm" color="primary" dense>
        <q-menu>
          <q-card>
            <q-card-section>
              <q-select
                label="vissszadott dátumok órái"
                filled
                use-chips
                use-input
                v-model="possHoursCopy"
                multiple
                type="number"
                input-debounce="0"
                new-value-mode="add"
                style="width: 250px"
                class="q-ml-sm"
              />
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setPossHours', possHoursCopy)"
              />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn :label="setDaysBtnLabel" class="q-ml-sm" color="primary" dense>
        <q-menu>
          <q-card>
            <q-card-section>
              <q-select
                :label="setDaysInputLabel"
                filled
                v-model="daysCopy"
                map-options
                emit-value
                :options="daysOptions"
                multiple
                style="width: 250px"
                class="q-ml-sm"
              />
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setDays', daysCopy)"
              />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn :label="setMinTimeBtnLabel" class="q-ml-sm" color="primary" dense>
        <q-menu>
          <q-card>
            <q-card-section>
              <q-input
                v-model.number="minTimeCopy.days"
                type="number"
                :label="timeD"
              ></q-input>
              <q-input
                v-model.number="minTimeCopy.hours"
                type="number"
                :label="timeH"
              ></q-input>
              <q-input
                v-model.number="minTimeCopy.minutes"
                type="number"
                :label="timeM"
              ></q-input>
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setMinTime', minTimeCopy)"
              />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn :label="setMaxTimeBtnLabel" class="q-ml-sm" color="primary" dense>
        <q-menu>
          <q-card>
            <q-card-section>
              <q-input
                v-model.number="maxTimeCopy.days"
                type="number"
                :label="timeD"
              ></q-input>
              <q-input
                v-model.number="maxTimeCopy.hours"
                type="number"
                :label="timeH"
              ></q-input>
              <q-input
                v-model.number="maxTimeCopy.minutes"
                type="number"
                :label="timeM"
              ></q-input>
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn :label="cancelLabel" flat v-close-popup />
              <q-btn
                :label="saveLabel"
                flat
                v-close-popup
                @click="$emit('setMaxTime', maxTimeCopy)"
              />
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
          {{ col.label }} {{ getHeaderDate(col.name) }}
          <q-btn icon="fas fa-edit" size="small" flat>
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

      <template>
        <q-td
          v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']"
          :key="day"
          :props="props"
          :class="itemClass(props.row[day])"
        >
          <div v-if="props.row[day].isEnabled">
            <span :class="itemQuantityDisplayClass"
              >{{ props.row[day].time.currentItems }} /
              {{props.row[day].time.fulfilledItems}} /
              {{ props.row[day].time.maxItems }}  
              </span
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
            <q-btn
              v-if="props.row[day].time.maxItems != defQuantity"
              icon="fas fa-trash"
              flat
              round
              @click="
                $emit('setQuantity', {
                  row: props.row[day],
                  shouldRemove: true
                })
              "
            />
          </div>
        </q-td>
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
        <q-btn icon="refresh" flat round @click="$emit('refresh')"></q-btn>
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
import mixin from "./mixin";
export default {
  name: "QDateTableEdit",
  mixins: [mixin],
  props: {
    draftQuantities: {
      type: Array,
      default: () => []
    },
    possibleHours: {
      type: Array,
      default: () => []
    },
    timeD: {
      type: String,
      required: false,
      default: "Nap"
    },
    timeH: {
      type: String,
      required: false,
      default: "Óra"
    },
    timeM: {
      type: String,
      required: false,
      default: "Perc"
    },
    setMinTimeBtnLabel: {
      type: String,
      required: false,
      default: "Legkorábbi időpont"
    },
    setMaxTimeBtnLabel: {
      type: String,
      required: false,
      default: "Legkésőbbi időpont"
    },
    setDaysInputLabel: {
      type: String,
      required: false,
      default: "Napok..."
    },
    setDaysBtnLabel: {
      type: String,
      required: false,
      default: "Napok beállítása"
    },
    setHoursBtnLabel: {
      type: String,
      required: false,
      default: "megj. órák beállítása"
    },
    setHoursInputLabel: {
      type: String,
      required: false,
      default: "Órák"
    },
    quantityInputLabel: {
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
    defQuantityBtnLabel: {
      type: String,
      required: false,
      default: "alapért. mennyiség"
    },
    defQuantityInputLabel: {
      type: String,
      required: false,
      default: "mennyiség"
    },
    defQuantity: {
      type: Number,
      required: false
    },
    minTime: {
      type: Object,
      required: false
    },
    maxTime: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      hoursCopy: this.hours,
      daysCopy: this.days,
      intervalCopy: this.interval,
      quantityToSet: null,
      defQuantityToSet: this.defQuantity,
      possHoursCopy: this.possibleHours,
      daysOptions: [
        { label: "Hétfő", value: 2 },
        { label: "Kedd", value: 3 },
        { label: "Szerda", value: 4 },
        { label: "Csütörtök", value: 5 },
        { label: "Péntek", value: 6 },
        { label: "Szombat", value: 7 },
        { label: "Vasárnap", value: 1 }
      ],
      minTimeCopy: this.minTime,
      maxTimeCopy: this.maxTime
    };
  },
  created() {
    this.init();
  },
  watch: {
    interval: function() {
      this.init();
    },
    days: function() {
      this.init();
    },
    hours: function() {
      this.init();
    }
  },
  computed: {
    possibleArrivalDates() {
      if (this.dataCopy) {
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
                el.time.dateFrom === moment(date.dateFrom).format("HH:mm") &&
                el.time.dateTo === moment(date.dateTo).format("HH:mm")
            );
            const day = moment(date.dateFrom)
              .locale("en")
              .format("ddd")
              .toLowerCase();

            if (match) {
              const setData = { isEnabled: true, time: date, isDraft: date.isDraft };
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

      startOfWeek = moment()
        .startOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");

      endOfWeek = moment()
        .endOf("isoWeek")
        .add(this.page, "week")
        .format("YYYY/MM/DD");
      return {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek
      };
    },
    hasNextWeek() {
      return true;
    },
    hasPreviousWeek() {
      return true;
    }
  },
  methods: {
    isDayEnabled(name) {
      if (name === "time") return;
      const date = this.getHeaderDate(name);
      const match = this.exceptions.find(
        el =>
          moment(el).format("YYYY/MM/DD") === moment(date).format("YYYY/MM/DD")
      );
      if (match) return false;
      else return true;
    }
  }
};
</script>
