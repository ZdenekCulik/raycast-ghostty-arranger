import { closeMainWindow } from "@raycast/api";
import { tileWindows } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await tileWindows((w, h) => [
    { x: 0, y: 0, width: Math.round(w / 2), height: h },
    { x: Math.round(w / 2), y: 0, width: Math.round(w / 2), height: h },
  ]);
}
