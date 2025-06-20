/**
 * Renders a list of items in an absolutely positioned, column-oriented Ink box.
 * Each item is rendered using the provided render function, and the list updates reactively as the items array changes.
 *
 * @param {Object} props - The component props
 * @param {Array} props.items - Array of items to render
 * @param {Function} props.children - Render function for each item (item, index) => ReactNode
 * @param {Object} [props.style] - Optional additional style properties for the container
 * @returns {React.ReactElement} The rendered Ink component
 */
function AbsoluteColumnList(props) {
  const {
    items,
    children: renderItem,
    style: customStyle
  } = props;

  // State to track the starting index for slicing items (default 0)
  const [startIndex, setStartIndex] = gz.useState(0);

  // Memoize the sliced items array based on items and startIndex
  const visibleItems = gz.useMemo(() => {
    return items.slice(startIndex);
  }, [items, startIndex]);

  // Whenever the items array length changes, update the startIndex to match the new length
  gz.useLayoutEffect(() => {
    setStartIndex(items.length);
  }, [items.length]);

  // Map visible items to their rendered output, passing the correct index to the render function
  const renderedItems = visibleItems.map((item, offset) => {
    return renderItem(item, startIndex + offset);
  });

  // Memoize the container style, merging absolute positioning, column direction, and any custom styles
  const containerStyle = gz.useMemo(() => ({
    position: "absolute",
    flexDirection: "column",
    ...customStyle
  }), [customStyle]);

  // Render the Ink box with the rendered items inside
  return gz.default.createElement(
    KG0,
    null,
    gz.default.createElement(
      "ink-box",
      {
        internal_static: true,
        style: containerStyle
      },
      renderedItems
    )
  );
}

module.exports = AbsoluteColumnList;