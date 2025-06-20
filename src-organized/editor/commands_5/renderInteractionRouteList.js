/**
 * Renders a list of user interaction routes as React elements, displaying their hierarchy and source type.
 *
 * This function retrieves a list of user interaction entries, formats their display names and hierarchy,
 * and returns a React element tree representing the list. Each entry is indented according to its depth in the hierarchy.
 *
 * @returns {React.ReactElement|null} a React element representing the list of interaction routes, or null if there are none.
 */
function renderInteractionRouteList() {
  // Retrieve the list of user interaction entries
  const interactionRoutes = mapInteractionsToRoutes();
  // Retrieve theme or configuration (e.g., colors)
  const themeConfig = useThemeChangeRerender();

  // If there are no interaction routes, return null
  if (interactionRoutes.length === 0) return null;

  // Map to keep track of each route'createInteractionAccessor depth in the hierarchy
  const routeDepthMap = new Map();

  // Render the list as a column of React elements
  return mK.createElement(g, {
    flexDirection: "column"
  }, interactionRoutes.map((routeEntry, index) => {
    // Format the route'createInteractionAccessor display name
    const formattedRouteName = getDisplayPathFromInput(routeEntry.path);
    // Format the route'createInteractionAccessor source type (e.g., 'Local: ')
    const sourceTypeLabel = `${formatProjectSourceName(routeEntry.type)}: `;
    // Determine the depth in the hierarchy (0 for root, incremented for children)
    const depth = routeEntry.parent ? (routeDepthMap.get(routeEntry.parent) ?? 0) + 1 : 0;
    // Store the depth for this route'createInteractionAccessor path
    routeDepthMap.set(routeEntry.path, depth);

    if (depth === 0) {
      // Root-level route: no indentation
      return mK.createElement(_, {
        key: index
      },
        mK.createElement(_, {
          color: themeConfig.secondaryText
        }, " createRefCountedMulticastOperator "),
        `${sourceTypeLabel}${formattedRouteName}`
      );
    } else {
      // Child route: indent according to depth
      const indent = "  ".repeat(depth - 1);
      // Add spaces to align with the source type label
      const labelPadding = " ".repeat(sourceTypeLabel.length + 2);
      return mK.createElement(_, {
        key: index
      },
        labelPadding,
        indent,
        mK.createElement(_, {
          color: themeConfig.secondaryText
        }, " createRefCountedMulticastOperator "),
        formattedRouteName
      );
    }
  }));
}

module.exports = renderInteractionRouteList;