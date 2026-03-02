import { closeMainWindow } from "@raycast/api";
import { runLayout } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await runLayout(`(function() {
    var hw = Math.round(W/2);
    var hh = Math.round(H/2);
    return [
      { x: 0,  y: 0,  w: hw,      h: hh      },
      { x: hw, y: 0,  w: W - hw,  h: hh      },
      { x: 0,  y: hh, w: hw,      h: H - hh  },
      { x: hw, y: hh, w: W - hw,  h: H - hh  }
    ];
  })()`);
}
