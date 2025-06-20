/**
 * Checks if external includes have been approved or a warning has been shown in the current context.
 * If neither condition is true, calls and returns the result of hasNonUserEntryWithParentAndValidPath().
 *
 * @async
 * @returns {Promise<boolean>} Returns false if external includes are approved or a warning has been shown; otherwise, returns the result of hasNonUserEntryWithParentAndValidPath().
 */
async function getCt1IfNoExternalIncludes() {
  // Retrieve the current interaction entry state
  const interactionEntryState = getProjectSubscriptionConfig();

  // If external includes are approved or a warning has been shown, do not proceed
  if (
    interactionEntryState.hasClaudeMdExternalIncludesApproved ||
    interactionEntryState.hasClaudeMdExternalIncludesWarningShown
  ) {
    return false;
  }

  // Otherwise, proceed to call hasNonUserEntryWithParentAndValidPath()
  return hasNonUserEntryWithParentAndValidPath();
}

module.exports = getCt1IfNoExternalIncludes;
