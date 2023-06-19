<template>
  <q-header
    :reveal="reveal"
    class="q-py-sm"
    :class="{ 'q-header--is-scrolled': isScrolled, fixed: fixed }"
  >
    <q-toolbar>
      <router-link to="/">
        <img src="~assets/logo.png" alt="logo" height="60" />
      </router-link>

      <q-space />

      <menu-items v-if="isIndexPage && $q.screen.gt.md" @scroll-to="scrollTo" />

      <q-space />

      <div class="flex items-center">
        <router-link to="/cart">
          <q-btn
            color="white"
            size="md"
            round
            flat
            icon="shopping_bag"
            class="q-mr-md"
          >
            <transition name="bounce">
              <q-badge
                v-if="selectedAbonements.length"
                color="negative"
                floating
                rounded
              />
            </transition>
          </q-btn>
        </router-link>

        <q-btn
          v-if="$q.screen.lt.md && isIndexPage"
          square
          color="accent"
          icon="drag_handle"
          @click="emits('open-drawer')"
        />

        <template v-else>
          <user-profile />
        </template>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { QHeader, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import UserProfile from 'components/parts/UserProfile.vue';
import MenuItems from 'components/parts/MenuItems.vue';
import { useAbonementStore } from 'stores/abonements';

interface IBaseHeaderProps {
  reveal?: boolean;
  fixed?: boolean;
}

defineProps<IBaseHeaderProps>();

const emits = defineEmits<{
  (e: 'open-drawer'): void;
  (e: 'scroll-to', link: string): void;
}>();

const abonementStore = useAbonementStore();

const router = useRouter();

const $q = useQuasar();

const isScrolled = ref(false);

const selectedAbonements = computed(() => abonementStore.selectedAbonements);

const isIndexPage = computed(() => router.currentRoute.value.path === '/');

const onScroll = () => {
  isScrolled.value = Boolean(window.pageYOffset);
};

window.addEventListener('scroll', onScroll);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

const scrollTo = (link: string) => {
  emits('scroll-to', link);
};
</script>

<style scoped lang="scss">
.q-header {
  background: rgba(0, 0, 0, 0);
  &.fixed {
    position: fixed !important;
  }
  &--is-scrolled {
    background: rgb(0, 0, 0);
  }
  :deep(.q-badge--floating) {
    top: 0;
    right: 0;
  }
}
</style>
