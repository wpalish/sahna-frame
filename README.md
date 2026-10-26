# SahnaFrame

Original manual scene comparison for one owned transparent PNG. The browser places the same subject in three authored geometric scenes, then prepares one explicitly selected PNG and a separate measurement manifest. No AI, background removal, arbitrary layers or bulk processing.

The bounded local workflow is verified with60 automated cases, actual Chrome exports, authenticated HTTP refusals, file persistence and restore evidence. The initial full UI review and a scoped verdict scored all five subsequent corrections resolved;21final captures cover1126/native1125desktop and400mobile CSS widths. DESIGN.md and its sidecar document the finished source. This repository provides source and local run instructions; public server hosting is not supplied.

## Run locally

Requires Node24.15–24.x; no npm packages or external services. Set your own initial account name and private password of14–200characters, then run:

```sh
ADMIN_USER=your_name ADMIN_PASSWORD='your-own-private-password' node start.js
```

Open `http://127.0.0.1:3000`. Optional `PORT` and `DATABASE` override the port and `.data/sahna.sqlite` path. The initial administrator is created only in an empty user table. No built-in credential, password reset or migration from another product. Create synthetic local participants through the administrator form. Keep `.data`, private credentials, sessions and SQLite copies out of Git.

```sh
npm test
```

The explicit TAP suite covers7subject/geometry,6PNG framing,11canvas-controller,10SQLite-store,8authenticated HTTP and18app-integration cases. Browser primitives in integration tests are doubled; those tests do not establish rendered pixels, accessibility certification or full security.

## Bounded workflow

- Choose one own/synthetic transparent PNG: at most4MiB,4million pixels and4096pixels per side. Bounded framing/CRC refuses animation, eXIf and unsupported critical chunks; actual browser decode, dimension agreement and alpha inspection are mandatory. This is not a full hostile compressed-decoder audit.
- At least one alpha0pixel and one alpha≥16pixel are required. The placement bounds include every alpha>0pixel, including faint edges. Opaque, empty and only-near-invisible files refuse.
- Set integer size20–80%, center X and baseline Y. The nonzero-alpha bounds fit proportionally into the requested square, with rounded dimensions and floored X. All visible bounds must remain inside a fixed1000×1000output. No rotation, stretching, cropping visible pixels or foreground occlusion.
- Compare the three fixed v1 scenes `linen`, `arch`, `steps`. Background geometry and an illustrative shadow are behind the subject. Lighting and the apparent material are not physical simulations.
- Select a scene explicitly, prepare its actual preview buffer, then use separate PNG and JSON download links. Output is opaque1000×1000PNG, at most8MiB. Preparation is not download or delivery. SHA256/manifest are unsigned byte/settings consistency, not rights, authenticity, product truth, quality or marketplace acceptance.

The synthetic bottle is a deterministic authored test illustration, not a real product. Its embedded origin is documented in `docs/synthetic-provenance.json`. Adding origin metadata changed the demo's bytes from the original519byte input to1038bytes while preserving decoded RGBA. Old private acceptance records and exports still bind the original file; a new demo file intentionally cannot reopen them. No old saved record was rewritten.

## Immutable shared metadata

A saved set freezes title1–120UTF16characters after outer trim, declared source metadata, placement, scene version/order and derived geometry. The server assigns identity, owner and time. It receives declared metadata, not image pixels; there is no image upload endpoint. Reopen requires exactly the same source bytes and metadata. Images, export buffers and download receipts are not saved.

All authenticated staff share one metadata area and limits; this is not tenant isolation. Only the creator archives a set; an administrator does not override authorship. The default list hides archived sets; explicit history keeps them available for local reopening. No edit, delete, reassignment or unarchive.200sets and1000accepted command keys include history.

Explicit create/archive/restore use one atomic global-revision CAS, a fresh lowercaseUUIDv4key and server-clock guard. An unrelated write makes an older command stale; replay refuses instead of reporting idempotent success. Reads and elapsed time do not write. A rejected source remains blocked until a new valid PNG is accepted; placement changes cannot recover it.

Same-account in-app refresh retains the live file and draft. Identity changes clear source, geometry defaults, title, pending selection and URLs. Full reload may lose live input. Clearing the interface does not erase copies or human knowledge. A lost write response may follow a commit: the UI reports an unknown outcome, requires an explicit relevant read and does not resend automatically.

Admin JSON backup excludes users, credentials, sessions, audit and images. Restore requires an empty metadata workspace and existing referenced account roles; strict row/event/version/source/geometry/time checks run before one restore event. Consistent full SQLite backups remain private and separate. HTTP JSON limit2MiB. Consistently recomputed unsigned forgeries are not prevented.

## Evidence and limits

`docs/contract.md` is the original design contract; `docs/implementation-ledger.md` records actual changes and checks. Whole source review found two concrete recovery defects, now covered by real RED→GREEN regressions. A source-correction verdict is not a UI or release verdict.

Actual acceptance uses synthetic files and accounts only. Three original-input Chrome PNG/JSON pairs passed independent Pillow size/opacity/hash/subject-interior checks. Main workspace has four accepted commands and one archive; no acceptance mutation should be replayed. Owned restart at revision3preserved the whole workspace, audit, all five own tables and72prior private databases.18actual authenticated HTTP refusals preserved workspace/audit4; current JSON restored exactly in a separate fresh private file. These are bounded observations, not load, low-memory, physical-device, touch, screenreader, public-server or full security certification.

Genome Cosmetics, OSIMA Cosmetics and LuxCosmetic are three prior official-source scenario hypotheses in `docs/buyers.json`. Their original source/contact dates remain unchanged. Need, role, tools, rights, budget and interest are unknown; no new outreach, customers, contracts, expense or revenue is claimed.

MIT. Noto Sans is self-hosted with its OFL in `public/fonts/OFL.txt`. No Pebblely code, branding, templates or imagery is included.
