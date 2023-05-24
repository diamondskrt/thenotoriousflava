<template>
  <main>
    <section
      ref="mainRef"
      class="screen flex justify-center items-center window-height overflow-hidden"
    >
      <video
        loop="true"
        autoplay="true"
        muted="true"
        poster="~assets/thelegits.jpg"
      >
        <source src="~assets/bcone.mp4" type="video/mp4" />
      </video>
      <div id="gsapMainTitle" class="absolute text-center q-pa-md">
        <div class="text-h3 text-uppercase">The Notorious Flava</div>
        <div class="text-h6 text-uppercase text-weight-light q-mt-md">
          студия танцев
        </div>
      </div>
    </section>

    <section ref="directionsRef" class="about" :class="getPadding">
      <div id="gsapDirectionsTitle" class="text-h4 text-center text-uppercase">
        Танцуй, <span class="text-primary">вдохновляй</span>, создавай
      </div>
      <div id="gsapDirections">
        <div class="text-body1 q-mt-xl">
          Наша программа обучения создана для разных возрастных групп, с учетом
          их индивидуального развития. Мы регулярно организовываем мастер-классы
          от мировых звезд, фестивали, кэмпы и многое другое, а также и сами
          принимаем участие во всевозможных мероприятиях. Наши залы оборудованы
          специальным покрытием, системами контроля температуры, бесплатным wifi
          - созданы все условия для вашего комфорта.
        </div>
        <div class="about__cards q-mt-lg">
          <div class="text-body1 text-center q-mb-md">
            Выберите подходящее направление:
          </div>
          <div class="row q-col-gutter-md">
            <div
              v-for="direction in directions"
              :key="direction.id"
              class="col-xs-12 col-sm-6 col-md-4"
            >
              <q-card square class="about__card-item bg-accent">
                <q-card-section>
                  <div class="text-h6">{{ direction.title }}</div>
                  <div class="text-subtitle2">
                    Возрастная категория: {{ direction.ageCategory }}+
                    <span v-if="direction.setOfGroups">(Идет набор групп)</span>
                  </div>
                </q-card-section>

                <q-separator dark inset />

                <div class="q-card__section--vert">
                  <div class="text-body2 q-pb-xl">
                    {{ direction.description }}
                  </div>

                  <div class="about__card-actions q-pb-md">
                    <div
                      class="text-body2 text-uppercase cursor-pointer"
                      @click="onOpenFormDialog(direction)"
                    >
                      Записаться
                    </div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="abonementsRef" class="abonements" :class="getPadding">
      <div id="gsapAbonementsTitle" class="text-h4 text-center text-uppercase">
        Абонементы
      </div>

      <div id="gsapAbonements" class="abonements__section flex q-mt-xl">
        <div class="abonements__box"></div>
        <div class="abonements__slider">
          <base-carousel :items="abonementItems">
            <template #default="{ carouselItems, listClass }">
              <q-carousel-slide
                v-for="(item, i) in carouselItems"
                :key="i"
                :name="i"
              >
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="abonement in item.chunkedArray"
                    :key="abonement.id"
                    :class="listClass"
                  >
                    <q-card
                      class="carousel__card-item shadow flex justify-center items-center"
                    >
                      <div class="carousel__card-section text-center">
                        <div
                          class="text-subtitle1 text-uppercase text-weight-regular"
                        >
                          {{ abonement.title }}
                        </div>
                        <div
                          class="text-subtitle1 text-uppercase text-weight-regular q-my-md"
                        >
                          <del v-if="abonement.discountPrice">
                            {{ abonement.price }} ₽
                          </del>
                          <template v-else>{{ abonement.price }} ₽</template>
                        </div>
                        <div v-if="abonement.discountPrice">
                          <gradient-chip
                            :bgWhiteText="abonement.discountPrice"
                            text="в первый месяц"
                          />
                        </div>

                        <div
                          v-if="useAbonement.foundAbonement(abonement)"
                          class="flex justify-center items-center q-mt-md"
                        >
                          <q-btn
                            color="accent"
                            @click="useAbonement.onDecrement(abonement)"
                          >
                            <span>-</span>
                          </q-btn>
                          <div class="q-mx-sm">
                            {{ useAbonement.foundAbonement(abonement).counter }}
                            шт.
                          </div>
                          <q-btn
                            color="accent"
                            @click="useAbonement.onIncrement(abonement)"
                          >
                            <span>+</span>
                          </q-btn>
                        </div>
                        <q-btn
                          v-else
                          color="accent"
                          class="q-mt-md"
                          @click="useAbonement.onAddAbonement(abonement)"
                        >
                          В корзину
                        </q-btn>
                      </div>
                    </q-card>
                  </div>
                </div>
              </q-carousel-slide>
            </template>
          </base-carousel>
        </div>
      </div>
    </section>

    <section ref="scheduleRef" class="schedule" :class="getPadding">
      <div id="gsapScheduleTitle" class="text-h4 text-center text-uppercase">
        Расписание
      </div>

      <div id="gsapSchedule" class="schedule__section q-mt-xl">
        <q-table
          :columns="tableColumns"
          :rows="tableRows"
          flat
          square
          hide-bottom
          row-key="name"
        />
      </div>
    </section>

    <section class="trainers" :class="getPadding">
      <div id="gsapTrainersTitle" class="text-h4 text-center text-uppercase">
        Тренерский состав
      </div>

      <div id="gsapTrainers" class="trainers__section q-mt-xl">
        <div class="row q-col-gutter-md">
          <div
            v-for="(trainer, i) in trainers"
            :key="i"
            class="col-12 col-sm-6"
          >
            <q-card flat square bordered class="trainers__card-item">
              <q-card-section
                :horizontal="$q.screen.gt.sm"
                :class="{ 'q-pa-none': $q.screen.lt.md }"
              >
                <q-card-section
                  class="col-4 flex flex-start items-start"
                  :class="{ 'q-pa-none': $q.screen.lt.md }"
                >
                  <q-img :src="'/images/' + trainer.img" />
                </q-card-section>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ trainer.name }}</div>
                  <div class="text-subtitle1 q-mt-sm q-mb-xs">
                    Направление: {{ trainer.direction }}
                  </div>
                  <div class="text-body2 text-grey">
                    {{ trainer.description }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <section class="media" :class="getPadding">
      <div id="gsapMediaTitle" class="text-h4 text-center text-uppercase">
        Медиа
      </div>

      <div id="gsapMedia" class="media__section q-mt-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div
              class="media__video flex justify-center items-center"
              @click="showVideoOverlay = true"
            >
              <q-btn
                round
                size="md"
                color="accent"
                text-color="primary"
                icon="play_arrow"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="media__grid">
              <div class="media__grid-item soundcloud">
                <iframe
                  width="100%"
                  height="100%"
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/947814232&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>
              <a
                href="https://www.instagram.com/tnflava/"
                target="_blank"
                class="media__grid-item instagram-1 shadow flex items-end text-white q-pa-md"
              >
                <span class="text-caption">
                  @tnflava on instagram: лучшая студия брейк-данса в Уфе.
                  Расписание тренировок: Пн, ср и пт с 20:00 до 21:00.
                  Приглашаем детей от 7 до 14 лет.
                </span>
              </a>
              <a
                href="https://www.instagram.com/p/CT2YyRCAvhN/"
                target="_blank"
                class="media__grid-item instagram-2 shadow flex items-end text-white q-pa-md"
              >
                <span class="text-caption">
                  @tnflava приглашает всех желающих в нашу группу. Все вопросы
                  вы можете задать в директ или по телефону: +7 (937) 332-36-35
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="contactsRef" class="contacts" :class="getPadding">
      <div id="gsapContactsTitle" class="text-h4 text-center text-uppercase">
        Контакты
      </div>
      <div id="gsapContacts" class="contacts__section q-mt-xl">
        <div class="leaflet-map">
          <div id="leaflet"></div>
          <div
            class="info d-flex column justify-center items-center text-center full-height q-pa-md"
          >
            <div class="text-subtitle1">Адрес: ул. Мажита Гафури, 27</div>
            <div class="text-subtitle1">
              <a href="https://clck.ru/U6TG9" target="_blank">
                смотреть на карте
              </a>
            </div>

            <div class="text-subtitle1 q-my-md">
              Телефон:
              <a href="tel:+79373323635" target="_blank">+7 (937) 332-36-35</a>
            </div>

            <q-btn color="accent" @click="onOpenFormDialog()">Записаться</q-btn>
          </div>
        </div>
      </div>
    </section>

    <note-dialog
      v-model:dialog="showFormDialog"
      v-model:direction="selectedDirection"
      @set-doc="clearData"
    />
    <video-overlay v-model:dialog="showVideoOverlay" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch, Ref, onMounted, nextTick } from 'vue';
import { useQuasar, scroll } from 'quasar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BaseCarousel from 'src/components/base/BaseCarousel.vue';
import NoteDialog from 'src/components/NoteDialog.vue';
import VideoOverlay from 'src/components/VideoOverlay.vue';
import GradientChip from 'components/GradientChip.vue';
import { IDirection } from 'models/pages/indexPage';
import {
  directions,
  abonementItems,
  tableColumns,
  tableRows,
  trainers,
} from 'constants/pages/indexPage';
import { getPadding } from 'composables/useSpacing';
import { useAbonement } from 'composables/useAbonement';
import { gsapAnimation } from 'helpers/gsapAnimation';

interface IndexPageProps {
  scrollToLink: string | null;
}

interface RefsObject {
  [name: string]: Ref;
}

const props = defineProps<IndexPageProps>();

const $q = useQuasar();

const { getScrollTarget, setVerticalScrollPosition } = scroll;

const showFormDialog = ref(false);

const showVideoOverlay = ref(false);

const selectedDirection = ref('Танцы');

const mainRef = ref<HTMLElement | null>(null);

const directionsRef = ref<HTMLElement | null>(null);

const abonementsRef = ref<HTMLElement | null>(null);

const scheduleRef = ref<HTMLElement | null>(null);

const contactsRef = ref<HTMLElement | null>(null);

const refsObject: RefsObject = {
  mainRef,
  directionsRef,
  abonementsRef,
  scheduleRef,
  contactsRef,
};

watch(
  () => props.scrollToLink,
  (newValue) => {
    if (newValue && newValue in refsObject) {
      const target = getScrollTarget(refsObject[newValue].value);
      const offset =
        newValue === 'mainRef'
          ? refsObject[newValue].value.offsetTop
          : refsObject[newValue].value.offsetTop - 50;
      const duration = $q.screen.lt.md ? 600 : 400;
      setVerticalScrollPosition(target, offset, duration);
    }
  }
);

const onOpenFormDialog = (direction?: IDirection) => {
  showFormDialog.value = true;
  selectedDirection.value = direction ? direction.title : 'Танцы';
};

const clearData = () => {
  selectedDirection.value === 'Танцы';
};

const loadLeafletMap = () => {
  const map = L.map('leaflet').setView([54.72776, 55.928633], 12);

  const markerIcon = L.icon({
    iconUrl: '/images/marker.png',
    iconSize: [40, 40],
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([54.72776, 55.928633], { icon: markerIcon })
    .addTo(map)
    .bindPopup('ул. Гафури, 27 <br> вход со двора, 1 подъезд');
};

const gsapAnimationStart = () => {
  const fromLeft = [
    '#gsapDirectionsTitle',
    '#gsapAbonementsTitle',
    '#gsapScheduleTitle',
    '#gsapTrainersTitle',
    '#gsapMediaTitle',
    '#gsapContactsTitle',
  ];

  const fromBottom = [
    '#gsapDirections',
    '#gsapAbonements',
    '#gsapSchedule',
    '#gsapTrainers',
    '#gsapMedia',
    '#gsapContacts',
  ];

  fromBottom.forEach((el) => {
    gsapAnimation(el, {
      scrollTrigger: el,
      y: 100,
    });
  });

  fromLeft.forEach((el) => {
    gsapAnimation(el, {
      scrollTrigger: el,
      y: 100,
    });
  });

  gsapAnimation('#gsapMainTitle', {
    ease: 'slow',
  });
};

onMounted(async () => {
  loadLeafletMap();
  await nextTick();
  gsapAnimationStart();
});
</script>

<style scoped lang="scss">
@import 'src/css/pages/index.scss';
</style>
