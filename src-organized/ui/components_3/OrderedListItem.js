/**
 * Renders a styled ordered list item with a marker and content.
 * Utilizes context to obtain the current marker and styling functions.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the list item.
 * @returns {React.ReactElement} The rendered ordered list item.
 */
function OrderedListItem({ children }) {
  // Retrieve the current marker from context (e.g., number or symbol for the list item)
  const { marker } = Gg.useContext(aI1);

  // Retrieve styling functions for the OrderedList component
  const { styles: orderedListStyles } = getComponentByKey("OrderedList");

  // Render the list item with marker and content, applying appropriate styles
  return Gg.default.createElement(
    g,
    { ...orderedListStyles.listItem() },
    // Marker element (e.g., number or bullet)
    Gg.default.createElement(
      _,
      { ...orderedListStyles.marker() },
      marker
    ),
    // Content element (the actual list item content)
    Gg.default.createElement(
      g,
      { ...orderedListStyles.content() },
      children
    )
  );
}

module.exports = OrderedListItem;