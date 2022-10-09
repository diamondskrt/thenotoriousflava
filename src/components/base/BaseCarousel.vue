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
    <q-carousel-slide
      v-for="(item, i) in chunkedCarouselItems"
      :key="i"
      :name="i"
    >
      <div class="row q-col-gutter-sm">
        <div
          v-for="abonement in item.chunkedArray"
          :key="abonement.id"
          :class="getListClass()"
        >
          <q-card
            class="carousel__card-item shadow flex justify-center items-center"
          >
            <div class="carousel__card-section text-center">
              <div class="text-subtitle1 text-uppercase text-weight-regular">
                {{ abonement.title }}
              </div>
              <div
                class="text-subtitle1 text-uppercase text-weight-regular q-my-md"
              >
                <del v-if="abonement.discountPrice">
                  {{ abonement.price }} ₽
                </del>
                <template v-else>{{ abonement.price }} ₽</template>
              </div>
              <div v-if="abonement.discountPrice">
                <gradient-chip
                  :bgWhiteText="abonement.discountPrice"
                  text="в первый месяц"
                />
              </div>

              <div
                v-if="foundAbonement(abonement)"
                class="flex justify-center items-center q-mt-md"
              >
                <q-btn color="accent" @click="decrement(abonement)">
                  <span>-</span>
                </q-btn>
                <div class="q-mx-sm">
                  {{ foundAbonement(abonement).counter }} шт.
                </div>
                <q-btn color="accent" @click="increment(abonement)">
                  <span>+</span>
                </q-btn>
              </div>
              <q-btn
                v-else
                color="accent"
                class="q-mt-md"
                @click="onAddAbonement(abonement)"
              >
                В корзину
              </q-btn>
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
import { useAbonementStore } from 'stores/abonements';
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

const abonementStore = useAbonementStore();

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

const getListClass = () => {
  const listClasses: IListClasses = {
    1: 'col-12',
    2: 'col-6',
    3: 'col-4',
  };

  return listClasses[getPerPage.value];
};

const foundAbonement = (abonement: IAbonement) => {
  return abonementStore.selectedAbonements.find(
    (el: IAbonement) => el.id === abonement.id
  );
};

const onAddAbonement = (abonement: IAbonement) => {
  abonementStore.addAbonement(abonement);
};

const increment = (abonement: IAbonement) => {
  abonementStore.increment(abonement);
};

const decrement = (abonement: IAbonement) => {
  abonementStore.decrement(abonement);
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
