/**
 * Retrieves a list of installation items for display in the application UI.
 *
 * This function asynchronously fetches interaction entries (e.g., installation steps or commands),
 * and formats them into a structured object suitable for rendering in an installation section.
 * If no installation items are found, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @function getInstallationItems
 * @returns {Promise<null|{title: string, command: string, items: Array<{label: string, type: string}>}>}
 *   Returns a structured object with installation items, or null if no items are found.
 */
async function getInstallationItems() {
  // Fetch the list of installation entries (e.g., commands or steps)
  const installationEntries = await Uz1();

  // If there are no installation entries, return null
  if (installationEntries.length === 0) {
    return null;
  }

  // Map each installation entry to a display item
  const installationItems = installationEntries.map(entry => ({
    label: entry,
    type: "info"
  }));

  // Return the structured installation section object
  return {
    title: "Installation",
    command: "",
    items: installationItems
  };
}

module.exports = getInstallationItems;