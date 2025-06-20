/**
 * Renders an animated status indicator based on error and unresolved states.
 *
 * @param {Object} params - The parameters for the status indicator.
 * @param {boolean} params.isError - Indicates if the current state is an error.
 * @param {boolean} params.isUnresolved - Indicates if the current state is unresolved.
 * @param {boolean} params.shouldAnimate - Determines if the indicator should animate.
 * @returns {React.ReactElement} The rendered status indicator component.
 */
function StatusAnimatedIndicator({
  isError,
  isUnresolved,
  shouldAnimate
}) {
  // State to control the animation toggle
  const [isIndicatorVisible, setIndicatorVisible] = tK1.default.useState(true);

  // Toggle the indicator visibility every 600ms if animation is enabled
  YC(() => {
    if (!shouldAnimate) return;
    setIndicatorVisible(prevVisible => !prevVisible);
  }, 600);

  // Determine the color based on unresolved or error state
  const themeStyles = getThemeStylesheet();
  let indicatorColor;
  if (isUnresolved) {
    indicatorColor = themeStyles.secondaryText;
  } else if (isError) {
    indicatorColor = themeStyles.error;
  } else {
    indicatorColor = themeStyles.success;
  }

  // Render the indicator with the appropriate color and animation
  return tK1.default.createElement(g, {
    minWidth: 2
  }, tK1.default.createElement(_, {
    color: indicatorColor
  }, isIndicatorVisible ? nw : "  "));
}

module.exports = StatusAnimatedIndicator;