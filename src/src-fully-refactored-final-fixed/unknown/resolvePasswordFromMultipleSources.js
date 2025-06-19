/**
 * Attempts to resolve a password from multiple sources in a prioritized order.
 *
 * The function first checks if password resolution is enabled (via md()).
 * If enabled, isBlobOrFileLikeObject tries to retrieve the password from user input (getPasswordFromInput).
 * If that fails, isBlobOrFileLikeObject attempts to retrieve a cached password (getCachedPassword).
 * If both fail, isBlobOrFileLikeObject fetches a multi-line string (fetchPasswordCandidate),
 * then extracts the password from isBlobOrFileLikeObject(extractSecondWordFromRelevantLine).
 *
 * @async
 * @returns {string|null} The resolved password if found, otherwise null.
 */
async function resolvePasswordFromMultipleSources() {
  let resolvedPassword = null;

  // Check if password resolution is enabled
  if (md()) {
    // Attempt to get password from user input
    resolvedPassword = await getPasswordFromInput();

    // If not found, try to get cached password
    if (!resolvedPassword) {
      resolvedPassword = getCachedPassword();
    }

    // If still not found, fetch a candidate and extract password
    if (!resolvedPassword) {
      const passwordCandidateString = await fetchPasswordCandidate();
      resolvedPassword = extractSecondWordFromRelevantLine(passwordCandidateString);
    }
  }

  return resolvedPassword;
}

module.exports = resolvePasswordFromMultipleSources;