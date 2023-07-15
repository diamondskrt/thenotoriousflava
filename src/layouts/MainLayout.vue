<template>
  <q-layout view="lhr lpr lfr">
    <base-header fixed @open-drawer="drawer = !drawer" @scroll-to="scrollTo" />

    <q-drawer v-model="drawer" side="right" behavior="mobile" overlay>
      <div class="flex column justify-center items-center full-height">
        <div class="text-center">
          <user-profile />

          <menu-items
            v-if="isIndexPage"
            column
            class="q-mt-xl"
            @scroll-to="scrollTo"
          />
        </div>
      </div>
    </q-drawer>

    <router-view :scroll-to-link="scrollToLink" />

    <base-footer />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseHeader from 'components/base/BaseHeader.vue';
import BaseFooter from 'components/base/BaseFooter.vue';
import UserProfile from 'components/parts/UserProfile.vue';
import MenuItems from 'components/parts/MenuItems.vue';

const drawer = ref(false);

const scrollToLink = ref<string | null>(null);

const router = useRouter();

const isIndexPage = computed(() => router.currentRoute.value.path === '/');

const scrollTo = (link: string) => {
  if (drawer.value) {
    drawer.value = false;
  }

  scrollToLink.value = link;
};
</script>

<style scoped lang="scss">
.q-layout {
  :deep(.q-drawer) {
    @media (max-width: 960px) {
      width: 70% !important;
    }

    @media (max-width: 600px) {
      width: 80% !important;
    }
  }
}
</style>
