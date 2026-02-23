# Ghostty Window Arranger

A [Raycast](https://raycast.com) extension that auto-tiles your [Ghostty](https://ghostty.org) terminal windows into clean, edge-to-edge layouts.

## Layouts

The main **Arrange Ghostty** command detects how many Ghostty windows are visible and tiles them accordingly:

```
1 window          2 windows         3 windows         4+ windows
┌────────────┐    ┌──────┬──────┐   ┌────┬────┬────┐   ┌──────┬──────┐
│            │    │      │      │   │    │    │    │   │      │      │
│ fullscreen │    │ left │ right│   │ 1/3│ 1/3│ 1/3│   │  TL  │  TR  │
│            │    │      │      │   │    │    │    │   ├──────┼──────┤
│            │    │      │      │   │    │    │    │   │  BL  │  BR  │
└────────────┘    └──────┴──────┘   └────┴────┴────┘   └──────┴──────┘
```

## Features

- One command to tile all visible Ghostty windows
- Respects the menu bar and Dock (uses the visible screen area)
- Skips minimized windows
- Instant — runs via JXA with no UI

## Installation

```bash
git clone https://github.com/marekmensa/raycast-ghostty-arranger.git
cd raycast-ghostty-arranger
npm install
npm run dev
```

This opens the extension in Raycast in development mode. You can then trigger **Arrange Ghostty** from the Raycast command bar.

## Requirements

- macOS
- [Ghostty](https://ghostty.org)
- [Raycast](https://raycast.com)
- Node.js >= 18
- Accessibility permissions for Raycast (System Settings > Privacy & Security > Accessibility)

## How It Works

The extension uses macOS JXA (JavaScript for Automation) via `osascript` to:

1. Query `System Events` for all visible (non-minimized) Ghostty windows
2. Read the main screen's visible frame (accounting for the menu bar and Dock)
3. Set each window's position and size to fill its assigned tile slot

## License

MIT
