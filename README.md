# LDAP Forms

Self-service access requests for organisations that already run LDAP.
Users sign in with their existing directory account, admins build custom
request forms (e.g. "Request access to tool X"), and users submit
applications that admins can review.

> A ground-up rewrite of a university client project originally built with
> Laravel + React. The goal of the rewrite is a clean architecture, full type
> safety end to end, and a proper test suite.

## Features

- [ ] LDAP authentication
- [ ] Role-based access (admin / user), derived from LDAP groups
- [ ] Form builder for admins with custom field types and validation
- [ ] Users submit applications through those forms
- [ ] Admin review workflow (approve / reject / comment)

## Tech stack

| Area     | Tech                                      |
| -------- | ----------------------------------------- |
| Backend  | NestJS, TypeScript                        |
| Frontend | React, Vite, TypeScript                   |
| Tooling  | pnpm workspaces, Vitest, oxlint, Prettier |

## Getting started

Requires Node 24+ and pnpm.

```bash
pnpm install
pnpm dev        # backend on :3000, frontend on :5173
```

`pnpm install` also sets up a pre-commit hook that formats and lints staged
files.

Other scripts (run from the repo root):

```bash
pnpm build        # build all packages
pnpm typecheck    # type-check everything, including tests
pnpm lint         # oxlint (type-aware)
pnpm test         # unit tests
pnpm test:e2e     # end-to-end API tests
pnpm format       # format with Prettier
pnpm check        # everything above except build, as run in CI
```

## Project structure

```
apps/
  backend/    NestJS API (served under /api)
  frontend/   React SPA (proxies /api to the backend in dev)
packages/
  shared/     Types shared by backend and frontend (API contracts)
```

## Development process

This project is developed with the help of AI coding assistants (Claude Code).
I use them for scaffolding, tooling setup and reviews; architecture, domain
logic and final decisions are mine, and every change has to pass the same
checks: strict TypeScript, type-aware linting, and unit + e2e tests
(`pnpm check`).

## License

[MIT](LICENSE)
