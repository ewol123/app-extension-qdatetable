<template>
  <div class="full-width">
    <div class="justify-between row">
      <q-btn
        :disable="!hasPreviousWeek"
        :label="`${screen.lt.sm ? '' : prevWeekLabel}`"
        icon="fas fa-chevron-left"
        flat
        size="md"
        @click="onClickNav(false)"
      ></q-btn>
      <q-chip
        v-if="formatLabel && screen.gt.xs && strategy === 'NORMAL'"
        :label="formatLabel"
        :style="selectedChipStyle"
        :class="selectedChipClass"
        removable
        @remove="$emit('removeChip')"
      />
      <q-btn
        v-if="strategy === 'EDIT'"
        icon="refresh"
        flat
        round
        @click="$emit('refresh')"
      ></q-btn>
      <q-btn
        :disable="!hasNextWeek"
        :label="`${screen.lt.sm ? '' : nextWeekLabel}`"
        icon-right="fas fa-chevron-right"
        flat
        size="md"
        @click="onClickNav(true)"
      ></q-btn>
    </div>
    <div v-if="screen.lt.sm" class="row">
      <q-chip
        v-if="formatLabel"
        :label="formatLabel"
        :style="selectedChipStyle"
        :class="selectedChipClass"
        removable
        @remove="$emit('removeChip')"
      />
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useState } from "../../composables/useState";
import { useQuasar } from "quasar";
export default {
  name: "Bottom",
  props: {
    hasNextWeek: {
      type: Boolean,
      required: true,
    },
    hasPreviousWeek: {
      type: Boolean,
      required: true,
    },
    formatLabel: {
      type: String,
      required: true,
    },
    strategy: {
      type: String,
      required: true,
    },
  },
  emits: ["setPage", "removeChip", "refresh"],
  setup(props, { emit }) {
    const parentProps = inject("props");
    const $q = useQuasar();

    const [page, setPage] = useState(0);

    const onClickNav = (increment) => {
      if (increment) {
        setPage(page.value + 1);
      } else setPage(page.value - 1);
      emit("setPage", page.value);
    };

    return {
      ...parentProps,
      screen: $q.screen,
      //methods
      onClickNav,
    };
  },
};
</script>
