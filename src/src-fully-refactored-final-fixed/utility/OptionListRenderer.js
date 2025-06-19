/**
 * Renders a selectable, keyboard-navigable option list with highlighting and descriptions.
 * Handles keyboard navigation, focus, selection, and optional text highlighting within option labels.
 *
 * @param {Object} params - The parameters for rendering the option list.
 * @param {boolean} [params.isDisabled=false] - Whether the option list is disabled.
 * @param {number} [params.visibleOptionCount=5] - Number of options visible at once.
 * @param {string} [params.highlightText] - Text to highlight within option labels.
 * @param {Array} params.options - Array of option objects ({ value, label, description }).
 * @param {*} [params.defaultValue] - The default selected value.
 * @param {Function} [params.onCancel] - Callback when selection is cancelled.
 * @param {Function} [params.onChange] - Callback when selection changes.
 * @param {Function} [params.onFocus] - Callback when an option is focused.
 * @param {*} [params.focusValue] - The value to focus initially.
 * @returns {React.Element} The rendered option list component.
 */
function OptionListRenderer({
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
  // Initialize option list state and navigation logic
  const optionListState = useSelectableOptions({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
    onCancel,
    onFocus,
    focusValue
  });

  // Setup keyboard navigation for the option list
  AZ0({
    isDisabled,
    state: optionListState
  });

  // Get styles for the Select component
  const { styles } = getComponentByKey("Select");

  // Calculate the width needed for option numbering (e.g., '10.')
  const optionNumberWidth = optionListState.options.length.toString().length;

  // Calculate the maximum display width for an option row (number + label)
  const maxOptionRowLength = Math.max(
    ...optionListState.options.map(option => {
      const optionIndex = optionListState.options.findIndex(opt => opt.value === option.value);
      // Pad the number (e.g., '1. ', '10. ')
      const numberLabel = `${optionIndex + 1}.`.padEnd(optionNumberWidth);
      return numberLabel.length + option.label.length;
    })
  );

  // Render the option list
  return aS.default.createElement(
    g,
    {
      ...styles.container()
    },
    optionListState.visibleOptions.map((option, visibleIndex) => {
      const label = option.label;
      let renderedLabel = label;

      // If highlightText is provided and found in the label, highlight isBlobOrFileLikeObject
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

      // Determine if this option is at the top or bottom of the visible list
      const isFirstVisible = option.index === optionListState.visibleFromIndex;
      const isLastVisible = option.index === optionListState.visibleToIndex - 1;
      const hasMoreBelow = optionListState.visibleToIndex < options.length;
      const hasMoreAbove = optionListState.visibleFromIndex > 0;

      // Format the option number (e.g., '1. ', '2. ')
      const optionNumber = `${optionListState.visibleFromIndex + visibleIndex + 1}.`.padEnd(optionNumberWidth);
      const optionRowLength = optionNumber.length + label.length;
      // Calculate padding for description alignment
      const descriptionPadding = Math.max(2, maxOptionRowLength + 2 - optionRowLength);

      return aS.default.createElement(
        SelectOptionLabel,
        {
          key: option.value,
          isFocused: !isDisabled && optionListState.focusedValue === option.value,
          isSelected: optionListState.value === option.value,
          shouldShowDownArrow: hasMoreBelow && isLastVisible,
          shouldShowUpArrow: hasMoreAbove && isFirstVisible
        },
        FA.dim(optionNumber),
        " ",
        renderedLabel,
        option.description && aS.default.createElement(
          _,
          { dimColor: true },
          "  ".padEnd(descriptionPadding),
          option.description
        )
      );
    })
  );
}

module.exports = OptionListRenderer;