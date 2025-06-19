/**
 * Renders a selectable options list (such as a dropdown or listbox) with focus, selection, and highlight features.
 *
 * @param {Object} params - The parameters for rendering the options list.
 * @param {boolean} [params.isDisabled=false] - Whether the options list is disabled.
 * @param {number} [params.visibleOptionCount=5] - Number of options visible at once.
 * @param {string} [params.highlightText] - Text to highlight within option labels.
 * @param {Array<Object>} params.options - Array of option objects ({ value, label, description }).
 * @param {*} [params.defaultValue] - The default selected value.
 * @param {Function} [params.onCancel] - Callback when cancel action is triggered.
 * @param {Function} [params.onChange] - Callback when selection changes.
 * @param {Function} [params.onFocus] - Callback when the list receives focus.
 * @param {*} [params.focusValue] - The value to focus initially.
 * @returns {React.Element} The rendered selectable options list component.
 */
function SelectableOptionsList({
  isDisabled = false,
  visibleOptionCount = 5,
  highlightText,
  options,
  defaultValue,
  onCancel,
  onChange,
  onFocus,
  focusValue
}) {
  // State and behavior for selectable options list
  const selectableState = useSelectableOptions({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
    onCancel,
    onFocus,
    focusValue
  });

  // Apply disabled state handling
  AZ0({
    isDisabled,
    state: selectableState
  });

  // Get styling helpers
  const { styles } = getComponentByKey("Select");

  // Calculate the width needed for option numbering
  const optionNumberWidth = selectableState.options.length.toString().length;

  // Calculate the maximum line length for alignment
  const maxLineLength = Math.max(
    ...selectableState.options.map(option => {
      // Find the index of the option for numbering
      const optionIndex = selectableState.options.findIndex(
        processSubLanguageHighlighting => processSubLanguageHighlighting.value === option.value
      );
      // Calculate the length: numbering + label
      return `${optionIndex + 1}.`.padEnd(optionNumberWidth).length + option.label.length;
    })
  );

  // Render the options list
  return aS.default.createElement(
    g,
    {
      ...styles.container()
    },
    selectableState.visibleOptions.map((option, visibleIndex) => {
      const label = option.label;
      let renderedLabel = label;

      // Highlight the search text if present in the label
      if (highlightText && label.includes(highlightText)) {
        const highlightStart = label.indexOf(highlightText);
        renderedLabel = aS.default.createElement(
          aS.default.Fragment,
          null,
          label.slice(0, highlightStart),
          aS.default.createElement(
            _,
            { ...styles.highlightedText() },
            highlightText
          ),
          label.slice(highlightStart + highlightText.length)
        );
      }

      // Determine if this option is at the top or bottom of the visible window
      const isFirstVisible = option.index === selectableState.visibleFromIndex;
      const isLastVisible = option.index === selectableState.visibleToIndex - 1;
      const hasMoreBelow = selectableState.visibleToIndex < options.length;
      const hasMoreAbove = selectableState.visibleFromIndex > 0;

      // Prepare numbering and alignment
      const numbering = `${selectableState.visibleFromIndex + visibleIndex + 1}.`.padEnd(optionNumberWidth);
      const numberingAndLabelLength = numbering.length + label.length;
      const descriptionPadding = Math.max(2, maxLineLength + 2 - numberingAndLabelLength);

      return aS.default.createElement(
        SelectOptionLabel,
        {
          key: option.value,
          isFocused: !isDisabled && selectableState.focusedValue === option.value,
          isSelected: selectableState.value === option.value,
          shouldShowDownArrow: hasMoreBelow && isLastVisible,
          shouldShowUpArrow: hasMoreAbove && isFirstVisible
        },
        FA.dim(numbering),
        " ",
        renderedLabel,
        option.description &&
          aS.default.createElement(
            _,
            { dimColor: true },
            "  ".padEnd(descriptionPadding),
            option.description
          )
      );
    })
  );
}

module.exports = SelectableOptionsList;