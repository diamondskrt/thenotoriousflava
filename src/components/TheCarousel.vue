<template>
  <q-carousel
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    padding
    infinite
    control-color="primary"
    height="auto"
    navigation
    class="carousel bg-dark cursor-grab"
  >
    <q-carousel-slide
      v-for="(item, i) in chunkedCarouselItems"
      :key="i"
      :name="i"
    >
      <div class="row q-col-gutter-sm">
        <div
          v-for="list in item.chunkedArray"
          :key="list.id"
          :class="getListClass()"
        >
          <q-card
            class="carousel__card-item shadow flex justify-center items-center"
          >
            <div class="carousel__card-section text-center">
              <div class="text-subtitle1 text-uppercase text-weight-regular">
                {{ list.title }}
              </div>
              <div
                class="text-subtitle1 text-uppercase text-weight-regular q-my-md"
              >
                <del v-if="list.discountPrice"> {{ list.price }} ₽ </del>
                <template v-else> {{ list.price }} ₽ </template>
              </div>
              <div v-if="list.discountPrice">
                <gradient-chip
                  :bgWhiteText="list.discountPrice"
                  text="в первый месяц"
                />
              </div>
              <q-btn color="accent" square class="q-mt-md">В корзину</q-btn>
            </div>
          </q-card>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import GradientChip from 'components/GradientChip.vue';
import { Abonement } from 'boot/models/pages/indexPage';

interface ResponsiveBreakpoint {
  lgAndDown: number;
  mdAndDown?: number;
}

interface TheCarouselProps {
  perPage?: number;
  items: Abonement[];
  responsive?: ResponsiveBreakpoint;
}

interface ListClasses {
  [key: number]: string;
}

const $q = useQuasar();

const props = withDefaults(defineProps<TheCarouselProps>(), {
  perPage: 3,
  responsive: (): ResponsiveBreakpoint => {
    return {
      lgAndDown: 2,
      mdAndDown: 1,
    };
  },
});

const slide = ref(0);

const getPerPage = computed(() => {
  return $q.screen.lt.md
    ? props.responsive.mdAndDown || props.responsive.lgAndDown
    : $q.screen.lt.lg
    ? props.responsive.lgAndDown
    : props.perPage;
});

const chunkArray = (arr: Abonement[], chunkSize: number) => {
  const res = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push({ chunkedArray: chunk });
  }

  return res;
};

const chunkedCarouselItems = computed(() =>
  chunkArray(props.items, getPerPage.value)
);

const getListClass = () => {
  const listClasses: ListClasses = {
    1: 'col-12',
    2: 'col-6',
    3: 'col-4',
  };

  return listClasses[getPerPage.value];
};
</script>

<style scoped lang="scss">
.carousel {
  &__card-item {
    height: 500px;
    background: url('/src/assets/abonements.jpg') center center / cover;
  }

  &__card-section {
    z-index: 1;
  }

  :deep(.q-panel) {
    &.scroll {
      overflow-x: hidden;
    }
  }
  :deep(.q-carousel__slide) {
    padding: 0;
  }

  :deep(.q-carousel__navigation) {
    .q-btn {
      min-height: 1.2em;
      min-width: 1.2em;
    }
  }

  :deep(.q-icon) {
    font-size: 1.2em;
  }
}
</style>
