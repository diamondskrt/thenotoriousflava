<template>
  <div class="menu-items flex" :class="{ column: column }">
    <div
      v-for="(item, i) in menuItems"
      :key="item.title"
      class="text-subtitle1 text-uppercase cursor-pointer q-px-sm"
      :class="{ 'q-mt-md': column && i !== 0 }"
      @click="onScrollTo(item.link)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { TMenuItems } from 'src/models/header';

interface IMenuItemsProps {
  column?: boolean;
}

defineProps<IMenuItemsProps>();

const emits = defineEmits<{
  (e: 'scroll-to', link: string): void;
}>();

const menuItems: TMenuItems[] = [
  { title: 'Главная', link: 'mainRef' },
  { title: 'Направления', link: 'directionsRef' },
  { title: 'Абонементы', link: 'abonementsRef' },
  { title: 'Расписание', link: 'scheduleRef' },
  { title: 'Контакты', link: 'contactsRef' },
];

const onScrollTo = (itemLink: string) => {
  emits('scroll-to', itemLink);
};
</script>
