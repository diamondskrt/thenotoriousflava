<template>
  <footer class="bg-black text-center q-pa-xl">
    <div class="social flex justify-center">
      <a href="https://www.instagram.com/tnflava/" target="_blank">
        <the-icon name="instagram" />
      </a>
      <a href="https://vk.com/tnflava" target="_blank" class="q-ml-md">
        <the-icon name="vk" />
      </a>
    </div>
    <div class="text-body2 text-grey q-mt-md">
      © The Notorious Flava, {{ getDate }}. Все права защищены
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TheIcon from 'components/TheIcon.vue';

const getDate = computed(() => new Date().getFullYear());
</script>
