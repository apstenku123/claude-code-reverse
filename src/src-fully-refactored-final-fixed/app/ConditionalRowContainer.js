/**
 * Conditionally renders children directly or wraps them in a styled row container.
 *
 * If the current React context (Kn0) is truthy, returns the children as-is.
 * Otherwise, wraps the children in a Kq6 component containing a flex row with a special marker and the children.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to render.
 * @param {number|string} props.height - The height to apply to the row container.
 * @returns {React.ReactNode} The rendered content, either raw children or wrapped in a styled row.
 */
function ConditionalRowContainer({
  children,
  height
}) {
  // Check if the context value is truthy; if so, render children directly
  if (Vn0.useContext(Kn0)) {
    return children;
  }

  // Otherwise, wrap children in a styled row container
  return rV.createElement(
    Kq6,
    null,
    rV.createElement(
      g,
      {
        flexDirection: "row",
        height: height,
        overflowY: "hidden"
      },
      rV.createElement(
        _,
        null,
        "  ",
        "⎿  "
      ),
      children
    )
  );
}

module.exports = ConditionalRowContainer;