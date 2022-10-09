<template>
  <q-dialog
    :model-value="openDialog"
    no-esc-dismiss
    class="dialog"
    @hide="openDialog = false"
  >
    <section class="dialog__section">
      <span class="close" @click="openDialog = false">
        <base-icon name="close" :size="20" />
      </span>
      <iframe
        src="https://player.vimeo.com/video/676566536?autoplay=1&amp;loop=1&amp;autopause=0"
        frameborder="0"
        allow="autoplay;fullscreen"
        allowfullscreen
        samesite
      />
    </section>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from 'components/base/BaseIcon.vue';

interface IVideoOverlayProps {
  dialog: boolean;
}

const props = withDefaults(defineProps<IVideoOverlayProps>(), {
  dialog: false,
});

const emits = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
}>();

const openDialog = computed({
  get() {
    return props.dialog;
  },
  set(newValue) {
    emits('update:dialog', newValue);
  },
});
</script>

<style scoped lang="scss">
.dialog {
  &__section {
    position: relative;
    max-width: calc(1920px / 2);
    max-height: calc(1080px / 2);
    width: 100%;
    height: 100%;
    overflow: visible;

    @media (max-width: 960px) {
      max-width: calc(1920px / 3);
      max-height: calc(1080px / 3);
    }

    @media (max-width: 700px) {
      max-width: calc(1920px / 4);
      max-height: calc(1080px / 4);
    }

    @media (max-width: 600px) {
      .close {
        display: none;
      }
    }

    .close {
      top: -40px;
      padding: 0;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
