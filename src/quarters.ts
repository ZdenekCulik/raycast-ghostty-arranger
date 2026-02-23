import { closeMainWindow } from "@raycast/api";
import { tileWindows } from "./utils";

export default async function Command() {
  await closeMainWindow();
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
