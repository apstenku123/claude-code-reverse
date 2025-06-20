/**
 * Resolves the appropriate command and arguments to execute a script or executable on the current platform.
 * Handles Windows-specific extensions and wrappers for PowerShell, batch, and JavaScript files.
 *
 * @param {string} commandPath - The path to the command or script to execute.
 * @param {string[]} commandArgs - The arguments to pass to the command.
 * @returns {{cmd: string, args: string[]}} An object containing the resolved command and its arguments.
 */
function resolveCommandForPlatform(commandPath, commandArgs) {
  // If not on Windows, return the command and args as-is (after resolving the command path)
  if (process.platform !== "win32") {
    return {
      cmd: findExecutableInPath(commandPath),
      args: commandArgs
    };
  }

  // On Windows, check if the command exists as given
  if (!rl.existsSync(commandPath)) {
    // Try common Windows executable/script extensions
    const windowsExtensions = [".exe", ".bat", ".cmd", ".ps1"];
    for (let i = 0; i < windowsExtensions.length; i++) {
      const extension = windowsExtensions[i];
      const candidatePath = findExecutableInPath(`${commandPath}${extension}`);
      if (rl.existsSync(candidatePath)) {
        // Recursively resolve with the found extension
        return resolveCommandForPlatform(candidatePath, commandArgs);
      }
    }
  }

  // If the command is a PowerShell script, wrap with PowerShell executable and options
  if (commandPath.match(/\.ps1$/i)) {
    const powershellExe = sl.join(
      process.env.SYSTEMROOT,
      "System32",
      "WindowsPowerShell",
      "v1.0",
      "PowerShell.exe"
    );
    const powershellArgs = [
      "-ExecutionPolicy", "Unrestricted",
      "-NoLogo",
      "-NonInteractive",
      "-File", commandPath
    ];
    return {
      cmd: powershellExe,
      args: powershellArgs.concat(commandArgs)
    };
  }

  // If the command is a batch or cmd script, wrap with cmd.exe
  if (commandPath.match(/\.(bat|cmd)$/i)) {
    const cmdExe = sl.join(process.env.SYSTEMROOT, "System32", "cmd.exe");
    // Gm9 is assumed to merge ['/C', commandPath] with commandArgs, with a third arg 'true'
    const mergedArgs = Gm9(["/C", commandPath], commandArgs, true);
    return {
      cmd: cmdExe,
      args: mergedArgs
    };
  }

  // If the command is a JavaScript file, use the Node.js executable
  if (commandPath.match(/\.(js)$/i)) {
    const nodeExe = process.execPath;
    const nodeArgs = [commandPath];
    return {
      cmd: nodeExe,
      args: nodeArgs.concat(commandArgs)
    };
  }

  // Default: return the command and args as-is
  return {
    cmd: commandPath,
    args: commandArgs
  };
}

module.exports = resolveCommandForPlatform;
