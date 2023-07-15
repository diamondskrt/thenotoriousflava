<template>
  <router-view />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useFirebaseStore } from 'stores/firebase';
import { auth } from 'boot/firebase';
import { firebaseService } from 'services/firebase';
import { fbErrorsObject } from 'constants/fbErrors';

const router = useRouter();

const fireStore = useFirebaseStore();

const { fbError } = storeToRefs(useFirebaseStore());

const $q = useQuasar();

watch(
  fbError,
  (error) => {
    if (!error) return;

    const message =
      fbErrorsObject[error.code] || 'Произошла неизвестная ошибка';

    $q.dialog({
      message,
      ok: {
        color: 'positive',
        flat: true,
        label: 'OK',
      },
    })
      .onOk(() => {
        fireStore.clearFBError();
      })
      .onDismiss(() => {
        fireStore.clearFBError();
      });
  },
  { deep: true }
);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userInfo = await firebaseService.getDoc('users', user.uid);

    if (userInfo.data()) {
      await fireStore.setUser({
        name: userInfo.data().name,
        role: userInfo?.data().role,
      });
    }
  } else {
    if (router.currentRoute.value.path !== '/') {
      router.push('/');
    }

    fireStore.clearUser();
  }
});
</script>
