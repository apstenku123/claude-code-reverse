/**
 * Renders a panel displaying information about a memory update, including the memory type and path.
 *
 * @param {Object} params - The parameters for the panel.
 * @param {string} params.memoryType - The type of memory that was updated.
 * @param {string} params.memoryPath - The path to the updated memory.
 * @returns {React.ReactElement} a React element displaying memory update information.
 */
function MemoryUpdateInfoPanel({ memoryType, memoryPath }) {
  // Get the current theme'createInteractionAccessor stylesheet (e.g., for text color)
  const themeStylesheet = getThemeStylesheet();
  // Get a human-readable label for the memory path
  const memoryPathLabel = getRelativePathAlias(memoryPath);

  return J11.createElement(
    g, // Container component (e.g., a Flex or Box)
    {
      flexDirection: "column",
      flexGrow: 1
    },
    J11.createElement(
      _, // Text or Typography component
      {
        color: themeStylesheet.secondaryText
      },
      getMemoryLabel(memoryType), // Render the memory type label
      " updated in ",
      memoryPathLabel, // Render the memory path label
      " · /memory to edit" // Unicode middot separator and edit hint
    )
  );
}

module.exports = MemoryUpdateInfoPanel;