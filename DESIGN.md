---
name: SahnaFrame
description: One accepted subject, one shared placement, three inspectable geometric scenes.
colors:
  structural: '#1d433c'
  primary: '#1d5146'
  primary-hover: '#173f37'
  inverse-action: '#d7e8df'
  inverse-action-ink: '#163f35'
  ink: '#203733'
  muted: '#50675e'
  ground: '#f4f6f5'
  paper: '#fff'
  hover: '#e9eeec'
  button-stroke: '#97aaa5'
  field-stroke: '#91a69f'
  divider: '#b5c4bd'
  inset-divider: '#d0d9d3'
  image-ground: '#e6ece7'
  image-stroke: '#d1dcd3'
  selected: '#176a8e'
  control-accent: '#1b6687'
  focus: '#277cad'
  link: '#135d7b'
  inverse-hint: '#c2d5ca'
  download-stroke: '#b2ccc0'
  download-hover: '#315b4f'
  notice-stroke: '#347d99'
  notice-ground: '#e4edef'
  error: '#a02e28'
  error-ground: '#fae9e5'
  error-ink: '#7d2520'
  invalid-ground: '#fff5f3'
  inverse-error: '#ffcbc1'
  pending-ground: '#fff1d8'
  pending-stroke: '#9b6b15'
typography:
  display:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: clamp(30px, 4.2vw, 48px)
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.03em
  headline:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.4px
  scene-title:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: -0.4px
  body:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.6
  scene-choice:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.6
  hint:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.7
  measurement:
    fontFamily: Noto, system-ui, sans-serif
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.2
  fingerprint:
    fontFamily: ui-monospace, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.8
rounded:
  control: 3px
spacing:
  '8': 8px
  '10': 10px
  '12': 12px
  '16': 16px
  '18': 18px
  '20': 20px
  '22': 22px
  '24': 24px
  '28': 28px
  '32': 32px
  '40': 40px
components:
  button-secondary:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: 10px 16px
  button-secondary-hover:
    backgroundColor: '{colors.hover}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.paper}'
    rounded: '{rounded.control}'
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.paper}'
  button-inverse:
    backgroundColor: '{colors.inverse-action}'
    textColor: '{colors.inverse-action-ink}'
    rounded: '{rounded.control}'
    padding: 10px 16px
  button-inverse-hover:
    backgroundColor: '{colors.paper}'
  download-link:
    backgroundColor: transparent
    textColor: '{colors.paper}'
    rounded: '{rounded.control}'
    padding: 10px 14px
  download-link-hover:
    backgroundColor: '{colors.download-hover}'
  input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: 9px 11px
  input-invalid:
    backgroundColor: '{colors.invalid-ground}'
  masthead:
    backgroundColor: '{colors.structural}'
    textColor: '{colors.paper}'
    padding: 20px 40px
  notice:
    backgroundColor: '{colors.notice-ground}'
    textColor: '{colors.ink}'
    padding: 12px 16px
  notice-error:
    backgroundColor: '{colors.error-ground}'
    textColor: '{colors.error-ink}'
  metadata-row:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    padding: 20px
  scene-frame:
    backgroundColor: '{colors.image-ground}'
  source-record:
    textColor: '{colors.ink}'
    padding: 0 0 0 24px
---

# Design System: SahnaFrame

## Overview

**Creative North Star: "Conservation mounting discipline"**

SahnaFrame treats a composition as an inspectable mounting: quiet cool work ground, deep blue-green structural bands, and equally sized square proofs. The workhorse sans keeps labels and measurements close to their controls; scene artwork supplies the broader color range. The atmosphere is inferred from the committed direction contract and finished source, not owner visual approval.

The interface is flat and operational. A single common placement connects the comparison, while a lower white metadata list has a separate visual rhythm. The mounting metaphor describes the care and alignment; it does not introduce physical textures, archive stamps, or a new illustration style.

**Key Characteristics:**
- Cool pale work ground and green identity/placement bands.
- Equal square proofs with restrained lake-blue selection.
- Native rectangular controls, compact Noto labels, and explicit measurements.
- Flat borders and fields; fixed geometric scene artwork stays behind the subject.

## Colors

The interface combines a cool neutral work field, blue-green operational regions, and a distinct lake-blue selection/focus family. The frontmatter owns reusable values; per-selector shades are source facts catalogued in `docs/design-documentation.json`, not additional global tokens.

### Primary

- **Structural Green** (`colors.structural`): masthead and shared-placement band.
- **Action Green / Deep Action Green** (`colors.primary`, `colors.primary-hover`): filled login and metadata-save actions, with a darker hover fill.
- **Pale Mount / Mount Ink** (`colors.inverse-action`, `colors.inverse-action-ink`): the prepare action on the dark placement band.

### Secondary

- **Lake Selection** (`colors.selected`): selected proof caption edge and outline. Native radio/check/caret accent uses the distinct `colors.control-accent`; links use `colors.link` and focus uses `colors.focus`. Preserve these separate source values rather than silently merging them.

### Neutral

- **Cool Work Ground, White Paper, Work Ink** (`colors.ground`, `colors.paper`, `colors.ink`): page, controls/metadata rows, and body text.
- **Quiet Hint / Inverse Hint** (`colors.muted`, `colors.inverse-hint`): supporting text on light/dark regions.
- **Control and Section Lines** (`colors.button-stroke`, `colors.field-stroke`, `colors.divider`, `colors.inset-divider`): thin field boundaries and task separation.
- **Empty Proof Ground / Edge** (`colors.image-ground`, `colors.image-stroke`): the square scene surround before a decoded image is present.
- **Soft Hover** (`colors.hover`): secondary actions and the native file-selector button. The download link has its own inverse stroke and hover values.

### Functional States

- **Information field** (`colors.notice-ground`, `colors.notice-stroke`): global account/workspace notice.
- **Error field / Ink / Edge** (`colors.error-ground`, `colors.error-ink`, `colors.error`): global error notice; invalid fields use `colors.invalid-ground`, and errors on the dark placement band use `colors.inverse-error`.
- **Pending field / Edge** (`colors.pending-ground`, `colors.pending-stroke`): exact-source reopen instruction. It is a local pending task state, not a decorative badge.

**The Structural Green Rule.** Use structural green for identity and shared-placement operations. Keep the fixed scene palettes in the artwork layer.

The `linen`, `arch`, and `steps` version-1 palettes in `public/scene.js` are fixed Canvas2D content, not UI color tokens. They include warm planes, a cool arch/base, and three green planes. Their exact values and layer roles are recorded separately in the evidence JSON. No arbitrary scene palette or color-picker system is established.

## Typography

**Display and Body Font:** self-hosted Noto, with system-ui and sans-serif fallbacks. The file is `public/fonts/noto-sans.ttf`, declared by `@font-face`; its license is `public/fonts/OFL.txt`.
**Fingerprint Font:** ui-monospace, with monospace fallback.

**Character:** one practical sans carries the task; scale, weight, and proximity establish hierarchy. Measurements use tabular numerals, while long SHA256 strings use a compact monospace line that can wrap anywhere.

### Hierarchy

- **Display** (`typography.display`): the main task statement. At the narrow breakpoint the workspace heading becomes a fixed 32px and takes the full work width; the output measure moves beneath it.
- **Headline** (`typography.headline`): task sections. The narrow source section heading uses 18px.
- **Scene Title** (`typography.scene-title`): proof names; it grows to 20px in the stacked layout.
- **Body / Lead** (`typography.body`, `typography.lead`): operational copy and the login introduction. The lead reduces to 17px on narrow screens; its maximum source width is 520px.
- **Label / Scene Choice** (`typography.label`, `typography.scene-choice`): native field labels and proof radio labels. Scene choices become 14px on narrow screens.
- **Hint** (`typography.hint`): limits, source state, ranges, and recovery copy. Other local 12px metadata text keeps its selector-specific line height.
- **Measurement** (`typography.measurement`): placement input values, with `font-variant-numeric: tabular-nums`.
- **Fingerprint** (`typography.fingerprint`): source and saved-set byte binding; wrap rather than truncate.

**The Measured Text Rule.** Keep dimensions, alpha bounds, fingerprints, and preparation state readable as text beside their related task.

The brand, account text, proof numbering, metadata row titles, and details summaries retain their source-specific sizes and native semantic weight. No separate display face, all-caps label system, or synthetic type scale is introduced here.

## Layout

The work area centers at a maximum outer width of 1296px with 40px inline padding. Source selection and its accepted-source record form two equal columns with a 44px gap. Three equally sized square proofs use a three-column grid with a 20px gap; the green placement band follows them. Saved metadata remains below the explanatory details block, using white rows rather than another image grid.

The placement fields form three equal numeric columns plus a wider action column (`1fr 1fr 1fr 1.65fr`, 18px gap). Source settings and scene selection share one geometry; no per-scene arrangement is implied. The recurring spacing values are the measured steps in frontmatter, not a declared ratio scale. Local values such as the login's 90px gap remain local.

At `max-width:760px`, the main gutter becomes 20px, masthead/account controls wrap, source and scene grids become one column, and placement fields use two columns with the size field and prepare action spanning both. The workspace headline and output label stack with an 8px gap. Save form and metadata rows become single-column. At `min-width:1440px`, main padding becomes 48px and masthead gutters use the source's centered formula; this wide-screen rule is source-documented, not newly visually verified.

**The Common Baseline Rule.** Compare complete square scenes with the same accepted subject geometry and baseline. Selection changes the proof outline rather than the subject scale.

## Elevation & Depth

The interface uses flat tonal fields, section strokes, and state outlines. There are no authored CSS box-shadow or text-shadow declarations. A selected square gets a 3px outline with a 2px offset; keyboard focus uses a separate 3px outline with a 4px offset. These are state indicators, not an elevation scale.

**The Flat Proof Rule.** Use tonal fields and borders for interface separation. The authored scene ellipse is content, not an interface elevation token.

The selected-proof outline-color transitions over 180ms with `cubic-bezier(.16,1,.3,1)`. The full scene remains visible at rest; `prefers-reduced-motion:reduce` disables that transition. This is the only authored UI transition in the inspected CSS. Source presence and static captures do not establish kinetic quality or a live reduced-motion audit.

## Shapes

Controls and download links have gently eased corners (`rounded.control`); scene frames, structural bands, task regions, and metadata rows remain rectangular. Most boundaries are 1px strokes, proof captions use a 2px top edge, and the placement band uses a 3px top edge. The login form has a 4px structural top edge.

Native radio/checkbox controls are 19px square with browser-drawn marks. The brand mark consists of three CSS rectangles; it is not a glyph icon. The scene artwork uses authored rectangles and one arch, with no foreground occlusion. Its symbolic ellipse must not be confused with a component shadow.

## Components

### Buttons

Compact native actions with clear fill hierarchy. The secondary, primary, inverse prepare, and download-link variants are represented in frontmatter and the sidecar.

- **Shape and sizing:** 3px control corners; ordinary buttons use 10px 16px padding and at least 44px height. The prepare button reaches 52px; compact account/action-row variants retain their local padding and text size.
- **Primary:** green fill with white text, darkening on enabled hover. The inverse prepare action uses pale fill and dark text on structural green, turning white on enabled hover.
- **Secondary:** white fill and ink text with a thin muted stroke; enabled hover uses the soft neutral field. The base enabled-hover border becomes the source-local green stroke, including on filled buttons.
- **Focus / disabled:** the global focus outline remains; disabled buttons have opacity 0.5 and a default cursor. No authored pressed transform or button transition exists.
- **Download:** bordered inverse links with a green hover fill. They are two separate anchors, not proof that a file has already downloaded.

### Inputs / Fields

White native fields use ink text, a thin field stroke, 3px corners, and 9px 11px padding; labels remain associated in HTML. File controls keep their native chooser and a 13px type override. Placement values use the measurement role and at least 52px height. An invalid field has a 2px error stroke and invalid-field tint. Textual bounds and recovery copy sit beside the field; CSS alone does not validate those values.

### Navigation

The masthead is an identity/account region, with no authored route menu. Its green ground carries the CSS bar mark, product name, version, native RU/KK select, actor, refresh, and logout controls. Account controls wrap onto their own row in the narrow layout. A skip link becomes visible on keyboard focus.

### Notices / Pending Source

Informational and error notices share a flat bordered field, wrap long content, and disappear when empty. The pending exact-source message is a separate warm bordered field beside the accepted-source record. Source and image status text stay local to the picker or placement task. Their HTML live-region roles are source facts, not assistive-technology certification.

### Cards / Containers

Saved sets use white metadata rows with a thin top edge, 20px inner padding, a title/measurement/hash column, and a wrapping action group. On narrow screens they become a single column with 18px padding. They are data rows, not promotional feature cards. Long fingerprints keep their monospace wrapping.

### Signature: Comparison Proof

Each figure has a small fixed proof number, name, complete square scene frame, native selection label, and short scene description. The selected state changes the caption edge and square outline to lake blue. Real previews are Canvas2D buffers generated by the controller; the sidecar's empty-frame example demonstrates only the surrounding component, without fabricating a product image or a working export.

## Do's and Don'ts

### Do:
- Do use the green structural regions and cool work ground for the interface.
- Do keep the three proof frames equal and let the narrow layout stack them in source order.
- Do keep native labels, textual range hints, wrapped hashes, and visible focus beside their controls.
- Do distinguish previous accepted source data, selected scene, prepared export, and separate download actions.

### Don't:
- Don't promote the fixed scene colors into global interface accents.
- Don't make a proof image or symbolic shadow cover the subject or hide the measurements.
- Don't replace the restrained interface fields with imitation texture, archive stamps, or decorative elevation.
- Don't turn numbered scene proof captions into generic section kickers.
