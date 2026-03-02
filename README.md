# Ghostty Arranger

A Raycast extension that tiles your [Ghostty](https://ghostty.org) terminal windows into clean layouts with a single keystroke.

---

## Layouts

```
Halves              Thirds              Quarters

┌────────┬────────┐ ┌──────┬──────┬──────┐ ┌────────┬────────┐
│        │        │ │      │      │      │ │        │        │
│        │        │ │      │      │      │ │        │        │
│        │        │ │      │      │      │ │        │        │
└────────┴────────┘ └──────┴──────┴──────┘ ├────────┼────────┤
                                            │        │        │
Auto-grid (any count)                       │        │        │
                                            │        │        │
┌──────┬──────┬──────┐                      └────────┴────────┘
│      │      │      │
│      │      │      │  Figures out the best grid
├──────┴──┬───┴──────┤  automatically based on
│         │          │  how many windows are open.
└─────────┴──────────┘
```

---

## Commands

| Command | Shortcut (assign in Raycast) | What it does |
|---|---|---|
| **Arrange Ghostty** | recommended: `⌥Space` | Auto-detects window count → best layout |
| **Ghostty Halves** | — | Two windows, side by side |
| **Ghostty Thirds** | — | Three equal columns |
| **Ghostty Quarters** | — | 2×2 grid |

The **Arrange** command is the one you'll use daily — it just does the right thing regardless of how many terminals you have open.

---

## Requirements

- macOS
- [Ghostty](https://ghostty.org) terminal
- [Raycast](https://raycast.com) — free tier is fine
- Node.js 18+ (for building from source)

---

## Installation

This extension isn't published to the Raycast Store, so you install it manually. Takes about 2 minutes.

### 1. Clone

```bash
git clone https://github.com/ZdenekCulik/raycast-ghostty-arranger.git
cd raycast-ghostty-arranger
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build

```bash
npm run build
```

This compiles the TypeScript source into the `dist/` folder that Raycast needs.

### 4. Import into Raycast

Open Raycast → **Settings** (`⌘,`) → **Extensions** → click **`+`** → **Import Extension** → select the `raycast-ghostty-arranger` folder.

Raycast picks up `dist/` automatically and registers the commands.

### 5. Grant Accessibility permission

The extension moves and resizes windows using macOS Accessibility APIs. On first run, macOS will prompt you — or you can do it manually:

**System Settings → Privacy & Security → Accessibility → enable Raycast**

Then re-run the command.

---

## Assign a hotkey (optional but recommended)

Raycast → Settings → Extensions → find **Arrange Ghostty** → click the hotkey field → press your combo.

`⌥Space` works well if it's free.

---

## Troubleshooting

**"Could not find executable JS file"**

The extension wasn't built yet, or the build is stale. Run:

```bash
npm run build
```

Then quit and reopen Raycast (`⌘Space` → type `Quit Raycast` → relaunch).

**"No Ghostty windows found"**

Ghostty is either not running or all its windows are minimized. Unminimize at least one window and try again.

**Windows don't move at all**

Raycast doesn't have Accessibility permission. Check System Settings → Privacy & Security → Accessibility.

**Layout looks off on an external monitor**

The extension uses the main display's visible frame. If Ghostty windows are on a secondary display, results may be unexpected. PRs welcome.

---

## How it works

The extension calls `osascript` (macOS's built-in JavaScript for Automation runtime) in a single script per command. The script:

1. Reads the main screen's usable area (subtracting menu bar and Dock)
2. Finds all visible (non-minimized) Ghostty windows via the Accessibility API
3. Calculates tile positions
4. Sets each window's position and size

No background daemon. No polling. Zero CPU when idle.

---

## License

MIT — do whatever you want with it.
