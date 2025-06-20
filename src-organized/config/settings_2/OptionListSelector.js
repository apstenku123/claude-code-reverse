/**
 * Renders a selectable option list with keyboard navigation, highlighting, and descriptions.
 * Handles focus, selection, and custom highlighting of matched text within option labels.
 *
 * @param {Object} props - The properties for the option list selector.
 * @param {boolean} [props.isDisabled=false] - Whether the option list is disabled.
 * @param {number} [props.visibleOptionCount=5] - Number of options visible at once.
 * @param {string} [props.highlightText] - Text to highlight within option labels.
 * @param {Array<Object>} props.options - Array of option objects ({ value, label, description }).
 * @param {*} [props.defaultValue] - The default selected value.
 * @param {Function} [props.onCancel] - Callback when selection is cancelled.
 * @param {Function} [props.onChange] - Callback when selection changes.
 * @param {Function} [props.onFocus] - Callback when the option list gains focus.
 * @param {*} [props.focusValue] - The value to focus initially.
 * @returns {React.Element} The rendered option list component.
 */
function OptionListSelector({
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
  // State and navigation logic for the option list
  const optionListController = useSelectableOptions({
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
    state: optionListController
  });

  // Get styles for the Select component
  const { styles } = getComponentByKey("Select");

  // Calculate the width needed for the option index prefix (e.g., '1.', '10.')
  const optionIndexWidth = optionListController.options.length.toString().length;

  // Calculate the maximum total width (index prefix + label) among all options
  const maxOptionWidth = Math.max(
    ...optionListController.options.map(option => {
      const optionNumber = (optionListController.options.findIndex(opt => opt.value === option.value) + 1).toString();
      // Pad the index prefix to align all options
      const paddedIndex = `${optionNumber}.`.padEnd(optionIndexWidth);
      return paddedIndex.length + option.label.length;
    })
  );

  // Render the option list
  return aS.default.createElement(
    g,
    {
      ...styles.container()
    },
    optionListController.visibleOptions.map((option, visibleIndex) => {
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
            {
              ...styles.highlightedText()
            },
            highlightText
          ),
          label.slice(highlightStart + highlightText.length)
        );
      }

      // Determine if this is the first or last visible option
      const isFirstVisible = option.index === optionListController.visibleFromIndex;
      const isLastVisible = option.index === optionListController.visibleToIndex - 1;
      const hasMoreBelow = optionListController.visibleToIndex < options.length;
      const hasMoreAbove = optionListController.visibleFromIndex > 0;

      // Prepare the index prefix (e.g., '1. ', '2. ')
      const optionPrefix = `${optionListController.visibleFromIndex + visibleIndex + 1}.`.padEnd(optionIndexWidth);
      const prefixAndLabelLength = optionPrefix.length + label.length;
      const descriptionPadding = Math.max(2, maxOptionWidth + 2 - prefixAndLabelLength);

      return aS.default.createElement(
        SelectOptionLabel,
        {
          key: option.value,
          isFocused: !isDisabled && optionListController.focusedValue === option.value,
          isSelected: optionListController.value === option.value,
          shouldShowDownArrow: hasMoreBelow && isLastVisible,
          shouldShowUpArrow: hasMoreAbove && isFirstVisible
        },
        FA.dim(optionPrefix),
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

module.exports = OptionListSelector;