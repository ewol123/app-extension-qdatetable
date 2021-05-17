<template>
  <q-page padding>
    <h6>Default mode</h6>
    <DateIntervalTable
      strategy="NORMAL"
      :interval="interval"
      :hours="[8, 16]"
      :active-dates="activeDates"
      @selection="selected = $event"
    ></DateIntervalTable>

    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Custom mode</h6>
    <span class="text-caption text-grey"
      >Full list of properties can be found in the documentation</span
    >

    <DateIntervalTable
      strategy="NORMAL"
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
    ></DateIntervalTable>

    <h6>Edit mode</h6>

    <DateIntervalTable
      strategy="EDIT"
      lang="hu"
      :hours="hours"
      :possibleHours="possibleHours"
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
      @setPossHours="setPossHours($event)"
    />

    <p class="text-weight-bold">{{ selected }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      possibleHours: [8,9,10,11,12],
      interval: 30,
      selected: null,
      defQuantity: 1000,
      hours: [8, 16],
      days: [1, 2, 3, 4, 5, 6],
      minTime: {
        days: 0,
        hours: 3,
        minutes: null,
      },
      maxTime: {
        days: 10,
        hours: null,
        minutes: null,
      },
      exceptions: ["2021-05-22T07:00:00.000Z", "2021-05-25T07:00:00.000Z"],
      activeDatesEdit: [
        {
          dateFrom: "2021-05-25T07:00:00.000Z",
          dateTo: "2021-05-25T07:30:00.000Z",
          maxItems: 0,
          currentItems: 0,
        },
        {
          dateFrom: "2021-05-25T07:30:00.000Z",
          dateTo: "2021-05-25T08:00:00.000Z",
          maxItems: 0,
          currentItems: 0,
        },
        {
          dateFrom: "2021-05-25T08:00:00.000Z",
          dateTo: "2021-05-25T08:30:00.000Z",
          maxItems: 0,
          currentItems: 0,
        },
        {
          dateFrom: "2021-05-25T08:30:00.000Z",
          dateTo: "2021-05-25T09:00:00.000Z",
          maxItems: 0,
          currentItems: 0,
        },
        {
          dateFrom: "2021-05-25T09:00:00.000Z",
          dateTo: "2021-05-25T09:30:00.000Z",
          maxItems: 4500,
          currentItems: 1200,
        },
        {
          dateFrom: "2021-05-25T09:30:00.000Z",
          dateTo: "2021-05-25T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-25T10:00:00.000Z",
          dateTo: "2021-05-25T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-25T10:30:00.000Z",
          dateTo: "2021-05-25T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-25T11:00:00.000Z",
          dateTo: "2021-05-25T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T06:00:00.000Z",
          dateTo: "2021-05-28T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T06:30:00.000Z",
          dateTo: "2021-05-28T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T07:00:00.000Z",
          dateTo: "2021-05-28T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T07:30:00.000Z",
          dateTo: "2021-05-28T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T08:00:00.000Z",
          dateTo: "2021-05-28T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T08:30:00.000Z",
          dateTo: "2021-05-28T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T09:00:00.000Z",
          dateTo: "2021-05-28T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T09:30:00.000Z",
          dateTo: "2021-05-28T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T10:00:00.000Z",
          dateTo: "2021-05-28T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T10:30:00.000Z",
          dateTo: "2021-05-28T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T11:00:00.000Z",
          dateTo: "2021-05-28T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T11:30:00.000Z",
          dateTo: "2021-05-28T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-28T12:00:00.000Z",
          dateTo: "2021-05-28T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T06:00:00.000Z",
          dateTo: "2021-05-29T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T06:30:00.000Z",
          dateTo: "2021-05-29T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T07:00:00.000Z",
          dateTo: "2021-05-29T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T07:30:00.000Z",
          dateTo: "2021-05-29T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T08:00:00.000Z",
          dateTo: "2021-05-29T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T08:30:00.000Z",
          dateTo: "2021-05-29T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T09:00:00.000Z",
          dateTo: "2021-05-29T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T09:30:00.000Z",
          dateTo: "2021-05-29T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T10:00:00.000Z",
          dateTo: "2021-05-29T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T10:30:00.000Z",
          dateTo: "2021-05-29T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T11:00:00.000Z",
          dateTo: "2021-05-29T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T11:30:00.000Z",
          dateTo: "2021-05-29T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-29T12:00:00.000Z",
          dateTo: "2021-05-29T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T06:00:00.000Z",
          dateTo: "2021-05-30T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T06:30:00.000Z",
          dateTo: "2021-05-30T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T07:00:00.000Z",
          dateTo: "2021-05-30T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T07:30:00.000Z",
          dateTo: "2021-05-30T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T08:00:00.000Z",
          dateTo: "2021-05-30T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T08:30:00.000Z",
          dateTo: "2021-05-30T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T09:00:00.000Z",
          dateTo: "2021-05-30T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T09:30:00.000Z",
          dateTo: "2021-05-30T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T10:00:00.000Z",
          dateTo: "2021-05-30T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T10:30:00.000Z",
          dateTo: "2021-05-30T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T11:00:00.000Z",
          dateTo: "2021-05-30T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T11:30:00.000Z",
          dateTo: "2021-05-30T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-30T12:00:00.000Z",
          dateTo: "2021-05-30T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T06:00:00.000Z",
          dateTo: "2021-05-31T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T06:30:00.000Z",
          dateTo: "2021-05-31T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T07:00:00.000Z",
          dateTo: "2021-05-31T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T07:30:00.000Z",
          dateTo: "2021-05-31T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T08:00:00.000Z",
          dateTo: "2021-05-31T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T08:30:00.000Z",
          dateTo: "2021-05-31T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T09:00:00.000Z",
          dateTo: "2021-05-31T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T09:30:00.000Z",
          dateTo: "2021-05-31T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T10:00:00.000Z",
          dateTo: "2021-05-31T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T10:30:00.000Z",
          dateTo: "2021-05-31T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T11:00:00.000Z",
          dateTo: "2021-05-31T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T11:30:00.000Z",
          dateTo: "2021-05-31T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-05-31T12:00:00.000Z",
          dateTo: "2021-05-31T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T06:00:00.000Z",
          dateTo: "2021-06-01T06:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T06:30:00.000Z",
          dateTo: "2021-06-01T07:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T07:00:00.000Z",
          dateTo: "2021-06-01T07:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T07:30:00.000Z",
          dateTo: "2021-06-01T08:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T08:00:00.000Z",
          dateTo: "2021-06-01T08:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T08:30:00.000Z",
          dateTo: "2021-06-01T09:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T09:00:00.000Z",
          dateTo: "2021-06-01T09:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T09:30:00.000Z",
          dateTo: "2021-06-01T10:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T10:00:00.000Z",
          dateTo: "2021-06-01T10:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T10:30:00.000Z",
          dateTo: "2021-06-01T11:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T11:00:00.000Z",
          dateTo: "2021-06-01T11:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T11:30:00.000Z",
          dateTo: "2021-06-01T12:00:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
        {
          dateFrom: "2021-06-01T12:00:00.000Z",
          dateTo: "2021-06-01T12:30:00.000Z",
          maxItems: 450,
          currentItems: 120,
        },
      ],
      activeDates: [
        {
          dateFrom: "2021-05-25T07:00:00.000Z",
          dateTo: "2021-05-25T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T07:30:00.000Z",
          dateTo: "2021-05-25T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T08:00:00.000Z",
          dateTo: "2021-05-25T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T08:30:00.000Z",
          dateTo: "2021-05-25T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T09:00:00.000Z",
          dateTo: "2021-05-25T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T09:30:00.000Z",
          dateTo: "2021-05-25T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T10:00:00.000Z",
          dateTo: "2021-05-25T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T10:30:00.000Z",
          dateTo: "2021-05-25T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-25T11:00:00.000Z",
          dateTo: "2021-05-25T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T06:00:00.000Z",
          dateTo: "2021-05-28T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T06:30:00.000Z",
          dateTo: "2021-05-28T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T07:00:00.000Z",
          dateTo: "2021-05-28T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T07:30:00.000Z",
          dateTo: "2021-05-28T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T08:00:00.000Z",
          dateTo: "2021-05-28T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T08:30:00.000Z",
          dateTo: "2021-05-28T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T09:00:00.000Z",
          dateTo: "2021-05-28T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T09:30:00.000Z",
          dateTo: "2021-05-28T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T10:00:00.000Z",
          dateTo: "2021-05-28T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T10:30:00.000Z",
          dateTo: "2021-05-28T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T11:00:00.000Z",
          dateTo: "2021-05-28T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T11:30:00.000Z",
          dateTo: "2021-05-28T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-28T12:00:00.000Z",
          dateTo: "2021-05-28T12:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T06:00:00.000Z",
          dateTo: "2021-05-29T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T06:30:00.000Z",
          dateTo: "2021-05-29T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T07:00:00.000Z",
          dateTo: "2021-05-29T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T07:30:00.000Z",
          dateTo: "2021-05-29T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T08:00:00.000Z",
          dateTo: "2021-05-29T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T08:30:00.000Z",
          dateTo: "2021-05-29T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T09:00:00.000Z",
          dateTo: "2021-05-29T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T09:30:00.000Z",
          dateTo: "2021-05-29T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T10:00:00.000Z",
          dateTo: "2021-05-29T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T10:30:00.000Z",
          dateTo: "2021-05-29T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T11:00:00.000Z",
          dateTo: "2021-05-29T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T11:30:00.000Z",
          dateTo: "2021-05-29T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-29T12:00:00.000Z",
          dateTo: "2021-05-29T12:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T06:00:00.000Z",
          dateTo: "2021-05-30T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T06:30:00.000Z",
          dateTo: "2021-05-30T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T07:00:00.000Z",
          dateTo: "2021-05-30T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T07:30:00.000Z",
          dateTo: "2021-05-30T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T08:00:00.000Z",
          dateTo: "2021-05-30T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T08:30:00.000Z",
          dateTo: "2021-05-30T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T09:00:00.000Z",
          dateTo: "2021-05-30T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T09:30:00.000Z",
          dateTo: "2021-05-30T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T10:00:00.000Z",
          dateTo: "2021-05-30T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T10:30:00.000Z",
          dateTo: "2021-05-30T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T11:00:00.000Z",
          dateTo: "2021-05-30T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T11:30:00.000Z",
          dateTo: "2021-05-30T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-30T12:00:00.000Z",
          dateTo: "2021-05-30T12:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T06:00:00.000Z",
          dateTo: "2021-05-31T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T06:30:00.000Z",
          dateTo: "2021-05-31T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T07:00:00.000Z",
          dateTo: "2021-05-31T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T07:30:00.000Z",
          dateTo: "2021-05-31T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T08:00:00.000Z",
          dateTo: "2021-05-31T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T08:30:00.000Z",
          dateTo: "2021-05-31T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T09:00:00.000Z",
          dateTo: "2021-05-31T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T09:30:00.000Z",
          dateTo: "2021-05-31T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T10:00:00.000Z",
          dateTo: "2021-05-31T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T10:30:00.000Z",
          dateTo: "2021-05-31T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T11:00:00.000Z",
          dateTo: "2021-05-31T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T11:30:00.000Z",
          dateTo: "2021-05-31T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-05-31T12:00:00.000Z",
          dateTo: "2021-05-31T12:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T06:00:00.000Z",
          dateTo: "2021-06-01T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T06:30:00.000Z",
          dateTo: "2021-06-01T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T07:00:00.000Z",
          dateTo: "2021-06-01T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T07:30:00.000Z",
          dateTo: "2021-06-01T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T08:00:00.000Z",
          dateTo: "2021-06-01T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T08:30:00.000Z",
          dateTo: "2021-06-01T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T09:00:00.000Z",
          dateTo: "2021-06-01T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T09:30:00.000Z",
          dateTo: "2021-06-01T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T10:00:00.000Z",
          dateTo: "2021-06-01T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T10:30:00.000Z",
          dateTo: "2021-06-01T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T11:00:00.000Z",
          dateTo: "2021-06-01T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T11:30:00.000Z",
          dateTo: "2021-06-01T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-01T12:00:00.000Z",
          dateTo: "2021-06-01T12:30:00.000Z",
          isAllowed: true,
        },

        {
          dateFrom: "2021-06-02T06:00:00.000Z",
          dateTo: "2021-06-02T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T06:30:00.000Z",
          dateTo: "2021-06-02T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T07:00:00.000Z",
          dateTo: "2021-06-02T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T07:30:00.000Z",
          dateTo: "2021-06-02T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T08:00:00.000Z",
          dateTo: "2021-06-02T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T08:30:00.000Z",
          dateTo: "2021-06-02T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T09:00:00.000Z",
          dateTo: "2021-06-02T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T09:30:00.000Z",
          dateTo: "2021-06-02T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T10:00:00.000Z",
          dateTo: "2021-06-02T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T10:30:00.000Z",
          dateTo: "2021-06-02T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T11:00:00.000Z",
          dateTo: "2021-06-02T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T11:30:00.000Z",
          dateTo: "2021-06-02T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-02T12:00:00.000Z",
          dateTo: "2021-06-02T12:30:00.000Z",
          isAllowed: true,
        },

        {
          dateFrom: "2021-06-03T06:00:00.000Z",
          dateTo: "2021-06-03T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T06:30:00.000Z",
          dateTo: "2021-06-03T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T07:00:00.000Z",
          dateTo: "2021-06-03T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T07:30:00.000Z",
          dateTo: "2021-06-03T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T08:00:00.000Z",
          dateTo: "2021-06-03T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T08:30:00.000Z",
          dateTo: "2021-06-03T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T09:00:00.000Z",
          dateTo: "2021-06-03T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T09:30:00.000Z",
          dateTo: "2021-06-03T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T10:00:00.000Z",
          dateTo: "2021-06-03T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T10:30:00.000Z",
          dateTo: "2021-06-03T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T11:00:00.000Z",
          dateTo: "2021-06-03T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T11:30:00.000Z",
          dateTo: "2021-06-03T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-03T12:00:00.000Z",
          dateTo: "2021-06-03T12:30:00.000Z",
          isAllowed: true,
        },

        {
          dateFrom: "2021-06-04T06:00:00.000Z",
          dateTo: "2021-06-04T06:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T06:30:00.000Z",
          dateTo: "2021-06-04T07:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T07:00:00.000Z",
          dateTo: "2021-06-04T07:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T07:30:00.000Z",
          dateTo: "2021-06-04T08:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T08:00:00.000Z",
          dateTo: "2021-06-04T08:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T08:30:00.000Z",
          dateTo: "2021-06-04T09:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T09:00:00.000Z",
          dateTo: "2021-06-04T09:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T09:30:00.000Z",
          dateTo: "2021-06-04T10:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T10:00:00.000Z",
          dateTo: "2021-06-04T10:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T10:30:00.000Z",
          dateTo: "2021-06-04T11:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T11:00:00.000Z",
          dateTo: "2021-06-04T11:30:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T11:30:00.000Z",
          dateTo: "2021-06-04T12:00:00.000Z",
          isAllowed: true,
        },
        {
          dateFrom: "2021-06-04T12:00:00.000Z",
          dateTo: "2021-06-04T12:30:00.000Z",
          isAllowed: true,
        },
      ],
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
      this.exceptions = val;
    },
    setHours(val) {
      this.hours = val;
    },
    setDays(val) {
      this.days = val;
    },
    setMinTime(val) {
      this.minTime = val;
    },
    setMaxTime(val) {
      this.maxTime = val;
    },
    setPossHours(val) {
      this.possibleHours = val;
    },
  },
};
</script>
