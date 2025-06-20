/**
 * Checks if external includes are allowed based on the current application state.
 *
 * This function retrieves the current interaction entries state and determines
 * whether external includes are approved or a warning has already been shown.
 * If either condition is true, isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject delegates to
 * the hasNonUserEntryWithParentAndValidPath function to determine the result.
 *
 * @async
 * @returns {Promise<boolean>} Returns false if external includes are approved or a warning has been shown; otherwise, returns the result of hasNonUserEntryWithParentAndValidPath().
 */
async function isExternalIncludesAllowed() {
  // Retrieve the current interaction entries state
  const interactionEntriesState = getProjectSubscriptionConfig();

  // If external includes are approved or a warning has been shown, disallow further action
  if (
    interactionEntriesState.hasClaudeMdExternalIncludesApproved ||
    interactionEntriesState.hasClaudeMdExternalIncludesWarningShown
  ) {
    return false;
  }

  // Otherwise, delegate to hasNonUserEntryWithParentAndValidPath to determine if external includes are allowed
  return hasNonUserEntryWithParentAndValidPath();
}

module.exports = isExternalIncludesAllowed;