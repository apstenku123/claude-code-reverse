/**
 * Renders a single option for a MultiSelect component, including focus and selection indicators.
 *
 * @param {Object} props - The properties for the option.
 * @param {boolean} props.isFocused - Whether the option is currently focused.
 * @param {boolean} props.isSelected - Whether the option is currently selected.
 * @param {React.ReactNode} props.children - The label or content of the option.
 * @returns {React.ReactElement} The rendered MultiSelect option element.
 */
function renderMultiSelectOption({
  isFocused,
  isSelected,
  children
}) {
  // Retrieve the styles object for the MultiSelect component from context
  const { styles } = getComponentByKey("MultiSelect");

  // Render the option element with appropriate styles and indicators
  return React.createElement(
    OptionComponent, // The main option wrapper component
    {
      ...styles.option({ isFocused }) // Apply option styles based on focus state
    },
    // If the option is focused, render the focus indicator
    isFocused && React.createElement(
      IndicatorComponent,
      {
        ...styles.focusIndicator()
      },
      IconSet.pointer // Pointer icon for focus
    ),
    // Render the label/content of the option
    React.createElement(
      IndicatorComponent,
      {
        ...styles.label({ isFocused, isSelected }) // Apply label styles based on focus and selection
      },
      children
    ),
    // If the option is selected, render the selected indicator
    isSelected && React.createElement(
      IndicatorComponent,
      {
        ...styles.selectedIndicator()
      },
      IconSet.tick // Tick icon for selection
    )
  );
}

module.exports = renderMultiSelectOption;