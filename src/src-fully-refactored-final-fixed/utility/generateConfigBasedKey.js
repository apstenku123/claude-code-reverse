/**
 * Generates a unique key string based on a base prefix, an optional suffix, and the current Claude config directory.
 * If the CLAUDE_CONFIG_DIR environment variable is set, a hash of the config directory is appended to the key for uniqueness.
 *
 * @param {string} [suffix=""] - Optional string to append after the base prefix.
 * @returns {string} The generated unique key string.
 */
function generateConfigBasedKey(suffix = "") {
  // Retrieve the Claude configuration directory path
  const configDirectory = getClaudeConfigDirectory();

  // If the CLAUDE_CONFIG_DIR environment variable is set, generate a short hash of the config directory
  const configHash = process.env.CLAUDE_CONFIG_DIR
    ? `-${ks9("sha256").update(configDirectory).digest("hex").substring(0, 8)}`
    : "";

  // Compose the final key using the base prefix, optional suffix, and config hash
  return `${m0}${suffix}${configHash}`;
}

module.exports = generateConfigBasedKey;