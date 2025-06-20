/**
 * Renders a styled unordered list item with a marker and content.
 *
 * This component retrieves marker information from context and applies
 * styles from the 'UnorderedList' component context. It renders a list item
 * with a marker (such as a bullet) and the provided children as content.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the list item.
 * @returns {React.ReactElement} The rendered unordered list item element.
 */
function UnorderedListItem({ children }) {
  // Retrieve the marker value from the UnorderedList context
  const { marker } = Qg.useContext(lI1);

  // Retrieve style functions for the unordered list from context
  const { styles: unorderedListStyles } = getComponentByKey("UnorderedList");

  // Render the list item with marker and content, applying appropriate styles
  return Qg.default.createElement(
    g,
    { ...unorderedListStyles.listItem() },
    // Marker element (e.g., bullet)
    Qg.default.createElement(
      _,
      { ...unorderedListStyles.marker() },
      marker
    ),
    // Content element (children)
    Qg.default.createElement(
      g,
      { ...unorderedListStyles.content() },
      children
    )
  );
}

module.exports = UnorderedListItem;