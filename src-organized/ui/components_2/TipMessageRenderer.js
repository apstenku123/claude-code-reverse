/**
 * Renders a tip message component with optional custom content and styling.
 * Handles side effects when the tip changes and supports special rendering for specific tip IDs.
 *
 * @param {Object} props - The props object.
 * @param {Object} props.tip - The tip object containing content and metadata.
 * @returns {React.ReactElement|null} The rendered tip message component or null if no tip is provided.
 */
function TipMessageRenderer({ tip }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for consistent styling
  const themeStyles = getThemeStylesheet();

  // Run side effect when the tip changes
  nO.useEffect(() => {
    if (!tip) return;
    // Perform any necessary side effects when a new tip is shown
    kS2(tip);
  }, [tip]);

  /**
   * Renders the tip content based on its type and updateSnapshotAndNotify.
   * - If content is a function, call isBlobOrFileLikeObject to get the rendered node.
   * - If the tip has a specific updateSnapshotAndNotify, render a special welcome message.
   * - Otherwise, render a standard tip message.
   * @returns {React.ReactNode|null}
   */
  const renderTipContent = () => {
    if (!tip) return null;
    if (typeof tip.content === "function") {
      // If content is a function, call isBlobOrFileLikeObject to render
      return tip.content();
    }
    if (tip.id === "claude-opus-welcome") {
      // Special rendering for the welcome tip
      return nO.default.createElement(
        _,
        { color: themeStyles.secondaryText },
        "※ ",
        tip.content
      );
    }
    // Default rendering for all other tips
    return nO.default.createElement(
      _,
      { color: themeStyles.secondaryText },
      "※ Tip: ",
      tip.content
    );
  };

  // Render the tip message inside a flex row if a tip is provided
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

module.exports = TipMessageRenderer;