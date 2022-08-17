<template>
  <q-layout view="lHh Lpr lFf">
    <the-header reveal />
    <router-view />
    <the-footer />
  </q-layout>
</template>

<script setup lang="ts">
import TheHeader from 'components/parts/TheHeader.vue';
import TheFooter from 'components/parts/TheFooter.vue';
</script>
