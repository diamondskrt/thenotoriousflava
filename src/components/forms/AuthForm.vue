<template>
  <q-form ref="formRef" :model-value="form">
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
      class="q-my-md"
    >
      <template #append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>

    <div class="text-left">
      <q-btn square color="accent" label="Отправить" @click="onSubmit" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { QForm } from 'quasar';
import { IAuthForm } from 'models/forms';

const emits = defineEmits<{
  (e: 'submit', form: IAuthForm): void;
}>();

const formRef = ref<QForm | null>(null);

const form = reactive<IAuthForm>({
  email: '',
  password: '',
});

const emailRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string) => /.+@.+\..+/.test(val) || 'Введите валидный email',
];

const showPassword = ref(false);

const minNumber = 6;

const passwordRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string): boolean | string =>
    val.length >= minNumber ||
    `Пароль должен содержать не менее ${minNumber} символов`,
];

const clearForm = () => {
  form.email = '';
  form.password = '';

  formRef.value?.reset();
};

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      emits('submit', form);

      clearForm();
    }
  });
};
</script>

<style scoped lang="scss">
@import 'src/css/form.scss';
</style>
