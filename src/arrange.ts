import { closeMainWindow, showToast, Toast } from "@raycast/api";
import { getGhosttyWindowCount, tileWindows } from "./utils";

export default async function Command() {
  await closeMainWindow();

  const count = getGhosttyWindowCount();

  if (count < 1) {
    await showToast({ title: "No Ghostty windows found", style: Toast.Style.Failure });
    return;
  }

  if (count === 1) {
    await tileWindows((w, h) => [{ x: 0, y: 0, width: w, height: h }]);
  } else if (count === 2) {
    await tileWindows((w, h) => [
      { x: 0, y: 0, width: Math.round(w / 2), height: h },
      { x: Math.round(w / 2), y: 0, width: Math.round(w / 2), height: h },
    ]);
  } else if (count === 3) {
    await tileWindows((w, h) => {
      const third = Math.round(w / 3);
      return [
        { x: 0, y: 0, width: third, height: h },
        { x: third, y: 0, width: third, height: h },
        { x: third * 2, y: 0, width: w - third * 2, height: h },
      ];
    });
  } else {
    await tileWindows((w, h) => {
      const halfW = Math.round(w / 2);
      const halfH = Math.round(h / 2);
      return [
        { x: 0, y: 0, width: halfW, height: halfH },
        { x: halfW, y: 0, width: halfW, height: halfH },
        { x: 0, y: halfH, width: halfW, height: halfH },
        { x: halfW, y: halfH, width: halfW, height: halfH },
      ];
    });
  }
}
