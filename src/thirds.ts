import { closeMainWindow } from "@raycast/api";
import { runLayout } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await runLayout(`(function() {
    var t = Math.round(W/3);
    return [
      { x: 0,   y: 0, w: t,       h: H },
      { x: t,   y: 0, w: t,       h: H },
      { x: t*2, y: 0, w: W - t*2, h: H }
    ];
  })()`);
}
