/**
 * Generates a unique configuration key for Claude, optionally including a hash suffix based on the config directory.
 *
 * If the CLAUDE_CONFIG_DIR environment variable is set, a hash of the config directory path is appended to the key.
 * Otherwise, the key is generated without the hash suffix.
 *
 * @param {string} [suffix=""] - Optional suffix to append to the base key.
 * @returns {string} The generated configuration key, possibly with a hash suffix.
 */
function generateClaudeConfigKey(suffix = "") {
  // Retrieve the Claude config directory path
  const configDirectory = getClaudeConfigDirectory();

  // Determine if a hash suffix should be added
  let hashSuffix = "";
  if (process.env.CLAUDE_CONFIG_DIR) {
    // Create a SHA-256 hash of the config directory path, take first 8 hex chars
    hashSuffix = `-${ks9("sha256").update(configDirectory).digest("hex").substring(0, 8)}`;
  }

  // Compose the final key using the base prefix, optional suffix, and optional hash
  return `${m0}${suffix}${hashSuffix}`;
}

module.exports = generateClaudeConfigKey;