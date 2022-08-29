<template>
  <q-header
    :reveal="reveal"
    class="q-pa-sm"
    :class="{ 'q-header--is-scrolled': isScrolled, fixed: fixed }"
  >
    <q-toolbar>
      <router-link to="/">
        <img src="~assets/logo.png" alt="logo" height="60" />
      </router-link>

      <q-space />

      <template v-if="$q.screen.gt.sm">
        <div class="menu-items flex">
          <div
            v-for="item in menuItems"
            :key="item.title"
            class="text-subtitle1 text-uppercase cursor-pointer q-px-sm"
          >
            {{ item.title }}
          </div>
        </div>

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

          <q-btn v-if="user" color="accent" square>
            <q-avatar color="primary" size="sm">
              {{ getUserFirstLetter(user.name) }}
            </q-avatar>
            <q-menu class="bg-accent">
              <q-list style="min-width: 200px" color="accent">
                <q-item clickable v-close-popup>
                  <q-item-section>New tab</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New incognito tab</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>Recent tabs</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>History</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Downloads</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="onSignOut">
                  <q-item-section>Выйти</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-icon name="expand_more" class="q-ml-xs" />
          </q-btn>

          <div v-else>
            <router-link to="/auth">
              <q-btn color="accent" square label="Войти" />
            </router-link>
          </div>
        </div>
      </template>

      <template v-else>
        <q-btn
          square
          color="accent"
          icon="drag_handle"
          @click="emits('openDrawer')"
        />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'stores/auth';
import { firebaseService } from 'services/firebase';
import { useAbonementStore } from 'stores/abonements';

interface TheHeaderProps {
  reveal?: boolean;
  fixed?: boolean;
}

interface menuItems {
  title: string;
  link: string;
}

const { user } = storeToRefs(useAuthStore());

defineProps<TheHeaderProps>();

const emits = defineEmits<{
  (e: 'openDrawer'): void;
}>();

const getUserFirstLetter = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : 'U';
};

const abonementStore = useAbonementStore();

const $q = useQuasar();

const menuItems: menuItems[] = [
  { title: 'Главная', link: '/' },
  { title: 'Направления', link: '/' },
  { title: 'Абонементы', link: '/' },
  { title: 'Расписание', link: '/' },
  { title: 'Контакты', link: '/' },
];

const isScrolled = ref(false);

const selectedAbonements = computed(() => abonementStore.selectedAbonements);

const onScroll = () => {
  if (window.pageYOffset) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

window.addEventListener('scroll', onScroll);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

const onSignOut = async () => {
  await firebaseService.signOut();
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
