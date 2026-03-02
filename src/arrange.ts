import { closeMainWindow } from "@raycast/api";
import { runArrangeLayout } from "./utils";

export default async function Command() {
  await closeMainWindow();
  await runArrangeLayout();
}
