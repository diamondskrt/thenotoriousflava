<template>
  <footer id="gsapFooter" class="bg-black text-center q-pa-xl">
    <div class="social flex justify-center">
      <a href="https://www.instagram.com/tnflava/" target="_blank">
        <base-icon name="instagram" />
      </a>
      <a href="https://vk.com/tnflava" target="_blank" class="q-ml-md">
        <base-icon name="vk" />
      </a>
    </div>
    <div class="text-body2 text-grey q-mt-md">
      © The Notorious Flava, {{ getDate }}. Все права защищены
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue';
import BaseIcon from 'components/base/BaseIcon.vue';
import { gsapAnimation } from 'helpers/gsapAnimation';

const getDate = computed(() => new Date().getFullYear());

onMounted(async () => {
  await nextTick();

  gsapAnimation('#gsapFooter', {
    scrollTrigger: '#gsapFooter',
    ease: 'slow',
  });
});
</script>
