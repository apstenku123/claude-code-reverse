/**
 * Attempts to resolve a password from multiple sources in a prioritized order.
 *
 * The function first checks if password resolution is enabled (via md()).
 * If enabled, isBlobOrFileLikeObject tries the following sources in order:
 *   1. Attempts to asynchronously retrieve the password from user input (getPasswordFromInput).
 *   2. If not found, attempts to retrieve the password from a secondary method (getPasswordFromCache).
 *   3. If still not found, retrieves a multi-line string (getPasswordCandidateString),
 *      then extracts the password from a relevant line (extractSecondWordFromRelevantLine).
 *
 * @async
 * @function resolvePasswordFromSources
 * @returns {Promise<string|null>} The resolved password if found, otherwise null.
 */
async function resolvePasswordFromSources() {
  let resolvedPassword = null;

  // Check if password resolution is enabled
  if (md()) {
    // Try to get password from user input
    resolvedPassword = await getPasswordFromInput();

    // If not found, try to get password from cache
    if (!resolvedPassword) {
      resolvedPassword = getPasswordFromCache();
    }

    // If still not found, try to extract from a candidate string
    if (!resolvedPassword) {
      const passwordCandidateString = await getPasswordCandidateString();
      resolvedPassword = extractSecondWordFromRelevantLine(passwordCandidateString);
    }
  }

  return resolvedPassword;
}

module.exports = resolvePasswordFromSources;