<template>
  <div>
    <span
      >{{ title }} ({{ currentWeek.startOfWeek }} -
      {{ currentWeek.endOfWeek }})</span
    >
    <q-btn :label="defQuantityBtnLabel" class="q-ml-sm" color="primary" dense>
      <q-menu>
        <q-card>
          <q-card-section>
            <q-input
              v-model.number="mDefQuantity"
              type="number"
              :label="defQuantityInputLabel"
            />
          </q-card-section>
          <q-card-actions class="row justify-end">
            <q-btn :label="cancelLabel" flat v-close-popup />
            <q-btn
              :label="saveLabel"
              flat
              v-close-popup
              @click="onClickSaveDefQuantity()"
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
              v-model="mHours"
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
              @click="onClickSaveHours()"
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
              v-model="possHours"
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
              @click="onClickSavePossHours()"
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
              v-model="mDays"
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
              @click="onClickSaveDays()"
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
              v-model.number="mMinTime.days"
              type="number"
              :label="timeD"
            ></q-input>
            <q-input
              v-model.number="mMinTime.hours"
              type="number"
              :label="timeH"
            ></q-input>
            <q-input
              v-model.number="mMinTime.minutes"
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
              @click="onClickSaveMinTime()"
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
              v-model.number="mMaxTime.days"
              type="number"
              :label="timeD"
            ></q-input>
            <q-input
              v-model.number="mMaxTime.hours"
              type="number"
              :label="timeH"
            ></q-input>
            <q-input
              v-model.number="mMaxTime.minutes"
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
              @click="onClickSaveMaxTime()"
            />
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { readonly, inject } from "vue";
import { useState } from "../composables/useState";
export default {
  name: "Top",
  props: {
    currentWeek: {
      type: Object,
      required: true,
    },
  },
  emits: [
    "setDefQuantity",
    "setHours",
    "setPossHours",
    "setDays",
    "setMinTime",
    "setMaxTime",
  ],
  setup(props, { emit }) {
    const parentProps = inject("props");
    const daysOptions = readonly([
      { label: "Hétfő", value: 2 },
      { label: "Kedd", value: 3 },
      { label: "Szerda", value: 4 },
      { label: "Csütörtök", value: 5 },
      { label: "Péntek", value: 6 },
      { label: "Szombat", value: 7 },
      { label: "Vasárnap", value: 1 },
    ]);
    const [mDefQuantity, setDefQuantity] = useState(parentProps.defQuantity);
    const [mHours, setHours] = useState(parentProps.hours);
    const [possHours, setPossHours] = useState(parentProps.possibleHours);
    const [mDays, setDays] = useState(parentProps.days);
    const [mMinTime, setMinTime] = useState(parentProps.minTime);
    const [mMaxTime, setMaxTime] = useState(parentProps.maxTime);

    const onClickSaveDefQuantity = () => {
      emit("setDefQuantity", mDefQuantity.value);
    };

    const onClickSaveHours = () => {
      emit("setHours", mHours.value);
    };

    const onClickSavePossHours = () => {
      emit("setPossHours", possHours.value);
    };

    const onClickSaveDays = () => {
      emit("setDays", mDays.value);
    };

    const onClickSaveMinTime = () => {
      emit("setMinTime", mMinTime.value);
    };

    const onClickSaveMaxTime = () => {
      emit("setMaxTime", mMaxTime.value);
    };

    return {
      //data
      ...parentProps,
      mDefQuantity,
      mHours,
      possHours,
      mDays,
      daysOptions,
      mMinTime,
      mMaxTime,
      //methods
      onClickSaveDefQuantity,
      onClickSaveHours,
      onClickSavePossHours,
      onClickSaveDays,
      onClickSaveMinTime,
      onClickSaveMaxTime,
    };
  },
};
</script>
