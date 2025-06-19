/**
 * Resolves the appropriate command and arguments to execute a given file or script, with special handling for Windows platforms.
 * Handles file extensions (.exe, .bat, .cmd, .ps1, .js) and ensures the correct shell or interpreter is used.
 *
 * @param {string} executablePath - The path to the executable or script to run.
 * @param {string[]} args - The arguments to pass to the executable or script.
 * @returns {{cmd: string, args: string[]}} An object containing the resolved command and its arguments.
 */
function resolveWindowsExecutableCommand(executablePath, args) {
  // Non-Windows platforms: return the command and args as-is (with normalization)
  if (process.platform !== "win32") {
    return {
      cmd: findExecutableInPath(executablePath),
      args: args
    };
  }

  // On Windows, check if the file exists as given
  if (!rl.existsSync(executablePath)) {
    // Try common Windows executable/script extensions
    const possibleExtensions = [".exe", ".bat", ".cmd", ".ps1"];
    for (const extension of possibleExtensions) {
      const candidatePath = findExecutableInPath(`${executablePath}${extension}`);
      if (rl.existsSync(candidatePath)) {
        // Recursively resolve with the found file
        return resolveWindowsExecutableCommand(candidatePath, args);
      }
    }
  }

  // Special handling for PowerShell scripts
  if (/\.ps1$/i.test(executablePath)) {
    const powershellPath = sl.join(
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
      "-File", executablePath
    ];
    return {
      cmd: powershellPath,
      args: powershellArgs.concat(args)
    };
  }

  // Special handling for batch and command scripts
  if (/\.(bat|cmd)$/i.test(executablePath)) {
    const cmdExePath = sl.join(process.env.SYSTEMROOT, "System32", "cmd.exe");
    // Gm9 combines ['/C', executablePath] with args, with a flag for Windows
    const cmdArgs = Gm9(["/C", executablePath], args, true);
    return {
      cmd: cmdExePath,
      args: cmdArgs
    };
  }

  // Special handling for JavaScript files
  if (/\.js$/i.test(executablePath)) {
    const nodePath = process.execPath;
    const nodeArgs = [executablePath];
    return {
      cmd: nodePath,
      args: nodeArgs.concat(args)
    };
  }

  // Default: return the command and args as-is
  return {
    cmd: executablePath,
    args: args
  };
}

module.exports = resolveWindowsExecutableCommand;