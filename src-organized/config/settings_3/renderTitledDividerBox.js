/**
 * Renders a box with optional title and divider lines, with customizable styling and padding.
 *
 * @param {Object} options - Configuration options for the box.
 * @param {string} [options.title] - The optional title to display between dividers.
 * @param {string|number} [options.width="auto"] - The width of the box.
 * @param {number} [options.padding=0] - Padding on the left and right sides of the box.
 * @param {number} [options.titlePadding=1] - Gap between the title and the dividers.
 * @param {string} [options.titleColor="white"] - Color of the title text.
 * @param {string} [options.dividerChar="─"] - Character used for the divider line.
 * @param {string} [options.dividerColor="gray"] - Color of the divider line.
 * @param {Object} [options.boxProps] - Additional properties to pass to the divider component.
 * @returns {React.ReactElement} The rendered box component with optional title and dividers.
 */
function renderTitledDividerBox({
  title,
  width = "auto",
  padding = 0,
  titlePadding = 1,
  titleColor = "white",
  dividerChar = "─",
  dividerColor = "gray",
  boxProps
}) {
  // Render the divider line component
  const dividerElement = Xk.default.createElement(qz5, {
    dividerChar,
    dividerColor,
    boxProps
  });

  // If no title is provided, render only the divider with padding
  if (!title) {
    return Xk.default.createElement(g, {
      paddingLeft: padding,
      paddingRight: padding
    }, dividerElement);
  }

  // Render the divider, title, and another divider with appropriate styling and spacing
  return Xk.default.createElement(
    g,
    {
      width,
      paddingLeft: padding,
      paddingRight: padding,
      gap: titlePadding
    },
    dividerElement,
    Xk.default.createElement(
      g,
      null,
      Xk.default.createElement(_, { color: titleColor }, title)
    ),
    dividerElement
  );
}

module.exports = renderTitledDividerBox;