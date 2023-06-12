<template>
  <table class="table table-hover" @updateData="updateData">
    <v-head
      :status="status"
      :headers="headers"
      :sorting="sorting"
      :sortList="sortList"
    />
    <v-body :cells="cells" :headers="headers" @updateCell="updateCell" />
  </table>
</template>

<script>
import Thead from "./Thead.vue";
import Tbody from "./Tbody.vue";
import { cells, createCell, getRows } from "./store.js";
export default {
  beforeCreate() {
    this.cells = createCell(this.headers.length, this.rows.length, this.rows);
  },
  components: {
    "v-head": Thead,
    "v-body": Tbody,
  },
  props: {
    headers: Array,
    rows: Array,
    sorting: Boolean,
  },
  data() {
    return {
      cells,
      status: [
        this.headers.reduce(
          (acc, header) => ({ ...acc, [header]: "bi-arrow-down-up" }),
          {}
        ),
      ],
      sortingBy: 0,
    };
  },
  methods: {
    sortList(sortBy) {
      console.log("SortBy: ",sortBy);
      Object.keys(this.status[0]).forEach((key) => {
        this.status[0][key] = "bi-arrow-down-up";
      });
      this.sortingBy++;
      if (this.sortingBy == 1) {
        this.rows.sort((x, y) =>
          (x[sortBy] ?? Number.NEGATIVE_INFINITY) >
          (y[sortBy] ?? Number.NEGATIVE_INFINITY)
            ? -1
            : 1
        );
        this.status[0][sortBy] = "bi-arrow-up";
      } else if (this.sortingBy == 2) {
        this.rows.sort((x, y) =>
          (x[sortBy] ?? Number.POSITIVE_INFINITY) <
          (y[sortBy] ?? Number.POSITIVE_INFINITY)
            ? -1
            : 1
        );
        this.status[0][sortBy] = "bi-arrow-down";
      } else {
        this.rows.sort((x, y) => (x["id"] < y["id"] ? -1 : 1));
        this.status[0][sortBy] = "bi-arrow-down-up";
        this.sortingBy = 0;
      }

      this.cells = createCell(this.headers.length, this.rows.length, this.rows);
    },
    updateCell(data) {
      this.updateData(getRows(data, this.headers));
    },
    updateData(data) {
      this.$emit("updateData", data);
    },
  },
};
</script>

<style>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #eee;
}

tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}
</style>
