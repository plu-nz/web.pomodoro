# PLUNZ Pomodoro

A local focus timer with 25-minute focus sessions, 5-minute short breaks, and a 15-minute long break after every four completed focus sessions. The timer can be paused, reset, or advanced. It uses wall-clock time so locking a phone or switching tabs does not slow it down. State stays in this browser; there are no accounts, tasks, analytics, or backend.

The app is mobile first, installable, and usable offline after the first successful load. It supports English, Portuguese, and Spanish and shares the PLUNZ language preference on `plu.nz` hosts. "Pomodoro" is a working product name; its public address and release are pending.

## Development

Use pnpm only:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
```

Static output is in `dist/`. No domain or production deployment has been configured.

See [source](src/README.md), [public assets](public/README.md), and [agent instructions](AGENTS.md).
