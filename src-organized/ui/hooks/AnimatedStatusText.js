/**
 * AnimatedStatusText
 *
 * Renders an animated status text component that cycles through a predefined set of status messages (Jz1),
 * updating every 120ms. The color of the text depends on the current connection status.
 *
 * @returns {React.ReactElement} The animated status text React element.
 */
function AnimatedStatusText() {
  // State: current index in the status messages array
  const [currentStatusIndex, setCurrentStatusIndex] = AJ.useState(0);

  // Get the current connection status
  const { isConnected } = useConnectionStatus(); // useConnectionStatus

  // Update the status index every 120ms to animate the status text
  YC(() => {
    setCurrentStatusIndex(prevIndex => (prevIndex + 1) % Jz1.length);
  }, 120);

  // Determine the color based on connection status
  const themeStyles = getThemeStylesheet(); // getThemeStylesheet
  const statusTextColor = isConnected === false ? themeStyles.secondaryText : themeStyles.claude;

  // Render the animated status text
  return J9.createElement(
    g, // Container component
    {
      flexWrap: "wrap",
      height: 1,
      width: 2
    },
    J9.createElement(
      _, // Text component
      {
        color: statusTextColor
      },
      Jz1[currentStatusIndex] // Current animated status text
    )
  );
}

module.exports = AnimatedStatusText;