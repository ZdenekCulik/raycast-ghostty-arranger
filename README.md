# Ghostty Arranger

Press `⌥A` — your Ghostty windows tile themselves.

Auto-detects how many windows are open and picks the best layout. No config, no thinking.

```
1 window          2 windows         3 windows         4 windows

┌────────────┐    ┌──────┬──────┐   ┌────┬────┬────┐   ┌──────┬──────┐
│            │    │      │      │   │    │    │    │   │      │      │
│ fullscreen │    │      │      │   │    │    │    │   │      │      │
│            │    │      │      │   │    │    │    │   ├──────┼──────┤
│            │    │      │      │   │    │    │    │   │      │      │
└────────────┘    └──────┴──────┘   └────┴────┴────┘   └──────┴──────┘
```

---

## Installation

### 1. Clone & build

```bash
git clone https://github.com/ZdenekCulik/raycast-ghostty-arranger.git
cd raycast-ghostty-arranger
npm install
npm run build
```

### 2. Import into Raycast

Raycast → Settings (`⌘,`) → Extensions → `+` → **Import Extension** → select the `raycast-ghostty-arranger` folder.

### 3. Set the shortcut

Find **Arrange Ghostty** in the extension list → click the hotkey field → press `⌥A`.

### 4. Grant Accessibility permission

System Settings → Privacy & Security → Accessibility → enable **Raycast**.

That's it. Hit `⌥A` with Ghostty open.

---

## Requirements

- macOS
- [Ghostty](https://ghostty.org)
- [Raycast](https://raycast.com)
- Node.js 18+

---

## Troubleshooting

**"Could not find executable JS file"** — run `npm run build`, then quit and relaunch Raycast.

**"No Ghostty windows found"** — make sure Ghostty is running with at least one visible (non-minimized) window.

**Nothing happens** — check Accessibility permission for Raycast (step 4 above).

---

## License

MIT
