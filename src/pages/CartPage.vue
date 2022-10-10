<template>
  <main>
    <section ref="screenRef" class="screen"></section>

    <section class="cart" :class="getPadding">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная" to="/" />
        <q-breadcrumbs-el label="Корзина" />
      </q-breadcrumbs>

      <div class="cart__section q-mt-xl">
        <abonement-items v-if="step === 1" @on-execution-order="nextStep" />

        <div v-else class="form">
          <div v-if="success">
            <base-icon name="success" :size="60" class="q-ml-md" />
            <div class="text-subtitle1 q-my-md">
              Ваша заявка успешно отправлена!
            </div>
            <q-btn color="primary" padding="xs lg" @click="prevStep">OK</q-btn>
          </div>
          <note-form v-else @submit="submit">
            <template #left-button>
              <q-btn
                square
                color="accent"
                label="Назад"
                class="q-mr-md"
                @click="prevStep"
              />
            </template>
          </note-form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { scroll } from 'quasar';
import AbonementItems from 'components/parts/AbonementItems.vue';
import NoteForm from 'components/forms/NoteForm.vue';
import BaseIcon from 'components/base/BaseIcon.vue';
import { useAbonementStore } from 'stores/abonements';
import { firebaseService } from 'services/firebase';
import { IAbonement } from 'models/pages/indexPage';
import { INoteForm } from 'models/forms';
import { getPadding } from 'composables/useSpacing';

interface Order {
  userName: string;
  userPhone: string;
  orders: IAbonement[];
  processed: boolean;
}

const { getScrollTarget, setVerticalScrollPosition } = scroll;

const abonementStore = useAbonementStore();

const step = ref(1);

const success = ref(false);

const screenRef = ref<HTMLElement | null>(null);

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const nextStep = () => {
  if (step.value < 2) {
    step.value++;

    if (screenRef.value) {
      const target = getScrollTarget(screenRef.value);
      const offset = screenRef.value.offsetTop;
      const duration = 200;
      setVerticalScrollPosition(target, offset, duration);
    }
  }
};

const selectedAbonements = computed(() => abonementStore.selectedAbonements);

const clearData = () => {
  abonementStore.clearAbonements();
};

const submit = async (form: INoteForm) => {
  const { name, phone } = form;

  await firebaseService.setDoc<Order>('abonements', {
    userName: name,
    userPhone: phone,
    orders: selectedAbonements.value,
    processed: false,
  });

  success.value = true;

  clearData();
};
</script>

<style scoped lang="scss">
.screen {
  height: 30vh;
  background: url('/src/assets/thelegits.jpg') center center / cover;
}

.cart {
  @media (max-width: 960px) and (orientation: portrait) {
    min-height: 800px;
  }

  &__section {
    min-height: 300px;
  }

  .form {
    width: 35%;

    @media (max-width: 1024px) {
      width: 65%;
    }

    @media (max-width: 600px) {
      width: 90%;
    }
  }
}
</style>
