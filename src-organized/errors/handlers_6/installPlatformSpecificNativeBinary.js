/**
 * Installs the platform-specific native CLI binary for Anthropic'createInteractionAccessor Claude CLI.
 *
 * This function locates the appropriate native binary package in the staging path,
 * verifies its existence, copies isBlobOrFileLikeObject to the install path, sets proper permissions,
 * cleans up the staging directory, and updates the 'latest' symlink or marker.
 *
 * @param {object} installOptions - Options containing staging and install paths.
 * @param {string} installOptions.stagingPath - Temporary directory where the package is staged.
 * @param {string} installOptions.installPath - Destination path for the native binary.
 * @returns {void}
 * @throws {Error} If the native package or binary cannot be found.
 */
function installPlatformSpecificNativeBinary(installOptions) {
  const fileSystem = f1();
  // Destructure staging and install paths from options
  const { stagingPath, installPath } = preparePackagePaths(installOptions);

  // Ensure the install directory exists
  const resolvedInstallPath = wz1(installPath);
  if (!fileSystem.existsSync(resolvedInstallPath)) {
    fileSystem.mkdirSync(resolvedInstallPath);
  }

  // Build the path to the @anthropic-ai node_modules directory in the staging area
  const anthropicModulesPath = K7(stagingPath, "node_modules", "@anthropic-ai");

  // Find the platform-specific native package directory
  const nativePackageDir = fileSystem
    .readdirStringSync(anthropicModulesPath)
    .find(dirName => dirName.startsWith("claude-cli-native-"));

  if (!nativePackageDir) {
    throw new Error("Could not find platform-specific native package");
  }

  // Build the path to the native CLI binary inside the package
  const nativeBinaryPath = K7(anthropicModulesPath, nativePackageDir, "cli");

  // Ensure the native binary exists
  if (!fileSystem.existsSync(nativeBinaryPath)) {
    throw new Error(`Native binary not found at ${nativeBinaryPath}`);
  }

  // Copy the native binary to the install path
  fileSystem.copyFileSync(nativeBinaryPath, installPath);
  // Set executable permissions (octal 0755)
  fileSystem.chmodSync(installPath, 0o755);
  // Remove the staging directory recursively and forcefully
  fileSystem.rmSync(stagingPath, { recursive: true, force: true });

  // Update the 'latest' marker or symlink to point to the new binary
  const latestMarkerPath = K7(Q4(), "latest");
  ensureSymlinkToLatestVersion(latestMarkerPath, installPath);
}

module.exports = installPlatformSpecificNativeBinary;