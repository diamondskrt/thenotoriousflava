<template>
  <main>
    <section class="screen"></section>
    <section class="cart" :class="getPadding">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная" to="/" />
        <q-breadcrumbs-el label="Корзина" />
      </q-breadcrumbs>

      <div class="cart__section q-pt-xl">
        <abonement-items v-if="step === 1" @on-execution-order="nextStep" />

        <div v-else class="form">
          <div v-if="success">
            <the-icon name="success" :size="60" class="q-ml-md" />
            <div class="text-subtitle1 q-my-md">
              Ваша заявка успешно отправлена!
            </div>
            <q-btn color="primary" @click="prevStep">OK</q-btn>
          </div>
          <the-form v-else @submit="submit">
            <template #left-button>
              <q-btn
                square
                color="accent"
                label="Назад"
                class="q-mr-md"
                @click="prevStep"
              />
            </template>
          </the-form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import AbonementItems from 'components/parts/cart-page/AbonementItems.vue';
import TheForm from 'components/TheForm.vue';
import { useAbonementStore } from 'stores/abonements';
import { firebaseService } from 'services/firebase';
import { Abonement } from 'models/indexPage';

interface Form {
  name: string;
  phone: string;
}

interface Order {
  userName: string;
  userPhone: string;
  order: Abonement[];
  processed: boolean;
}

const $q = useQuasar();

const abonementStore = useAbonementStore();

const step = ref(1);

const success = ref(false);

const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const nextStep = () => {
  if (step.value < 2) {
    step.value++;
  }
};

const getPadding = computed(() =>
  $q.screen.gt.sm ? 'q-px-xl q-py-xl' : 'q-px-md q-py-xl'
);

const selectedAbonements = computed(() => abonementStore.selectedAbonements);

const clearData = () => {
  abonementStore.clearAbonements();
};

const submit = async (form: Form) => {
  const { name, phone } = form;

  await firebaseService.setDoc<Order>('orders', {
    userName: name,
    userPhone: phone,
    order: selectedAbonements.value,
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
