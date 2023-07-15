<template>
  <div class="row inline bg-gradient rounded-borders q-pa-sm">
    <div class="text-subtitle-1 text-weight-regular text-uppercase">
      <span
        v-if="price"
        class="bg-white text-black rounded-borders q-px-sm q-py-xs q-mr-sm"
      >
        {{ price }}
      </span>
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface IGradientChipProps {
  price?: number;
  text: string;
}

defineProps<IGradientChipProps>();
</script>
