/**
 * Returns a string representing the target platform and architecture for the current build environment.
 *
 * If the Emscripten compiler is detected (via the 'CC' environment variable ending with '/emcc'),
 * returns the string 'wasm32'. Otherwise, constructs a string in the format:
 *   `${platform}${libc}-${arch}`
 * where:
 *   - platform: from 'npm_config_platform' env var or process.platform
 *   - arch: from 'npm_config_arch' env var or process.arch
 *   - libc: from 'npm_config_libc' env var or the result of getLibcType()
 *
 * @returns {string} The target platform string (e.g., 'linuxglibc-x64', 'darwin-x64', or 'wasm32').
 */
function getTargetPlatformString() {
  // Check if Emscripten compiler is set in the environment
  if (isEmccCompilerSet()) {
    return "wasm32";
  }

  // Destructure relevant environment variables
  const {
    npm_config_arch: npmConfigArch,
    npm_config_platform: npmConfigPlatform,
    npm_config_libc: npmConfigLibc
  } = process.env;

  // Determine libc type: use env var if set, otherwise fallback to getLibcType()
  const libcType = typeof npmConfigLibc === "string" ? npmConfigLibc : getLibcType();

  // Compose the platform string
  const platform = npmConfigPlatform || process.platform;
  const arch = npmConfigArch || process.arch;

  return `${platform}${libcType}-${arch}`;
}

// Dependency: Checks if the 'CC' environment variable is set to a path ending with '/emcc'
// (Assumed to be implemented elsewhere)
// function isEmccCompilerSet() { ... }

// Dependency: Returns the libc type for the current environment
// (Assumed to be implemented elsewhere)
// function getLibcType() { ... }

module.exports = getTargetPlatformString;