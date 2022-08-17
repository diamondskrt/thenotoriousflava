<template>
  <svg
    :fill="color"
    :width="(width ? width : size) + 'px'"
    :height="(height ? height : size) + 'px'"
  >
    <use v-bind="{ 'xlink:href': '/src/assets/sprite.svg#' + name }" />
  </svg>
</template>

<script setup lang="ts">
interface TheIconProps {
  name: string;
  color?: string;
  stroke?: string;
  size?: number;
  width?: number;
  height?: number;
}

withDefaults(defineProps<TheIconProps>(), {
  color: '#ffffff',
  size: 26,
});
</script>
