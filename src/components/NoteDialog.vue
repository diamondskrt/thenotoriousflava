<template>
  <q-dialog :model-value="openDialog" full-width full-height maximized>
    <div class="flex justify-center items-center bg-black">
      <div class="close" @click="openDialog = false">
        <the-icon name="close" :size="20" />
      </div>
      <div class="form">
        <div class="text-h6 text-weight-regular text-uppercase text-center">
          {{ direction }}
        </div>
        <the-form @submit="submit" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TheIcon from 'components/TheIcon.vue';
import TheForm from 'components/TheForm.vue';
import { firebaseService } from 'services/firebase';

interface NoteDialogProps {
  dialog: boolean;
  direction: string;
}

interface Form {
  name: string;
  phone: string;
}

interface Note {
  userName: string;
  userPhone: string;
  direction: string;
  processed: boolean;
}

const props = withDefaults(defineProps<NoteDialogProps>(), {
  dialog: false,
});

const emits = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
}>();

const openDialog = computed({
  get() {
    return props.dialog;
  },
  set(newValue) {
    emits('update:dialog', newValue);
  },
});

const submit = async (form: Form) => {
  await firebaseService.add<Note>('notes', {
    userName: form.name,
    userPhone: form.phone,
    direction: props.direction,
    processed: false,
  });
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
