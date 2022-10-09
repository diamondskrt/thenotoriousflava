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
interface IBaseIconProps {
  name: string;
  color?: string;
  stroke?: string;
  size?: number;
  width?: number;
  height?: number;
}

withDefaults(defineProps<IBaseIconProps>(), {
  color: '#ffffff',
  size: 26,
});
</script>
