/**
 * Renders an animated hammer icon that toggles visibility every 500ms.
 * Useful for indicating a loading or processing state in the UI.
 *
 * @returns {React.ReactElement} a flex container with an animated hammer icon.
 */
function AnimatedHammerIcon() {
  // State to control the visibility of the hammer icon
  const [isHammerVisible, setIsHammerVisible] = AJ.useState(true);

  // Effect: Toggle the hammer icon visibility every 500ms
  YC(() => {
    setIsHammerVisible((prevVisible) => !prevVisible);
  }, 500);

  // Get secondary text color from the current theme
  const { secondaryText } = getThemeStylesheet();

  // Render a flex container with the animated hammer icon
  return J9.createElement(
    g,
    {
      flexWrap: "wrap",
      flexGrow: 0,
      height: 1,
      width: 2
    },
    J9.createElement(
      _,
      { color: secondaryText },
      isHammerVisible ? "⚒" : " "
    )
  );
}

module.exports = AnimatedHammerIcon;