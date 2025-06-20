/**
 * Generates a configuration key string based on a base prefix, an optional suffix, and an optional hash of the current configuration.
 *
 * If the environment variable CLAUDE_CONFIG_DIR is set, a hash of the current configuration is appended to the key for uniqueness.
 *
 * @param {string} suffix - Optional string to append after the base prefix.
 * @returns {string} The generated configuration key.
 */
function generateConfigKey(suffix = "") {
  // Retrieve the current configuration string
  const currentConfig = Q4();

  // Determine if a config hash should be appended
  // If CLAUDE_CONFIG_DIR is set, append a short hash of the config
  let configHashSuffix = "";
  if (process.env.CLAUDE_CONFIG_DIR) {
    configHashSuffix = `-${ks9("sha256").update(currentConfig).digest("hex").substring(0, 8)}`;
  }

  // Compose the final configuration key
  return `${m0}${suffix}${configHashSuffix}`;
}

module.exports = generateConfigKey;