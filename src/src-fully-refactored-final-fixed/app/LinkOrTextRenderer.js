/**
 * Renders either a clickable link or plain underlined text based on the terminal environment and provided children.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.url - The URL to use for the link.
 * @param {React.ReactNode} [props.children] - Optional children to display as the link/text content.
 * @returns {React.ReactElement} The rendered link or underlined text element.
 */
function LinkOrTextRenderer({ url, children }) {
  // Determine if the current terminal is in the allowed list
  const isTerminalAllowed = b$6.includes(pA.terminal ?? "");
  // Use children if provided, otherwise fall back to the URL
  const displayContent = children || url;

  // If the terminal is allowed or custom children are provided, render a link
  if (isTerminalAllowed || displayContent !== url) {
    return XW1.default.createElement(
      th,
      { url },
      XW1.default.createElement(_, null, displayContent)
    );
  }
  // Otherwise, render underlined text
  return XW1.default.createElement(
    _,
    { underline: true },
    displayContent
  );
}

module.exports = LinkOrTextRenderer;