<template>
  <q-page padding>
    <h6>Default mode</h6>
    <q-datetable
      :interval="interval"
      :hours="[8, 16]"
      :active-dates="activeDates"
      @selection="selected = $event"
    ></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Custom mode</h6>
    <span class="text-caption text-grey"
      >Full list of properties can be found in the documentation</span
    >

    <q-datetable
      :interval="interval"
      :hours="[8, 16]"
      :active-dates="activeDates"
      :items-in-order="100"
      dense
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
      @selection="selected = $event"
    ></q-datetable>

    <h6>Edit mode</h6>

    <q-datetable-edit
      lang="hu"
      :hours="hours"
      :interval="interval"
      :active-dates="activeDatesEdit"
      :def-quantity="defQuantity"
      class="q-mt-md"
      :minTime="minTime"
      :maxTime="maxTime"
      :days="days"
      @selection="selected = $event"
      @setQuantity="setQuantity($event)"
      @setDefQuantity="setDefQuantity($event)"
      @setInterval="setInterval($event)"
      @setDayException="setDayException($event)"
      @setHours="setHours($event)"
      @setDays="setDays($event)"
      @setMinTime="setMinTime($event)"
      @setMaxTime="setMaxTime($event)"
    />

    <p class="text-weight-bold">{{ selected }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      interval: 30,
      selected: null,
      defQuantity: 1000,
      hours: [8, 16],
      days: [1, 2, 3, 4, 5],
      minTime: {
        d: 1,
        h: null,
        m: null
      },
      maxTime: {
        d: 10,
        h: null,
        m: null
      },
      exceptions: ["2019-10-22T07:00:00.000Z"],
      activeDatesEdit: [
        {
          dateFrom: "2019-10-25T07:00:00.000Z",
          dateTo: "2019-10-25T07:30:00.000Z",
          maxItems: 0,
          currentItems: 0
        },
        {
          dateFrom: "2019-10-25T07:30:00.000Z",
          dateTo: "2019-10-25T08:00:00.000Z",
          maxItems: 0,
          currentItems: 0
        },
        {
          dateFrom: "2019-10-25T08:00:00.000Z",
          dateTo: "2019-10-25T08:30:00.000Z",
          maxItems: 0,
          currentItems: 0
        },
        {
          dateFrom: "2019-10-25T08:30:00.000Z",
          dateTo: "2019-10-25T09:00:00.000Z",
          maxItems: 0,
          currentItems: 0
        },
        {
          dateFrom: "2019-10-25T09:00:00.000Z",
          dateTo: "2019-10-25T09:30:00.000Z",
          maxItems: 4500,
          currentItems: 1200
        },
        {
          dateFrom: "2019-10-25T09:30:00.000Z",
          dateTo: "2019-10-25T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-25T10:00:00.000Z",
          dateTo: "2019-10-25T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-25T10:30:00.000Z",
          dateTo: "2019-10-25T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-25T11:00:00.000Z",
          dateTo: "2019-10-25T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T06:00:00.000Z",
          dateTo: "2019-10-28T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T06:30:00.000Z",
          dateTo: "2019-10-28T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T07:00:00.000Z",
          dateTo: "2019-10-28T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T07:30:00.000Z",
          dateTo: "2019-10-28T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T08:00:00.000Z",
          dateTo: "2019-10-28T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T08:30:00.000Z",
          dateTo: "2019-10-28T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T09:00:00.000Z",
          dateTo: "2019-10-28T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T09:30:00.000Z",
          dateTo: "2019-10-28T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T10:00:00.000Z",
          dateTo: "2019-10-28T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T10:30:00.000Z",
          dateTo: "2019-10-28T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T11:00:00.000Z",
          dateTo: "2019-10-28T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T11:30:00.000Z",
          dateTo: "2019-10-28T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-28T12:00:00.000Z",
          dateTo: "2019-10-28T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T06:00:00.000Z",
          dateTo: "2019-10-29T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T06:30:00.000Z",
          dateTo: "2019-10-29T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T07:00:00.000Z",
          dateTo: "2019-10-29T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T07:30:00.000Z",
          dateTo: "2019-10-29T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T08:00:00.000Z",
          dateTo: "2019-10-29T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T08:30:00.000Z",
          dateTo: "2019-10-29T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T09:00:00.000Z",
          dateTo: "2019-10-29T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T09:30:00.000Z",
          dateTo: "2019-10-29T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T10:00:00.000Z",
          dateTo: "2019-10-29T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T10:30:00.000Z",
          dateTo: "2019-10-29T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T11:00:00.000Z",
          dateTo: "2019-10-29T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T11:30:00.000Z",
          dateTo: "2019-10-29T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-29T12:00:00.000Z",
          dateTo: "2019-10-29T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T06:00:00.000Z",
          dateTo: "2019-10-30T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T06:30:00.000Z",
          dateTo: "2019-10-30T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T07:00:00.000Z",
          dateTo: "2019-10-30T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T07:30:00.000Z",
          dateTo: "2019-10-30T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T08:00:00.000Z",
          dateTo: "2019-10-30T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T08:30:00.000Z",
          dateTo: "2019-10-30T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T09:00:00.000Z",
          dateTo: "2019-10-30T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T09:30:00.000Z",
          dateTo: "2019-10-30T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T10:00:00.000Z",
          dateTo: "2019-10-30T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T10:30:00.000Z",
          dateTo: "2019-10-30T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T11:00:00.000Z",
          dateTo: "2019-10-30T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T11:30:00.000Z",
          dateTo: "2019-10-30T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-30T12:00:00.000Z",
          dateTo: "2019-10-30T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T06:00:00.000Z",
          dateTo: "2019-10-31T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T06:30:00.000Z",
          dateTo: "2019-10-31T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T07:00:00.000Z",
          dateTo: "2019-10-31T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T07:30:00.000Z",
          dateTo: "2019-10-31T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T08:00:00.000Z",
          dateTo: "2019-10-31T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T08:30:00.000Z",
          dateTo: "2019-10-31T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T09:00:00.000Z",
          dateTo: "2019-10-31T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T09:30:00.000Z",
          dateTo: "2019-10-31T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T10:00:00.000Z",
          dateTo: "2019-10-31T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T10:30:00.000Z",
          dateTo: "2019-10-31T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T11:00:00.000Z",
          dateTo: "2019-10-31T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T11:30:00.000Z",
          dateTo: "2019-10-31T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-10-31T12:00:00.000Z",
          dateTo: "2019-10-31T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T06:00:00.000Z",
          dateTo: "2019-11-01T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T06:30:00.000Z",
          dateTo: "2019-11-01T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T07:00:00.000Z",
          dateTo: "2019-11-01T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T07:30:00.000Z",
          dateTo: "2019-11-01T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T08:00:00.000Z",
          dateTo: "2019-11-01T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T08:30:00.000Z",
          dateTo: "2019-11-01T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T09:00:00.000Z",
          dateTo: "2019-11-01T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T09:30:00.000Z",
          dateTo: "2019-11-01T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T10:00:00.000Z",
          dateTo: "2019-11-01T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T10:30:00.000Z",
          dateTo: "2019-11-01T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T11:00:00.000Z",
          dateTo: "2019-11-01T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T11:30:00.000Z",
          dateTo: "2019-11-01T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120
        },
        {
          dateFrom: "2019-11-01T12:00:00.000Z",
          dateTo: "2019-11-01T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120
        }
      ],
      activeDates: [
        {
          dateFrom: "2019-10-25T07:00:00.000Z",
          dateTo: "2019-10-25T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T07:30:00.000Z",
          dateTo: "2019-10-25T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T08:00:00.000Z",
          dateTo: "2019-10-25T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T08:30:00.000Z",
          dateTo: "2019-10-25T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T09:00:00.000Z",
          dateTo: "2019-10-25T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T09:30:00.000Z",
          dateTo: "2019-10-25T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T10:00:00.000Z",
          dateTo: "2019-10-25T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T10:30:00.000Z",
          dateTo: "2019-10-25T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-25T11:00:00.000Z",
          dateTo: "2019-10-25T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T06:00:00.000Z",
          dateTo: "2019-10-28T06:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T06:30:00.000Z",
          dateTo: "2019-10-28T07:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T07:00:00.000Z",
          dateTo: "2019-10-28T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T07:30:00.000Z",
          dateTo: "2019-10-28T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T08:00:00.000Z",
          dateTo: "2019-10-28T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T08:30:00.000Z",
          dateTo: "2019-10-28T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T09:00:00.000Z",
          dateTo: "2019-10-28T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T09:30:00.000Z",
          dateTo: "2019-10-28T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T10:00:00.000Z",
          dateTo: "2019-10-28T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T10:30:00.000Z",
          dateTo: "2019-10-28T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T11:00:00.000Z",
          dateTo: "2019-10-28T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T11:30:00.000Z",
          dateTo: "2019-10-28T12:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-28T12:00:00.000Z",
          dateTo: "2019-10-28T12:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T06:00:00.000Z",
          dateTo: "2019-10-29T06:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T06:30:00.000Z",
          dateTo: "2019-10-29T07:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T07:00:00.000Z",
          dateTo: "2019-10-29T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T07:30:00.000Z",
          dateTo: "2019-10-29T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T08:00:00.000Z",
          dateTo: "2019-10-29T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T08:30:00.000Z",
          dateTo: "2019-10-29T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T09:00:00.000Z",
          dateTo: "2019-10-29T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T09:30:00.000Z",
          dateTo: "2019-10-29T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T10:00:00.000Z",
          dateTo: "2019-10-29T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T10:30:00.000Z",
          dateTo: "2019-10-29T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T11:00:00.000Z",
          dateTo: "2019-10-29T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T11:30:00.000Z",
          dateTo: "2019-10-29T12:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-29T12:00:00.000Z",
          dateTo: "2019-10-29T12:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T06:00:00.000Z",
          dateTo: "2019-10-30T06:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T06:30:00.000Z",
          dateTo: "2019-10-30T07:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T07:00:00.000Z",
          dateTo: "2019-10-30T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T07:30:00.000Z",
          dateTo: "2019-10-30T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T08:00:00.000Z",
          dateTo: "2019-10-30T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T08:30:00.000Z",
          dateTo: "2019-10-30T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T09:00:00.000Z",
          dateTo: "2019-10-30T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T09:30:00.000Z",
          dateTo: "2019-10-30T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T10:00:00.000Z",
          dateTo: "2019-10-30T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T10:30:00.000Z",
          dateTo: "2019-10-30T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T11:00:00.000Z",
          dateTo: "2019-10-30T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T11:30:00.000Z",
          dateTo: "2019-10-30T12:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-30T12:00:00.000Z",
          dateTo: "2019-10-30T12:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T06:00:00.000Z",
          dateTo: "2019-10-31T06:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T06:30:00.000Z",
          dateTo: "2019-10-31T07:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T07:00:00.000Z",
          dateTo: "2019-10-31T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T07:30:00.000Z",
          dateTo: "2019-10-31T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T08:00:00.000Z",
          dateTo: "2019-10-31T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T08:30:00.000Z",
          dateTo: "2019-10-31T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T09:00:00.000Z",
          dateTo: "2019-10-31T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T09:30:00.000Z",
          dateTo: "2019-10-31T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T10:00:00.000Z",
          dateTo: "2019-10-31T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T10:30:00.000Z",
          dateTo: "2019-10-31T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T11:00:00.000Z",
          dateTo: "2019-10-31T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T11:30:00.000Z",
          dateTo: "2019-10-31T12:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-10-31T12:00:00.000Z",
          dateTo: "2019-10-31T12:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T06:00:00.000Z",
          dateTo: "2019-11-01T06:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T06:30:00.000Z",
          dateTo: "2019-11-01T07:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T07:00:00.000Z",
          dateTo: "2019-11-01T07:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T07:30:00.000Z",
          dateTo: "2019-11-01T08:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T08:00:00.000Z",
          dateTo: "2019-11-01T08:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T08:30:00.000Z",
          dateTo: "2019-11-01T09:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T09:00:00.000Z",
          dateTo: "2019-11-01T09:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T09:30:00.000Z",
          dateTo: "2019-11-01T10:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T10:00:00.000Z",
          dateTo: "2019-11-01T10:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T10:30:00.000Z",
          dateTo: "2019-11-01T11:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T11:00:00.000Z",
          dateTo: "2019-11-01T11:30:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T11:30:00.000Z",
          dateTo: "2019-11-01T12:00:00.000Z",
          isAllowed: true
        },
        {
          dateFrom: "2019-11-01T12:00:00.000Z",
          dateTo: "2019-11-01T12:30:00.000Z",
          isAllowed: true
        }
      ]
    };
  },
  methods: {
    setQuantity(val) {
      console.log(val);
    },
    setDefQuantity(val) {
      this.defQuantity = val;
    },
    setInterval(val) {
      this.interval = val;
    },
    setDayException(val) {
      console.log(val);
    },
    setHours(val) {
      console.log(val);
      this.hours = val;
    },
    setDays(val) {
      this.days = val;
    },
    setMinTime(val) {
      console.log(val);
    },
    setMaxTime(val) {
      console.log(val);
    }
  }
};
</script>
