# daY²oga UI Design Decisions

**Status:** Proposed visual direction for owner review; no visual identity or product assumptions are final. No implementation has started. Revised 30 October 2026 to record the independent OpenCode contrast audit (see below and `docs/reviews/RECONCILIATION.md`). Source brief: `DAYOGA_UI_UX_REACT_VITE_SPEC.md`.

## Proposed direction: warm, clear, everyday movement

Use a warm off-white canvas, deep botanical green for primary actions, dark charcoal text, and restrained secondary colors to distinguish Yoga, Strength, and combined plans. The interface should feel calm and approachable while preserving strong contrast and clear workout controls. Favor authentic, accessible home-workout imagery only when verified assets are available; until then use neutral, clearly identified media placeholders rather than unrelated stock imagery.

The information architecture is one app. Yoga and Strength have distinct categories within Explore, while combined routines are presented in Plans. Proposed primary navigation: Home / Explore / Plans / Progress / Profile. Primary navigation and naming require approval.

## Proposed foundation tokens

These starter values are proposals for a later design-system implementation, not approved brand colors. Check final contrast ratios when implemented.

| Token | Proposed value | Use |
|---|---|---|
| `color.canvas` | `#F8F7F2` | Main page background |
| `color.surface` | `#FFFFFF` | Cards, menus, form surfaces |
| `color.text` | `#202823` | Main copy and headings |
| `color.text-muted` | `#59645D` | Supporting copy; verify contrast |
| `color.border` | `#DCE2DA` | Dividers and control borders |
| `color.primary` | `#285B45` | Primary actions and selected states |
| `color.primary-hover` | `#204A38` | Hover/pressed primary state |
| `color.yoga` | `#6D8063` | Yoga category marker; not sole label |
| `color.strength` | `#A65F3B` | Strength category marker; not sole label |
| `color.combined` | `#66758A` | Combined plan marker; not sole label |
| `color.focus` | `#1D6FD6` | Visible keyboard focus ring |
| `color.error` | `#A33D32` | Error feedback with text/icon |
| `color.warning` | `#76530B` | Safety or status notice with text/icon |

### Independent contrast audit and required token corrections

OpenCode computed WCAG 2.x ratios for the proposed values on 30 October 2026 (`docs/reviews/OPENCODE_INSPECTION.md` §6.1). The palette does **not** yet meet the WCAG 2.2 AA target stated below, so these corrections are required before the tokens are implemented:

| Finding | Ratio | Required correction |
|---|---|---|
| `color.border` on canvas / surface | 1.23:1 / 1.32:1 | Add `color.border-strong` at ≥3:1 for input and control boundaries; reserve `color.border` for decorative dividers. |
| Yoga text `color.yoga` on canvas / surface | 3.98:1 / 4.27:1 | Add darker `color.yoga-text` at ≥4.5:1, or use main text beside a non-text category marker. |
| Combined text `color.combined` on canvas | 4.37:1 | Add darker `color.combined-text` at ≥4.5:1. |
| `color.focus` on `color.primary` | 1.61:1 | Use a two-tone focus ring (white inner ring plus blue outer ring) or a surface-aware ring. |
| `color.focus` on category markers | ~1.0–1.14:1 | Same two-tone treatment; never rely on a single blue ring on coloured surfaces. |
| Strength/Combined text | 4.53–4.69:1 (marginal) | Test composited, disabled, and overlay states; do not reduce opacity on these colours. |
| 12 px metadata | — | Restrict to short non-essential tags; interactive labels and body copy at ≥14–16 px. |

All other audited pairs pass: main text 14.09:1 (canvas) / 15.12:1 (surface), muted text 5.75:1, white on primary 7.86:1, error 5.99:1, warning 6.50:1. These corrected values remain proposals until the product owner approves the brand direction.

### Type, spacing, shape, elevation

- **Typography:** readable sans-serif system stack pending brand choice. Proposed sizes: 12 (metadata only), 14 (secondary), 16 (body/control minimum target), 20 (card title), 24 (section heading), 32 (page heading), 40 (desktop hero only). Line height 1.45–1.6 for body copy.
- **Spacing:** 4px base rhythm; tokens 4, 8, 12, 16, 24, 32, 48, 64px. Default content gutters 16px mobile, 24px tablet, 32px desktop.
- **Radius:** 8px for small controls, 12px for inputs/cards, 20px for large feature panels. Avoid overly pill-shaped surfaces except compact chips.
- **Elevation:** mostly flat surfaces with subtle border; one restrained shadow for floating or layered elements. Avoid glass effects and decorative gradients.
- **Icons:** consistent simple outline set with text labels for primary navigation and meaningful accessible names. Do not rely on color alone to distinguish categories or status.

## Component behavior

- **Buttons:** primary filled green; secondary outlined; tertiary text. Minimum 44×44 CSS px interactive target where practical. Include hover, pressed, focus-visible, disabled, and loading states. Destructive/stop actions must be clear and separated from ordinary progression.
- **Inputs:** persistent visible labels, clear helper/error text, keyboard focus indicator, and semantic form controls. Prototype account forms must be explicitly labelled demo behavior and must not send or retain real credentials.
- **Cards:** consistent padding and surface style; content hierarchy presents name, level, time/sets, and focus/equipment. Use separate text labels for Yoga/Strength/Combined. Avoid unsupported ratings, credentials, and medical claims.
- **Navigation:** mobile pattern to be chosen after approval; proposed five destinations. Desktop can use a compact sidebar or top navigation if it preserves the same hierarchy. Active route has text plus non-color cue.
- **Workout controls:** persistent/reachable controls that do not cover exercise instructions. Confirmation for skip/end where relevant; no autoplay audio/video or vibration.
- **Camera demo:** clearly state that feedback is simulated and posture AI is not implemented. Request no browser permission on page load. Keep manual mode available in every camera-related path.

## Responsive and accessibility rules

- Mobile-first responsive layouts; proposed breakpoints 640px, 768px, and 1024px, adjusted to content rather than device names.
- No horizontal overflow. Reflow cards from one column to two or more only when labels and touch targets remain comfortable. Keep workout and camera controls reachable within the viewport.
- Target WCAG 2.2 AA contrast for text and interactive UI; verify actual token pairings before implementation. Never encode category, progress, or error using color alone.
- Semantic landmarks/headings, keyboard operation, logical focus order, visible focus, descriptive labels, text alternatives for meaningful images, and reduced-motion support.
- Use motion only to clarify state changes and honor `prefers-reduced-motion`.

## Decisions requiring owner approval

1. Brand mark, palette, typography, and image style, including the corrected border, category-text, and focus tokens above.
2. Main navigation labels and arrangement, and whether Explore is a hub screen or only the Yoga/Strength libraries.
3. Whether the warm-neutral / botanical direction is right for the intended audience.
4. Whether media placeholders are acceptable until exercise assets are reviewed.
5. Confirmation of responsive web-first assumptions and supported breakpoints.
6. Approval of the route/URL map and the history vs hash/static-fallback refresh strategy.

No decision here authorizes a full implementation. These tokens should be revisited after owner feedback and any provided brand assets.
