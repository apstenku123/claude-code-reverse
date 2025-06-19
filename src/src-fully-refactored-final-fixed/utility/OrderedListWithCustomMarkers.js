/**
 * Renders an ordered list with custom markers for each list item.
 *
 * This component wraps each valid list item (of type OrderedListItem) in context providers that supply a custom marker string.
 * The marker is composed of the parent marker (from context) and a zero-padded index (e.g., '1.', '2.', etc.).
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children nodes to render as list items.
 * @returns {React.ReactElement} The rendered ordered list with custom markers.
 */
function OrderedListWithCustomMarkers({ children }) {
  // Retrieve the current marker from context
  const { marker: parentMarker } = jV.useContext(nx1);

  // Retrieve styles for the ordered list
  const { styles: orderedListStyles } = getComponentByKey("OrderedList");

  // Count the number of valid list items (of type OrderedListItem)
  let validListItemCount = 0;
  for (const child of jV.default.Children.toArray(children)) {
    if (!jV.isValidElement(child) || child.type !== OrderedListItem) continue;
    validListItemCount++;
  }

  // Determine the number of digits needed for zero-padding
  const markerDigitCount = String(validListItemCount).length;

  // Render the ordered list
  return jV.default.createElement(
    g,
    {
      ...orderedListStyles.list()
    },
    jV.default.Children.map(children, (child, index) => {
      // If not a valid list item, render as is
      if (!jV.isValidElement(child) || child.type !== OrderedListItem) return child;

      // Create a zero-padded marker (e.g., '01.', '02.', etc.)
      const paddedIndex = String(index + 1).padStart(markerDigitCount, '0');
      const marker = `${parentMarker}${paddedIndex}.`;

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

module.exports = OrderedListWithCustomMarkers;