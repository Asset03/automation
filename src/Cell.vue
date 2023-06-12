<template>
  <div
    :title="cells[c][r]"
    :class="`cell ${headers[c]}`"
    @click="editing = true"
    :id="cells[c][r]"
    >
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vnode-mounted="({ el }) => el.focus()"
    />
    <span v-else>{{ cells[c][r] }}</span>
  </div>
</template>

<script>
export default {
  mounted() {
    this.setImage();
  },
  props: {
    c: Number,
    r: Number,
    cells: Array,
    headers: Array,
  },
  data() {
    return {
      editing: false,
      id: this.headers,
    };
  },
  methods: {
    update(e) {
      this.editing = false;
      this.cells[this.c][this.r] = e.target.value.trim();
      this.$emit("updateCell", this.cells);
    },
    setImage() {
      const elements = document.getElementsByClassName("cell Customer");
      for (let i = 0; i < elements.length; i++) {
        if (!elements.item(i).querySelector("img")) {
          const image = document.createElement("img");
          image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&usqp=CAU";
          elements.item(i).prepend(image);
        }
      }
    },
  },
};
</script>

<style>
.cell,
.cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
.Customer {
  display: flex;
}
img{
  width: 30px;
  height: 30px;
}

.Status {
  width: max-content;
  border-radius: 10px;
  color: #9b3115;
  background-color: #f8edea;
}
#Paid {
  color: #2a9267;
  background-color: #e7f6ef;
}
#Awaiting {
  color: #5c5e69;
  background-color: #f0eff2;
}
</style>
