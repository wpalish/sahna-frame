# Reference22 → SahnaFrame: bounded contract before code

26Oct2026. Author decisions under the owner's continuing100-product instruction. Product is not implemented, tested, released or counted yet. Published programme39/624 remains unchanged. Existing official-source screen dated05:41 and3company hypotheses are retained, not re-researched.

## Job and approaches

One owned or synthetic transparent PNG → three self-authored geometric scenes using the same placement → explicit selection → one actual PNG and a measurement manifest. Save an immutable metadata set and reopen with the exact source file. Not AI/background removal/product photography, crop preparation(ref21), bulk normalization(ref24), delivery or marketplace approval.

Browser-only JSON projects reduce infrastructure but make shared immutable history and restart acceptance weaker. A general scene editor adds arbitrary layers/occlusion and an unbounded export contract. Chosen author approach: three fixed authored scenes plus a small authenticated shared SQLite metadata workspace, reusing only owner-authored auth/strictJSON/parser infrastructure. New subject-alpha, placement, scene rendering and exact export behavior receive their own tests. No vendor code, images, templates or APIs.

Stack delegated by programme context: native Node24 ESM/SQLite, HTML/CSS/JavaScript/Canvas2D, no packages or paid services. Working screen is code-led. An optional layout question has been sent; until an answer the proposed comparison layout is an author assumption, not user approval. No new standing visual preference is recorded.

## Input and actual alpha

Single PNG only,1–4194304 bytes, width/height1–4096, width×height≤4000000. Bounded framing/CRC/chunk-order/parser rejects APNG/eXIf/unknown critical chunks. JPEG/EXIF,SVG,URLs,drag imports and remote files unsupported. Browser must decode; decoded dimensions must exactly match header. Parser is not a complete compressed-data/security validator.

After decoding, draw full source to its own canvas and inspect actual RGBA. Require at least one fully transparent pixel(alpha0) and at least one visible pixel(alpha≥16). Entirely opaque, entirely transparent and only near-invisible alpha1–15 images refuse. Bounds include every pixel with alpha>0, including faint edges. Nonzero-alpha bounding box is {x,y,width,height}, integer, inside source. Fully transparent outer margins alone may be trimmed; this is not cutout or semantic subject detection. Server receives declared counts/bounds only and cannot verify actual alpha or file bytes.

Source DTO exactly {format:'png',sha256:lowercase64hex,byteLength,width,height,bounds:{x,y,width,height},transparentPixels,visiblePixels}. Counts integers1..pixelCount and sum≤pixelCount; bound area≥visiblePixels; transparentPixels≥pixelCount−boundsArea. This validates consistency, not authenticity. Changed file with identical visible pixels but different bytes fails exact reopen. No image data/name/path in server metadata or JSON backup.

Live image bytes, source/scratch/three1000×1000 canvases and encoded output consume bounded dimensions but peak memory is not measured or promised safe on low-memory devices. Every replacement/identity change closes bitmaps and revokes output URLs. A failed replacement may retain a clearly labelled previous preview, but cannot export/save until a valid source is selected. Empty first failure never claims a previous result exists.

## Placement, scenes and layer order

Output fixed1000×1000, opaque PNG, scene version1. Settings exactly {sizePercent,centerX,baselineY}, integer20–80/0–1000/0–1000. Default60/500/800. Fit nonzero-alpha bounds proportionally within a square(sizePercent×10). Longer source dimension becomes that size; other dimension=Math.max(1,Math.round(short×size/long)). Destination x=Math.floor(centerX−width/2), y=baselineY−height. All subject bounds must fit0..1000 inclusive; overflow refuses and names the affected placement control. No rotation, stretching, clipping, foreground props, AI or arbitrary layer editing.

Before scaling, source bounds materialize into an integer scratch canvas; avoid sample bleed from neighboring pixels. Image smoothing enabled. Three scenes are fixed self-authored geometry: `linen` pale mineral ground with asymmetric vertical plane; `arch` saturated indigo/peach planes and a simple arch; `steps` sage ground with horizontal step blocks. Exact v1 constants live in a shared scene descriptor, included in recipe/manifest by their versioned IDs. Scene backgrounds are drawn first, an illustrative geometric shadow behind the subject second, subject last. No later layer may occlude it. Shadows/planes are stylized illustrations, not physical lighting or product truth. All three use identical source and derived placement.

Three previews are actual final1000 buffers shown at CSS size. Render all3 as one guarded generation; no half-current mix accepted. Local source/settings/scene selection/reopen intent changes generation and removes old download links immediately. A later rejected edit cannot label old output current. No hidden model-only hook in tests.

## Explicit export and saved sets

Selection is one of the three fixed scene IDs. Preparing creates an encoded PNG for selected actual preview buffer plus an unsigned JSON manifest. Export encoding is separately bounded8MiB; PNG header/actual dimensions must be1000×1000, outputSHA/byteLength describe actual bytes. Manifest contains schema `sahna-frame-export-v1`, sceneVersion1, selectedScene, full source metadata, exact settings/derived placement, actual output metadata, clientGeneratedAt. Two explicit links; prepare is not download/delivery. Manifest/source hashes do not prove rights, authenticity, unmodified visible pixels or human review.

Saved set normalized title1–120UTF16 after trim, source, settings, sceneVersion1 and ordered scene IDs; no selected export or output bytes/hash claimed as server fact. Save does not export. Saved row has server owner/time/id, immutable contents and creator-only archive visibility; admin cannot override ownership. Working list hides archived, explicit history includes them. No edit/delete/unarchive/reassign. Reopen archived history is allowed as a local preview task, requires exact source metadata/fingerprint; saving it creates a new immutable set by explicit command. Server/source archives never erase image copies.

## HTTP, persistence, restore

Roles admin/operator share one local metadata area. Not tenant isolation. GET /health,/api/config,/api/session,/api/state; POST /api/login,/api/logout,/api/sets,/api/sets/:uuid/archive. Admin GET/POST /api/users,GET /api/audit,/api/backup,POST /api/restore. No image upload route, external fetch/connectors or file import API. HttpOnly/SameSiteStrict dedicated `sf_session`, CSRF and exact same Origin/Host, no-store JSON/no-cache static, bounded2MiB strict UTF8 JSON/decoded duplicate-key refusal. Reject unknown paths/methods/query/encoded path tricks; authenticated operator cannot call admin routes.

All accepted metadata commands use one BEGIN IMMEDIATE transaction: current actor role, global revision(including unrelated mutation), fresh lowercaseUUIDv4 key across rows/archive/restore events, serverclock≥last accepted command. Stale/replay/foreign creator/unknown fields/types/corrupt derived geometry refuse with entire workspace/audit unchanged. Repeat is failure, not idempotent success. Server assigns owner/id/time. GET/refresh/time alone never write.

SQLite separate application ID/version from Qiyiq;200sets/1000accepted keys including archives/restores. Five private tables audit/failures/sessions/users/workspace; accounts/session/audit excluded from JSON. Export JSON `sahna-frame-v1` contains sets+keys only. Restore admin/empty workspace/current referenced account roles, strict unique immutable row/event binding, times/limits/source/geometry/scene v1 consistency. One fresh restore key/audit event; no source overwrite. Recomputed unsigned forgery is not prevented. Consistent full SQLite backup separately private; owned restart/wholeworkspace/audit/all5own/priorDB preservation before any stop.

## Async, drafts, recovery and language

Image generation separate from metadata-read generation. Held file/demo/read/export responses cannot replace newer source/settings/actor. Recipe reopen captures selected immutable row at intent. Same-account in-app refresh preserves actual live source/settings/title and reconciles accepted pending decode. Identity change/logout clears all live source/controls/URLs/pending/title; late old reply ignored. Default geometry after identity reset60/500/800. Full reload may lose live file/draft. Visibility/pageshow revalidate session/access; no-store/hidden UI do not promise memory/copy erasure.

Unknown network write outcome may be after commit: say outcome unknown, require explicit current GET, never auto-resend. No promise "nothing saved" on transport error. Keep same-account unsaved title/placement through stale conflict and refresh; new account must not inherit it. RU/KK action/recovery copy, native labelled controls, field bounds/errors aria-associated, polite status, visible focus,44px targets; previews have textual scene names/source/placement/output measures. Actual keyboard/desktop/mobile checks required, no touch/screenreader certification inferred.

## Verification and release gates

Design-only cases: alpha0/16/15/255, odd/non-square bounds/rounding, min/max placement and overflow, exact scene layer order/same subject destination/distinct background pixels, encoder mismatch/failure/size, stale load/decode/prepare/read/account/reopen, store/HTTP atomic rejection/keyrestorebinding, file restart/empty restore/corrupt copies. Tests do not yet exist or pass.

Real own synthetic PNG with transparent margins/asymmetric subject/partial alpha, actual3scene PNGs and Pillow dimensions/pixels/hash/manifest checks; opaque/empty/corrupt/differentbytes refusals, stale save/refreshdraft, creator archive/history/reopen, main restart preserved all5own/priorDBs, current JSON restore and deliberate HTTP refusals. Actual desktop and320–480CSS mobile/nativekeyboard, valid opened captures/source hashes, one detector, fresh whole code review and full rendered/source review, scoped fix verdicts, documenter/DESIGN, separate complete public repo/exactCI/ZIP/index; finalize once only after all gates. No previous Qiyiq tests/evidence transferred as this product's execution.

Company hypotheses Genome Cosmetics/OSIMA/LuxCosmetic retain official source/contact dates; fit/demand/rights/budget unknown. No outreach before fresh actual account/contact/fullfamilyallchannels clearance. No automatic mail/TG searches/sends, expenses, contracts or real customer data in this implementation.
