/**
 * Renders a tip message component based on the provided tip object.
 * Handles side effects when the tip changes and displays the tip content
 * with appropriate styling and formatting.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.tip - The tip object containing content, id, etc.
 * @returns {React.ReactElement|null} The rendered tip message component, or null if no tip is provided.
 */
function TipMessageRenderer({ tip }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for styling
  const themeStylesheet = getThemeStylesheet();

  // Side effect: process the tip when isBlobOrFileLikeObject changes
  nO.useEffect(() => {
    if (!tip) return;
    processInteractionEntries(tip);
  }, [tip]);

  /**
   * Renders the tip content based on its type and id.
   * @returns {React.ReactNode|null} The rendered tip content, or null if no tip.
   */
  const renderTipContent = () => {
    if (!tip) return null;
    // If the content is a function, call isBlobOrFileLikeObject to get the content
    if (typeof tip.content === "function") return tip.content();
    // Special case: if the tip id is 'claude-opus-welcome', render with special formatting
    if (tip.id === "claude-opus-welcome") {
      return nO.default.createElement(
        _,
        { color: themeStylesheet.secondaryText },
        "※ ",
        tip.content
      );
    }
    // Default case: render the tip with 'Tip:' label
    return nO.default.createElement(
      _,
      { color: themeStylesheet.secondaryText },
      "※ Tip: ",
      tip.content
    );
  };

  // Render the tip message inside a flex row, if a tip is provided
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