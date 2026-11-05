# PLUNZ Pomodoro

A local focus timer with 25-minute focus sessions, 5-minute short breaks, and a 15-minute long break after every four completed focus sessions. The timer can be paused, reset, or advanced. It uses wall-clock time so locking a phone or switching tabs does not slow it down. State stays in this browser; there are no accounts, tasks, analytics, or backend.

The app is mobile first, installable, and usable offline after the first successful load. It supports English, Portuguese, and Spanish and shares the PLUNZ language preference on `plu.nz` hosts. It is published at [pomodoro.plu.nz](https://pomodoro.plu.nz/). Its timer controls, card, and Darkppuccin theme use the pinned [PLUNZ component library](https://github.com/plu-nz/lib.storybook).

## Development

Use pnpm only:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm exec wrangler deploy --dry-run
pnpm deploy
```

Static output is in `dist/`. Wrangler publishes it as Workers Static Assets on the PLUNZ Cloudflare account and configures the custom domain. No backend or secret is required.

See [source](src/README.md), [public assets](public/README.md), and [agent instructions](AGENTS.md).
