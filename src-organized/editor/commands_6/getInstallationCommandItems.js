/**
 * Retrieves a list of installation command items for display purposes.
 *
 * This asynchronous function fetches an array of route names (or similar entries)
 * using the Uz1 function (which likely maps interaction entries to route names).
 * If no entries are found, isBlobOrFileLikeObject returns null. Otherwise, isBlobOrFileLikeObject returns a structured
 * object containing a title, an empty command string, and an array of items where
 * each item represents a route name labeled as informational.
 *
 * @async
 * @function getInstallationCommandItems
 * @returns {Promise<null|{title: string, command: string, items: Array<{label: string, type: string}>}>}
 *   Returns null if no route names are found, otherwise returns an object with installation info.
 */
async function getInstallationCommandItems() {
  // Fetch the list of route names or interaction entries
  const routeNames = await Uz1();

  // If no route names are found, return null
  if (routeNames.length === 0) return null;

  // Map each route name to an item object with label and type
  const items = routeNames.map((routeName) => ({
    label: routeName,
    type: "info"
  }));

  // Return the structured installation command object
  return {
    title: "Installation",
    command: "",
    items
  };
}

module.exports = getInstallationCommandItems;