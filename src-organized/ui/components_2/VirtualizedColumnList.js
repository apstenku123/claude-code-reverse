/**
 * Renders a virtualized column list inside an absolute-positioned ink-box.
 *
 * @param {Object} props - The component props
 * @param {Array} props.items - The array of items to render
 * @param {Function} props.children - Render function for each item. Receives (item, index)
 * @param {Object} [props.style] - Optional additional style overrides
 * @returns {React.ReactElement} The rendered virtualized column list
 */
function VirtualizedColumnList(props) {
  const {
    items,
    children: renderItem,
    style: customStyle
  } = props;

  // State to track the starting index for slicing items
  const [startIndex, setStartIndex] = gz.useState(0);

  // Memoized slice of items starting from startIndex
  const visibleItems = gz.useMemo(() => {
    return items.slice(startIndex);
  }, [items, startIndex]);

  // Whenever the items array changes in length, update startIndex to match
  gz.useLayoutEffect(() => {
    setStartIndex(items.length);
  }, [items.length]);

  // Render each visible item using the renderItem function
  const renderedChildren = visibleItems.map((item, offset) => {
    return renderItem(item, startIndex + offset);
  });

  // Memoized style object for the ink-box container
  const containerStyle = gz.useMemo(() => ({
    position: "absolute",
    flexDirection: "column",
    ...customStyle
  }), [customStyle]);

  return gz.default.createElement(
    KG0,
    null,
    gz.default.createElement(
      "ink-box",
      {
        internal_static: true,
        style: containerStyle
      },
      renderedChildren
    )
  );
}

module.exports = VirtualizedColumnList;