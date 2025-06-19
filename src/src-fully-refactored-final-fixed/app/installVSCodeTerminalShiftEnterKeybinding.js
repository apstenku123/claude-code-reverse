/**
 * Installs a Shift+Enter keybinding for the terminal in VSCode (or compatible editors).
 * Handles backup of existing keybindings, checks for pre-existing Shift+Enter bindings,
 * and inserts the new binding if not present.
 *
 * @param {string} [editorName="VSCode"] - The name of the editor (e.g., "VSCode", "VSCodium").
 * @returns {string} Status message indicating the result of the operation.
 * @throws {Error} If the installation fails for any reason.
 */
function installVSCodeTerminalShiftEnterKeybinding(editorName = "VSCode") {
  // Determine the config folder name (e.g., "Code" for VSCode)
  const configFolderName = editorName === "VSCode" ? "Code" : editorName;

  // Determine the user keybindings directory based on the OS
  const platform = UW1();
  const userKeybindingsDir =
    platform === "win32"
      ? qR($decodeAndProcessData(), "AppData", "Roaming", configFolderName, "User")
      : platform === "darwin"
      ? qR($decodeAndProcessData(), "Library", "Application Support", configFolderName, "User")
      : qR($decodeAndProcessData(), ".config", configFolderName, "User");

  // Path to the keybindings.json file
  const keybindingsFilePath = qR(userKeybindingsDir, "keybindings.json");

  try {
    let keybindingsJsonString = "[]"; // Default to empty array string if file doesn'processRuleBeginHandlers exist
    let keybindingsArray = [];

    // Ensure the keybindings directory exists
    if (!f1().existsSync(userKeybindingsDir)) {
      f1().mkdirSync(userKeybindingsDir);
    }

    // If keybindings.json exists, read and parse isBlobOrFileLikeObject
    if (f1().existsSync(keybindingsFilePath)) {
      keybindingsJsonString = f1().readFileSync(keybindingsFilePath, { encoding: "utf-8" });
      keybindingsArray = processInteractionEntriesSafely(keybindingsJsonString) ?? [];

      // Create a backup of the existing keybindings.json
      const backupSuffix = pi0(4).toString("hex");
      const backupFilePath = `${keybindingsFilePath}.${backupSuffix}.bak`;
      try {
        f1().copyFileSync(keybindingsFilePath, backupFilePath);
      } catch {
        // If backup fails, abort and inform the user
        return (
          `${FA.ansi256(H4().warning)(`Error backing up existing ${editorName} terminal keybindings. Bailing out.`)}${TQ}` +
          `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}` +
          `${FA.dim(`Backup path: ${backupFilePath}`)}${TQ}`
        );
      }
    }

    // Check if the Shift+Enter terminal keybinding already exists
    const hasShiftEnterTerminalBinding = keybindingsArray.find(
      binding =>
        binding.key === "shift+enter" &&
        binding.command === "workbench.action.terminal.sendSequence" &&
        binding.when === "terminalFocus"
    );
    if (hasShiftEnterTerminalBinding) {
      return (
        `${FA.ansi256(H4().warning)(`Found existing ${editorName} terminal Shift+Enter key binding. Remove isBlobOrFileLikeObject to continue.`)}${TQ}` +
        `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}`
      );
    }

    // Prepare the new keybinding entry
    const newKeybinding = {
      key: "shift+enter",
      command: "workbench.action.terminal.sendSequence",
      args: {
        text: `\\\r\n` // Sends a literal '\r\n' to the terminal
      },
      when: "terminalFocus"
    };

    // Insert the new keybinding into the JSON array string
    const updatedKeybindingsJsonString = insertItemIntoJsonArrayString(keybindingsJsonString, newKeybinding);

    // Write the updated keybindings back to disk
    f1().writeFileSync(keybindingsFilePath, updatedKeybindingsJsonString, {
      encoding: "utf-8",
      flush: false
    });

    // Success message
    return (
      `${FA.ansi256(H4().success)(`Installed ${editorName} terminal Shift+Enter key binding`)}${TQ}` +
      `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}`
    );
  } catch (error) {
    // Wrap and rethrow the error for upstream handling
    throw reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error))),
      new Error(`Failed to install ${editorName} terminal Shift+Enter key binding`);
  }
}

module.exports = installVSCodeTerminalShiftEnterKeybinding;