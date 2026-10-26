# SahnaFrame implementation plan

Authority: PRODUCT.md and docs/contract.md. Owner explicitly instructs autonomous original100-product execution; ordinary stack/domain choices delegated, no extra permission gate inferred. Optional comparison question unanswered; no visual approval claimed. A fresh brainstorming builder check found nothing important left. Native execution by parent, no per-task implementer agents; one whole-source review and fresh Impeccable finish review/documenter after actual captures.

## Files and interfaces

- `public/scene.js`: `checkKeys(object,keys,label)`, `integer(value,min,max,field)`, `sourceMetadata(input)`, `alphaBounds(rgba,width,height)`, `placement(source,settings)`, `normalizeSet(input)`, `sceneSpec(id,version=1)`. Shared pure geometry/strict DTO/own authored scene descriptors.
- `public/image-header.js`: bounded owned PNG framing/CRC parser only, input4MiB/4MP/4096 and separate output8MiB/1000square. No JPEG support. Actual browser decoder/alpha acceptance remains mandatory.
- `public/controller.js`: `SceneSession({createCanvas,decode,encode,hash,url})`; `load(file,{set})`, `configure(settings)`, `select(sceneId)`, `prepare()`, `identity(name)`, `invalidate()`. All real generation/state guards, scratch pixel crop and three actual scene buffers. `onChange` renders UI; no hidden test hook. Browser primitives injectable only for Node tests.
- `lib/store.js`: `SetStore(path,{now})`, snapshot/command/backup/restore, five-table SQLite/current actor/transaction/fresh keys/clock guards. Owner auth/strict JSON infrastructure may be adapted with new application ID/format/cookie; own tests execute actual product code.
- `server.js`,`start.js`,`lib/auth.js`,`lib/strict-json.js`: exact documented HTTP/Origin/CSRF/auth/session/rate/body contract; no image endpoint. Test-only HTTP servers always close.
- `public/index.html`,`styles.css`,`app.js`,`fonts/`: code-led app after live direction resolution, RU/KK/native form and three-up comparison, locally held images, strict dynamic controls and metadata recovery. Read craft-floor immediately before UI edits. Source/geometry/errors available as text.
- `module.js`,`README.md`,`AGENTS.md`,`docs/*`,`.github/workflows/ci.yml`: exact bounded truth, tests, licences/provenance,3prior sourced company hypotheses and release evidence. No private files.

## Task1: strict subject/placement math, RED→GREEN

Tests `test/scene.test.js` name actual bad branches: alpha0+16 required, full-alpha-bound includes faint1px edge, opaque/empty/near-invisible reject; count/bound DTO consistency; floating/coerced/unknown fields refuse; default600-square fit and odd rounding; minimum20%/maximum80%; destination overflow refuses field; all3scene specs/version strict and same placement; frozen set content and title trim.

Literal fixture3×2 RGBA alpha rows `[0,255,0]/[1,16,0]` gives bounds{x:0,y:0,width:2,height:2},transparent3,visible2. Sourcebounds3×2/size60 gives width600,height400,x200,y400 at500/800. Tall2×3 gives400×600,x300,y200. Bounds3×2/size21 gives210×140,x395,y660. Center0 with600wide and baseline0 refuse. Do not compute expected values with production helpers.

Write minimal exports before behavioral bodies only as needed for expected assertion failures; a module import/typo error is not acceptedRED. Run actual suite after each green, record unique tests not replay sums.

## Task2: PNG/frame parsing and render lifecycle

Owned framing code may be reused with attribution, but new policy tests first: JPEG/4MiB/4MP/4096,APNG/eXIf/chunkorder/CRC/decoder mismatch, unknowncritical/truncation. Existing compressed decoder not reimplemented. Actual alpha extracted after real decode; dimensions agree before allocation acceptance.

Controller tests fail for removed generation checks, URL/bitmap cleanup, source-bounds scratch omission, selected-scene mismatch or weak manifest binding. Assert complete draw arguments and actual consumer state, not fake existence. All3scenes background/shadow before same subject destination; invalid settings block prepare/save, retain prior preview honestly. `prepare` captures exact current generation/source/settings/selectedscene, inspects encoded1000square bytes, output hash and8MiB. Failure never exposes old href/current label. Late load/decode/encode ignored after newer file/settings/actor/reopen. Same-account metadata refresh remains an app integration concern.

## Task3: immutable sets/restore and real authenticated HTTP

Store test skeletons RED before adaptation. Behaviors: exact immutable normalizedsource/settings/version/scenes/derivedplacement/serverowner/time; creator archive/admin-nooverride; stale unrelated globalrevision/newUUID/clock/refusedwholeworkspace+audit; GETnoevent; filereopen/restart; currentaccountrolecheck; emptyadminrestore exactsets/keys+1restoreevent; forged duplicate immutable rows/events and missing bindings/foreignversion/futuretimes/missingcurrentusers reject atomically.200sets/1000keys limits include historical archive/restore keys.

HTTP fixtures use separate fresh private temp databases and ports with synthetic accounts; close in cleanup. Assert actual status and complete state/audit for CSRF/origin/method/path/decodedduplicates/strictfields/inputmetadata/creator/archive/nonemptyrestore/operatoradminroutes/noimageupload/2MiB. Dedicated sf_session cookie, not port-isolation claim.

## Task4: app/direction and meaningful UI integration

After direction page answer or actual timeout, persist six-block surface contract with actual seed reference; no direction text served with app. No stored standing preference from silence. Apply fixing-accessibility/UIUXProMax only relevant rules; no off-topic template copied.

Node integration actualapp+controller/parser/math with only browser primitives doubled: load completion reconciles forms/title/pending set after same-account refresh; held demo/newerfile/settings/reopen/account; acceptedPOST late response cannot reveal older actor; unknown network outcome requires explicitGET/noautoresend; stale save retains title/placement; identity resets defaults; RU/KK actionable alpha/file/placement/export recovery+associated invalid field; emptyfirstfailure truthful. Use elapsed-time condition polling for native WebCrypto; no fixed event-loop-iteration budget.

## Task5: own isolated browser and preservation

Create fresh private mainDB/accounts only after fresh port inventory; use127.0.0.1 origin distinct from owner public workspace. Never reuse another product origin/accounts/default.data. Own synthetic transparent asymmetricPNG only. Actual3previews/nativePNG+manifest downloads; compare real dimensions/subject rectangle/alpha composites/distinctscene pixels/hashes in independent Pillow. File/differentbytes/opaque/empty/corrupt/nearinvisible cases. One explicitcreate, unrelatedconcurrentedit/stalerefusal/wholeaudit+draftrefresh, currentnativecreate/creatorarchive/history/exactreopen. Record commands once, guards forbid replay.

Before ownedrestart freshPID/lstart/command/cwd/listener; consistentprivatebackup, wholeworkspace/audit/all5own and prior privateDB fingerprints. Restart once for meaningful persisted state; verify all exact. Staticfiles served exacthash/no-cache; no restart merely for UI. CurrentJSONemptyrestore and deliberate authenticatedrefusals in ownfiles, not untrusted production data. No memory/tenant/fullsecurity claims.

## Task6: review and documentation

Fresh whole-source review once using currentcommit/contract/tests, real important fixes one RED→GREENbatch, minor rulings explicit. Actual1126desktop and400mobile/nativekeyboard states including source/3scenes/selectedexport/staleform/recovery/savedset/archive/adminrestore/language; ordinary viewport screenshots with measured pre/postCSS/scroll/sourcehash/rawcopies/opened. No known-broken fullPage capability reused. One build inspectionbatch, one correctionbatch; one detector after actualUI, fresh complete Impeccable reviewer with packet. Recapture/fix/rebuild/ship follow exact scope; same reviewer scores fixes; documenter writesDESIGN/design.json from finishedsource. No source/pixel/private/runtime inference from screenshots or tests.

## Task7: exact public release

Final explicitTAP tests and credential/path scan; source cleancommit/publicmain/exactSHA CI. Noemptypublicscaffold/repo duplication. `release-results`then current verify/package/publish/index CI/publicZIPHTTP+SHA/actualcatalogueChrome. Only afterallgates `finalize-new-product sahna-frame`once; then queues/state/EXECUTION/automation100inplace/followupvalidator. Published39/624 stays unchanged until real release. Three companyhypotheses keep originaldates/no customer/outreach claims. Baseline20 and Budget/audit-overlay candidates untouched.

## Review focus / self-review

Coverage mapped to tasks1–7. Most consequential cases have owning tests: actualalpha vs declaredmetadata(Task1/2/5), same image generation after metadata refresh(Task4), subject fullyinside/no later foreground(Task1/2/5), outputselectedbuffer/hash and delayedencoding(Task2/4/5), duplicateimmutable-event restorebinding(Task3/5). Auth/DB claims require actualHTTP and preservation; source-only reuse cannot substitute. UI examples and test perturbations do not add producttest counts.
