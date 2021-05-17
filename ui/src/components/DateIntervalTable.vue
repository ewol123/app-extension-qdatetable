<template>
  <q-table
    :dense="dense"
    :separator="separator"
    :color="color"
    :card-class="cardClass"
    :table-class="tableClass"
    :title="`${title} (${currentWeek.startOfWeek} - ${currentWeek.endOfWeek})`"
    :rows="possibleArrivalDates"
    :columns="columns"
    :table-style="`max-height: ${tableHeight}px`"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    row-key="name"
    virtual-scroll
  >
    <template v-if="strategy === 'EDIT'" #top>
      <Top
        :currentWeek="currentWeek"
        @setDefQuantity="(val) => $emit('setDefQuantity', val)"
        @setHours="(val) => $emit('setHours', val)"
        @setPossHours="(val) => $emit('setPossHours', val)"
        @setDays="(val) => $emit('setDays', val)"
        @setMinTime="(val) => $emit('setMinTime', val)"
        @setMaxTime="(val) => $emit('setMaxTime', val)"
      />
    </template>

    <template #header="props">
      <Header
        v-if="strategy === 'NORMAL'"
        :props="props"
        :days-map="daysMap"
        :currentWeek="currentWeek"
        :tableHeaderClass="tableHeaderClass"
      />
      <EditHeader
        v-if="strategy === 'EDIT'"
        :props="props"
        :days-map="daysMap"
        :currentWeek="currentWeek"
        @setDayException="(val) => $emit('setDayException', val)"
        @setInterval="(val) => $emit('setInterval', val)"
      />
    </template>

    <template #body="props">
      <Body
        v-if="strategy === 'NORMAL'"
        :props="props"
        :selected="selected"
        @selected="(val) => onSelected(val)"
      />
      <EditBody
        v-if="strategy === 'EDIT'"
        :props="props"
        :selected="selected"
        @setQuantity="(val) => $emit('setQuantity', val)"
      />
    </template>
    <template #bottom>
      <Bottom
        v-if="strategy === 'NORMAL'"
        strategy="NORMAL"
        :has-next-week="hasNextWeek"
        :has-previous-week="hasPreviousWeek"
        :format-label="formatLabel"
        @setPage="(val) => onPageChange(val)"
        @removeChip="() => onRemoveChip()"
        @refresh="() => $emit('refresh')"
      />
      <Bottom
        v-if="strategy === 'EDIT'"
        strategy="EDIT"
        :has-next-week="true"
        :has-previous-week="true"
        :format-label="formatLabel"
        @setPage="(val) => onPageChange(val)"
        @removeChip="() => onRemoveChip()"
        @refresh="() => $emit('refresh')"
      />
    </template>
  </q-table>
</template>

<script>
import { provide, toRefs } from "vue";
import { useReadonly } from "../composables/useReadonly";
import { useComputed } from "../composables/useComputed";
import { usePossibleArrivalDates } from "../composables/usePossibleArrivalDates";
import { useState } from "../composables/useState";

import Header from "./header/Header";
import EditHeader from "./header/EditHeader";
import Body from "./body/Body";
import EditBody from "./body/EditBody";
import Bottom from "./bottom/Bottom";
import Top from "./Top";

export default {
  name: "DateIntervalTable",
  props: {
    strategy: {
      type: String,
      required: true,
      validator: (val) => ["NORMAL", "EDIT"].includes(val),
    },
    itemQuantityDisplayClass: {
      type: String,
      required: false,
      default: "text-weight-bold",
    },
    rowEditBtnColor: {
      type: String,
      required: false,
      default: "white",
    },
    rowEditIconClass: {
      type: String,
      required: false,
      default: "",
    },
    exceptions: {
      type: Array,
      required: false,
      default: () => [],
    },
    interval: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    hours: {
      type: Array,
      required: true,
      validator: (values) => {
        values.forEach((value) => {
          if (isNaN(value) || value < 0) return false;
        });
        if (values.length !== 2) return false;
        if (values[0] > values[1]) return false;
        return true;
      },
    },
    activeDates: {
      type: Array,
      default: () => [],
      required: false,
      validator: (values) => {
        values.forEach((val) => {
          if ("dateFrom" in val === false || "dateTo" in val === false)
            return false;
        });
        return true;
      },
    },
    title: {
      type: String,
      default: "Allowed Dates",
    },
    color: {
      type: String,
      default: "",
    },
    cardClass: {
      type: String,
      default: "",
    },
    tableClass: {
      type: String,
      default: "",
    },
    tableHeaderClass: {
      type: String,
      default: "text-italic text-purple",
    },
    lang: {
      type: String,
      default: "en",
    },
    activeClass: {
      type: String,
      default: "bg-green",
    },
    selectedClass: {
      type: String,
      default: "cursor-pointer bg-green-8",
    },
    disabledClass: {
      type: String,
      default: "bg-grey-4",
    },
    tableHeight: {
      type: Number,
      default: 400,
    },
    timeStyle: {
      type: String,
      default: "background-color: #00b9de",
    },
    timeClass: {
      type: String,
      default: "text-weight-bold text-white",
    },
    selectedChipStyle: {
      type: String,
      default: "background-color: #00b9de",
    },
    selectedChipClass: {
      type: String,
      default: "text-weight-bold text-white",
    },
    prevWeekLabel: {
      type: String,
      default: "Previous week",
    },
    nextWeekLabel: {
      type: String,
      default: "Next week",
    },
    dense: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
      default: "cell",
      validator: (val) =>
        ["horizontal", "vertical", "cell", "none"].includes(val),
    },
    days: {
      type: Array,
      required: false,
      default: () => [1, 2, 3, 4, 5, 6, 7],
    },
    // =============EDIT TABLE PROPS=============== //
    draftQuantities: {
      type: Array,
      default: () => [],
    },
    possibleHours: {
      type: Array,
      default: () => [],
    },
    timeD: {
      type: String,
      required: false,
      default: "Nap",
    },
    timeH: {
      type: String,
      required: false,
      default: "Óra",
    },
    timeM: {
      type: String,
      required: false,
      default: "Perc",
    },
    setMinTimeBtnLabel: {
      type: String,
      required: false,
      default: "Legkorábbi időpont",
    },
    setMaxTimeBtnLabel: {
      type: String,
      required: false,
      default: "Legkésőbbi időpont",
    },
    setDaysInputLabel: {
      type: String,
      required: false,
      default: "Napok...",
    },
    setDaysBtnLabel: {
      type: String,
      required: false,
      default: "Napok beállítása",
    },
    setHoursBtnLabel: {
      type: String,
      required: false,
      default: "megj. órák beállítása",
    },
    setHoursInputLabel: {
      type: String,
      required: false,
      default: "Órák",
    },
    quantityInputLabel: {
      type: String,
      required: false,
      default: "Új mennyiség",
    },
    saveLabel: {
      type: String,
      required: false,
      default: "Mentés",
    },
    cancelLabel: {
      type: String,
      required: false,
      default: "Mégse",
    },
    defQuantityBtnLabel: {
      type: String,
      required: false,
      default: "alapért. mennyiség",
    },
    defQuantityInputLabel: {
      type: String,
      required: false,
      default: "mennyiség",
    },
    defQuantity: {
      type: Number,
      required: false,
    },
    minTime: {
      type: Object,
      required: false,
    },
    maxTime: {
      type: Object,
      required: false,
    },
  },
  components: {
    Top,
    Header,
    EditHeader,
    Body,
    EditBody,
    Bottom,
  },
  emits: [
    "selection",
    "setPage",
    "setDefQuantity",
    "setHours",
    "setPossHours",
    "setDays",
    "setMinTime",
    "setMaxTime",
    "setDayException",
    "setInterval",
    "setQuantity",
    "refresh",
  ],

  setup(props, { emit }) {
    provide("props", props);

    const { daysMap, cols } = useReadonly(props.lang);

    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState({ rowsPerPage: 0 });
    const [selected, setSelected] = useState([]);

    const { activeDates, days, hours, interval } = toRefs(props);

    const { columns, currentWeek, hasNextWeek, hasPreviousWeek, formatLabel } =
      useComputed({
        strategy: props.strategy,
        activeDates,
        lang: props.lang,
        days: days,
        cols,
        daysMap,
        selected,
        page,
      });

    const { possibleArrivalDates } = usePossibleArrivalDates({
      activeDates,
      hours: hours,
      interval: interval,
      strategy: props.strategy,
      currentWeek: currentWeek,
    });

    const onSelected = (value) => {
      setSelected(value);
      emit("selection", value);
    };

    const onRemoveChip = () => {
      setSelected([]);
      emit("selection", []);
    };

    const onPageChange = (value) => {
      setPage(value);
      emit("setPage", value);
    };

    return {
      //data
      daysMap,
      pagination,
      selected,
      //computed
      columns,
      currentWeek,
      hasNextWeek,
      hasPreviousWeek,
      formatLabel,
      possibleArrivalDates,
      //methods
      onSelected,
      onPageChange,
      onRemoveChip,
    };
  },
};
</script>
