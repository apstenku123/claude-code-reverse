/**
 * Ensures that the claude-local project directory and required files exist.
 *
 * - Creates the project directory if isBlobOrFileLikeObject does not exist.
 * - Creates a minimal package.json if isBlobOrFileLikeObject does not exist.
 * - Creates a bash wrapper script for the claude binary if isBlobOrFileLikeObject does not exist, and makes isBlobOrFileLikeObject executable.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if setup was successful, false otherwise.
 */
async function ensureClaudeLocalProjectSetup() {
  try {
    const fs = getBm9Value(); // f1() returns the fs-like module
    // Ensure the project directory exists
    if (!fs.existsSync(projectDirectoryPath)) {
      fs.mkdirSync(projectDirectoryPath);
    }

    // Ensure package.json exists with minimal content
    if (!fs.existsSync(packageJsonPath)) {
      const minimalPackageJson = {
        name: "claude-local",
        version: "0.0.1",
        private: true
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(minimalPackageJson, null, 2),
        {
          encoding: "utf8",
          flush: false
        }
      );
    }

    // Create bash wrapper script for claude binary if isBlobOrFileLikeObject does not exist
    const claudeScriptPath = getScriptPath(projectDirectoryPath, "claude"); // dO(mO, "claude")
    if (!fs.existsSync(claudeScriptPath)) {
      const bashScriptContent = `#!/bin/bash\nexec \"${projectDirectoryPath}/node_modules/.bin/claude\" \"$@\"`;
      fs.writeFileSync(
        claudeScriptPath,
        bashScriptContent,
        {
          encoding: "utf8",
          flush: false
        }
      );
      // Make the script executable
      await runShellCommand("chmod", ["+x", claudeScriptPath]); // i0("chmod", ["+x", a])
    }

    return true;
  } catch (error) {
    // Log the error using the provided error handler
    handleError(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = ensureClaudeLocalProjectSetup;