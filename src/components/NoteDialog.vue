<template>
  <q-dialog :model-value="openDialog" full-width full-height maximized>
    <div class="flex justify-center items-center bg-black">
      <div class="close" @click="onCloseDialog">
        <the-icon name="close" :size="20" />
      </div>
      <div v-if="success" class="text-center">
        <the-icon name="success" :size="60" class="q-ml-md" />
        <div class="text-subtitle1 text-center q-my-md">
          Ваша заявка успешно отправлена!
        </div>
        <q-btn color="primary" @click="onCloseDialog">OK</q-btn>
      </div>
      <div v-else class="form">
        <div class="text-h6 text-weight-regular text-uppercase text-center">
          {{ direction }}
        </div>
        <the-form @submit="submit" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import TheIcon from 'components/TheIcon.vue';
import TheForm from 'components/TheForm.vue';
import { firebaseService } from 'services/firebase';

interface NoteDialogProps {
  dialog: boolean;
  direction: string;
}

interface Note {
  userName: string;
  userPhone: string;
  direction: string;
  processed: boolean;
}

interface Form {
  name: string;
  phone: string;
}

const props = withDefaults(defineProps<NoteDialogProps>(), {
  dialog: false,
});

const emits = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
  (e: 'setDoc'): void;
}>();

const openDialog = computed({
  get() {
    return props.dialog;
  },
  set(newValue) {
    emits('update:dialog', newValue);
  },
});

watch(openDialog, (newValue) => {
  if (!newValue && success.value) {
    success.value = false;
  }
});

const success = ref(false);

const onCloseDialog = () => {
  openDialog.value = false;

  if (success.value) {
    success.value = false;
  }
};

const submit = async (form: Form) => {
  const { name, phone } = form;

  await firebaseService.setDoc<Note>('notes', {
    userName: name,
    userPhone: phone,
    direction: props.direction,
    processed: false,
  });

  success.value = true;
};
</script>

<style scoped lang="scss">
.form {
  width: 35%;

  @media (max-width: 1024px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
}
</style>
