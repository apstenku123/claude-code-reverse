/**
 * Retrieves the MCP (Microcontroller Platform) timeout value from the environment variables.
 * If the environment variable 'MCP_TIMEOUT' is not set or is not a valid integer, returns the default timeout value.
 *
 * @returns {number} The timeout value in milliseconds.
 */
function getMcpTimeout() {
  // Retrieve the MCP_TIMEOUT environment variable as a string
  const mcpTimeoutEnv = process.env.MCP_TIMEOUT || "";

  // Parse the environment variable as an integer (base 10)
  const parsedTimeout = parseInt(mcpTimeoutEnv, 10);

  // If parsing fails (NaN or 0), default to 30000 milliseconds
  return parsedTimeout || 30000;
}

module.exports = getMcpTimeout;
