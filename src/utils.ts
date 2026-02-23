import { showToast, Toast } from "@raycast/api";
import { execFileSync } from "child_process";

export interface TileSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

function runJXA(script: string): string {
  return execFileSync("osascript", ["-l", "JavaScript"], {
    input: script,
    encoding: "utf-8",
  }).trim();
}

export function getGhosttyWindowCount(): number {
  const result = runJXA(`
    var se = Application("System Events");
    var ghostty = se.processes.byName("Ghostty");
    var wins = ghostty.windows();
    var count = 0;
    for (var i = 0; i < wins.length; i++) {
      if (!wins[i].attributes.byName("AXMinimized").value()) count++;
    }
    count;
  `);
  return parseInt(result, 10) || 0;
}

interface ScreenInfo {
  menuBarHeight: number;
  x: number;
  width: number;
  height: number;
}

function getScreenInfo(): ScreenInfo {
  const result = runJXA(`
    ObjC.import("AppKit");
    var full = $.NSScreen.mainScreen.frame;
    var visible = $.NSScreen.mainScreen.visibleFrame;
    var menuBarHeight = full.size.height - visible.origin.y - visible.size.height;
    JSON.stringify({
      menuBarHeight: menuBarHeight,
      x: visible.origin.x,
      width: visible.size.width,
      height: visible.size.height
    });
  `);
  return JSON.parse(result);
}

function setGhosttyWindowBounds(winIndex: number, x: number, y: number, w: number, h: number) {
  runJXA(`
    var se = Application("System Events");
    var ghostty = se.processes.byName("Ghostty");
    var wins = ghostty.windows();
    var visibleCount = 0;
    for (var i = 0; i < wins.length; i++) {
      if (!wins[i].attributes.byName("AXMinimized").value()) {
        if (visibleCount === ${winIndex}) {
          ghostty.windows[i].position = [${x}, ${y}];
          ghostty.windows[i].size = [${w}, ${h}];
          break;
        }
        visibleCount++;
      }
    }
  `);
}

export async function tileWindows(slotsFn: (screenW: number, screenH: number) => TileSlot[]) {
  try {
    const screen = getScreenInfo();
    const slots = slotsFn(screen.width, screen.height);
    const winCount = getGhosttyWindowCount();

    if (winCount < slots.length) {
      await showToast({
        title: `Need ${slots.length} Ghostty windows, found ${winCount}`,
        style: Toast.Style.Failure,
      });
      return;
    }

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      setGhosttyWindowBounds(
        i,
        screen.x + slot.x,
        screen.menuBarHeight + slot.y,
        slot.width,
        slot.height,
      );
    }

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    await showToast({
      title: "Tile failed",
      message: msg.slice(0, 200),
      style: Toast.Style.Failure,
    });
  }
}
