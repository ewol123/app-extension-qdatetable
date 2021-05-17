<template>
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

<script>
import moment from "moment";
export default {
  name: "Header",
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
    tableHeaderClass: {
        type: String,
        required: true,
    }
  },
  setup(props) {
    const getHeaderDate = (name) => {
      if (name === "time") return "";
      const day = props.daysMap[name];
      const date = moment(props.currentWeek.startOfWeek)
        .add(day, "days")
        .format("YYYY/MM/DD");
      return date;
    };
    return { getHeaderDate };
  },
};
</script>
