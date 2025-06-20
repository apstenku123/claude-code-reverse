/**
 * Retrieves installation information items for display in the application UI.
 *
 * This function asynchronously fetches a list of installation-related labels (e.g., steps, dependencies, or routes),
 * and formats them into a structured object suitable for rendering in an installation section. If no installation
 * items are found, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @function getInstallationInfoItems
 * @returns {Promise<null|{title: string, command: string, items: Array<{label: string, type: string}>}>} 
 *   Returns a formatted object containing installation info items, or null if no items are found.
 */
async function getInstallationInfoItems() {
  // Fetch the list of installation labels (e.g., steps, routes, or dependencies)
  const installationLabels = await Uz1();

  // If no installation items are found, return null
  if (installationLabels.length === 0) {
    return null;
  }

  // Map each label to a structured info item
  const infoItems = installationLabels.map(label => ({
    label: label,
    type: "info"
  }));

  // Return the formatted installation info object
  return {
    title: "Installation",
    command: "",
    items: infoItems
  };
}

module.exports = getInstallationInfoItems;