/**
 * Installs the Shift+Enter key binding into the Ghostty configuration file.
 *
 * This function locates the Ghostty config file in standard locations, checks if the Shift+Enter key binding
 * already exists, backs up the config if needed, and appends the key binding if not present.
 *
 * @async
 * @returns {string} Status message describing the result of the operation.
 * @throws {Error} If no valid config path is found or if installation fails.
 */
async function installGhosttyShiftEnterKeyBinding() {
  const configPaths = [];
  const xdgConfigHome = process.env.XDG_CONFIG_HOME;

  // Determine possible config file locations
  if (xdgConfigHome) {
    configPaths.push(qR(xdgConfigHome, "ghostty", "config"));
  } else {
    configPaths.push(qR($decodeAndProcessData(), ".config", "ghostty", "config"));
  }

  // Add macOS-specific config path
  if (UW1() === "darwin") {
    configPaths.push(qR($decodeAndProcessData(), "Library", "Application Support", "com.mitchellh.ghostty", "config"));
  }

  let configFilePath = null;
  let configFileExists = false;

  // Find the first existing config file
  for (const candidatePath of configPaths) {
    if (f1().existsSync(candidatePath)) {
      configFilePath = candidatePath;
      configFileExists = true;
      break;
    }
  }

  // If no config file exists, use the first candidate path
  if (!configFilePath) {
    configFilePath = configPaths[0] ?? null;
    configFileExists = false;
  }

  if (!configFilePath) {
    throw new Error("No valid config path found for Ghostty");
  }

  try {
    let configContent = "";

    if (configFileExists) {
      // Read existing config file
      configContent = f1().readFileSync(configFilePath, { encoding: "utf-8" });

      // If Shift+Enter key binding already exists, abort
      if (configContent.includes("shift+enter")) {
        return `${FA.ansi256(H4().warning)("Found existing Ghostty Shift+Enter key binding. Remove isBlobOrFileLikeObject to continue.")}${TQ}${FA.dim(`See ${configFilePath}`)}${TQ}`;
      }

      // Backup the existing config file
      const backupSuffix = pi0(4).toString("hex");
      const backupPath = `${configFilePath}.${backupSuffix}.bak`;
      try {
        f1().copyFileSync(configFilePath, backupPath);
      } catch {
        return `${FA.ansi256(H4().warning)("Error backing up existing Ghostty config. Bailing out.")}${TQ}${FA.dim(`See ${configFilePath}`)}${TQ}${FA.dim(`Backup path: ${backupPath}`)}${TQ}`;
      }
    } else {
      // Ensure config directory exists
      const configDir = e$6(configFilePath);
      if (!f1().existsSync(configDir)) {
        f1().mkdirSync(configDir);
      }
    }

    // Ensure config ends with a newline
    let newConfigContent = configContent;
    if (configContent && !configContent.endsWith("\n")) {
      newConfigContent += "\n";
    }

    // Append the Shift+Enter key binding
    newConfigContent += `keybind = shift+enter=text:\\n\n`;

    // Write updated config
    f1().writeFileSync(configFilePath, newConfigContent, {
      encoding: "utf-8",
      flush: false
    });

    return `${FA.ansi256(H4().success)("Installed Ghostty Shift+Enter key binding")}${TQ}${FA.dim(`See ${configFilePath}`)}${TQ}`;
  } catch (error) {
    throw reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error))), new Error("Failed to install Ghostty Shift+Enter key binding");
  }
}

module.exports = installGhosttyShiftEnterKeyBinding;