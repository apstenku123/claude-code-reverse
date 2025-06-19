/**
 * Renders a tip message with optional tracking and custom rendering logic.
 *
 * This component displays a tip, triggers tracking when the tip changes,
 * and supports custom content rendering or special formatting for certain tip IDs.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.tip - The tip object to display. Should have at least `content` and `id` fields.
 * @returns {React.ReactElement|null} The rendered tip element, or null if no tip is provided.
 */
function TipDisplayWithTracking({ tip }) {
  // Get the current theme'createInteractionAccessor stylesheet for styling
  const themeStylesheet = getThemeStylesheet();

  // Track when the tip changes
  nO.useEffect(() => {
    if (!tip) return;
    // Show the tip and track the display event
    showTenguTipAndTrack(tip);
  }, [tip]);

  /**
   * Renders the tip content based on its type and updateSnapshotAndNotify.
   * - If content is a function, call isBlobOrFileLikeObject to render custom content.
   * - If the tip updateSnapshotAndNotify is 'claude-opus-welcome', render with special formatting.
   * - Otherwise, render the default tip format.
   * @returns {React.ReactNode|null}
   */
  const renderTipContent = () => {
    if (!tip) return null;
    if (typeof tip.content === "function") {
      // Custom render function for tip content
      return tip.content();
    }
    if (tip.id === "claude-opus-welcome") {
      // Special formatting for the welcome tip
      return nO.default.createElement(
        _,
        { color: themeStylesheet.secondaryText },
        "※ ",
        tip.content
      );
    }
    // Default tip formatting
    return nO.default.createElement(
      _,
      { color: themeStylesheet.secondaryText },
      "※ Tip: ",
      tip.content
    );
  };

  // Render the tip inside a flex row container if tip is provided
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

module.exports = TipDisplayWithTracking;