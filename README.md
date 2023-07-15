# thenotoriousflava

Stack: Quasar, Vue 3, Typescript, Pinia, Vite, Firebase, GSAP

See demo here: [https://thenotoriousflava.onrender.com/](https://thenotoriousflava.onrender.com/)

![tnflava](https://github.com/diamondskrt/thenotoriousflava/blob/main/src/assets/tnflava.png?raw=true)

## Приложение для студии танцев

Реализован функционал авторизации, записи на новое направление, оформление абонемента через Firebase. Все заявки и абонементы можно посмотреть в админ.панели. Добавлена анимация разделов на главной странице (GSAP). Для отображения студии на карте использована библиотека Leaflet.

Учетные данные для входа: login - mail@mail.ru, password - 123456

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
