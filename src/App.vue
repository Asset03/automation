<template lang="">
  <div class="container">
    <v-table
      :headers="headers"
      :rows="rows"
      :sorting="sorting"
      @updateData="updateData"
    />
    <button type="button" @click="downloadFile" class="btn btn-outline-primary">
      Download
    </button>
  </div>
</template>

<script>
import Table from "@/Table.vue";
import jsonData from "./text.json";
import axios from "axios";

export default {
  components: {
    "v-table": Table,
  },
  data() {
    return {
      sorting: true,
      headers: ["Customer", "Name", "Surname", "Status", "Amount", "Jai"],
      rows: jsonData,
    };
  },
  methods: {
    updateData(data) {
      axios
        .post("http://localhost:3000/api/write-file", { data })
        .then(() => {
          console.log("File written successfully.");
        })
        .catch((error) => {
          console.error("Error writing file:", error);
        });
      this.rows = data;
    },
    downloadFile() {
      axios
        .get("http://localhost:3000/api/download", {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "text.json");
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log("Error downloading file: ", err);
        });
    },
  },
};
</script>
<style></style>
