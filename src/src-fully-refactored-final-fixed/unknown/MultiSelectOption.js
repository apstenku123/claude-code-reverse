/**
 * Renders a styled option for a MultiSelect component, including focus and selection indicators.
 *
 * @param {Object} props - The properties for the option component.
 * @param {boolean} props.isFocused - Whether the option is currently focused.
 * @param {boolean} props.isSelected - Whether the option is currently selected.
 * @param {React.ReactNode} props.children - The label or content of the option.
 * @returns {React.ReactElement} The rendered MultiSelect option element.
 */
function MultiSelectOption({
  isFocused,
  isSelected,
  children
}) {
  // Retrieve the styles object for the MultiSelect component
  const { styles } = getComponentByKey("MultiSelect");

  // Render the option with appropriate styles and indicators
  return Oa.default.createElement(
    g, // The base option component
    {
      ...styles.option({ isFocused })
    },
    // Conditionally render the focus indicator if the option is focused
    isFocused && Oa.default.createElement(
      _,
      {
        ...styles.focusIndicator()
      },
      y0.pointer
    ),
    // Render the label/content with appropriate styles
    Oa.default.createElement(
      _,
      {
        ...styles.label({ isFocused, isSelected })
      },
      children
    ),
    // Conditionally render the selected indicator if the option is selected
    isSelected && Oa.default.createElement(
      _,
      {
        ...styles.selectedIndicator()
      },
      y0.tick
    )
  );
}

module.exports = MultiSelectOption;