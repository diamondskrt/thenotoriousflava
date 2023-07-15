import { QTableColumn } from 'quasar';
import {
  IDirection,
  IAbonement,
  ITableRow,
  ITrainer,
} from 'models/pages/indexPage';

export const directions: IDirection[] = [
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

export const abonementItems: IAbonement[] = [
  {
    id: 1,
    title: 'Абонемент на 12 занятий',
    price: 3000,
    discountPrice: 2550,
    total: 2550,
    counter: 1,
  },
  {
    id: 2,
    title: 'Абонемент на 8 занятий',
    price: 2400,
    discountPrice: 2040,
    total: 2040,
    counter: 1,
  },
  {
    id: 3,
    title: 'Абонемент на 4 занятия',
    price: 1400,
    discountPrice: null,
    total: 1400,
    counter: 1,
  },
  {
    id: 4,
    title: 'Разовое посещение',
    price: 400,
    discountPrice: null,
    total: 400,
    counter: 1,
  },
  {
    id: 5,
    title: 'Индивидуальные тренировки',
    price: 1200,
    discountPrice: null,
    total: 1200,
    counter: 1,
  },
];

export const tableColumns: QTableColumn[] = [
  { name: 'time', align: 'left', label: '', field: 'time' },
  { name: 'mon', align: 'center', label: 'Понедельник', field: 'mon' },
  { name: 'tue', align: 'center', label: 'Вторник', field: 'tue' },
  { name: 'wed', align: 'center', label: 'Среда', field: 'wed' },
  { name: 'thu', align: 'center', label: 'Четверг', field: 'thu' },
  { name: 'fri', align: 'center', label: 'Пятница', field: 'fri' },
];

export const tableRows: ITableRow[] = [
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

export const trainers: ITrainer[] = [
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
      детьми.
    `,
  },
];

export const gsapElementsfromLeft = [
  '#gsapDirectionsTitle',
  '#gsapAbonementsTitle',
  '#gsapScheduleTitle',
  '#gsapTrainersTitle',
  '#gsapMediaTitle',
  '#gsapContactsTitle',
];

export const gsapElementsfromBottom = [
  '#gsapDirections',
  '#gsapAbonements',
  '#gsapSchedule',
  '#gsapTrainers',
  '#gsapMedia',
  '#gsapContacts',
];
