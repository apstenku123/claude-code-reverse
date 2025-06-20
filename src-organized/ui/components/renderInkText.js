/**
 * Renders an Ink text element with optional transformation styling.
 *
 * @param {Object} props - The properties for the Ink text element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the Ink text element.
 * @param {any} [props.transform] - Optional transformation to apply to the Ink text element.
 * @returns {React.ReactElement|null} The rendered Ink text element, or null if no children are provided.
 */
function renderInkText({
  children,
  transform
}) {
  // Return null if children are undefined or null
  if (children === undefined || children === null) {
    return null;
  }

  // Render the Ink text element with the specified style and transformation
  return HG0.default.createElement(
    "ink-text",
    {
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexDirection: "row"
      },
      internal_transform: transform
    },
    children
  );
}

module.exports = renderInkText;