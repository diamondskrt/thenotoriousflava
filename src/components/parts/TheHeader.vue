<template>
  <q-header
    :reveal="reveal"
    class="q-pa-sm"
    :class="{ 'q-header--is-scrolled': isScrolled }"
  >
    <q-toolbar>
      <img src="~assets/logo.png" alt="logo" height="60" />

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

        <q-btn color="accent" square label="Войти" />
      </template>
      <template v-else>
        <q-btn square color="accent" icon="drag_handle" />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';

interface TheHeaderProps {
  reveal?: boolean;
}

interface menuItems {
  title: string;
  link: string;
}

withDefaults(defineProps<TheHeaderProps>(), {
  reveal: false,
});

const $q = useQuasar();

const menuItems: menuItems[] = [
  { title: 'Главная', link: '/' },
  { title: 'Направления', link: '/' },
  { title: 'Абонементы', link: '/' },
  { title: 'Расписание', link: '/' },
  { title: 'Контакты', link: '/' },
];

const isScrolled = ref(false);

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
</script>

<style scoped lang="scss">
.q-header {
  background: rgba(0, 0, 0, 0);
  &--is-scrolled {
    background: rgb(0, 0, 0);
  }
}
</style>
