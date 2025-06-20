/**
 * Renders a list of suggestion items with selection highlighting and dynamic sizing.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.suggestions - Array of suggestion objects to display.
 * @param {number} params.selectedSuggestion - Index of the currently selected suggestion.
 * @returns {React.ReactElement|null} The rendered suggestion list as a React element, or null if there are no suggestions.
 */
function renderSuggestionList({
  suggestions,
  selectedSuggestion
}) {
  // Get the number of rows available for rendering (from external dependency)
  const { rows: availableRows } = Z4();

  // Determine how many suggestions to show at once (between 1 and 10, based on available rows)
  const visibleSuggestionCount = Math.min(10, Math.max(1, availableRows - 3));

  /**
   * Calculates the maximum display text length among the given suggestions, plus padding.
   * @param {Array<Object>} suggestionSubset - Subset of suggestions to measure.
   * @returns {number} The maximum column width needed.
   */
  const getMaxColumnWidth = (suggestionSubset) => {
    return Math.max(...suggestionSubset.map(suggestion => suggestion.displayText.length)) + 5;
  };

  // If there are no suggestions, render nothing
  if (suggestions.length === 0) return null;

  // Calculate the starting index for the visible window of suggestions
  const startIndex = Math.max(
    0,
    Math.min(
      selectedSuggestion - Math.floor(visibleSuggestionCount / 2),
      suggestions.length - visibleSuggestionCount
    )
  );

  // Calculate the ending index for the visible window
  const endIndex = Math.min(startIndex + visibleSuggestionCount, suggestions.length);

  // Slice the suggestions array to get only the visible suggestions
  const visibleSuggestions = suggestions.slice(startIndex, endIndex);

  // Calculate the maximum column width for the visible suggestions
  const maxColumnWidth = getMaxColumnWidth(visibleSuggestions);

  // Render the list of suggestion items
  return aD.createElement(
    g,
    { flexDirection: "column" },
    visibleSuggestions.map(suggestion =>
      aD.createElement(renderSelectableListItem, {
        key: suggestion.id,
        item: suggestion,
        maxColumnWidth: maxColumnWidth,
        isSelected: suggestion.id === suggestions[selectedSuggestion]?.id
      })
    )
  );
}

module.exports = renderSuggestionList;