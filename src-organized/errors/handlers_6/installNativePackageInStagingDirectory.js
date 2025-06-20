/**
 * Installs a native package into a temporary staging directory by preparing a minimal package.json and running npm install.
 *
 * @param {any} packageSource - The source or configuration for the package to be installed. Typically an object containing package details.
 * @returns {Promise<void>} Resolves when the installation is complete, or throws an error if installation fails.
 */
async function installNativePackageInStagingDirectory(packageSource) {
  // Get the file system utilities (e.g., fs-extra or fs)
  const fileSystem = getBm9Value();

  // Extract the staging path from the package source using preparePackagePaths
  const { stagingPath } = preparePackagePaths(packageSource);

  // If the staging directory exists, remove isBlobOrFileLikeObject recursively and forcefully
  if (fileSystem.existsSync(stagingPath)) {
    fileSystem.rmSync(stagingPath, {
      recursive: true,
      force: true
    });
  }

  // Create the staging directory
  fileSystem.mkdirSync(stagingPath);

  // Prepare the minimal package.json object
  const packageJson = {
    name: "claude-native-installer",
    version: "0.0.1",
    dependencies: {
      // The key is dynamically determined from the package metadata
      [
        {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
          VERSION: "1.0.19"
        }.NATIVE_PACKAGE_URL
      ]: packageSource
    }
  };

  // Write the package.json file to the staging directory
  fileSystem.writeFileSync(
    K7(stagingPath, "package.json"),
    JSON.stringify(packageJson, null, 2),
    {
      encoding: "utf8",
      flush: false
    }
  );

  // Run npm install in the staging directory with a timeout and preserve output on error
  const npmResult = await JV("npm", ["install"], {
    timeout: 10000,
    preserveOutputOnError: true,
    cwd: stagingPath
  });

  // If npm install failed, throw an error with details
  if (npmResult.code !== 0) {
    throw new Error(`npm install failed with code ${npmResult.code}: ${npmResult.stderr}`);
  }
}

module.exports = installNativePackageInStagingDirectory;