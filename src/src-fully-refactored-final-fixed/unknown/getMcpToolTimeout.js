/**
 * Retrieves the MCP tool timeout value from the environment variables.
 * If the environment variable is not set or is not a valid number, returns a default timeout value.
 *
 * @returns {number} The MCP tool timeout value in milliseconds.
 */
function getMcpToolTimeout() {
  // Retrieve the timeout value from the environment variable
  const mcpToolTimeoutEnv = process.env.MCP_TOOL_TIMEOUT || "";

  // Parse the value as an integer (base 10)
  const parsedTimeout = parseInt(mcpToolTimeoutEnv, 10);

  // If parsing fails (NaN or 0), use the default timeout value of 100,000,000 ms
  return parsedTimeout || 1e8;
}

module.exports = getMcpToolTimeout;