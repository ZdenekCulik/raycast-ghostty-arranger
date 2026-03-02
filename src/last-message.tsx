import { Action, ActionPanel, Detail, showHUD } from "@raycast/api";
import { Clipboard } from "@raycast/api";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";

const FILE = `${homedir()}/.claude/last-response.txt`;

export default function Command() {
  let content: string;

  if (!existsSync(FILE)) {
    content = "_No message yet — start a Claude Code session and the last response will appear here._";
  } else {
    content = readFileSync(FILE, "utf-8").trim() || "_Last response was empty._";
  }

  return (
    <Detail
      navigationTitle="Last Claude Message"
      markdown={content}
      actions={
        <ActionPanel>
          <Action
            title="Copy to Clipboard"
            shortcut={{ modifiers: ["cmd"], key: "c" }}
            onAction={async () => {
              await Clipboard.copy(content);
              await showHUD("Copied to clipboard");
            }}
          />
        </ActionPanel>
      }
    />
  );
}
