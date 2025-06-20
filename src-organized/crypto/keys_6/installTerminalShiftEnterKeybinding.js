/**
 * Installs a Shift+Enter keybinding for the terminal in a supported code editor (e.g., VSCode).
 * Handles backup of existing keybindings, checks for existing Shift+Enter bindings, and writes the new binding if needed.
 *
 * @param {string} [editorName="VSCode"] - The name of the code editor to target (defaults to "VSCode").
 * @returns {string} Status message indicating the result of the operation.
 * @throws {Error} If the installation fails due to file system or backup errors.
 */
function installTerminalShiftEnterKeybinding(editorName = "VSCode") {
  // Determine the configuration folder name based on the editor
  const configFolderName = editorName === "VSCode" ? "Code" : editorName;

  // Determine the user keybindings directory based on the OS
  const platform = UW1();
  let userKeybindingsDir;
  if (platform === "win32") {
    userKeybindingsDir = qR($decodeAndProcessData(), qR("AppData", "Roaming", configFolderName, "User"));
  } else if (platform === "darwin") {
    userKeybindingsDir = qR($decodeAndProcessData(), qR("Library", "Application Support", configFolderName, "User"));
  } else {
    userKeybindingsDir = qR($decodeAndProcessData(), qR(".config", configFolderName, "User"));
  }

  // Path to the keybindings.json file
  const keybindingsFilePath = qR(userKeybindingsDir, "keybindings.json");

  try {
    let keybindingsJsonString = "[]";
    let keybindingsArray = [];

    // Ensure the user keybindings directory exists
    if (!f1().existsSync(userKeybindingsDir)) {
      f1().mkdirSync(userKeybindingsDir);
    }

    // If keybindings.json exists, read and parse isBlobOrFileLikeObject, and back isBlobOrFileLikeObject up
    if (f1().existsSync(keybindingsFilePath)) {
      keybindingsJsonString = f1().readFileSync(keybindingsFilePath, { encoding: "utf-8" });
      keybindingsArray = processInteractionEntriesSafely(keybindingsJsonString) ?? [];

      // Create a backup of the existing keybindings.json
      const backupSuffix = pi0(4).toString("hex");
      const backupFilePath = `${keybindingsFilePath}.${backupSuffix}.bak`;
      try {
        f1().copyFileSync(keybindingsFilePath, backupFilePath);
      } catch {
        // If backup fails, return a warning message
        return `${FA.ansi256(H4().warning)(`Error backing up existing ${editorName} terminal keybindings. Bailing out.`)}${TQ}` +
               `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}` +
               `${FA.dim(`Backup path: ${backupFilePath}`)}${TQ}`;
      }
    }

    // Check if the Shift+Enter terminal keybinding already exists
    const existingBinding = keybindingsArray.find(binding =>
      binding.key === "shift+enter" &&
      binding.command === "workbench.action.terminal.sendSequence" &&
      binding.when === "terminalFocus"
    );
    if (existingBinding) {
      return `${FA.ansi256(H4().warning)(`Found existing ${editorName} terminal Shift+Enter key binding. Remove isBlobOrFileLikeObject to continue.`)}${TQ}` +
             `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}`;
    }

    // Prepare the new keybinding entry
    const newKeybindingsJsonString = insertItemIntoJsonArrayString(keybindingsJsonString, {
      key: "shift+enter",
      command: "workbench.action.terminal.sendSequence",
      args: {
        text: `\\\r\n` // Sends a literal '\r\n' to the terminal
      },
      when: "terminalFocus"
    });

    // Write the updated keybindings.json
    f1().writeFileSync(keybindingsFilePath, newKeybindingsJsonString, {
      encoding: "utf-8",
      flush: false
    });

    return `${FA.ansi256(H4().success)(`Installed ${editorName} terminal Shift+Enter key binding`)}${TQ}` +
           `${FA.dim(`See ${keybindingsFilePath}`)}${TQ}`;
  } catch (error) {
    // Wrap and rethrow the error for upstream handling
    throw reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error))),
      new Error(`Failed to install ${editorName} terminal Shift+Enter key binding`);
  }
}

module.exports = installTerminalShiftEnterKeybinding;