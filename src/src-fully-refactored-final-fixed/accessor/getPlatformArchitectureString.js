/**
 * Returns a string representing the current platform and architecture, optionally including libc information.
 * If the environment is detected as WebAssembly (wasm32), returns 'wasm32'.
 * Otherwise, constructs a string in the format: '<platform><libc>-<architecture>'.
 *
 * @returns {string} The platform/architecture string or 'wasm32' if running in a wasm32 environment.
 */
const getPlatformArchitectureString = () => {
  // Check if the current environment is WebAssembly (wasm32)
  if (sK2()) {
    return "wasm32";
  }

  // Destructure relevant environment variables
  const {
    npm_config_arch: npmConfigArch,
    npm_config_platform: npmConfigPlatform,
    npm_config_libc: npmConfigLibc
  } = process.env;

  // Determine the libc variant: use env var if present, otherwise fallback to aK2()
  const libcVariant = typeof npmConfigLibc === "string" ? npmConfigLibc : aK2();

  // Build the platform string: use env var if present, otherwise fallback to process.platform
  const platform = npmConfigPlatform || process.platform;

  // Build the architecture string: use env var if present, otherwise fallback to process.arch
  const architecture = npmConfigArch || process.arch;

  // Return the formatted string
  return `${platform}${libcVariant}-${architecture}`;
};

module.exports = getPlatformArchitectureString;