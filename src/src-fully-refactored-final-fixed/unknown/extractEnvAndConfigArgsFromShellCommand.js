/**
 * Parses a shell command string to extract environment variables and configuration arguments.
 * Handles special cases for 'env', 'RUN', and shell expressions, and applies pattern-based extraction.
 *
 * @param {string} commandString - The shell command to parse.
 * @returns {{ env: Object, configArgs: Array }} An object containing extracted environment variables and configuration arguments.
 */
function extractEnvAndConfigArgsFromShellCommand(commandString) {
  /**
   * Holds extracted environment variables.
   * @type {Object}
   */
  let extractedEnv = {};

  /**
   * Holds extracted configuration arguments.
   * @type {Array}
   */
  let extractedConfigArgs = [];

  // Early exit for commands starting with 'env', 'RUN', or shell expressions
  if (/^\s*env\s+/.test(commandString)) {
    return {
      env: {},
      configArgs: []
    };
  }
  if (/^\s*RUN\s+/.test(commandString)) {
    return {
      env: {},
      configArgs: []
    };
  }
  if (/^\s*[`$(]|echo\s+[`$(]/.test(commandString)) {
    return {
      env: {},
      configArgs: []
    };
  }

  // Parse the command string into tokens using xb.parse
  const parsedTokens = xb.parse(commandString);
  let normalizedCommand = commandString;
  let firstNonEnvIndex = 0;

  // Find the index where environment variable assignments end
  for (let tokenIndex = 0; tokenIndex < parsedTokens.length; tokenIndex++) {
    const token = parsedTokens[tokenIndex];
    if (typeof token === "string") {
      // If the token looks like an env assignment (e.g., FOO=bar) and is at the start
      if (token.includes("=") && tokenIndex === firstNonEnvIndex) {
        firstNonEnvIndex = tokenIndex + 1;
        continue;
      }
      // Stop at the first non-env assignment
      break;
    }
  }

  // If there are non-env tokens, reconstruct the command string from them
  if (firstNonEnvIndex < parsedTokens.length) {
    normalizedCommand = parsedTokens.slice(firstNonEnvIndex).map(token => {
      if (typeof token === "string") {
        // Quote the string token for shell safety
        return xb.quote([token]);
      }
      return token;
    }).join(" ");
  }

  // Apply pattern-based extraction from lP4
  for (const patternEntry of lP4) {
    if (patternEntry.patterns.some(pattern => pattern.test(normalizedCommand))) {
      // Merge environment variables from the matched pattern
      extractedEnv = {
        ...extractedEnv,
        ...patternEntry.env
      };
      // Append config arguments if present
      if (patternEntry.configArgs) {
        extractedConfigArgs = [...extractedConfigArgs, ...patternEntry.configArgs];
      }
    }
  }

  return {
    env: extractedEnv,
    configArgs: extractedConfigArgs
  };
}

module.exports = extractEnvAndConfigArgsFromShellCommand;