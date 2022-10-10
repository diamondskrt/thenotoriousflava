<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    padding
    :infinite="infinite"
    control-color="primary"
    height="auto"
    navigation
    class="carousel bg-dark cursor-grab"
  >
    <slot :carousel-items="chunkedCarouselItems" :list-class="getListClass()" />
  </q-carousel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { IAbonement } from 'models/pages/indexPage';

interface IResponsiveBreakpoint {
  lgAndDown: number;
  mdAndDown?: number;
}

interface IBaseCarouselProps {
  perPage?: number;
  items: IAbonement[];
  responsive?: IResponsiveBreakpoint;
  infinite?: boolean;
}

interface IListClasses {
  [key: number]: string;
}

const $q = useQuasar();

const props = withDefaults(defineProps<IBaseCarouselProps>(), {
  perPage: 3,
  responsive: (): IResponsiveBreakpoint => {
    return {
      lgAndDown: 2,
      mdAndDown: 1,
    };
  },
  infinite: false,
});

const slide = ref(0);

const getPerPage = computed(() => {
  return $q.screen.lt.md
    ? props.responsive.mdAndDown || props.responsive.lgAndDown
    : $q.screen.lt.lg
    ? props.responsive.lgAndDown
    : props.perPage;
});

const getListClass = () => {
  const listClasses: IListClasses = {
    1: 'col-12',
    2: 'col-6',
    3: 'col-4',
  };

  return listClasses[getPerPage.value];
};

const abonementItems = computed(() => props.items);

const chunkedCarouselItems = computed(() => {
  const chunkSize = getPerPage.value;
  const res = [];

  for (let i = 0; i < abonementItems.value.length; i += chunkSize) {
    const chunk = abonementItems.value.slice(i, i + chunkSize);
    res.push({ chunkedArray: chunk });
  }

  return res;
});
</script>
