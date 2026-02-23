import { closeMainWindow } from "@raycast/api";
import { tileWindows } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await tileWindows((w, h) => {
    const third = Math.round(w / 3);
    return [
      { x: 0, y: 0, width: third, height: h },
      { x: third, y: 0, width: third, height: h },
      { x: third * 2, y: 0, width: w - third * 2, height: h },
    ];
  });
}
