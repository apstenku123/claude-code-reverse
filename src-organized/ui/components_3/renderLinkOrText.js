/**
 * Renders a link or underlined text based on the current terminal environment and provided children.
 *
 * If the current terminal is included in the supported terminals list, or if custom children are provided,
 * renders a <th> component with the given URL and children. Otherwise, renders the children (or URL) as
 * underlined text.
 *
 * @param {Object} params - The parameters for rendering.
 * @param {string} params.url - The URL to use for the link or text.
 * @param {React.ReactNode} [params.children] - Optional custom content to display instead of the URL.
 * @returns {React.ReactElement} The rendered link or underlined text element.
 */
function renderLinkOrText({
  url,
  children
}) {
  // Check if the current terminal is in the supported terminals list
  const isSupportedTerminal = b$6.includes(pA.terminal ?? "");
  // Use children if provided, otherwise fall back to the URL
  const displayContent = children || url;

  // If handleMissingDoctypeError're in a supported terminal or custom children are provided, render a link
  if (isSupportedTerminal || displayContent !== url) {
    return XW1.default.createElement(th, {
      url: url
    }, XW1.default.createElement(_, null, displayContent));
  } else {
    // Otherwise, render underlined text
    return XW1.default.createElement(_, {
      underline: true
    }, displayContent);
  }
}

module.exports = renderLinkOrText;