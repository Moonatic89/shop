<template>
  <div class="flex w-full h-full justify-between relative overflow-hidden">
    <!-- Left Section -->
    <div class="h-full w-2/5" @mouseenter="handleLeft" @touchstart="handleLeft"></div>

    <!-- Right Section -->
    <div class="h-full w-2/5" @mouseenter="handleRight" @touchstart="handleRight"></div>

    <!-- Left Transition Effect -->
    <div v-if="toggles.left" class="h-full absolute top-0 left-[-230%] z-10 scale-x-[230%] origin-left transition-transform" :class="!toggles.transition ? 'translate-x-0' : 'translate-x-[230%]'" :style="{ transitionDuration: waveDuration }">
      <img class="h-full" :style="{ maxWidth: maxImageWidth + 'px' }" src="/src/assets/Wave/redWave.png" alt="Left Wave" />
    </div>

    <!-- Right Transition Effect -->
    <div v-if="toggles.right" class="h-full absolute top-0 right-[-230%] z-10 scale-x-[230%] origin-right transition-transform" :class="!toggles.transition ? 'translate-x-0' : 'translate-x-[-230%]'" :style="{ transitionDuration: waveDuration }">
      <img class="h-full" :style="{ maxWidth: maxImageWidth + 'px' }" src="/src/assets/Wave/cyanWave.png" alt="Right Wave" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const waveDuration = ref("1000ms");

// Reactive state for handling animations and transitions
const toggles = ref({
  left: false,
  right: false,
  transition: false,
});

// Props to determine the current state
const props = defineProps({
  state: String,
});

// Emits event to update the state
const emit = defineEmits(["update:state"]);

// Reactive reference for max image width (110% of screen width)
const maxImageWidth = ref(window.innerWidth * 1);

/**
 * Updates the max width of images dynamically on resize.
 */
const updateMaxImageWidth = () => {
  const width = window.innerWidth;
  const multiplier = 1.55;
  const speed = 2.5; // px per millisecondo (puoi tararlo)

  const distance = width * multiplier;
  const duration = distance / speed; // durata in ms

  maxImageWidth.value = distance;
  waveDuration.value = `${duration}ms`;
};

/**
 * Starts the transition and updates the state after animation.
 * @param dir - The new direction to update state
 */
const StartTransition = (dir: string) => {
  toggles.value.transition = true;
  setTimeout(() => {
    changeState(dir);
  }, 1000);
};

/**
 * Handles left section interaction.
 * Triggers animation if the current state is not "right".
 */
const handleLeft = () => {
  if (props.state === "right") return;

  toggles.value.left = true;
  setTimeout(() => {
    StartTransition("right");
  }, 100);
};

/**
 * Handles right section interaction.
 * Triggers animation if the current state is not "left".
 */
const handleRight = () => {
  if (props.state === "left") return;

  toggles.value.right = true;
  setTimeout(() => {
    StartTransition("left");
  }, 100);
};

/**
 * Updates the state and resets transition flags.
 * @param dir - The new direction for the state update
 */
const changeState = (dir: string) => {
  emit("update:state", dir);
  toggles.value.left = false;
  toggles.value.right = false;
  toggles.value.transition = false;
};

// Listen to window resize to update image width dynamically
onMounted(() => {
  const waveWidthMultiplier = 12.55; // sufficiente per coprire anche schermi ultra-wide
  maxImageWidth.value = window.innerWidth * waveWidthMultiplier;

  window.addEventListener("resize", updateMaxImageWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMaxImageWidth);
});
</script>

<style scoped></style>
