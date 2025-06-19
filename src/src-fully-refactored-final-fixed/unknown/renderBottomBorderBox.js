/**
 * Renders a UI box component with a customizable bottom border.
 *
 * @param {Object} options - Configuration options for the box.
 * @param {string} [options.width="auto"] - The width of the box.
 * @param {string} [options.dividerChar] - The character to use for the bottom border. Defaults to '─' if not provided.
 * @param {string} [options.dividerColor="gray"] - The color of the bottom border.
 * @param {Object} [options.boxProps] - Additional properties to spread onto the box component.
 * @returns {React.Element} The rendered box component with the specified bottom border.
 */
function renderBottomBorderBox({
  width = "auto",
  dividerChar,
  dividerColor = "gray",
  boxProps
}) {
  // Only the bottom border is visible; others are empty strings
  return Xk.default.createElement(g, {
    width: width,
    borderStyle: {
      topLeft: "",
      top: "",
      topRight: "",
      right: "",
      bottomRight: "",
      bottom: dividerChar || "─", // Use provided dividerChar or default to '─'
      bottomLeft: "",
      left: ""
    },
    borderColor: dividerColor,
    flexGrow: 1,
    borderBottom: true, // Only show bottom border
    borderTop: false,
    borderLeft: false,
    borderRight: false,
    ...boxProps // Spread any additional box properties
  });
}

module.exports = renderBottomBorderBox;