<template>
  <template v-if="selectedAbonements.length">
    <transition-group
      name="list"
      tag="div"
      class="abonements row q-col-gutter-md"
    >
      <div
        v-for="abonement in selectedAbonements"
        :key="abonement.id"
        class="col-xs-12 col-lg-6"
      >
        <div class="abonement flex">
          <div class="abonement__image" />
          <div class="abonement__section q-ml-md">
            <div class="text-subtitle1">
              {{ abonement.title }}
            </div>

            <div class="text-subtitle1 text-uppercase q-my-md">
              <span v-numflip="abonement.total">{{ abonement.total }}</span>
            </div>

            <div class="flex items-center q-my-lg">
              <q-btn
                color="accent"
                @click="useAbonement.onDecrement(abonement)"
              >
                <span>-</span>
              </q-btn>
              <div class="q-mx-sm">{{ abonement.counter }} шт.</div>
              <q-btn
                color="accent"
                @click="useAbonement.onIncrement(abonement)"
              >
                <span>+</span>
              </q-btn>
            </div>

            <div
              class="flex cursor-pointer"
              @click="useAbonement.onRemoveAbonement(abonement)"
            >
              <q-icon name="delete" size="20px" />
              <div class="q-ml-sm">Удалить</div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <q-separator class="q-my-xl" />

    <div>
      Итоговая стоимость:
      <span v-numflip="totalPrice">{{ totalPrice }}</span> ₽
    </div>

    <q-btn
      color="accent"
      square
      label="Оформить"
      class="q-mt-md"
      @click="onNextStep"
    />
  </template>

  <template v-else>
    <div class="text-body2">Корзина пуста</div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAbonementStore } from 'stores/abonements';
import { IAbonement } from 'models/pages/indexPage';
import { useAbonement } from 'composables/useAbonement';
import { vNumflip } from 'directives/numflip';

const emits = defineEmits<{
  (e: 'next-step'): void;
}>();

const abonementStore = useAbonementStore();

const selectedAbonements = computed(() => abonementStore.selectedAbonements);

const totalPrice = computed(() =>
  selectedAbonements.value.reduce(
    (acc: number, curr: IAbonement) => acc + curr.total,
    0
  )
);

const onNextStep = () => {
  emits('next-step');
};
</script>

<style scoped lang="scss">
.abonements {
  .abonement {
    &__image {
      position: relative;
      width: 300px;
      height: 400px;
      background: url('/src/assets/abonements.jpg') center center / cover;
    }

    &__section {
      z-index: 1;
    }
  }
}
</style>
