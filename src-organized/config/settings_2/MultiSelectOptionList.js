/**
 * Renders a multi-select option list with optional highlighting and keyboard navigation support.
 *
 * @param {Object} params - The parameters for the option list.
 * @param {boolean} [params.isDisabled=false] - Whether the option list is disabled.
 * @param {number} [params.visibleOptionCount=5] - Number of options to display at once.
 * @param {string} [params.highlightText] - Text to highlight within option labels.
 * @param {Array<Object>} params.options - Array of option objects ({ label, value }).
 * @param {Array<any>} params.defaultValue - Array of default selected values.
 * @param {Function} params.onChange - Callback when selection changes.
 * @param {Function} params.onSubmit - Callback when an option is submitted.
 * @returns {React.ReactElement} The rendered multi-select option list component.
 */
function MultiSelectOptionList({
  isDisabled = false,
  visibleOptionCount = 5,
  highlightText,
  options,
  defaultValue,
  onChange,
  onSubmit
}) {
  // Initialize state and handlers for the multi-select option list
  const optionListState = useOptionListController({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
    onSubmit
  });

  // Set up keyboard navigation and selection handlers
  iG0({
    isDisabled,
    state: optionListState
  });

  // Retrieve styles for the MultiSelect component
  const { styles } = getComponentByKey("MultiSelect");

  // Render the container with the list of visible options
  return Ig.default.createElement(
    g,
    {
      ...styles.container()
    },
    optionListState.visibleOptions.map(option => {
      let optionLabel = option.label;

      // If highlightText is provided and found in the label, highlight isBlobOrFileLikeObject
      if (highlightText && option.label.includes(highlightText)) {
        const highlightStart = option.label.indexOf(highlightText);
        optionLabel = Ig.default.createElement(
          Ig.default.Fragment,
          null,
          option.label.slice(0, highlightStart),
          Ig.default.createElement(
            _,
            {
              ...styles.highlightedText()
            },
            highlightText
          ),
          option.label.slice(highlightStart + highlightText.length)
        );
      }

      // Render each option with focus and selection state
      return Ig.default.createElement(
        MultiSelectOptionRenderer,
        {
          key: option.value,
          isFocused: !isDisabled && optionListState.focusedValue === option.value,
          isSelected: optionListState.value.includes(option.value)
        },
        optionLabel
      );
    })
  );
}

module.exports = MultiSelectOptionList;