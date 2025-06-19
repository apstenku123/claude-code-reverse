/**
 * AnimatedStatusIndicator
 *
 * Renders a status indicator that animates (toggles its display) every 600ms when shouldAnimate is true.
 * The color of the indicator is determined by the error and unresolved status.
 *
 * @param {Object} params - The parameters for the status indicator.
 * @param {boolean} params.isError - Indicates if the status is an error.
 * @param {boolean} params.isUnresolved - Indicates if the status is unresolved.
 * @param {boolean} params.shouldAnimate - If true, the indicator will animate (toggle) every 600ms.
 * @returns {React.ReactElement} The status indicator React element.
 */
function AnimatedStatusIndicator({
  isError,
  isUnresolved,
  shouldAnimate
}) {
  // State to control the visibility of the indicator (for animation)
  const [isVisible, setIsVisible] = tK1.default.useState(true);

  // Toggle the visibility every 600ms if shouldAnimate is true
  YC(() => {
    if (!shouldAnimate) return;
    setIsVisible(prevVisible => !prevVisible);
  }, 600);

  // Determine the color based on error/unresolved status
  const statusColor = isUnresolved
    ? getThemeStylesheet().secondaryText
    : isError
      ? getThemeStylesheet().error
      : getThemeStylesheet().success;

  // Render the indicator with the appropriate color and animation
  return tK1.default.createElement(g, {
    minWidth: 2
  }, tK1.default.createElement(_, {
    color: statusColor
  }, isVisible ? nw : "  "));
}

module.exports = AnimatedStatusIndicator;