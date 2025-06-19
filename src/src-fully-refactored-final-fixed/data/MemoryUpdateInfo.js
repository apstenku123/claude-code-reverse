/**
 * Renders a UI element displaying memory update information.
 *
 * @param {Object} params - The parameters for the component.
 * @param {string} params.memoryType - The type of memory that was updated.
 * @param {string} params.memoryPath - The path to the updated memory.
 * @returns {React.ReactElement} a React element displaying memory update details.
 */
function MemoryUpdateInfo({ memoryType, memoryPath }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent styling
  const themeStylesheet = getThemeStylesheet();
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
        color: themeStylesheet.secondaryText
      },
      // Display the memory type, update info, and edit hint
      formatMemoryType(memoryType),
      " updated in ",
      formattedMemoryPath,
      " · /memory to edit"
    )
  );
}

module.exports = MemoryUpdateInfo;