/**
 * Renders a diff view as a React component, displaying line-by-line differences between two text sources.
 * Handles theming, line numbers, dynamic width, and performance optimizations.
 *
 * @param {Object} props - The properties for the diff viewer.
 * @param {Object} props.patch - The patch object containing diff lines and metadata.
 * @param {Object} props.dim - Dimension or configuration object for rendering.
 * @param {boolean} props.skipUnchanged - If true, unchanged lines are not rendered.
 * @param {boolean} props.hideLineNumbers - If true, line numbers are hidden.
 * @param {Object} props.overrideTheme - Theme override object for custom styling.
 * @param {number} [props.width] - Optional fixed width for the diff viewer.
 * @returns {React.ReactElement} The rendered diff viewer component.
 */
function dD({
  patch,
  dim,
  skipUnchanged,
  hideLineNumbers,
  overrideTheme,
  width
}) {
  // Reference to the root container element
  const containerRef = RO.useRef(null);

  // State to hold the current width of the diff viewer
  const [containerWidth, setContainerWidth] = RO.useState(width || hG5);

  // Effect to update width dynamically if not provided
  RO.useEffect(() => {
    // Only update width if not explicitly set and ref is available
    if (!width && containerRef.current) {
      // Get the width of the container using cI1 utility
      const { width: measuredWidth } = cI1(containerRef.current);
      if (measuredWidth > 0) {
        // Subtract 2px for borders/padding if needed
        setContainerWidth(measuredWidth - 2);
      }
    }
  }, [width]);

  // Memoize the rendered diff lines for performance
  const renderedDiffLines = RO.useMemo(
    () => renderDiffLines(
      patch.lines,
      patch.oldStart,
      containerWidth,
      dim,
      skipUnchanged,
      hideLineNumbers,
      overrideTheme
    ),
    [patch.lines, patch.oldStart, containerWidth, dim, skipUnchanged, hideLineNumbers, overrideTheme]
  );

  // Render the diff viewer as a flex column, mapping each line to a child element
  return L9.createElement(
    g,
    {
      flexDirection: "column",
      flexGrow: 1,
      ref: containerRef
    },
    renderedDiffLines.map((diffLineElement, index) =>
      L9.createElement(
        g,
        { key: index },
        diffLineElement
      )
    )
  );
}

module.exports = dD;