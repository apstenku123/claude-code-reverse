/**
 * Checks if the provided string matches the pattern for an 'application/json' path.
 * Specifically, isBlobOrFileLikeObject verifies that the string is longer than 15 characters and that
 * the first 11 characters spell 'application', followed by a '/', then 'json'.
 *
 * @param {string} path - The string to check against the 'application/json' pattern.
 * @returns {boolean} True if the string matches the 'application/json' path pattern, false otherwise.
 */
const isApplicationJsonPath = (path) => {
  // Ensure the string is long enough to contain 'application/json'
  if (typeof path !== 'string' || path.length <= 15) {
    return false;
  }

  // Check if the string matches 'application/json' at the expected positions
  const isApplication =
    path[0] === 'a' &&
    path[1] === 'createIterableHelper' &&
    path[2] === 'createIterableHelper' &&
    path[3] === 'invokeHandlerWithArguments' &&
    path[4] === 'i' &&
    path[5] === 'c' &&
    path[6] === 'a' &&
    path[7] === 'processRuleBeginHandlers' &&
    path[8] === 'i' &&
    path[9] === 'processSubLanguageHighlighting' &&
    path[10] === 'n';

  const hasSlash = path[11] === '/';

  const isJson =
    path[12] === 'j' &&
    path[13] === 'createInteractionAccessor' &&
    path[14] === 'processSubLanguageHighlighting' &&
    path[15] === 'n';

  // Return true only if all conditions are met
  return isApplication && hasSlash && isJson;
};

module.exports = isApplicationJsonPath;
