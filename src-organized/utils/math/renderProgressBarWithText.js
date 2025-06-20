/**
 * Renders a progress bar with a label, styled according to the current theme.
 *
 * @param {Object} params - The parameters for rendering the progress bar.
 * @param {number} params.width - The total width of the progress bar (in characters).
 * @param {number} params.percent - The completion percentage (0-1) of the progress bar.
 * @param {string} params.text - The label to display inside the progress bar.
 * @returns {React.ReactElement} The rendered progress bar as a React element.
 */
function renderProgressBarWithText({
  width,
  percent,
  text
}) {
  // Get theme stylesheet (e.g., colors for the current theme)
  const themeStylesheet = getThemeStylesheet();

  // Get the current theme from configuration
  const { theme } = getCachedOrFreshConfig();

  // Determine the background color for the unfilled portion based on theme
  const unfilledBackgroundColor = theme.startsWith("dark")
    ? "rgb(30, 30, 30)"
    : "rgb(220, 220, 220)";

  // Calculate the number of characters to fill based on percent
  const filledWidth = Math.ceil(width * percent);
  const unfilledWidth = width - filledWidth;

  // Calculate the number of spaces after the label in the filled area
  // -1 to account for the space before the label
  const labelPadding = Math.max(0, filledWidth - text.length - 1);

  // Build the filled portion: space, label, then padding
  const filledSection = " " + text + " ".repeat(labelPadding);

  // Build the unfilled portion (spaces)
  const unfilledSection = " ".repeat(Math.max(0, unfilledWidth));

  // Create the filled portion as a React element with the theme color
  const filledElement = q0.default.createElement(
    _,
    { backgroundColor: themeStylesheet.claude },
    filledSection
  );

  // Return the progress bar as a React element, combining filled and unfilled portions
  return q0.default.createElement(
    _,
    null,
    filledElement,
    q0.default.createElement(
      _,
      { backgroundColor: unfilledBackgroundColor },
      unfilledSection
    )
  );
}

module.exports = renderProgressBarWithText;