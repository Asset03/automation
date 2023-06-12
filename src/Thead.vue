<template>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col" v-for="i in headers.length">
        {{ headers[i - 1] }}
        <v-icon
          v-show="sorting"
          @click="childSortList(headers[i - 1])"
          :name="status[0][headers[i - 1]]"
        />
      </th>
    </tr>
  </thead>
</template>
<script>
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiArrowDownUp, BiArrowDown, BiArrowUp } from "oh-vue-icons/icons";
addIcons(BiArrowDown, BiArrowDownUp, BiArrowUp);

export default {
  props: {
    status: Array,
    headers: Array,
    sorting: Boolean,
    sortList: { type: Function, required: true },
  },
  components: {
    "v-icon": OhVueIcon,
  },
  methods: {
    childSortList(param) {
      this.sortList(param);
    },
  },
};
</script>
<style lang=""></style>
