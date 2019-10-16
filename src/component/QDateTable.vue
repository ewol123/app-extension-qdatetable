<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :data="dateOptions"
      :columns="columns"
      :table-style="tableStyle"
      row-key="label"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      selection="single"
      :selected.sync="selected"
    >
    
      <q-td
        :disabled="!props.row.isEnabled"
        @click.native="pushSelected(props.row)"
        slot="body-cell-label"
        slot-scope="props"
        :props="props"
        style="position:relative;"
        :class="tdClass(props.row)"
      >
        <q-badge v-if="!props.row.isEnabled " floating class="q-mr-sm">{{notAvailableText}}</q-badge>
        <q-badge
          color="orange"
          class="text-weight-bold text-black"
        >{{props.row.label.split(' ')[0]}}</q-badge>
        <q-chip
          :color="props.row.isEnabled ? 'teal' : 'red'"
          class="text-weight-bold text-white"
        >{{props.row.label.split(' ')[1]}}</q-chip>
      </q-td>


    </q-table>
  </div>
</template>
<script>
export default {
  props: {
    dateOptions: {
      type: Array,
      default: () => [],
      validator: values => {
        values.forEach(val => {
          if ("label" in val === false || "isActive" in val === false)
            return false;
        });
        return true;
      }
    },
    title: {
      type: String,
      default: "Lehetséges időpontok kiválasztása"
    },
    tableStyle: {
      type: String,
      default: "max-height: 400px"
    },
    notAvailableText: {
      type: String,
      default: "Nem elérhető"
    },
    columnLabel: {
      type: String,
      default: "Időpont"
    }
  },
  watch: {
    selected: function(val) {
      if (val.length && !val[0].isEnabled) {
        this.selected = [];
      }
      this.$emit("selection", this.selected);
    }
  },
  methods: {
    pushSelected(row) {
      this.selected = [];
      this.selected.push(row);
    },
    tdClass(row) {
      const selectedClass = "bg-green-6 ";
      const disabledClass = "bg-grey-5 ";
      let classStr = "";
      if (row === this.selected[0]) classStr = classStr.concat(selectedClass);
      if(row.isEnabled) classStr = classStr.concat(" cursor-pointer");
      if (!row.isEnabled) classStr = classStr.concat(disabledClass);
      return classStr;
    }
  },
  data() {
    return {
      selected: [],
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: "label",
          label: this.columnLabel,
          field: "label",
          sortable: true,
          align: "center"
        }
      ]
    };
  }
};
</script>
