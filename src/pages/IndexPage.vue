<template>
  <main>
    <section
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
      <div class="absolute text-center">
        <div class="text-h3 text-uppercase">The Notorious Flava</div>
        <div class="text-h6 text-uppercase text-weight-light q-mt-md">
          студия танцев
        </div>
      </div>
    </section>
    <section class="about" :class="getPaddings()">
      <div class="text-h4 text-center text-uppercase">
        Танцуй, <span class="text-primary">вдохновляй</span>, создавай
      </div>
      <div class="text-body1 q-mt-xl">
        Наша программа обучения создана для разных возрастных групп, с учетом их
        индивидуального развития. Мы регулярно организовываем мастер-классы от
        мировых звезд, фестивали, кэмпы и многое другое, а также и сами
        принимаем участие во всевозможных мероприятиях. Наши залы оборудованы
        специальным покрытием, системами контроля температуры, бесплатным wifi -
        созданы все условия для вашего комфорта.
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
    </section>
    <section class="abonements" :class="getPaddings()">
      <div class="text-h4 text-center text-uppercase">Абонементы</div>
      <div class="abonements__section flex q-mt-xl">
        <div class="abonements__box"></div>
        <div class="abonements__slider">
          <the-carousel :items="abonementItems" />
        </div>
      </div>
    </section>
    <section class="schedule" :class="getPaddings()">
      <div class="text-h4 text-center text-uppercase">Расписание</div>
      <div class="schedule__section q-mt-xl">
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
    <section class="trainers" :class="getPaddings()">
      <div class="text-h4 text-center text-uppercase">Тренерский состав</div>
      <div class="trainers__section q-mt-xl">
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
                  <q-img :src="'src/assets/' + trainer.img" />
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
    <section class="media" :class="getPaddings()">
      <div class="text-h4 text-center text-uppercase">Медиа</div>
      <div class="media__section q-mt-xl">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <div class="media__video flex justify-center items-center">
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
                  scrolling="no"
                  frameborder="no"
                  allow="autoplay"
                  samesite="https://soundcloud.com/"
                  src="https://clck.ru/U6Tu6"
                  class="full-height"
                ></iframe>
              </div>
              <div class="media__grid-item instagram-1"></div>
              <div class="media__grid-item instagram-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <form-dialog
      v-model:dialog="showFormDialog"
      v-model:direction="selectedDirection"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import TheCarousel from 'src/components/TheCarousel.vue';
import FormDialog from 'src/components/FormDialog.vue';
import {
  Direction,
  Abonement,
  TableRow,
  Trainer,
} from 'boot/models/pages/indexPage';
import { QTableColumn } from 'quasar';

const $q = useQuasar();

const directions: Direction[] = [
  {
    id: 1,
    title: 'Брейк-данс',
    ageCategory: 7,
    setOfGroups: false,
    description: `
      Уличный танец, сформировавшийся в Нью-Йорке в 60-х годах.
      Это одно из самых популярных и зрелищных направлений,
      включающее сложные физические элементы, насчитывающий
      богатую историю развития и совершенствования. Кроме того,
      брейкинг набирает особую популярность в настоящее время и
      обладает большой перспективой развития, в 2024 году эта
      дисциплина включена в Олимпийскую программу.
    `,
  },
  {
    id: 2,
    title: 'Хип-хоп (choreo)',
    setOfGroups: true,
    ageCategory: 7,
    description: `
      Cпособ передачи стиля Хип-хоп с упором на перфоманс, широко
      используется для шоу, постановок в клипах, концертах,
      рекламе и на TV. В этом направлении внимание акцентировано
      на точности, выразительности, музыкальности. Choreo может
      сочетать в себе и смежные с хип-хопом стили.
    `,
  },
  {
    id: 3,
    title: 'Дэнс-холл',
    ageCategory: 14,
    setOfGroups: true,
    description: `
      Понятие Dancehall гораздо шире, чем кажется на первый
      взгляд. Это не просто танец под музыку, он наполнен смыслом,
      он имеет свою историю, его необходимо хорошо узнать и
      почувствовать, чтобы понять. Это целая культура,
      зародившаяся в гетто Кингстона, столицы Ямайки. Дэнсхолл
      включает в себя множество социальных танцев и, обязательно,
      attitude (подача, характер).
    `,
  },
  {
    id: 4,
    title: 'Вог',
    ageCategory: 14,
    setOfGroups: true,
    description: `
      Стиль танца, базирующийся на модельных позах и подиумной
      походке. Отличительные особенности: быстрая техника движения
      руками, вычурная манерная походка, падения, вращения,
      обильное количество позировок, эмоциональная игра.
      Исполняется Vogue под музыку в стиле House.
    `,
  },
  {
    id: 5,
    title: 'High Heels',
    ageCategory: 14,
    setOfGroups: true,
    description: `
      Это танцевальное направление известно во всем мире, идея
      исполнить популярные движения,встав на каблуки, пришла
      известному американскому хореографу Энди Джею (Andy J.).
      Постановщик проектов на MTV первым выложил в сеть ролики с
      танцем в стиле хип-хоп, изюминкой которого стала обувь на
      шпильке.
    `,
  },
];

const abonementItems: Abonement[] = [
  {
    id: 1,
    title: 'Абонемент на 12 занятий',
    price: 3000,
    discountPrice: 2550,
  },
  {
    id: 2,
    title: 'Абонемент на 8 занятий',
    price: 2400,
    discountPrice: 2040,
  },
  {
    id: 3,
    title: 'Абонемент на 4 занятия',
    price: 1400,
    discountPrice: 0,
  },
  {
    id: 4,
    title: 'Разовое посещение',
    price: 400,
    discountPrice: 0,
  },
  {
    id: 5,
    title: 'Индивидуальные тренировки',
    price: 400,
    discountPrice: 0,
  },
];

const tableColumns: QTableColumn[] = [
  { name: 'time', align: 'left', label: '', field: 'time' },
  { name: 'mon', align: 'center', label: 'Понедельник', field: 'mon' },
  { name: 'tue', align: 'center', label: 'Вторник', field: 'tue' },
  { name: 'wed', align: 'center', label: 'Среда', field: 'wed' },
  { name: 'thu', align: 'center', label: 'Четверг', field: 'thu' },
  { name: 'fri', align: 'center', label: 'Пятница', field: 'fri' },
];

const tableRows: TableRow[] = [
  {
    time: '19:00',
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
  },
  {
    time: '20:00',
    mon: 'Брейк-данс',
    tue: null,
    wed: 'Брейк-данс',
    thu: null,
    fri: 'Брейк-данс',
  },
  {
    time: '21:00',
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
  },
];

const trainers: Trainer[] = [
  {
    name: 'Джан',
    img: 'diamond.jpg',
    direction: 'Брейк-данс',
    description: `
      Дипломированный тренер, организовывал тренировки для атлетов
      #adidasrunners по направлению "Breakletics", сооснователь
      проектов и коллабораций совместно с #redbullrussia и другими
      известными брендами.
    `,
  },
  {
    name: 'Михаил',
    img: 'boogieknight.jpg',
    direction: 'Брейк-данс',
    description: `
      Человек , который в теме много лет, любит танцевать и
      обучать этому других. Совершентсвует свои профессиональные
      навыки, участвуя в различных соревнованиях и фестивалях.
      Имеет опыт как групповой, так и индивидуальной работы с
      детьми
    `,
  },
];

const showFormDialog = ref(false);

const selectedDirection = ref('Танцы');

const onOpenFormDialog = (direction: Direction) => {
  showFormDialog.value = true;
  selectedDirection.value = direction.title;
};

const getPaddings = () => {
  return $q.screen.gt.sm ? 'q-px-xl q-py-xl' : 'q-px-md q-py-xl';
};
</script>

<style scoped lang="scss">
.screen {
  position: relative;
}

.about {
  &__card-item {
    height: 100%;
  }
  &__card-actions {
    position: absolute;
    bottom: 0;
  }
}

.abonements {
  &__box {
    width: 30%;
    background: url('/src/assets/dragon.jpg') center center / cover;
    box-shadow: 7px 0 7px 0 rgb(255 255 255 / 20%);
    z-index: 1;
    @media (max-width: 1024px) {
      width: 40%;
    }
    @media (max-width: 600px) {
      width: 25%;
    }
  }

  &__slider {
    width: 70%;
    margin-left: -2%;
    @media (max-width: 1024px) {
      width: 60%;
    }
    @media (max-width: 600px) {
      width: 75%;
    }
  }
}

.trainers {
  &__card-item {
    height: 100%;
  }
}

.media {
  &__video {
    background: url('/src/assets/hongten.jpg') center center / cover;
    height: 100%;
    @media (max-width: 1024px) {
      height: 260px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    grid-template-areas:
      'a a'
      'b c';

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'a' 'b' 'c';
    }

    &-item {
      height: 260px;

      &:nth-child(1) {
        grid-area: a;
      }
      &:nth-child(2) {
        grid-area: b;
        background: url('/src/assets/kinjaz.jpg') center center / cover;
      }
      &:nth-child(3) {
        grid-area: c;
        background: url('/src/assets/dragon.jpg') center center / cover;
      }
    }
  }
}
</style>
