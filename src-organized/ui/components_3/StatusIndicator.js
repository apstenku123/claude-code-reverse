/**
 * Renders a status indicator component with animated feedback based on error, unresolved, and animation state.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isError - Whether the status is an error.
 * @param {boolean} props.isUnresolved - Whether the status is unresolved.
 * @param {boolean} props.shouldAnimate - Whether the indicator should animate.
 * @returns {React.ReactElement} The rendered status indicator element.
 */
function StatusIndicator({
  isError,
  isUnresolved,
  shouldAnimate
}) {
  // State to control the animation toggle (on/off)
  const [isIndicatorVisible, setIndicatorVisible] = tK1.default.useState(true);

  // Set up an interval to toggle the indicator if animation is enabled
  YC(() => {
    if (!shouldAnimate) return;
    setIndicatorVisible(prevVisible => !prevVisible);
  }, 600);

  // Determine the indicator color based on status
  const theme = getThemeStylesheet();
  let indicatorColor;
  if (isUnresolved) {
    indicatorColor = theme.secondaryText;
  } else if (isError) {
    indicatorColor = theme.error;
  } else {
    indicatorColor = theme.success;
  }

  // Render the indicator with the appropriate color and animation state
  return tK1.default.createElement(g, {
    minWidth: 2
  }, tK1.default.createElement(_, {
    color: indicatorColor
  }, isIndicatorVisible ? nw : "  "));
}

module.exports = StatusIndicator;