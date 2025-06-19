/**
 * Renders a styled <ink-text> React element with various text styles and colors.
 *
 * @param {Object} options - Options for styling the text.
 * @param {string} [options.color] - Foreground text color.
 * @param {string} [options.backgroundColor] - Background text color.
 * @param {boolean} [options.dimColor=false] - Whether to dim the text color.
 * @param {boolean} [options.bold=false] - Whether to render text in bold.
 * @param {boolean} [options.italic=false] - Whether to render text in italic.
 * @param {boolean} [options.underline=false] - Whether to underline the text.
 * @param {boolean} [options.strikethrough=false] - Whether to strikethrough the text.
 * @param {boolean} [options.inverse=false] - Whether to inverse foreground and background colors.
 * @param {string} [options.wrap="wrap"] - Text wrapping mode.
 * @param {React.ReactNode} options.children - The content to render inside the text element.
 * @returns {React.ReactElement|null} The styled <ink-text> element, or null if no children are provided.
 */
function renderStyledInkText({
  color,
  backgroundColor,
  dimColor = false,
  bold = false,
  italic = false,
  underline = false,
  strikethrough = false,
  inverse = false,
  wrap = "wrap",
  children
}) {
  // Return null if no children are provided
  if (children === undefined || children === null) return null;

  return BG0.default.createElement(
    "ink-text",
    {
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexDirection: "row",
        textWrap: wrap
      },
      // Apply text transformations based on props
      internal_transform: text => {
        let transformedText = text;
        if (dimColor) transformedText = FA.dim(transformedText);
        if (color) transformedText = TL(transformedText, color, "foreground");
        if (backgroundColor) transformedText = TL(transformedText, backgroundColor, "background");
        if (bold) transformedText = FA.bold(transformedText);
        if (italic) transformedText = FA.italic(transformedText);
        if (underline) transformedText = FA.underline(transformedText);
        if (strikethrough) transformedText = FA.strikethrough(transformedText);
        if (inverse) transformedText = FA.inverse(transformedText);
        return transformedText;
      }
    },
    children
  );
}

module.exports = renderStyledInkText;