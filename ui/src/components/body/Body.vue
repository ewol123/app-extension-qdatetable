<template>
  <q-tr :props="props">
    <q-td key="time" :props="props" :style="timeStyle" :class="timeClass">
      {{ props.row.time.label }}
    </q-td>

    <q-td
      v-for="day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']"
      :key="day"
      :props="props"
      :class="getItemClass(props.row[day])"
      @click.native="onClickRow(props.row[day])"
    ></q-td>
  </q-tr>
</template>

<script>
import { inject } from "vue";
export default {
  name: "Body",
  props: {
    props: {
      type: Object,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
  },
  emits: ["selected"],
  setup(props, { emit }) {
    const parentProps = inject("props");
    const onClickRow = (row) => {
      if (!row.isEnabled) return;
      emit("selected", [row]);
    };

    const getItemClass = (row) => {
      const selectedClass = parentProps.selectedClass;
      const disabledClass = parentProps.disabledClass;
      const activeClass = parentProps.activeClass;
      let classStr = "";
      if (row.isDraft) {
        classStr = classStr.concat(` ${disabledClass} cursor-pointer`);
        return classStr;
      }
      if (row.time && props.selected.length) {
        if (
          row.time.dateFrom === props.selected[0].time.dateFrom &&
          row.time.dateTo === props.selected[0].time.dateTo
        ) {
          classStr = classStr.concat(selectedClass);
        }
      }
      if (row.isEnabled)
        classStr = classStr.concat(` ${activeClass} cursor-pointer`);
      if (!row.isEnabled) classStr = classStr.concat(disabledClass);
      return classStr;
    };

    return {
      //data
      ...parentProps,
      //methods
      onClickRow,
      getItemClass,
    };
  },
};
</script>