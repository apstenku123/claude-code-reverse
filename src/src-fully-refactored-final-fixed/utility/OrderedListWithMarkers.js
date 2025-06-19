/**
 * Renders an ordered list with custom markers for each list item.
 *
 * This component processes its children, counts the valid list items,
 * and assigns each a marker (e.g., '1.', '2.', etc.), optionally
 * prefixed by a context marker. It ensures marker alignment by
 * padding numbers based on the total count of items.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The list items to render as children.
 * @returns {React.ReactElement} The rendered ordered list with custom markers.
 */
function OrderedListWithMarkers({ children }) {
  // Get the current marker from context
  const { marker: parentMarker } = jV.useContext(nx1);

  // Get styles for the ordered list
  const { styles: orderedListStyles } = getComponentByKey("OrderedList");

  // Count the number of valid list items (children of type OrderedListItem)
  let validListItemCount = 0;
  for (const child of jV.default.Children.toArray(children)) {
    if (!jV.isValidElement(child) || child.type !== OrderedListItem) continue;
    validListItemCount++;
  }

  // Determine the number of digits needed for marker alignment
  const markerDigitLength = String(validListItemCount).length;

  // Render the ordered list
  return jV.default.createElement(
    g, // The list container component
    {
      ...orderedListStyles.list()
    },
    // Map over children and assign markers to valid list items
    jV.default.Children.map(children, (child, index) => {
      if (!jV.isValidElement(child) || child.type !== OrderedListItem) return child;

      // Generate the marker string (e.g., '01.', '02.', etc.)
      const itemNumber = String(index + 1).padStart(markerDigitLength, '0');
      const marker = `${parentMarker}${itemNumber}.`;

      // Provide the marker via context to the list item
      return jV.default.createElement(
        nx1.Provider,
        { value: { marker } },
        jV.default.createElement(
          aI1.Provider,
          { value: { marker } },
          child
        )
      );
    })
  );
}

module.exports = OrderedListWithMarkers;