/**
 * Returns a string representing the current platform, architecture, and libc family.
 *
 * If the Emscripten compiler is detected (via the 'CC' environment variable ending with '/emcc'),
 * returns 'wasm32'. Otherwise, constructs a string in the format:
 *   `${platform}${libcFamily}-${architecture}`
 *
 * - platform: from npm_config_platform or process.platform
 * - architecture: from npm_config_arch or process.arch
 * - libcFamily: from npm_config_libc or detected via getLinuxFamilyIfNonGlibc()
 *
 * @returns {string} Platform, libc, and architecture string (e.g., 'linuxmusl-x64') or 'wasm32' if Emscripten is set.
 */
function getPlatformArchLibcString() {
  // Check if the Emscripten compiler is set via environment variable
  if (isEmccCompilerSet()) {
    return "wasm32";
  }

  // Destructure relevant environment variables
  const {
    npm_config_arch: npmConfigArch,
    npm_config_platform: npmConfigPlatform,
    npm_config_libc: npmConfigLibc
  } = process.env;

  // Determine the libc family: use env var if set, otherwise detect
  const libcFamily = typeof npmConfigLibc === "string"
    ? npmConfigLibc
    : getLinuxFamilyIfNonGlibc();

  // Compose the final string
  const platform = npmConfigPlatform || process.platform;
  const architecture = npmConfigArch || process.arch;

  return `${platform}${libcFamily}-${architecture}`;
}

module.exports = getPlatformArchLibcString;