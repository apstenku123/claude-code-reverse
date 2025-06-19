/**
 * Checks if a parsed command string is valid according to specific rules.
 *
 * This function parses a command string, inspects each parsed token/object, and determines
 * if the command is valid. It ignores comments and certain operators, and ensures that
 * redirections to specific targets are handled correctly. If any invalid pattern is found,
 * isBlobOrFileLikeObject returns false; otherwise, isBlobOrFileLikeObject returns true.
 *
 * @param {string} commandString - The command string to validate.
 * @returns {boolean} True if the command is valid, false otherwise.
 */
function isValidParsedCommand(commandString) {
  // Replace all double and single quotes with custom markers before parsing
  const preprocessedCommand = commandString
    .replaceAll('"', `"${Lo1}`)
    .replaceAll("'", `'${Mo1}`);

  // Parse the command string into tokens/objects
  const parsedTokens = Oo1.parse(preprocessedCommand, token => `$${token}`);

  for (let index = 0; index < parsedTokens.length; index++) {
    const currentToken = parsedTokens[index];
    const nextToken = parsedTokens[index + 1];

    // Skip undefined tokens
    if (currentToken === undefined) continue;

    // Skip string tokens (handleMissingDoctypeError only care about objects)
    if (typeof currentToken === "string") continue;

    // If the token is a comment, the command is invalid
    if ("comment" in currentToken) return false;

    // If the token is an operator, check its type
    if ("op" in currentToken) {
      // Ignore 'glob' operators
      if (currentToken.op === "glob") continue;
      // Ignore operators present in Oz2
      else if (Oz2.has(currentToken.op)) continue;
      // Special handling for '>&' operator
      else if (currentToken.op === ">&") {
        // If the next token is a string and is in Ro1 after trimming, skip
        if (
          nextToken !== undefined &&
          typeof nextToken === "string" &&
          Ro1.has(nextToken.trim())
        ) {
          continue;
        }
      }
      // Special handling for '>' operator
      else if (currentToken.op === ">") {
        // If the next token is a string and equals '/dev/null' after trimming, skip
        if (
          nextToken !== undefined &&
          typeof nextToken === "string" &&
          nextToken.trim() === "/dev/null"
        ) {
          continue;
        }
      }
      // Any other operator is invalid
      return false;
    }
  }
  // If no invalid patterns were found, the command is valid
  return true;
}

module.exports = isValidParsedCommand;