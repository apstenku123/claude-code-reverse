/**
 * Renders a warning or informational message about context usage, depending on thresholds and auto-compact settings.
 *
 * @param {Object} params - The function parameters.
 * @param {Object} params.tokenUsage - The current token usage statistics.
 * @returns {React.ReactNode|null} a React element displaying the context warning/info, or null if above warning threshold.
 */
function renderContextUsageWarning({ tokenUsage }) {
  // Retrieve the current theme'createInteractionAccessor stylesheet for color values
  const themeStylesheet = getThemeStylesheet();

  // Extract context usage statistics and thresholds
  const {
    percentLeft,
    isAboveWarningThreshold,
    isAboveErrorThreshold
  } = calculateThresholdStatus(tokenUsage, W11);

  // If usage is above the warning threshold, do not render anything
  if (!isAboveWarningThreshold) return null;

  // Check if auto-compact is enabled in the current configuration
  const isAutoCompactEnabled = getCachedOrFreshConfig().autoCompactEnabled;

  // Determine the color to use based on config and error threshold
  const messageColor = isAutoCompactEnabled
    ? themeStylesheet.secondaryText
    : isAboveErrorThreshold
      ? themeStylesheet.error
      : themeStylesheet.warning;

  // Determine if auto-compact is available
  const isAutoCompactAvailable = isAutoCompactEnabled();

  // Render the appropriate message based on auto-compact availability
  return RW.createElement(
    g,
    { flexDirection: "row" },
    RW.createElement(
      _,
      { color: messageColor },
      isAutoCompactAvailable
        ? RW.createElement(
            RW.Fragment,
            null,
            "Context left until auto-compact: ",
            percentLeft,
            "%"
          )
        : RW.createElement(
            RW.Fragment,
            null,
            "Context low (",
            percentLeft,
            "% remaining) · Run /compact to compact & continue"
          )
    )
  );
}

// Dependency function aliases for clarity
const getThemeStylesheet = getThemeStylesheet;
const getCachedOrFreshConfig = getCachedOrFreshConfig;

module.exports = renderContextUsageWarning;