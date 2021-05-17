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
    >
      <div v-if="props.row[day].isEnabled">
        <span :class="itemQuantityDisplayClass"
          >{{ props.row[day].time.currentItems }} /
          {{ props.row[day].time.fulfilledItems }} /
          {{ props.row[day].time.maxItems }}
        </span>
        <q-icon :class="rowEditIconClass" name="fas fa-box q-ml-sm"></q-icon>
        <q-btn :color="rowEditBtnColor" icon="fas fa-edit" flat round size="md">
          <q-menu>
            <q-card>
              <q-card-section>
                <q-input
                  v-model.number="quantity"
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
                  @click="onClickSaveQuantity(props.row[day])"
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
          @click="onClickDeleteQuantity(props.row[day])"
        />
      </div>
    </q-td>
  </q-tr>
</template>

<script>
import { inject } from "vue";
import { useState } from "../../composables/useState";
export default {
  name: "EditBody",
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
  emits: ["setQuantity"],
  setup(props, { emit }) {
    const parentProps = inject("props");

    const [quantity, setQuantity] = useState(null);

    const onClickSaveQuantity = (val) => {
      emit("setQuantity", {
        row: val,
        quantity: quantity.value,
        shouldRemove: false,
      });
    };

    const onClickDeleteQuantity = (val) => {
      emit("setQuantity", {
        row: val,
        shouldRemove: true,
      });
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
      quantity,
      //methods
      onClickSaveQuantity,
      onClickDeleteQuantity,
      getItemClass,
    };
  },
};
</script>
