<template>
  <div class="flex items-center justify-center window-height">
    <q-header class="bg-dark flex items-center q-pa-sm">
      <q-toolbar>
        <q-space />
        <router-link to="/">
          <q-btn round color="accent" icon="keyboard_backspace" />
        </router-link>
      </q-toolbar>
    </q-header>
    <the-form type="auth" @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import TheForm from 'components/TheForm.vue';
import { firebaseService } from 'services/firebase';

// вынести
interface Form {
  email: string;
  password: string;
}

const submit = async (form: Form) => {
  try {
    await firebaseService.signIn(form.email, form.password);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss">
.q-header {
  height: 76px;
}

form {
  width: 35%;

  @media (max-width: 1024px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 90%;
  }
}
</style>
