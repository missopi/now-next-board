# Agents Guide

This doc is for anyone (human or AI) helping on the project. The app is built with Expo/React Native and is aimed at parents of special-needs kids. Keep everything simple, calm, and reliable on both iPhone and iPad simulators.

## Purpose and Audience
- Primary users: caregivers with low tech confidence; the UI must be obvious, forgiving, and low-friction.
- Core value: build simple “Now/Next” (and routines) visual boards with images the child recognizes.
- Accessibility mindset: large touch targets, high contrast, minimal text, and no hidden gestures.

## Platforms and Layout
- Targets: iOS simulators for iPhone and iPad; expect both portrait and landscape.
- Orientation: `screens/BoardScreen.js` uses `useWindowDimensions` to adapt layout; keep new UI flexible.
- Test matrix: at least iPhone 15/16 (portrait) and iPad (landscape + portrait) before shipping changes.

## Key Screens (from `App.js`)
- Home (`AllBoardsScreen`): entry point, shows boards and launches add modal via the header + button.
- Now/Next (`BoardScreen`): main editor for two activity cards; warns before leaving if there are unsaved changes.
- Routines / Finished screens / Library: supporting flows; keep navigation predictable and back-safe.

## How the Now/Next Board Works (`screens/BoardScreen.js`)
- Tracks two slots: “Now” and “Next”.
- Adding cards: tap a slot → choose from library or create a custom card by picking an image and title.
- Saving: requires both slots populated; writes via `saveBoard`/`updateBoard` (AsyncStorage under the hood).
- Navigation guard: leaving the screen with changes triggers a Save/Discard modal.
- Swap action: can swap the two cards; only works when both are set.

## UX Guardrails for This Audience
- Keep touch targets ≥48 px; avoid tiny icons without labels.
- Prefer single taps; avoid long-press or multi-gesture interactions.
- Use short, plain language; avoid jargon in alerts and buttons.
- Provide confirmation for destructive actions; keep “Undo/Cancel” obvious.
- Make dialogs and prompts readable on both phone and tablet (no edge-to-edge modals on iPad).

## Running and Testing
- Install deps once: `npm install`
- Start dev server: `npm start`
- Run on iOS sim: `npm run ios` (choose iPhone and iPad simulators in Xcode’s Devices list).
- Quick checklist per change:
  - Launches on iPhone and iPad without red screens.
  - Layout adapts in portrait/landscape; no clipped buttons.
  - Save/Discard modal still prevents accidental loss.
  - Image picking flows complete; swapping cards works.

## When Adding Features
- Reuse existing modal patterns (see `screens/modals`) and styles (see `screens/styles`) to stay consistent.
- For new images, use reasonable sizes to keep memory low on older iPads.
- Keep navigation predictable; if you add new exits from `BoardScreen`, respect the unsaved-changes guard.
- Explain changes in plain language in PRs so a beginner can follow the reasoning.

## Support and Debugging Tips
- If a simulator is blank: ensure Metro is running (`npm start`) and the correct simulator is booted.
- If images do not show: check the URI returned from the picker and ensure the component receives `image`.
- If layout looks cramped: review `getStyles` in `screens/styles/NowNextBoardStyles.js` for spacing hooks.
