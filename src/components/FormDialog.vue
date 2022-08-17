<template>
  <q-dialog :model-value="openDialog" full-width full-height maximized>
    <div class="flex justify-center items-center bg-black">
      <div class="close" @click="openDialog = false">
        <the-icon name="close" :size="20" />
      </div>
      <q-form ref="formRef" v-model="form" class="text-center">
        <div class="text-h5 text-uppercase">{{ direction }}</div>
        <div class="text-subtitle2 text-uppercase q-mt-sm">
          Оставьте заявку и мы свяжемся с вами
        </div>

        <div class="q-mt-lg q-mb-xl">
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
            placeholder="Телефон"
            class="q-mt-md"
          >
            <template #prepend>
              <span class="text-body1">+7</span>
            </template>
          </q-input>
        </div>

        <div class="text-left">
          <q-btn square color="accent" @click="onSubmit" label="Отправить" />
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { QForm } from 'quasar';
import TheIcon from 'components/TheIcon.vue';

interface FormDialogProps {
  dialog: boolean;
  direction: string;
}

const props = withDefaults(defineProps<FormDialogProps>(), {
  dialog: false,
});

const emit = defineEmits(['update:dialog']);

const openDialog = computed({
  get() {
    return props.dialog;
  },
  set(newValue) {
    emit('update:dialog', newValue);
  },
});

const formRef = ref<QForm | null>(null);

const form = reactive({
  name: '',
  phone: '',
});

const nameRules = [(val: string) => !!val || 'Поле обязательно для заполнения'];

const phoneRules = [
  (val: string) => !!val || 'Поле обязательно для заполнения',
  (val: string) => val.length > 14 || 'Введите корректный номер телефона',
];

const regexpNumber = (phone: string) => {
  return phone.replace(/[-()\s]/g, '');
};

const onSubmit = () => {
  formRef.value?.validate().then((valid) => {
    if (valid) {
      console.log(form.name);
      console.log(regexpNumber(form.phone));
    }
  });
};
</script>

<style scoped lang="scss">
form {
  width: 35%;

  @media (max-width: 1024px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }

  :deep(.q-field__prepend) {
    padding-right: 4px;
  }

  :deep(.q-field__control),
  :deep(.q-field__marginal) {
    height: auto;
  }
}
</style>
