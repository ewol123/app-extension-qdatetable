<template>
  <q-page padding>
    <h6>Default mode</h6>
    <q-datetable @selection="selected = $event"  :interval="[0, 30]" :hours="[8, 16]"  :active-dates="activeDates"></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Custom mode</h6>
    <span class="text-caption text-grey">Full list of properties can be found in the documentation</span>
    <q-datetable
      dense
      @selection="selected = $event"
      :interval="[0, 30]"
      :hours="[8,9,10,11,12,13,14,15,16]"
      :active-dates="activeDates"
      title="Something"
      prev-week-label="Előző hét"
      next-week-label="Következő hét"
      active-class="bg-teal"
      selected-class="bg-teal-8"
      disabled-class="bg-grey-6"
      card-class="bg-amber-5 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      lang="hu"
    ></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      activeDates: [
        {
          dateFrom: "2019-10-25T07:00:00.000Z",
          dateTo: "2019-10-25T07:30:00.000Z"
        },
        {
          dateFrom: "2019-10-25T07:30:00.000Z",
          dateTo: "2019-10-25T08:00:00.000Z"
        },
        {
          dateFrom: "2019-10-25T08:00:00.000Z",
          dateTo: "2019-10-25T08:30:00.000Z"
        },
        {
          dateFrom: "2019-10-25T08:30:00.000Z",
          dateTo: "2019-10-25T09:00:00.000Z"
        },
        {
          dateFrom: "2019-10-25T09:00:00.000Z",
          dateTo: "2019-10-25T09:30:00.000Z"
        },
        {
          dateFrom: "2019-10-25T09:30:00.000Z",
          dateTo: "2019-10-25T10:00:00.000Z"
        },
        {
          dateFrom: "2019-10-25T10:00:00.000Z",
          dateTo: "2019-10-25T10:30:00.000Z"
        },
        {
          dateFrom: "2019-10-25T10:30:00.000Z",
          dateTo: "2019-10-25T11:00:00.000Z"
        },
        {
          dateFrom: "2019-10-25T11:00:00.000Z",
          dateTo: "2019-10-25T11:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T06:00:00.000Z",
          dateTo: "2019-10-28T06:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T06:30:00.000Z",
          dateTo: "2019-10-28T07:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T07:00:00.000Z",
          dateTo: "2019-10-28T07:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T07:30:00.000Z",
          dateTo: "2019-10-28T08:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T08:00:00.000Z",
          dateTo: "2019-10-28T08:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T08:30:00.000Z",
          dateTo: "2019-10-28T09:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T09:00:00.000Z",
          dateTo: "2019-10-28T09:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T09:30:00.000Z",
          dateTo: "2019-10-28T10:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T10:00:00.000Z",
          dateTo: "2019-10-28T10:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T10:30:00.000Z",
          dateTo: "2019-10-28T11:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T11:00:00.000Z",
          dateTo: "2019-10-28T11:30:00.000Z"
        },
        {
          dateFrom: "2019-10-28T11:30:00.000Z",
          dateTo: "2019-10-28T12:00:00.000Z"
        },
        {
          dateFrom: "2019-10-28T12:00:00.000Z",
          dateTo: "2019-10-28T12:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T06:00:00.000Z",
          dateTo: "2019-10-29T06:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T06:30:00.000Z",
          dateTo: "2019-10-29T07:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T07:00:00.000Z",
          dateTo: "2019-10-29T07:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T07:30:00.000Z",
          dateTo: "2019-10-29T08:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T08:00:00.000Z",
          dateTo: "2019-10-29T08:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T08:30:00.000Z",
          dateTo: "2019-10-29T09:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T09:00:00.000Z",
          dateTo: "2019-10-29T09:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T09:30:00.000Z",
          dateTo: "2019-10-29T10:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T10:00:00.000Z",
          dateTo: "2019-10-29T10:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T10:30:00.000Z",
          dateTo: "2019-10-29T11:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T11:00:00.000Z",
          dateTo: "2019-10-29T11:30:00.000Z"
        },
        {
          dateFrom: "2019-10-29T11:30:00.000Z",
          dateTo: "2019-10-29T12:00:00.000Z"
        },
        {
          dateFrom: "2019-10-29T12:00:00.000Z",
          dateTo: "2019-10-29T12:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T06:00:00.000Z",
          dateTo: "2019-10-30T06:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T06:30:00.000Z",
          dateTo: "2019-10-30T07:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T07:00:00.000Z",
          dateTo: "2019-10-30T07:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T07:30:00.000Z",
          dateTo: "2019-10-30T08:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T08:00:00.000Z",
          dateTo: "2019-10-30T08:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T08:30:00.000Z",
          dateTo: "2019-10-30T09:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T09:00:00.000Z",
          dateTo: "2019-10-30T09:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T09:30:00.000Z",
          dateTo: "2019-10-30T10:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T10:00:00.000Z",
          dateTo: "2019-10-30T10:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T10:30:00.000Z",
          dateTo: "2019-10-30T11:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T11:00:00.000Z",
          dateTo: "2019-10-30T11:30:00.000Z"
        },
        {
          dateFrom: "2019-10-30T11:30:00.000Z",
          dateTo: "2019-10-30T12:00:00.000Z"
        },
        {
          dateFrom: "2019-10-30T12:00:00.000Z",
          dateTo: "2019-10-30T12:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T06:00:00.000Z",
          dateTo: "2019-10-31T06:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T06:30:00.000Z",
          dateTo: "2019-10-31T07:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T07:00:00.000Z",
          dateTo: "2019-10-31T07:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T07:30:00.000Z",
          dateTo: "2019-10-31T08:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T08:00:00.000Z",
          dateTo: "2019-10-31T08:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T08:30:00.000Z",
          dateTo: "2019-10-31T09:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T09:00:00.000Z",
          dateTo: "2019-10-31T09:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T09:30:00.000Z",
          dateTo: "2019-10-31T10:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T10:00:00.000Z",
          dateTo: "2019-10-31T10:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T10:30:00.000Z",
          dateTo: "2019-10-31T11:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T11:00:00.000Z",
          dateTo: "2019-10-31T11:30:00.000Z"
        },
        {
          dateFrom: "2019-10-31T11:30:00.000Z",
          dateTo: "2019-10-31T12:00:00.000Z"
        },
        {
          dateFrom: "2019-10-31T12:00:00.000Z",
          dateTo: "2019-10-31T12:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T06:00:00.000Z",
          dateTo: "2019-11-01T06:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T06:30:00.000Z",
          dateTo: "2019-11-01T07:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T07:00:00.000Z",
          dateTo: "2019-11-01T07:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T07:30:00.000Z",
          dateTo: "2019-11-01T08:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T08:00:00.000Z",
          dateTo: "2019-11-01T08:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T08:30:00.000Z",
          dateTo: "2019-11-01T09:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T09:00:00.000Z",
          dateTo: "2019-11-01T09:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T09:30:00.000Z",
          dateTo: "2019-11-01T10:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T10:00:00.000Z",
          dateTo: "2019-11-01T10:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T10:30:00.000Z",
          dateTo: "2019-11-01T11:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T11:00:00.000Z",
          dateTo: "2019-11-01T11:30:00.000Z"
        },
        {
          dateFrom: "2019-11-01T11:30:00.000Z",
          dateTo: "2019-11-01T12:00:00.000Z"
        },
        {
          dateFrom: "2019-11-01T12:00:00.000Z",
          dateTo: "2019-11-01T12:30:00.000Z"
        }
      ]
    };
  }
};
</script>