export type Phase = 'focus' | 'short' | 'long';
export type Timer = { phase: Phase; completedFocus: number; remainingMs: number; endAt: number | null };
export const minutes: Record<Phase, number> = { focus: 25, short: 5, long: 15 };
export const duration = (phase: Phase) => minutes[phase] * 60_000;
export const initialTimer = (): Timer => ({ phase: 'focus', completedFocus: 0, remainingMs: duration('focus'), endAt: null });
export const remaining = (timer: Timer, now: number) => timer.endAt === null ? timer.remainingMs : Math.max(0, timer.endAt - now);
export const pause = (timer: Timer, now: number): Timer => ({ ...timer, remainingMs: remaining(timer, now), endAt: null });
export const start = (timer: Timer, now: number): Timer => ({ ...timer, endAt: now + timer.remainingMs });
export const select = (timer: Timer, phase: Phase): Timer => ({ ...timer, phase, remainingMs: duration(phase), endAt: null });
export function advance(timer: Timer): Timer {
  if (timer.phase === 'focus') {
    const completedFocus = timer.completedFocus + 1;
    const phase = completedFocus % 4 === 0 ? 'long' : 'short';
    return { phase, completedFocus, remainingMs: duration(phase), endAt: null };
  }
  return { ...timer, phase: 'focus', remainingMs: duration('focus'), endAt: null };
}
export function restore(value: unknown): Timer {
  if (!value || typeof value !== 'object') return initialTimer();
  const v = value as Partial<Timer>;
  if (v.phase !== 'focus' && v.phase !== 'short' && v.phase !== 'long') return initialTimer();
  if (!Number.isSafeInteger(v.completedFocus) || (v.completedFocus ?? -1) < 0 || !Number.isFinite(v.remainingMs) || (v.remainingMs ?? -1) < 0 || (v.remainingMs ?? Infinity) > duration(v.phase)) return initialTimer();
  if (v.endAt !== null && (!Number.isFinite(v.endAt) || (v.endAt ?? 0) < 0)) return initialTimer();
  return { phase: v.phase, completedFocus: v.completedFocus!, remainingMs: v.remainingMs!, endAt: v.endAt ?? null };
}
