<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from 'stores/auth';
import { auth } from 'boot/firebase';
import { firebaseService } from 'services/firebase';

const router = useRouter();

const authStore = useAuthStore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userInfo = await firebaseService.getDoc('users', user.uid);

    if (userInfo.data()) {
      await authStore.setUser({
        name: userInfo.data().name,
        role: userInfo?.data().role,
      });

      router.push('/admin');
    }
  } else {
    if (router.currentRoute.value.path !== '/') {
      router.push('/');
    }

    authStore.clearUser();
  }
});
</script>
