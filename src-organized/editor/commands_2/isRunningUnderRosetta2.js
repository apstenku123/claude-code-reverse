/**
 * Checks if the current process is running under Rosetta 2 translation on macOS.
 *
 * This function only performs the check if the platform is macOS (darwin) and the architecture is x64 (Intel).
 * It executes the 'sysctl sysctl.proc_translated' command to determine if the process is being translated by Rosetta 2.
 *
 * @returns {boolean} True if running under Rosetta 2, false otherwise.
 */
const isRunningUnderRosetta2 = () => {
  // Only check on macOS with Intel architecture
  if (process.platform === "darwin" && process.arch === "x64") {
    // Execute the sysctl command to check for Rosetta 2 translation
    // yV1 is assumed to be a function that executes shell commands and returns an object with a 'stdout' property
    const commandResult = yV1("sysctl sysctl.proc_translated", xV1);
    const output = (commandResult.stdout || "").trim();
    // The output 'sysctl.proc_translated: 1' indicates Rosetta 2 translation is active
    return output === "sysctl.proc_translated: 1";
  }
  // Not running under Rosetta 2
  return false;
};

module.exports = isRunningUnderRosetta2;
