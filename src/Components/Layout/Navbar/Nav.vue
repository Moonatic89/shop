<template>
  <div class="absolute top-0 right-0 z-50">
    <!-- <div>Username: {{ username }}</div> -->

    <div class="flex gap-x-2">
      <div v-for="(link, i) in links" :key="i">
        <router-link :to="`/${link.name}`">
          <i :class="icons(link.label)"></i>
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../../../stores/User/User";
const { user, username } = useUserStore();

const links = ref([
  { name: "", label: "Home" },
  { name: "blog", label: "Blog" },
  { name: "about", label: "About" },
  { name: "contact", label: "Contact" },
]);

const icons = (label) => {
  switch (label) {
    case "Home":
      return "fa-solid fa-house";
    case "Blog":
      return "fa-solid fa-blog";
    case "About":
      return "fa-solid fa-user";
    case "Contact":
      return "fa-solid fa-envelope";
    default:
      return "fa-solid fa-circle";
  }
};
</script>

<style scoped>
/* esempio base, aggiusta come vuoi */
.router-link-active {
  font-weight: bold;
}
</style>
