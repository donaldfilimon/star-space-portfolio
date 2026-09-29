# Self-hosted macOS runner

Both jobs in `.github/workflows/deploy-pages.yml` (`build` and `deploy`) run on a macOS arm64 runner registered to this repository. GitHub-hosted jobs can't start while the account's Actions billing is locked, but self-hosted jobs still run.

This note lives in `.github/` rather than `docs/` because `docs/` is the folder GitHub Pages publishes from `main` (the redirect to the user site), so anything added there becomes a public page.

## Registration

| Field | Value |
|-------|-------|
| Labels | `self-hosted`, `macOS`, `ARM64`, `star-space-portfolio` |
| Register at | [Settings → Actions → Runners → New self-hosted runner](https://github.com/donaldfilimon/star-space-portfolio/settings/actions/runners/new?arch=arm64) (macOS, ARM64) |

A runner is registered to one repository. If the same Mac already runs a runner for another repository (for example `abi`), install a second runner in its own directory (for example `~/actions-runner-star-space-portfolio`), run `./config.sh` with the URL and token from the page above, add the custom label `star-space-portfolio`, then run `./svc.sh install && ./svc.sh start`.

Until a runner with these labels is online, the jobs wait in the queue.

## Host requirements

- Homebrew and GNU tar (`brew install gnu-tar`). `actions/upload-pages-artifact@v3` archives the site with `gtar` on macOS because bsdtar has no `--hard-dereference`. The build job installs `gnu-tar` with Homebrew if `gtar` is missing and adds Homebrew's `bin` to `PATH`, since the runner service's `PATH` may not include it.
- Nothing else: `actions/setup-node@v4` downloads Node 22 for darwin-arm64 into the runner's tool cache, and `package-lock.json` pins the darwin-arm64 binaries that `npm ci` needs (`@rolldown/binding-darwin-arm64`, `@typescript/typescript-darwin-arm64`, `lightningcss-darwin-arm64`).
- `actions/deploy-pages@v4` is a Node action that talks to the Pages API with the job's OIDC token; it needs no host tools.

## Security

The workflow runs only on `push` to `main` and `workflow_dispatch`, and each job is also gated on `github.repository == 'donaldfilimon/star-space-portfolio'`, so forks never schedule work on the self-hosted machine. There is no `pull_request`, `pull_request_target`, `issue_comment` or `workflow_run` trigger. If one is ever added, give it a GitHub-hosted fallback job for fork pull requests rather than widening the gate.

The checkout uses `persist-credentials: false`. The workflow's permissions are unchanged (`contents: read`, `pages: write`, `id-token: write`); the Pages and OIDC grants are what `deploy-pages` needs.

Where you can, run the runner under a dedicated macOS user rather than your daily account, and keep no production secrets on the host.

## Pages source

This workflow publishes the full site built with `VITE_BASE=/star-space-portfolio/`. The repository's documented live path is a branch deploy instead: `docs/` on `main` holds a redirect to `https://donaldfilimon.github.io/`, and `npm run deploy:all` publishes the full site to the user site. Decide which one should own `https://donaldfilimon.github.io/star-space-portfolio/` (Settings → Pages → Source) before bringing the runner online; if the redirect should stay, disable this workflow instead.

## Jobs that stay GitHub-hosted

None. The workflow has no other jobs, and without a `pull_request` trigger it needs no fork fallback.
