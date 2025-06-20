/**
 * Renders a list of selectable options for a multi-select component, with support for highlighting search text.
 *
 * @param {Object} params - The parameters for rendering the multi-select options.
 * @param {boolean} [params.isDisabled=false] - Whether the multi-select is disabled.
 * @param {number} [params.visibleOptionCount=5] - The number of options to display at once.
 * @param {string} [params.highlightText] - Text to highlight within option labels (e.g., search term).
 * @param {Array<Object>} params.options - The list of option objects to render. Each option should have 'label' and 'value' properties.
 * @param {Array<string>} params.defaultValue - The default selected values.
 * @param {Function} params.onChange - Callback fired when the selection changes.
 * @param {Function} params.onSubmit - Callback fired when the selection is submitted.
 * @returns {React.Element} The rendered multi-select options component.
 */
function MultiSelectOptionsRenderer({
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

  // Apply disabled state logic (e.g., keyboard navigation, focus management)
  iG0({
    isDisabled,
    state: multiSelectState
  });

  // Retrieve style functions for the MultiSelect component
  const { styles } = getComponentByKey("MultiSelect");

  // Render the container with all visible options
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
            { ...styles.highlightedText() },
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

module.exports = MultiSelectOptionsRenderer;