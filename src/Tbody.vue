<template>
  <tbody>
    <tr v-for="i in cells[0].length">
      <th>{{ i }}</th>
      <td v-for="j in cells.length">
        <Cell
          @updateCell="updateCell"
          :r="i - 1"
          :c="j - 1"
          :cells="cells"
          :headers="headers"
        ></Cell>
      </td>
    </tr>
  </tbody>
</template>
<script>
import Cell from "./Cell.vue";

export default {
  props: {
    cells: Array,
    headers:Array
  },
  components: {
    Cell,
  },
  methods: {
    updateCell(data) {
      this.$emit("updateCell",data)
    },
  },
};
</script>
<style >
</style>
