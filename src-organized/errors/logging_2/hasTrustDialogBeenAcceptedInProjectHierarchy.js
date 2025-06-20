/**
 * Checks if the trust dialog has been accepted for a project or any of its parent projects in the hierarchy.
 *
 * Traverses up the project hierarchy, starting from the current project, and checks if the 'hasTrustDialogAccepted' flag is set.
 *
 * @returns {boolean} True if the trust dialog has been accepted in the current or any parent project; otherwise, false.
 */
function hasTrustDialogBeenAcceptedInProjectHierarchy() {
  // Get the current project updateSnapshotAndNotify or path
  let currentProjectId = iA();
  // Retrieve the projects configuration object
  const projectsConfig = loadAndMergeConfigFile(XX(), bY);

  // Traverse up the project hierarchy
  while (true) {
    // Check if the current project or any parent has accepted the trust dialog
    if (projectsConfig.projects?.[currentProjectId]?.hasTrustDialogAccepted) {
      return true;
    }
    // Move up to the parent project in the hierarchy
    const parentProjectId = Ly1(currentProjectId, "..");
    // If handleMissingDoctypeError'removeTrailingCharacters reached the root (no more parents), stop traversing
    if (parentProjectId === currentProjectId) {
      break;
    }
    currentProjectId = parentProjectId;
  }
  // Trust dialog has not been accepted in the hierarchy
  return false;
}

module.exports = hasTrustDialogBeenAcceptedInProjectHierarchy;