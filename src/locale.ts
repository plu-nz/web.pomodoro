import { createSignal } from 'solid-js';
import { readSharedPreference, writeSharedPreference, type SharedPreference } from './locale-preference';
export type Locale = 'en' | 'pt' | 'es';
const key = 'plunz.pomodoro.locale';
const copy = {
  en: { tagline: 'A little space to focus.', focus: 'Focus', short: 'Short break', long: 'Long break', start: 'Start', pause: 'Pause', resume: 'Resume', reset: 'Reset', skip: 'Next', session: 'focus sessions completed', cycle: 'A longer break follows every four focus sessions.', language: 'Language', system: 'System language', local: 'Your timer stays on this device.', install: 'Add to your home screen from your browser menu.', home: 'PLUNZ home', remaining: 'remaining', phases: 'Timer phase' },
  pt: { tagline: 'Um tempo só para focar.', focus: 'Foco', short: 'Pausa curta', long: 'Pausa longa', start: 'Iniciar', pause: 'Pausar', resume: 'Continuar', reset: 'Reiniciar', skip: 'Próximo', session: 'sessões de foco concluídas', cycle: 'Uma pausa longa vem após cada quatro sessões de foco.', language: 'Idioma', system: 'Idioma do sistema', local: 'Seu timer fica neste dispositivo.', install: 'Adicione à tela inicial pelo menu do navegador.', home: 'Início da PLUNZ', remaining: 'restantes', phases: 'Etapa do timer' },
  es: { tagline: 'Un momento para concentrarte.', focus: 'Concentración', short: 'Pausa corta', long: 'Pausa larga', start: 'Iniciar', pause: 'Pausar', resume: 'Continuar', reset: 'Reiniciar', skip: 'Siguiente', session: 'sesiones de concentración completadas', cycle: 'Una pausa larga llega después de cuatro sesiones de concentración.', language: 'Idioma', system: 'Idioma del sistema', local: 'Tu temporizador permanece en este dispositivo.', install: 'Añade la app a la pantalla de inicio desde el menú del navegador.', home: 'Inicio de PLUNZ', remaining: 'restantes', phases: 'Fase del temporizador' },
};
function systemLocale(): Locale {
  for (const tag of navigator.languages.length ? navigator.languages : [navigator.language]) {
    const base = tag.toLowerCase().split(/[-_]/)[0];
    if (base === 'en' || base === 'pt' || base === 'es') return base;
  }
  return 'en';
}
export function useLocale() {
  const [preference, setPreference] = createSignal<SharedPreference>(readSharedPreference(localStorage, key));
  const locale = () => preference() === 'system' ? systemLocale() : preference() as Locale;
  const t = (name: keyof typeof copy.en) => copy[locale()][name] ?? copy.en[name];
  const change = (value: SharedPreference) => { writeSharedPreference(localStorage, key, value); setPreference(value); };
  return { preference, locale, t, change };
}
