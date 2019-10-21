<template>
  <q-page padding>
    <h6>Default mode</h6>
    <q-datetable
      :date-options="allowedDates"
      @selection="selected = $event"
    ></q-datetable>
    <p class="text-weight-bold">{{ selected }}</p>

    <h6>With header</h6>
    <q-datetable
      :date-options="allowedDates"
      @selection="selected = $event"
      header
    ></q-datetable>
    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Small chip mode</h6>
    <q-datetable
      :date-options="allowedDates"
      @selection="selected = $event"
      small-chip
    ></q-datetable>
    <p class="text-weight-bold">{{ selected }}</p>

    <h6>No chip mode, useful for smaller screens</h6>

    <q-datetable
      :date-options="allowedDates"
      @selection="selected = $event"
      no-chip
      date-class="text-weight-bold"
    ></q-datetable>
    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Customized mode</h6>

    <q-datetable
      :date-options="allowedDatesFull"
      @selection="selected = $event"
      title="Selectable dates"
      titleClass="text-h6 text-white"
      table-class="card-bg shadow-2 rounded-borders"
      not-available-text="Choose another!"
      lang="en"
      chip-enabled-color="amber"
      chip-disabled-color="red"
      date-class="text-black text-weight-bold glossy"
      center-chip
      selected-class="bg-white"
      list-dark
      tbl-header-color="text-white"
      header
      help-msg="Pick a date!"
      small-chip
    ></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      allowedDates: [
        { label: "Thu Oct 24 2019 14:00:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 14:30:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 15:00:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 15:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 09:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 09:30:00 GMT+0200", isEnabled: false },
        { label: "Fri Oct 25 2019 10:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 11:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 11:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 12:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 12:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 13:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 13:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 14:00:00 GMT+0200", isEnabled: false },
        { label: "Fri Oct 25 2019 14:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 15:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 15:30:00 GMT+0200", isEnabled: true },
        { label: "Mon Oct 28 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Mon Oct 28 2019 10:30:00 GMT+0200", isEnabled: true }
      ],
      allowedDatesFull: [
        { label: "Thu Oct 24 2019 14:00:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 14:30:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 15:00:00 GMT+0200", isEnabled: true },
        { label: "Thu Oct 24 2019 15:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 09:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 09:30:00 GMT+0200", isEnabled: false },
        { label: "Fri Oct 25 2019 10:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 11:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 11:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 12:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 12:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 13:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 13:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 14:00:00 GMT+0200", isEnabled: false },
        { label: "Fri Oct 25 2019 14:30:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 15:00:00 GMT+0200", isEnabled: true },
        { label: "Fri Oct 25 2019 15:30:00 GMT+0200", isEnabled: true },
        { label: "Mon Oct 28 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Mon Oct 28 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Tue Oct 29 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Tue Oct 29 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Wed Oct 30 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Wed Oct 30 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Sat Oct 19 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Sat Oct 19 2019 10:30:00 GMT+0200", isEnabled: true },
        { label: "Sun Oct 20 2019 9:30:00 GMT+0200", isEnabled: true },
        { label: "Sun Oct 20 2019 10:30:00 GMT+0200", isEnabled: true }
      ]
    };
  }
};
</script>

<style >
.card-bg {
  background: radial-gradient(circle, #2272b8 0%, #00b9de 100%);
}
</style>