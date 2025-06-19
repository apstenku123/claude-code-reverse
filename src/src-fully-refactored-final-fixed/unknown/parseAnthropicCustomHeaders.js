/**
 * Parses the ANTHROPIC_CUSTOM_HEADERS environment variable into an object of header key-value pairs.
 *
 * Each header should be on its own line in the format: 'Header-Name: Header-Value'.
 * Blank lines and malformed lines are ignored.
 *
 * @returns {Object.<string, string>} An object mapping header names to their corresponding values.
 */
function parseAnthropicCustomHeaders() {
  const headers = {};
  const customHeadersEnv = process.env.ANTHROPIC_CUSTOM_HEADERS;

  // Return empty object if the environment variable is not set
  if (!customHeadersEnv) {
    return headers;
  }

  // Split the environment variable into lines (handles both \n and \r\n)
  const headerLines = customHeadersEnv.split(/\n|\r\n/);

  for (const line of headerLines) {
    // Skip empty or whitespace-only lines
    if (!line.trim()) continue;

    // Match 'Header-Name: Header-Value' with optional whitespace
    const match = line.match(/^\s*(.*?)\s*:\s*(.*?)\s*$/);
    if (match) {
      const [, headerName, headerValue] = match;
      // Only add if headerName and headerValue are defined
      if (headerName && headerValue !== undefined) {
        headers[headerName] = headerValue;
      }
    }
  }

  return headers;
}

module.exports = parseAnthropicCustomHeaders;