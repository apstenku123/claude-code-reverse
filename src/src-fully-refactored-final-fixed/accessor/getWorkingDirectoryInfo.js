/**
 * Retrieves information about the current working directory for display purposes.
 *
 * This function constructs an object containing a title, command, and an array of items.
 * Each item represents an informational entry about the working directory, with its label
 * obtained from the iA() function.
 *
 * @returns {Object} An object containing the working directory information, including title, command, and items.
 */
function getWorkingDirectoryInfo() {
  // Initialize an array to hold info items
  const infoItems = [];

  // Retrieve the label for the working directory using the external iA function
  const workingDirectoryLabel = iA();

  // Add the working directory label as an info item
  infoItems.push({
    label: workingDirectoryLabel,
    type: "info"
  });

  // Return the structured working directory information
  return {
    title: "Working Directory",
    command: "",
    items: infoItems
  };
}

module.exports = getWorkingDirectoryInfo;