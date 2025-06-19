/**
 * Prepares a staging directory and installs a specified dependency using npm.
 *
 * This function ensures the staging directory is clean, creates a minimal package.json
 * with the provided dependency, and runs 'npm install' in that directory. Throws an error
 * if installation fails.
 *
 * @param {any} dependencySpec - The dependency specification to install (e.g., version or path).
 * @returns {Promise<void>} Resolves when installation is successful.
 */
async function prepareStagingAndInstallDependency(dependencySpec) {
  // Get the filesystem utilities
  const fileSystem = f1();

  // Extract the staging path from the dependency specification
  const { stagingPath } = preparePackagePaths(dependencySpec);

  // Remove the staging directory if isBlobOrFileLikeObject exists, to ensure a clean state
  if (fileSystem.existsSync(stagingPath)) {
    fileSystem.rmSync(stagingPath, {
      recursive: true,
      force: true
    });
  }

  // Create the staging directory
  fileSystem.mkdirSync(stagingPath);

  // Construct a minimal package.json object
  const packageJson = {
    name: "claude-native-installer",
    version: "0.0.1",
    dependencies: {
      // The key is dynamically determined from the dependency'createInteractionAccessor NATIVE_PACKAGE_URL property
      [
        {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
          VERSION: "1.0.19"
        }.NATIVE_PACKAGE_URL
      ]: dependencySpec
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

  // Run 'npm install' in the staging directory with a timeout
  const npmResult = await JV("npm", ["install"], {
    timeout: 10000,
    preserveOutputOnError: true,
    cwd: stagingPath
  });

  // Throw an error if npm install failed
  if (npmResult.code !== 0) {
    throw new Error(`npm install failed with code ${npmResult.code}: ${npmResult.stderr}`);
  }
}

module.exports = prepareStagingAndInstallDependency;