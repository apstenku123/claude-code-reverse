/**
 * Renders a label for a select option, including focus/selection indicators and optional arrows.
 *
 * @param {Object} props - The properties for the select option label.
 * @param {boolean} props.isFocused - Whether the option is currently focused.
 * @param {boolean} props.isSelected - Whether the option is currently selected.
 * @param {React.ReactNode} props.children - The label content to display.
 * @param {boolean} props.shouldShowDownArrow - Whether to display a down arrow indicator.
 * @param {boolean} props.shouldShowUpArrow - Whether to display an up arrow indicator.
 * @returns {React.ReactElement} The rendered select option label with indicators.
 */
function SelectOptionLabel({
  isFocused,
  isSelected,
  children,
  shouldShowDownArrow,
  shouldShowUpArrow
}) {
  // Retrieve the styles object for the Select component
  const { styles } = getComponentByKey("Select");

  // Determine which indicator to show on the left
  let leftIndicator;
  if (isFocused) {
    // Show focus indicator if the option is focused
    leftIndicator = React.createElement(
      IndicatorIcon,
      { ...styles.focusIndicator() },
      IconSet.pointer,
      " "
    );
  } else if (shouldShowDownArrow) {
    // Show down arrow if requested
    leftIndicator = React.createElement(
      IndicatorIcon,
      { color: getThemeStylesheet().secondaryText },
      IconSet.arrowDown,
      " "
    );
  } else if (shouldShowUpArrow) {
    // Show up arrow if requested
    leftIndicator = React.createElement(
      IndicatorIcon,
      { color: getThemeStylesheet().secondaryText },
      IconSet.arrowUp,
      " "
    );
  } else {
    // Default: empty space for alignment
    leftIndicator = React.createElement(IndicatorIcon, null, "  ");
  }

  // Render the label with optional selection indicator
  return React.createElement(
    LabelContainer,
    null,
    leftIndicator,
    React.createElement(
      IndicatorIcon,
      { ...styles.label({ isFocused, isSelected }) },
      children
    ),
    isSelected && React.createElement(
      IndicatorIcon,
      { ...styles.selectedIndicator() },
      IconSet.tick
    )
  );
}

module.exports = SelectOptionLabel;