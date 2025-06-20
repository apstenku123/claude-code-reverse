/**
 * Renders a styled box component with an optional title and customizable divider.
 *
 * @param {Object} options - Configuration options for the box.
 * @param {string} [options.title] - The optional title to display in the box.
 * @param {string|number} [options.width="auto"] - The width of the box.
 * @param {number} [options.padding=0] - Padding to apply to the left and right of the box.
 * @param {number} [options.titlePadding=1] - Gap between the divider and the title.
 * @param {string} [options.titleColor="white"] - Color of the title text.
 * @param {string} [options.dividerChar="─"] - Character to use for the divider line.
 * @param {string} [options.dividerColor="gray"] - Color of the divider line.
 * @param {Object} [options.boxProps] - Additional properties to pass to the divider box component.
 * @returns {React.ReactElement} The rendered box component, with or without a title.
 */
function renderBoxWithOptionalTitle({
  title,
  width = "auto",
  padding = 0,
  titlePadding = 1,
  titleColor = "white",
  dividerChar = "─",
  dividerColor = "gray",
  boxProps
}) {
  // Render the divider line as a React element
  const dividerElement = Xk.default.createElement(qz5, {
    dividerChar,
    dividerColor,
    boxProps
  });

  // If no title is provided, render only the divider with horizontal padding
  if (!title) {
    return Xk.default.createElement(g, {
      paddingLeft: padding,
      paddingRight: padding
    }, dividerElement);
  }

  // If a title is provided, render the divider, the title, and the divider again with spacing
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

module.exports = renderBoxWithOptionalTitle;