/**
 * Initializes the local environment for the 'claude-local' CLI tool.
 * Ensures the main directory and package.json exist, and creates an executable bash wrapper if missing.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if initialization succeeds, false otherwise.
 */
async function initializeClaudeLocalEnvironment() {
  try {
    const fs = getBm9Value(); // Access the external file system module

    // Ensure the main output directory exists
    if (!fs.existsSync(mainOutputDirectory)) {
      fs.mkdirSync(mainOutputDirectory);
    }

    // Ensure the package.json file exists in the output directory
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

    // Create the bash wrapper script if isBlobOrFileLikeObject does not exist
    const bashWrapperPath = getScriptPath(mainOutputDirectory, "claude");
    if (!fs.existsSync(bashWrapperPath)) {
      const bashScriptContent = `#!/bin/bash\nexec "${mainOutputDirectory}/node_modules/.bin/claude" "$@"`;
      fs.writeFileSync(
        bashWrapperPath,
        bashScriptContent,
        {
          encoding: "utf8",
          flush: false
        }
      );
      // Make the script executable
      await runCommand("chmod", ["+x", bashWrapperPath]);
    }

    return true;
  } catch (error) {
    // Log the error using the provided error handler
    handleError(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = initializeClaudeLocalEnvironment;