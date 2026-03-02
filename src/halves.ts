import { closeMainWindow } from "@raycast/api";
import { runLayout } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await runLayout(`[
    { x: 0, y: 0, w: Math.round(W/2), h: H },
    { x: Math.round(W/2), y: 0, w: W - Math.round(W/2), h: H }
  ]`);
}
