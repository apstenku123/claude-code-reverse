/**
 * Ensures the existence of a local project directory and a bash script for the 'claude' tool.
 *
 * - Creates the project directory if isBlobOrFileLikeObject does not exist.
 * - Creates a minimal package.json if isBlobOrFileLikeObject does not exist.
 * - Creates a bash script to execute the 'claude' binary if isBlobOrFileLikeObject does not exist, and makes isBlobOrFileLikeObject executable.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if setup is successful, false otherwise.
 */
async function ensureClaudeLocalProjectAndScript() {
  try {
    const fs = getBm9Value(); // f1(): returns the current value of the external variable 'bm9', which is a file system-like object
    // Ensure the project directory exists
    if (!fs.existsSync(projectDirectoryPath)) {
      fs.mkdirSync(projectDirectoryPath);
    }

    // Ensure the package.json exists
    if (!fs.existsSync(packageJsonPath)) {
      const packageJsonContent = {
        name: "claude-local",
        version: "0.0.1",
        private: true
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJsonContent, null, 2),
        {
          encoding: "utf8",
          flush: false
        }
      );
    }

    // Prepare the bash script path
    const bashScriptPath = getScriptPath(projectDirectoryPath, "claude"); // dO(mO, "claude")

    // Ensure the bash script exists and is executable
    if (!fs.existsSync(bashScriptPath)) {
      const bashScriptContent = `#!/bin/bash\nexec \"${projectDirectoryPath}/node_modules/.bin/claude\" \"$@\"`;
      fs.writeFileSync(
        bashScriptPath,
        bashScriptContent,
        {
          encoding: "utf8",
          flush: false
        }
      );
      // Make the script executable
      await runCommand("chmod", ["+x", bashScriptPath]); // i0("chmod", ["+x", a])
    }

    return true;
  } catch (error) {
    // Log the error using the provided error handler
    handleError(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

// Dependency mappings for clarity
// getBm9Value: returns the current value of the external variable 'bm9' (file system-like object)
// projectDirectoryPath: mO
// packageJsonPath: sO2
// getScriptPath: dO
// handleError: reportErrorIfAllowed
// runCommand: i0

module.exports = ensureClaudeLocalProjectAndScript;