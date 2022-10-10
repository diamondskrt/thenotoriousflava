import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

export const getPadding = computed(() =>
  $q && $q.screen.gt.sm ? 'q-px-xl q-py-xl' : 'q-px-md q-py-xl'
);
