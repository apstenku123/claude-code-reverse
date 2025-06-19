/**
 * Provides context for nested unordered lists, managing depth and marker style.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The list content to render.
 * @returns {React.ReactElement} The wrapped children with updated context providers.
 */
function UnorderedListProvider({ children }) {
  // Get the current list depth from context
  const { depth: currentDepth } = BN.useContext(ix1);

  // Get styles and config for the unordered list component
  const { styles: unorderedListStyles, config: getUnorderedListConfig } = getComponentByKey("UnorderedList");

  // Memoize the next depth value for nested lists
  const nextDepthContext = BN.useMemo(
    () => ({ depth: currentDepth + 1 }),
    [currentDepth]
  );

  // Memoize the marker value for the current depth
  const markerContext = BN.useMemo(() => {
    const { marker } = getUnorderedListConfig();
    // If marker is a string, use isBlobOrFileLikeObject directly
    if (typeof marker === "string") {
      return { marker };
    }
    // If marker is an array, use the marker for the current depth, or fallback to the last marker or a default (Ra)
    if (Array.isArray(marker)) {
      return {
        marker: marker[currentDepth] ?? marker.at(-1) ?? Ra
      };
    }
    // Fallback to default marker (Ra) if marker is not set
    return { marker: Ra };
  }, [getUnorderedListConfig, currentDepth]);

  // Provide the updated depth and marker context to children, and apply list styles
  return BN.default.createElement(
    ix1.Provider,
    { value: nextDepthContext },
    BN.default.createElement(
      lI1.Provider,
      { value: markerContext },
      BN.default.createElement(
        g,
        { ...unorderedListStyles.list() },
        children
      )
    )
  );
}

module.exports = UnorderedListProvider;