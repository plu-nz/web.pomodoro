import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import { Button, Card, Theme } from '@plunz/storybook';
import { advance, duration, initialTimer, pause, remaining, restore, select, start, type Phase, type Timer } from './timer';
import { useLocale } from './locale';
import '@plunz/storybook/styles.css';
import './style.css';

const key = 'plunz.pomodoro.timer.v1';
function readTimer(): Timer { try { return restore(JSON.parse(localStorage.getItem(key) ?? 'null')); } catch { return initialTimer(); } }
function App() {
  const { preference, locale, t, change } = useLocale();
  createEffect(() => { document.documentElement.lang = locale(); });
  const [timer, setTimer] = createSignal(readTimer());
  const [now, setNow] = createSignal(Date.now());
  const [completed, setCompleted] = createSignal(false);
  const update = (value: Timer) => { setTimer(value); try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Timer still works without storage. */ } };
  const tick = () => {
    const current = Date.now(); setNow(current);
    const state = timer();
    if (state.endAt !== null && current >= state.endAt) { update(advance(state)); setCompleted(true); }
  };
  onMount(() => { tick(); const interval = window.setInterval(tick, 250); document.addEventListener('visibilitychange', tick); onCleanup(() => { clearInterval(interval); document.removeEventListener('visibilitychange', tick); }); });
  const seconds = () => Math.ceil(remaining(timer(), now()) / 1000);
  const clock = () => `${String(Math.floor(seconds() / 60)).padStart(2, '0')}:${String(seconds() % 60).padStart(2, '0')}`;
  const progress = () => 1 - remaining(timer(), now()) / duration(timer().phase);
  const phaseName = (phase: Phase) => phase === 'focus' ? t('focus') : phase === 'short' ? t('short') : t('long');
  const choose = (phase: Phase) => { update(select(timer(), phase)); setCompleted(false); };
  const toggle = () => { update(timer().endAt === null ? start(timer(), Date.now()) : pause(timer(), Date.now())); setCompleted(false); };
  onMount(() => { if ('serviceWorker' in navigator) void navigator.serviceWorker.register('/sw.js'); });
  return <Theme accent="orange" shape="rounded" class="app">
    <a class="skip-link" href="#timer">{t('focus')}</a>
    <header><a class="brand" href="https://www.plu.nz/" aria-label={t('home')}><span class="mark">✳</span> PLUNZ</a><label class="locale">{t('language')} <select value={preference()} onChange={e => change(e.currentTarget.value as 'system' | 'en' | 'pt' | 'es')}><option value="system">{t('system')}</option><option value="en">English</option><option value="pt">Português</option><option value="es">Español</option></select></label></header>
    <main id="timer"><p class="eyebrow">POMODORO / PLUNZ</p><h1>{t('tagline')}</h1><Card class="timer-card">
      <div class="phases" role="group" aria-label={t('phases')}>{(['focus', 'short', 'long'] as Phase[]).map(phase => <Button variant="ghost" type="button" aria-pressed={timer().phase === phase} onClick={() => choose(phase)}>{phaseName(phase)}</Button>)}</div>
      <div class="dial" style={{ '--progress': `${progress() * 100}%` }}><div class="dial-inner"><span class="phase-label">{phaseName(timer().phase)}</span><span class="clock" role="timer" aria-label={`${clock()} ${t('remaining')}`}>{clock()}</span><span class="cycle">{timer().completedFocus} {t('session')}</span></div></div>
      <div class="actions"><Button type="button" onClick={toggle}>{timer().endAt !== null ? t('pause') : remaining(timer(), now()) < duration(timer().phase) ? t('resume') : t('start')}</Button><Button variant="outline" type="button" onClick={() => update(select(timer(), timer().phase))}>{t('reset')}</Button><Button variant="ghost" type="button" onClick={() => { update(advance(timer())); setCompleted(false); }}>{t('skip')}</Button></div>
      <p class="hint">{t('cycle')}</p>
    </Card><p class="privacy">{t('local')} {t('install')}</p><span class="sr-only" role="status" aria-live="polite">{completed() ? phaseName(timer().phase) : ''}</span></main>
    <footer>© PLUNZ</footer>
  </Theme>;
}
render(() => <App />, document.getElementById('root')!);
