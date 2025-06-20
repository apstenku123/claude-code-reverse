/**
 * Determines whether the Claude Markdown external includes warning should be shown.
 *
 * This function checks if the external includes warning or approval has already been handled.
 * If either has occurred, isBlobOrFileLikeObject returns false (do not show warning). Otherwise, isBlobOrFileLikeObject delegates to hasNonUserEntryWithParentAndValidPath() to decide.
 *
 * @async
 * @returns {boolean} Returns true if the warning should be shown, false otherwise.
 */
async function shouldShowClaudeMdExternalIncludesWarning() {
  // Retrieve the current state regarding Claude Markdown external includes
  const externalIncludesState = getProjectSubscriptionConfig();

  // If the external includes have already been approved or the warning has already been shown, do not show the warning again
  if (
    externalIncludesState.hasClaudeMdExternalIncludesApproved ||
    externalIncludesState.hasClaudeMdExternalIncludesWarningShown
  ) {
    return false;
  }

  // Otherwise, determine if the warning should be shown by delegating to hasNonUserEntryWithParentAndValidPath
  return hasNonUserEntryWithParentAndValidPath();
}

module.exports = shouldShowClaudeMdExternalIncludesWarning;