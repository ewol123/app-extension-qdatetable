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
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          :class="tableHeaderClass"
        >
          {{ col.label }} {{ getHeaderDate(col.name) }}
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
          @remove="$emit('removeChip', false)"
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
          @remove="$emit('removeChip', false)"
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
  name: "QDateTable",
  mixins: [mixin],
  created() {
    this.init();
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
              const setData = { isEnabled: true, time: date };
              if (date.isAllowed) this.$set(match, day, setData);
            }
          }
        });
        return copy;
      } else return [];
    },
    currentWeek() {
      let startOfWeek;
      let endOfWeek;
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
  }
};
</script>
