import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const list = ref([]);

  return { list };
});
