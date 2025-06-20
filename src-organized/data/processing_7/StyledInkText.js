/**
 * Renders styled text for Ink (React CLI) with various style options.
 *
 * @param {Object} props - The properties for styling and content.
 * @param {string} [props.color] - The foreground color of the text.
 * @param {string} [props.backgroundColor] - The background color of the text.
 * @param {boolean} [props.dimColor=false] - Whether to apply dim styling to the text.
 * @param {boolean} [props.bold=false] - Whether to render the text in bold.
 * @param {boolean} [props.italic=false] - Whether to render the text in italic.
 * @param {boolean} [props.underline=false] - Whether to underline the text.
 * @param {boolean} [props.strikethrough=false] - Whether to strikethrough the text.
 * @param {boolean} [props.inverse=false] - Whether to inverse the text colors.
 * @param {string} [props.wrap="wrap"] - Text wrapping mode (e.g., "wrap", "truncate").
 * @param {React.ReactNode} props.children - The content to render inside the styled text.
 * @returns {React.ReactElement|null} The styled Ink text element, or null if no children are provided.
 */
function StyledInkText({
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
  // If no content is provided, render nothing
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
      // Apply all requested text transformations in order
      internal_transform: (text) => {
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

module.exports = StyledInkText;