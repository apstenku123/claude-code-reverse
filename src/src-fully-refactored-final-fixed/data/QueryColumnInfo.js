/**
 * Renders a column displaying information about a memory update, including its type and path.
 *
 * @param {Object} params - The parameters for the component.
 * @param {string} params.memoryType - The type of memory being referenced.
 * @param {string} params.memoryPath - The path to the memory resource.
 * @returns {React.ReactElement} a React element displaying the memory update information.
 */
function QueryColumnInfo({ memoryType, memoryPath }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent styling
  const themeStyles = getThemeStylesheet();
  // Format the memory path for display
  const formattedMemoryPath = formatMemoryPath(memoryPath);

  return J11.createElement(
    g,
    {
      flexDirection: "column",
      flexGrow: 1
    },
    J11.createElement(
      _,
      {
        color: themeStyles.secondaryText
      },
      // Display the memory type, update message, formatted path, and edit hint
      getMemoryLabel(memoryType),
      " updated in ",
      formattedMemoryPath,
      " · /memory to edit"
    )
  );
}

module.exports = QueryColumnInfo;