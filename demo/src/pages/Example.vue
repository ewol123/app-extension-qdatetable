<template>
  <q-page padding>
    <h6>Default mode</h6>
    <q-datetable
      @selection="selected = $event"
      :hours="hours"
      :active-dates="activeDates"
      lang="en"></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>

    <h6>Custom mode</h6>
    <span class="text-caption text-grey">Full list of properties can be found in the documentation</span>
    <q-datetable
      dense
      @selection="selected = $event"
      :hours="hours"
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
      :week-threshold="6"
      lang="hu"></q-datetable>

    <p class="text-weight-bold">{{ selected }}</p>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      hours:[
         {dateFrom:'2019-10-22T08:00:00.000Z', dateTo: '2019-10-22T08:30:00.000Z'}, 
         {dateFrom: '2019-10-22T08:30:00.000Z', dateTo: '2019-10-22T09:00:00.000Z'},
         {dateFrom:'2019-10-22T09:00:00.000Z', dateTo: '2019-10-22T09:30:00.000Z'}, 
         {dateFrom: '2019-10-22T09:30:00.000Z', dateTo: '2019-10-22T10:00:00.000Z'},
         {dateFrom:'2019-10-22T10:00:00.000Z', dateTo: '2019-10-22T10:30:00.000Z'}, 
         {dateFrom: '2019-10-22T10:30:00.000Z', dateTo: '2019-10-22T11:00:00.000Z'},
         {dateFrom:'2019-10-22T11:00:00.000Z', dateTo: '2019-10-22T11:30:00.000Z'}, 
         {dateFrom: '2019-10-22T11:30:00.000Z', dateTo: '2019-10-22T12:00:00.000Z'}],
      activeDates:[
         {dateFrom:'2019-10-22T08:00:00.000Z', dateTo: '2019-10-22T08:30:00.000Z'}, 
         {dateFrom:'2019-10-22T08:30:00.000Z', dateTo: '2019-10-22T09:00:00.000Z'}, 
         {dateFrom:'2019-10-22T09:00:00.000Z', dateTo: '2019-10-22T09:30:00.000Z'}, 
         {dateFrom: '2019-10-22T09:30:00.000Z', dateTo: '2019-10-22T10:00:00.000Z'},
         {dateFrom:'2019-10-22T10:00:00.000Z', dateTo: '2019-10-22T10:30:00.000Z'}, 
         {dateFrom: '2019-10-22T10:30:00.000Z', dateTo: '2019-10-22T11:00:00.000Z'},
         {dateFrom: '2019-10-22T11:00:00.000Z', dateTo: '2019-10-22T11:30:00.000Z'},
         {dateFrom: '2019-10-22T11:30:00.000Z', dateTo: '2019-10-22T12:00:00.000Z'},
         {dateFrom:'2019-10-23T08:00:00.000Z', dateTo: '2019-10-23T08:30:00.000Z'}, 
         {dateFrom:'2019-10-23T08:30:00.000Z', dateTo: '2019-10-23T09:00:00.000Z'}, 
         {dateFrom: '2019-10-23T09:30:00.000Z', dateTo: '2019-10-23T10:00:00.000Z'},
         {dateFrom:'2019-10-23T10:00:00.000Z', dateTo: '2019-10-23T10:30:00.000Z'}, 
         {dateFrom: '2019-10-23T10:30:00.000Z', dateTo: '2019-10-23T11:00:00.000Z'},
         {dateFrom: '2019-10-23T11:00:00.000Z', dateTo: '2019-10-23T11:30:00.000Z'},
         {dateFrom: '2019-10-23T11:30:00.000Z', dateTo: '2019-10-23T12:00:00.000Z'},
         {dateFrom: '2019-10-28T10:30:00.000Z', dateTo: '2019-10-28T11:00:00.000Z'},
         {dateFrom: '2019-10-29T10:30:00.000Z', dateTo: '2019-10-29T11:00:00.000Z'},
         {dateFrom: '2019-11-04T10:30:00.000Z', dateTo: '2019-11-04T11:00:00.000Z'},
         {dateFrom: '2019-12-02T10:30:00.000Z', dateTo: '2019-12-02T11:00:00.000Z'}]
    };
  }
};
</script>