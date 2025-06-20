/**
 * Renders a multi-select option with appropriate styles and indicators based on focus and selection state.
 *
 * @param {Object} props - The properties for rendering the option.
 * @param {boolean} props.isFocused - Indicates if the option is currently focused.
 * @param {boolean} props.isSelected - Indicates if the option is currently selected.
 * @param {React.ReactNode} props.children - The label or content to display for the option.
 * @returns {React.ReactElement} The rendered multi-select option element.
 */
function MultiSelectOptionRenderer({
  isFocused,
  isSelected,
  children
}) {
  // Retrieve the style functions for the MultiSelect component
  const { styles } = getComponentByKey("MultiSelect");

  // Render the option element with conditional indicators and label
  return React.createElement(
    OptionComponent,
    {
      ...styles.option({ isFocused })
    },
    // Render focus indicator if the option is focused
    isFocused && React.createElement(
      IndicatorComponent,
      {
        ...styles.focusIndicator()
      },
      IconSet.pointer
    ),
    // Render the label/content for the option
    React.createElement(
      IndicatorComponent,
      {
        ...styles.label({ isFocused, isSelected })
      },
      children
    ),
    // Render selected indicator if the option is selected
    isSelected && React.createElement(
      IndicatorComponent,
      {
        ...styles.selectedIndicator()
      },
      IconSet.tick
    )
  );
}

module.exports = MultiSelectOptionRenderer;