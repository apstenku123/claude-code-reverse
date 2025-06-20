/**
 * Renders the provided text inside a styled secondary text component.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.text - The text to be displayed.
 * @returns {React.Element} The rendered React element with secondary text styling.
 */
function renderSecondaryText({ text }) {
  // Import dependencies
  // WC: React library (aliased), ConditionalRowContainer: Parent component, _: Text component, getThemeStylesheet: getThemeStylesheet
  // These should be imported at the top of the file in actual usage

  // Retrieve the current theme'createInteractionAccessor stylesheet
  const themeStylesheet = getThemeStylesheet();

  // Trim the input text to remove leading/trailing whitespace
  const trimmedText = text.trim();

  // Render the text inside the styled component
  return WC.default.createElement(
    ConditionalRowContainer,
    null,
    WC.default.createElement(
      _,
      {
        color: themeStylesheet.secondaryText,
        wrap: "wrap"
      },
      trimmedText
    )
  );
}

module.exports = renderSecondaryText;