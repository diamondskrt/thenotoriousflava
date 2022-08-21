<template>
  <q-layout view="lhr lpr lfr">
    <the-header reveal @open-drawer="drawer = !drawer" />
    <q-drawer
      v-model="drawer"
      side="right"
      behavior="mobile"
      :width="500"
      overlay
    >
      item
    </q-drawer>
    <router-view />
    <the-footer />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheHeader from 'components/parts/TheHeader.vue';
import TheFooter from 'components/parts/TheFooter.vue';

const drawer = ref(false);
</script>
