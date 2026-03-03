import { showToast, Toast } from "@raycast/api";
import { execFileSync } from "child_process";

function runJXA(script: string): string {
  return execFileSync("osascript", ["-l", "JavaScript"], {
    input: script,
    encoding: "utf-8",
  }).trim();
}

// Shared header: get screen info + collect visible Ghostty windows into `wins[]`
// W, H, originX, originY are available after this runs
const HEADER = `
  ObjC.import("AppKit");
  var full = $.NSScreen.mainScreen.frame;
  var visible = $.NSScreen.mainScreen.visibleFrame;
  var menuBarHeight = full.size.height - visible.origin.y - visible.size.height;
  var W = visible.size.width;
  var H = visible.size.height;
  var originX = visible.origin.x;
  var originY = menuBarHeight;
  var se = Application("System Events");
  var ghostty = se.processes.byName("Ghostty");
  var allWins = ghostty.windows();
  var winIdxs = [];
  for (var i = 0; i < allWins.length; i++) {
    if (!allWins[i].attributes.byName("AXMinimized").value()) winIdxs.push(i);
  }
`;

async function handleResult(result: string) {
  try {
    const r = JSON.parse(result);
    if (r.error) await showToast({ title: r.error, style: Toast.Style.Failure });
  } catch {
    // no JSON returned = no toast needed
  }
}

async function catchError(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  await showToast({ title: "Tile failed", message: msg.slice(0, 200), style: Toast.Style.Failure });
}

// slotsExpr: JS expression using W and H that returns [{x,y,w,h}, ...]
// Everything runs in ONE osascript call — screen info, slots, and window moves
export async function runLayout(slotsExpr: string) {
  try {
    const result = runJXA(`
      ${HEADER}
      var slots = ${slotsExpr};
      if (winIdxs.length < slots.length) {
        JSON.stringify({ error: "Need " + slots.length + " windows, found " + winIdxs.length });
      } else {
        for (var j = 0; j < slots.length; j++) {
          var s = slots[j];
          ghostty.windows[winIdxs[j]].position = [originX + s.x, originY + s.y];
          ghostty.windows[winIdxs[j]].size = [s.w, s.h];
        }
        JSON.stringify({ ok: true });
      }
    `);
    await handleResult(result);
  } catch (e) {
    await catchError(e);
  }
}

// Arrange: dynamic grid based on however many windows are open
export async function runArrangeLayout() {
  try {
    const result = runJXA(`
      ${HEADER}
      var count = winIdxs.length;
      if (count === 0) {
        JSON.stringify({ error: "No Ghostty windows found" });
      } else {
        var currentX = 0;
        for (var i = 0; i < count; i++) {
          var w = i === count - 1 ? W - currentX : Math.round((i + 1) * (W / count)) - currentX;
          ghostty.windows[winIdxs[i]].position = [originX + currentX, originY];
          ghostty.windows[winIdxs[i]].size = [w, H];
          currentX += ghostty.windows[winIdxs[i]].size()[0];
        }
        JSON.stringify({ ok: true });
      }
    `);
    await handleResult(result);
  } catch (e) {
    await catchError(e);
  }
}
