/**
 * Renders a multi-select options list with optional text highlighting and selection/focus state.
 *
 * @param {Object} params - The parameters for rendering the multi-select.
 * @param {boolean} [params.isDisabled=false] - Whether the multi-select is disabled.
 * @param {number} [params.visibleOptionCount=5] - Number of options to display at once.
 * @param {string} [params.highlightText] - Text to highlight within option labels.
 * @param {Array} params.options - Array of option objects with 'label' and 'value'.
 * @param {Array|string|number} params.defaultValue - The default selected value(createInteractionAccessor).
 * @param {Function} params.onChange - Callback when selection changes.
 * @param {Function} params.onSubmit - Callback when an option is submitted.
 * @returns {React.Element} The rendered multi-select options component.
 */
function renderMultiSelectOptions({
  isDisabled = false,
  visibleOptionCount = 5,
  highlightText,
  options,
  defaultValue,
  onChange,
  onSubmit
}) {
  // Initialize multi-select state and handlers
  const multiSelectState = useOptionListController({
    visibleOptionCount,
    options,
    defaultValue,
    onChange,
    onSubmit
  });

  // Apply disabled state logic (e.g., keyboard navigation, focus)
  iG0({
    isDisabled,
    state: multiSelectState
  });

  // Retrieve styles for the MultiSelect component
  const { styles } = getComponentByKey("MultiSelect");

  // Render the container with the list of visible options
  return Ig.default.createElement(
    g,
    {
      ...styles.container()
    },
    multiSelectState.visibleOptions.map(option => {
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

      // Render each option with selection and focus state
      return Ig.default.createElement(
        MultiSelectOptionRenderer,
        {
          key: option.value,
          isFocused: !isDisabled && multiSelectState.focusedValue === option.value,
          isSelected: multiSelectState.value.includes(option.value)
        },
        optionLabel
      );
    })
  );
}

module.exports = renderMultiSelectOptions;