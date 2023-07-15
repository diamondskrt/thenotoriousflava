<template>
  <q-btn v-if="user" color="accent">
    <q-avatar color="primary" size="sm">
      {{ getUserFirstLetter(user.name) }}
    </q-avatar>

    <q-menu class="bg-accent">
      <q-list style="min-width: 200px" color="accent">
        <q-item
          v-for="(item, i) in userMenuItems"
          :key="i"
          :to="item.link"
          :disable="item.disabled"
        >
          <q-item-section>
            <div class="flex items-center no-wrap">
              <div class="icon">
                <q-icon :name="item.icon" size="20px" />
              </div>
              <span class="q-ml-sm">{{ item.title }}</span>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-close-popup clickable @click="onSignOut">
          <div class="flex items-center no-wrap">
            <div class="icon">
              <q-icon name="logout" size="20px" />
            </div>
            <span class="q-ml-sm">Выйти</span>
          </div>
        </q-item>
      </q-list>
    </q-menu>

    <q-icon name="expand_more" class="q-ml-xs" />
  </q-btn>

  <div v-else>
    <router-link to="/auth">
      <q-btn color="accent" square label="Войти" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useFirebaseStore } from 'stores/firebase';
import { firebaseService } from 'services/firebase';
import { IUserMenuItems } from 'src/models/header';

const { user } = storeToRefs(useFirebaseStore());

const $q = useQuasar();

const getUserFirstLetter = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : 'U';
};

const userMenuItems: IUserMenuItems[] = [
  { title: 'Профиль', link: '/', icon: 'account_circle', disabled: true },
  {
    title: 'Админ. панель',
    link: '/admin',
    icon: 'pie_chart',
    disabled: false,
  },
  { title: 'Настройки', link: '/', icon: 'settings', disabled: true },
];

const onSignOut = () => {
  $q.dialog({
    title: 'Подтверждение действия',
    message: 'Вы действительно хотите выйти?',
    ok: {
      color: 'positive',
      flat: true,
      label: 'Да',
    },
    cancel: {
      color: 'white',
      flat: true,
      label: 'Отмена',
    },
  }).onOk(async () => {
    await firebaseService.signOut();
  });
};
</script>
