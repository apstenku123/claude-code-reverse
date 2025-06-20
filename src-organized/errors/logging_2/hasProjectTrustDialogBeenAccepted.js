/**
 * Checks if the trust dialog has been accepted for the current or any parent project.
 *
 * This function traverses up the project hierarchy, starting from the current project,
 * and checks if the 'hasTrustDialogAccepted' flag is set for any ancestor project.
 *
 * @returns {boolean} True if the trust dialog has been accepted for the current or any parent project, otherwise false.
 */
function hasProjectTrustDialogBeenAccepted() {
  // Get the current project updateSnapshotAndNotify or identifier
  let currentProjectId = iA();

  // Retrieve the projects configuration object
  const projectsConfig = loadAndMergeConfigFile(XX(), bY);

  // Traverse up the project hierarchy
  while (true) {
    // Check if the trust dialog has been accepted for the current project
    if (projectsConfig.projects?.[currentProjectId]?.hasTrustDialogAccepted) {
      return true;
    }

    // Move to the parent project in the hierarchy
    const parentProjectId = Ly1(currentProjectId, "..");

    // If there is no parent (reached the root), stop traversing
    if (parentProjectId === currentProjectId) {
      break;
    }

    currentProjectId = parentProjectId;
  }

  // Trust dialog has not been accepted for any project in the hierarchy
  return false;
}

module.exports = hasProjectTrustDialogBeenAccepted;