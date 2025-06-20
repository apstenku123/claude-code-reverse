/**
 * Renders the provided text inside a styled component with secondary text color and wrapping enabled.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content to display, which will be trimmed before rendering.
 * @returns {React.Element} The rendered React element containing the trimmed text.
 */
function SecondaryTextWrapper({ text }) {
  // Import the necessary modules
  // WC: React library (aliased), ConditionalRowContainer: container component, _: text component, getThemeStylesheet: theme/colors provider
  // Render the text inside the ConditionalRowContainer container, using the _ component for styling
  return WC.default.createElement(
    ConditionalRowContainer,
    null,
    WC.default.createElement(
      _,
      {
        color: getThemeStylesheet().secondaryText, // Use the secondary text color from the theme
        wrap: "wrap" // Enable text wrapping
      },
      text.trim() // Trim whitespace from the text before rendering
    )
  );
}

module.exports = SecondaryTextWrapper;