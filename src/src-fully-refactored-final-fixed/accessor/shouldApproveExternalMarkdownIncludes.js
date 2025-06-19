/**
 * Determines whether external Markdown includes are approved for use.
 *
 * This function checks the current application state to see if external Markdown includes
 * have either already been approved or if a warning has already been shown to the user.
 * If either condition is true, isBlobOrFileLikeObject returns false (approval not needed). Otherwise, isBlobOrFileLikeObject
 * delegates to hasNonUserEntryWithParentAndValidPath() to determine if approval should be granted.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if external Markdown includes are approved, false otherwise.
 */
async function shouldApproveExternalMarkdownIncludes() {
  // Retrieve the current state related to Markdown includes
  const markdownIncludeState = getProjectSubscriptionConfig();

  // If external includes are already approved or a warning has been shown, do not approve again
  if (
    markdownIncludeState.hasClaudeMdExternalIncludesApproved ||
    markdownIncludeState.hasClaudeMdExternalIncludesWarningShown
  ) {
    return false;
  }

  // Otherwise, determine approval status using hasNonUserEntryWithParentAndValidPath
  return hasNonUserEntryWithParentAndValidPath();
}

module.exports = shouldApproveExternalMarkdownIncludes;