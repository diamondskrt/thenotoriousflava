<template>
  <q-form ref="formRef" :model-value="form" class="text-center">
    <div class="q-mt-lg q-mb-xl">
      <template v-if="type === 'note'">
        <q-input
          v-model="form.name"
          :rules="nameRules"
          no-error-icon
          label="Ваше имя"
        />
        <q-input
          v-model="form.phone"
          mask="(###) ###-##-##"
          :rules="phoneRules"
          no-error-icon
          placeholder="(999) 999-99-99"
          class="q-mt-md"
        >
          <template #prepend>
            <span class="text-body1">+7</span>
          </template>
        </q-input>
      </template>

      <template v-if="type === 'auth'">
        <q-input
          v-model="form.email"
          :rules="emailRules"
          no-error-icon
          label="Ваш email"
        />
        <q-input
          v-model="form.password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          no-error-icon
          label="Пароль"
          class="q-mt-md"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </template>
    </div>

    <div class="text-left">
      <q-btn square color="accent" @click="onSubmit" label="Отправить" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { QForm } from 'quasar';

interface FormProps {
  type: string;
}

interface Form {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

withDefaults(defineProps<FormProps>(), {
  type: 'note',
});

const emits = defineEmits<{
  (e: 'submit', form: Form): void;
}>();

const form = reactive<Form>({
  name: '',
  phone: '',
  email: '',
  password: '',
});

const formRef = ref<QForm | null>(null);

// type note

const nameRules = [(val: string) => !!val || 'Поле обязательно для заполнения'];

const phoneRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string) => val.length > 14 || 'Введите корректный номер телефона',
];

const regexpNumber = (phone: string) => {
  return phone.replace(/[-()\s]/g, '');
};

// type auth

const emailRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string) => /.+@.+\..+/.test(val) || 'Введите валидный email',
];

const showPassword = ref(false);

const passwordRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string): boolean | string =>
    val.length >= 6 || 'Пароль должен содержать не менее 6 символов',
];

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      if (form.phone) {
        form.phone = regexpNumber(form.phone);
      }

      emits('submit', form);
    }
  });
};
</script>

<style scoped lang="scss">
form {
  :deep(.q-field__prepend) {
    padding-right: 4px;
  }

  :deep(.q-field__control),
  :deep(.q-field__marginal) {
    height: auto;
  }
}
</style>
