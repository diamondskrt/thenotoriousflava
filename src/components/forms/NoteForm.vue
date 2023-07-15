<template>
  <q-form ref="formRef" :model-value="form">
    <q-input
      v-model="form.name"
      :rules="nameRules"
      no-error-icon
      label="Ваше имя"
    />
    <q-input
      v-model="form.phone"
      :mask="phoneMask"
      :rules="phoneRules"
      no-error-icon
      placeholder="(999) 999-99-99"
      class="q-my-md"
    >
      <template #prepend>
        <span class="text-body1">+7</span>
      </template>
    </q-input>

    <div class="text-left">
      <slot name="left-button" />
      <q-btn square color="accent" label="Отправить" @click="onSubmit" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { QForm } from 'quasar';
import { INoteForm } from 'models/forms';

const emits = defineEmits<{
  (e: 'submit', form: INoteForm): void;
}>();

const formRef = ref<QForm | null>(null);

const form = reactive<INoteForm>({
  name: '',
  phone: '',
});

const nameRules = [(val: string) => !!val || 'Поле обязательно для заполнения'];

const phoneMask = '(###) ###-##-##';

const phoneRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string) =>
    val.length >= phoneMask.length || 'Введите корректный номер телефона',
];

const regexpNumber = (phone: string) => {
  return phone.replace(/[-()\s]/g, '');
};

const clearForm = () => {
  form.name = '';
  form.phone = '';

  formRef.value?.reset();
};

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      form.phone = regexpNumber(form.phone);

      emits('submit', form);

      clearForm();
    }
  });
};
</script>

<style scoped lang="scss">
@import 'src/css/form.scss';
</style>
