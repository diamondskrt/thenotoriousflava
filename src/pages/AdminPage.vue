<template>
  <main>
    <section class="screen" />

    <section class="admin" :class="getPadding">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Главная" to="/" />
        <q-breadcrumbs-el label="Административная панель" />
      </q-breadcrumbs>

      <div class="admin-section q-mt-xl">
        <div class="notes">
          <div class="text-subtitle1 q-mb-md">Записи по направлениям</div>

          <template v-if="notesLoading">
            <q-spinner-tail color="primary" size="2em" />
          </template>

          <template v-else>
            <template v-if="notes.length">
              <div v-for="(note, i) in notes" :key="`notes-${i}`">
                <q-expansion-item class="bg-grey-10">
                  <template #header>
                    <q-item-section>
                      <div class="flex items-center">
                        <q-badge
                          :color="note.processed ? 'positive' : 'negative'"
                          rounded
                        />
                        <div class="text-body2 q-ml-sm">
                          {{ note.userName }}
                        </div>
                      </div>
                    </q-item-section>
                  </template>
                  <q-card class="bg-grey-10">
                    <q-card-section>
                      <div class="text-body2">
                        Телефон: {{ note.userPhone }}
                      </div>
                      <div class="text-body2 q-my-md">
                        Выбранное направление: {{ note.direction }}
                      </div>

                      <div v-if="user?.role === 'admin'" class="actions">
                        <q-btn
                          flat
                          color="positive"
                          @click="onComplete('notes', note.id)"
                          >Завершить</q-btn
                        >
                        <q-btn
                          flat
                          color="white"
                          @click="onDelete('notes', note.id)"
                          >Удалить</q-btn
                        >
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator v-if="i !== notes.length - 1" />
              </div>
            </template>

            <div v-else class="text-body2">Записей по направлениям нет</div>
          </template>
        </div>

        <div class="abonements q-mt-lg">
          <div class="text-subtitle1 q-mb-md">Заявки на абонементы</div>

          <template v-if="abonementsLoading">
            <q-spinner-tail color="primary" size="2em" />
          </template>

          <template v-else>
            <template v-if="abonements.length">
              <div v-for="(abonement, i) in abonements" :key="`abonement-${i}`">
                <q-expansion-item class="bg-grey-10">
                  <template #header>
                    <q-item-section>
                      <div class="flex items-center">
                        <q-badge
                          :color="abonement.processed ? 'positive' : 'negative'"
                          rounded
                        />
                        <div class="text-body2 q-ml-sm">
                          {{ abonement.userName }}
                        </div>
                      </div>
                    </q-item-section>
                  </template>
                  <q-card class="bg-grey-10">
                    <q-card-section>
                      <div class="text-body2">
                        Телефон: {{ abonement.userPhone }}
                      </div>

                      <div class="q-my-md">
                        <div
                          v-for="(order, k) in abonement.orders"
                          :key="order.id"
                          :class="{
                            'q-mb-md': k !== abonement.orders.length - 1,
                          }"
                        >
                          <div class="text-body2">{{ order.title }}</div>
                          <div class="text-body2">
                            Кол-во: {{ order.counter }}
                          </div>
                          <div class="text-body2">
                            Итоговая стоимость: {{ order.total }}
                          </div>
                        </div>
                      </div>

                      <div v-if="user?.role === 'admin'" class="actions">
                        <q-btn
                          flat
                          color="positive"
                          @click="onComplete('abonements', abonement.id)"
                          >Завершить</q-btn
                        >
                        <q-btn
                          flat
                          color="white"
                          @click="onDelete('abonements', abonement.id)"
                          >Удалить</q-btn
                        >
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator v-if="i !== abonements.length - 1" />
              </div>
            </template>

            <div v-else class="text-body2">Заявок на абонементы нет</div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { DocumentData } from 'firebase/firestore';
import { useQuasar } from 'quasar';
import { FirebaseError } from 'firebase/app';
import { useFirebaseStore } from 'stores/firebase';
import { firebaseService } from 'services/firebase';
import { getPadding } from 'composables/useSpacing';

interface UpdateDoc {
  processed: boolean;
}

const $q = useQuasar();

const fireStore = useFirebaseStore();

const { user } = storeToRefs(useFirebaseStore());

const notes = ref<DocumentData>([]);

const notesLoading = ref(false);

const abonements = ref<DocumentData>([]);

const abonementsLoading = ref(false);

const loadNotes = async () => {
  notesLoading.value = true;

  if (notes.value.length) {
    notes.value = [];
  }

  const docsSnap = await firebaseService.getDocs('notes');

  if (docsSnap) {
    docsSnap.forEach((doc: DocumentData) => {
      notes.value.push({ id: doc.id, ...doc.data() });
    });
  }

  notesLoading.value = false;
};

const loadAbonements = async () => {
  abonementsLoading.value = true;

  if (abonements.value.length) {
    abonements.value = [];
  }

  const docsSnap = await firebaseService.getDocs('abonements');

  if (docsSnap) {
    docsSnap.forEach((doc: DocumentData) => {
      abonements.value.push({ id: doc.id, ...doc.data() });
    });
  }

  abonementsLoading.value = false;
};

const loadData = async () => {
  try {
    await Promise.all([loadNotes(), loadAbonements()]);
  } catch (error) {
    fireStore.setFBError(error as FirebaseError);
  }
};

loadData();

const showSuccessDialog = () => {
  $q.dialog({
    message: 'Операция успешно выполнена',
    ok: {
      color: 'positive',
      flat: true,
      label: 'OK',
    },
  });
};

const onComplete = async (collectionName: string, id: string) => {
  try {
    await firebaseService.updateDoc<UpdateDoc>(collectionName, id, {
      processed: true,
    });

    if (collectionName === 'notes') {
      await loadNotes();
    } else {
      await loadAbonements();
    }

    showSuccessDialog();
  } catch (error) {
    fireStore.setFBError(error as FirebaseError);
  }
};

const onDelete = (collectionName: string, id: string) => {
  $q.dialog({
    title: 'Подтверждение действия',
    message: `Вы действительно хотите удалить ${
      collectionName === 'notes' ? 'запись' : 'заявку'
    }?`,
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
    try {
      await firebaseService.deleteDoc(collectionName, id);

      if (collectionName === 'notes') {
        await loadNotes();
      } else {
        await loadAbonements();
      }

      showSuccessDialog();
    } catch (error) {
      fireStore.setFBError(error as FirebaseError);
    }
  });
};
</script>

<style scoped lang="scss">
.screen {
  height: 30vh;
  background: url('/src/assets/thelegits.jpg') center center / cover;
}

.admin {
  min-height: 400px;

  @media (max-width: 960px) and (orientation: portrait) {
    min-height: 800px;
  }
}
</style>
