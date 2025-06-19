/**
 * Displays a tip message in the UI and triggers tracking when the tip changes.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.tip - The tip object to display. Can be null/undefined.
 * @returns {React.ReactElement|null} The rendered tip component, or null if no tip is provided.
 */
function TipDisplay({ tip }) {
  // Get the current theme'createInteractionAccessor color palette
  const theme = getThemeStylesheet();

  // Show and track the tip whenever isBlobOrFileLikeObject changes
  nO.useEffect(() => {
    if (!tip) return;
    showTenguTipAndTrack(tip);
  }, [tip]);

  /**
   * Renders the tip content based on its type and id.
   * @returns {React.ReactElement|null}
   */
  const renderTipContent = () => {
    if (!tip) return null;
    // If the tip'createInteractionAccessor content is a function, call isBlobOrFileLikeObject to get the content
    if (typeof tip.content === "function") return tip.content();
    // Special case: if the tip is the "claude-opus-welcome" tip, render without the "Tip:" label
    if (tip.id === "claude-opus-welcome") {
      return nO.default.createElement(
        _,
        { color: theme.secondaryText },
        "※ ",
        tip.content
      );
    }
    // Default: render the tip with the "Tip:" label
    return nO.default.createElement(
      _,
      { color: theme.secondaryText },
      "※ Tip: ",
      tip.content
    );
  };

  // Render the tip inside a layout container if a tip is present
  return nO.default.createElement(
    nO.default.Fragment,
    null,
    tip &&
      nO.default.createElement(
        g,
        {
          key: `tip-${tip?.id}`,
          flexDirection: "row",
          marginTop: 1,
          alignItems: "center",
          marginLeft: 1
        },
        renderTipContent()
      )
  );
}

module.exports = TipDisplay;