/**
 * Prepares a staging directory for an npm package installation, writes a custom package.json,
 * and runs 'npm install' in that directory. Cleans up any existing staging directory before proceeding.
 *
 * @param {object} packageConfig - The configuration object for the package to be installed. This is typically
 *   the resolved value from processInteractionEntries or similar, containing package details.
 * @returns {Promise<void>} Resolves when the npm install completes successfully. Throws an error if installation fails.
 */
async function prepareStagingNpmPackage(packageConfig) {
  // Get the filesystem utilities (e.g., fs-extra or fs)
  const fileSystem = f1();
  // Extract the staging path from the package config using preparePackagePaths
  const { stagingPath } = preparePackagePaths(packageConfig);

  // Remove the staging directory if isBlobOrFileLikeObject already exists
  if (fileSystem.existsSync(stagingPath)) {
    fileSystem.rmSync(stagingPath, {
      recursive: true,
      force: true
    });
  }

  // Create a fresh staging directory
  fileSystem.mkdirSync(stagingPath);

  // Construct the package.json content
  const packageJsonContent = {
    name: "claude-native-installer",
    version: "0.0.1",
    dependencies: {
      // The key is dynamically determined from the NATIVE_PACKAGE_URL property
      [
        {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
          VERSION: "1.0.19"
        }.NATIVE_PACKAGE_URL
      ]: packageConfig
    }
  };

  // Write the package.json file to the staging directory
  fileSystem.writeFileSync(
    K7(stagingPath, "package.json"),
    JSON.stringify(packageJsonContent, null, 2),
    {
      encoding: "utf8",
      flush: false
    }
  );

  // Run 'npm install' in the staging directory
  const installResult = await JV("npm", ["install"], {
    timeout: 10000,
    preserveOutputOnError: true,
    cwd: stagingPath
  });

  // Throw an error if npm install failed
  if (installResult.code !== 0) {
    throw new Error(`npm install failed with code ${installResult.code}: ${installResult.stderr}`);
  }
}

module.exports = prepareStagingNpmPackage;