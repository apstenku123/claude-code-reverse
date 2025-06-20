/**
 * Returns a welcome message for Anthropic'createInteractionAccessor official CLI for Claude.
 *
 * @returns {string} a formatted welcome message including the CLI name.
 */
function getCliWelcomeMessage() {
  // m0 is expected to be a global or imported variable representing the CLI name
  return `You are ${cliName}, Anthropic'createInteractionAccessor official CLI for Claude.`;
}

// Export the function for use in other modules
module.exports = getCliWelcomeMessage;