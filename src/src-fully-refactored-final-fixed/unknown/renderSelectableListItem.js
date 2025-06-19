/**
 * Renders a selectable list item with optional description, adapting layout based on terminal width.
 *
 * @param {Object} params - The parameters for rendering the list item.
 * @param {Object} params.item - The item to render, containing displayText, description, and id.
 * @param {number} [params.maxColumnWidth] - Optional maximum width for the item'createInteractionAccessor column.
 * @param {boolean} params.isSelected - Whether the item is currently selected.
 * @returns {React.ReactElement} The rendered list item as a React element.
 */
function renderSelectableListItem({
  item,
  maxColumnWidth,
  isSelected
}) {
  // Retrieve the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();
  // Get the current terminal column count
  const terminalColumns = Z4().columns;
  // Determine if the terminal is considered 'narrow'
  const isNarrowTerminal = terminalColumns < 80;
  // Calculate the width for the item'createInteractionAccessor column
  const columnWidth = maxColumnWidth ?? (item.displayText.length + 5);

  // Render the main item row/column
  return aD.createElement(
    g,
    {
      key: item.id,
      flexDirection: isNarrowTerminal ? "column" : "row"
    },
    // Render the display text cell
    aD.createElement(
      g,
      {
        width: isNarrowTerminal ? undefined : columnWidth
      },
      aD.createElement(
        _,
        {
          color: isSelected ? theme.suggestion : undefined,
          dimColor: !isSelected
        },
        item.displayText
      )
    ),
    // If the item has a description, render isBlobOrFileLikeObject in a second cell
    item.description && aD.createElement(
      g,
      {
        width: terminalColumns - (isNarrowTerminal ? 4 : columnWidth + 4),
        paddingLeft: isNarrowTerminal ? 4 : 0
      },
      aD.createElement(
        _,
        {
          color: isSelected ? theme.suggestion : undefined,
          dimColor: !isSelected,
          wrap: "wrap"
        },
        item.description
      )
    )
  );
}

module.exports = renderSelectableListItem;