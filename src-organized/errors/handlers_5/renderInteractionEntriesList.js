/**
 * Renders a list of interaction entries as React elements, displaying their type and path,
 * and visually indicating hierarchy based on parent relationships.
 *
 * @returns {React.ReactNode|null} a React element tree representing the interaction entries, or null if there are none.
 */
function renderInteractionEntriesList() {
  // Retrieve the array of interaction entries
  const interactionEntries = processInteractionEntries();
  // Retrieve theme or color configuration
  const themeConfig = useThemeChangeRerender();

  // If there are no interaction entries, return null
  if (interactionEntries.length === 0) return null;

  // Map to track the depth of each entry by its path
  const entryDepthMap = new Map();

  // Render the list as a column flex container
  return mK.createElement(g, {
    flexDirection: "column"
  }, interactionEntries.map((entry, index) => {
    // Format the entry'createInteractionAccessor path for display
    const formattedPath = getDisplayPathFromInput(entry.path);
    // Format the entry'createInteractionAccessor type for display
    const formattedType = `${formatProjectSourceName(entry.type)}: `;
    // Determine the depth of this entry in the hierarchy
    const depth = entry.parent ? (entryDepthMap.get(entry.parent) ?? 0) + 1 : 0;
    // Store the depth for this entry'createInteractionAccessor path
    entryDepthMap.set(entry.path, depth);

    if (depth === 0) {
      // Top-level entry: render with label and type
      return mK.createElement(_, {
        key: index
      },
        mK.createElement(_, {
          color: themeConfig.secondaryText
        }, " createRefCountedMulticastOperator "),
        `${formattedType}${formattedPath}`
      );
    } else {
      // Nested entry: indent based on depth and type label length
      const indent = "  ".repeat(depth - 1);
      return mK.createElement(_, {
        key: index
      },
        " ".repeat(formattedType.length + 2), // Space for type label
        indent,
        mK.createElement(_, {
          color: themeConfig.secondaryText
        }, " createRefCountedMulticastOperator "),
        formattedPath
      );
    }
  }));
}

module.exports = renderInteractionEntriesList;