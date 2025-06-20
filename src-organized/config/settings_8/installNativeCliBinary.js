/**
 * Installs the platform-specific native CLI binary for Claude by copying isBlobOrFileLikeObject from the staging path
 * to the install path, setting appropriate permissions, and cleaning up the staging directory.
 * Throws an error if the required native package or binary is not found.
 *
 * @param {object} installOptions - Options containing staging and install paths.
 * @returns {void}
 */
function installNativeCliBinary(installOptions) {
  // Get the file system utilities (e.g., fs wrapper)
  const fileSystem = getBm9Value();

  // Extract stagingPath and installPath from the install options
  const {
    stagingPath,
    installPath
  } = preparePackagePaths(installOptions);

  // Ensure the install directory exists
  const resolvedInstallPath = wz1(installPath);
  if (!fileSystem.existsSync(resolvedInstallPath)) {
    fileSystem.mkdirSync(resolvedInstallPath);
  }

  // Build the path to the @anthropic-ai node_modules directory in the staging area
  const anthropicNodeModulesPath = K7(stagingPath, "node_modules", "@anthropic-ai");

  // Find the platform-specific native package directory (starts with 'claude-cli-native-')
  const nativePackageDir = fileSystem
    .readdirStringSync(anthropicNodeModulesPath)
    .find(dirName => dirName.startsWith("claude-cli-native-"));

  if (!nativePackageDir) {
    throw new Error("Could not find platform-specific native package");
  }

  // Path to the native CLI binary inside the native package directory
  const nativeBinaryPath = K7(anthropicNodeModulesPath, nativePackageDir, "cli");

  // Ensure the native binary exists
  if (!fileSystem.existsSync(nativeBinaryPath)) {
    throw new Error(`Native binary not found at ${nativeBinaryPath}`);
  }

  // Copy the native binary to the install path
  fileSystem.copyFileSync(nativeBinaryPath, installPath);

  // Set executable permissions (octal 0755)
  fileSystem.chmodSync(installPath, 0o755);

  // Remove the staging directory recursively and forcefully
  fileSystem.rmSync(stagingPath, {
    recursive: true,
    force: true
  });

  // Link the installed binary to the 'latest' symlink in the Claude config directory
  const latestSymlinkPath = K7(getClaudeConfigDirectory(), "latest");
  ensureSymlinkToLatestVersion(latestSymlinkPath, installPath);
}

module.exports = installNativeCliBinary;