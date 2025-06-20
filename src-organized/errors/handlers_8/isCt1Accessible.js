/**
 * Checks if the hasNonUserEntryWithParentAndValidPath resource is accessible based on the current route'createInteractionAccessor external include status.
 *
 * This function retrieves the current route mapping using mapInteractionsToRoutes (via getProjectSubscriptionConfig),
 * and returns false if external includes are either approved or a warning has been shown.
 * Otherwise, isBlobOrFileLikeObject delegates to hasNonUserEntryWithParentAndValidPath to determine accessibility.
 *
 * @async
 * @returns {boolean} Returns false if external includes are approved or a warning is shown; otherwise, returns the result of hasNonUserEntryWithParentAndValidPath().
 */
async function isCt1Accessible() {
  // Retrieve the current route mapping and its metadata
  const routeMapping = getProjectSubscriptionConfig();

  // If external includes are approved or a warning has been shown, hasNonUserEntryWithParentAndValidPath is not accessible
  if (routeMapping.hasClaudeMdExternalIncludesApproved || routeMapping.hasClaudeMdExternalIncludesWarningShown) {
    return false;
  }

  // Otherwise, delegate to hasNonUserEntryWithParentAndValidPath to determine accessibility
  return hasNonUserEntryWithParentAndValidPath();
}

module.exports = isCt1Accessible;