# Pomodoro agent instructions

Read this repository's `README.md` and the shared PLUNZ `CONTEXT.md` and decisions before changing architecture or product behavior.

- Architecture: SolidJS, TypeScript, and Vite. `src/timer.ts` owns timer rules; `src/index.tsx` owns UI and local persistence and uses the pinned `@plunz/storybook` Theme, Card, and Button components; `src/locale.ts` owns translations; `src/locale-preference.ts` shares the PLUNZ cookie. `public/` holds the manifest, icons, and offline service worker. `wrangler.jsonc` deploys the static app to `pomodoro.plu.nz`. No API or database.
- Keep code and documentation in English. Localize all user-facing text in English, Portuguese, and Spanish. Preserve the system-language default and shared `plunz_locale` cookie.
- Keep timer math independent of the UI. Use wall-clock timestamps so background tabs and locked devices do not change elapsed time. Keep state local and make offline use work.
- Use pnpm only. Install with `pnpm install --frozen-lockfile`, develop with `pnpm dev`, type-check with `pnpm check`, build with `pnpm build`, check deployment with `pnpm exec wrangler deploy --dry-run`, and publish with `pnpm deploy`. Add dependencies only for a concrete need.
- Pin shared components to a reviewed `lib.storybook` Git revision in `pnpm-lock.yaml`. Keep product-specific timer layout and copy here; use the library's theme tokens for shared colors and shapes.
- Before completion, check start/pause/resume/reset/advance, four-session long break, refresh during a running session, phone lock/background behavior, 320px layout, keyboard and screen-reader controls, all three languages, and offline installation.
- Every directory requires a `README.md` index. Update it when contents change.
