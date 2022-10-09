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
    <auth-form @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { FirebaseError } from 'firebase/app';
import AuthForm from 'components/forms/AuthForm.vue';
import { useFirebaseStore } from 'stores/firebase';
import { firebaseService } from 'services/firebase';
import { IAuthForm } from 'models/forms';

const router = useRouter();

const fireStore = useFirebaseStore();

const submit = async (form: IAuthForm) => {
  try {
    await firebaseService.signIn(form.email, form.password);
    router.push('/');
  } catch (error) {
    fireStore.setFBError(error as FirebaseError);
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
