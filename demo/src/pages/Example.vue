<template>
  <q-page padding>
    <q-datetable :date-options="dates" @selection="selected = $event"></q-datetable>
    <p class="text-weight-bold">{{selected}}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selected : null,
      dates: [
        {
          label: "2019.10.16 7:00-7:30",
          isEnabled: true
        },
        {
          label: "2019.10.16 7:00-8:00",
          isEnabled: true
        },
        {
          label: "2019.10.16 7:00-8:30",
          isEnabled: true
        },
        {
          label: "2019.10.16 7:30-8:00",
          isEnabled: true
        },
        {
          label: "2019.10.16 7:30-8:30",
          isEnabled: true
        },
        {
          label: "2019.10.16 7:30-9:00",
          isEnabled: false
        },
        {
          label: "2019.10.16 8:00-8:30",
          isEnabled: true
        },
        {
          label: "2019.10.16 8:00-9:00",
          isEnabled: true
        },
        {
          label: "2019.10.16 8:00-9:30",
          isEnabled: true
        },
        {
          label: "2019.10.16 8:30-9:00",
          isEnabled: true
        },
        {
          label: "2019.10.16 8:30-9:30",
          isEnabled: true
        }
      ]
    };
  }
};
</script>
