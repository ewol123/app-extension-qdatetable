<template>
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
                :model-value="isDayEnabled(col.name)"
                @update:model-value="(val) => onInputIsDayEnabled(val, col)"
              />
              <q-input
                v-if="col.name === 'time'"
                v-model.number="mInterval"
                type="number"
                filled
                use-chips
                style="width: 250px"
              />
            </q-card-section>
            <q-card-actions v-if="col.name === 'time'" class="row justify-end">
              <q-btn v-close-popup flat :label="cancelLabel"></q-btn>
              <q-btn
                v-close-popup
                flat
                :label="saveLabel"
                @click="onClickSaveInterval()"
              ></q-btn>
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
    </q-th>
  </q-tr>
</template>

<script>
import moment from "moment";
import { useState } from "../../composables/useState";
import { inject } from "vue";
export default {
  name: "EditHeader",
  props: {
    props: {
      type: Object,
      required: true,
    },
    daysMap: {
      type: Object,
      required: true,
    },
    currentWeek: {
      type: Object,
      required: true,
    },
  },
  emits: ["setDayException", "setInterval"],
  setup(props, { emit }) {
    const parentProps = inject("props");
    const [mInterval, setInterval] = useState(parentProps.interval);

    const getHeaderDate = (name) => {
      if (name === "time") return "";
      const day = props.daysMap[name];
      const date = moment(props.currentWeek.startOfWeek)
        .add(day, "days")
        .format("YYYY/MM/DD");
      return date;
    };

    const isDayEnabled = (name) => {
      if (name === "time") return;
      const date = getHeaderDate(name);
      const match = parentProps.exceptions.find(
        (el) =>
          moment(el).format("YYYY/MM/DD") === moment(date).format("YYYY/MM/DD")
      );
      if (match) return false;
      else return true;
    };

    const onInputIsDayEnabled = (val, col) => {
      emit("setDayException", {
        enable: val,
        el: getHeaderDate(col.name),
      });
    };

    const onClickSaveInterval = () => {
      emit("setInterval", mInterval.value);
    };

    return {
      //data
      ...parentProps,
      mInterval,
      //methods
      getHeaderDate,
      isDayEnabled,
      onInputIsDayEnabled,
      onClickSaveInterval,
    };
  },
};
</script>
