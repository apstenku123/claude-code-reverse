/**
 * Applies a sequence of Chalk styles to a Chalk instance based on a configuration array.
 *
 * @param {object} chalkInstance - The Chalk instance to apply styles to.
 * @param {Array} styleGroups - An array of style group objects. Each object should have a `styles` array (each style is an array where the first element is the style name and the rest are arguments), and an optional `inverse` boolean flag.
 * @returns {object} - The resulting Chalk instance with the styles applied.
 *
 * @throws {Error} If a style name in the configuration does not exist on the Chalk instance.
 */
function applyChalkStyles(chalkInstance, styleGroups) {
  // Build a style map: { styleName: styleArgs[] | null }
  const styleMap = {};
  for (const styleGroup of styleGroups) {
    for (const style of styleGroup.styles) {
      // If inverse is true, set style to null (removes style)
      styleMap[style[0]] = styleGroup.inverse ? null : style.slice(1);
    }
  }

  let styledChalk = chalkInstance;
  // Apply each style in the styleMap to the Chalk instance
  for (const [styleName, styleArgs] of Object.entries(styleMap)) {
    if (!Array.isArray(styleArgs)) continue; // Skip styles set to null
    if (!(styleName in styledChalk)) {
      throw new Error(`Unknown Chalk style: ${styleName}`);
    }
    // If there are arguments, call the style as a function, else just access the property
    styledChalk = styleArgs.length > 0 ? styledChalk[styleName](...styleArgs) : styledChalk[styleName];
  }
  return styledChalk;
}

module.exports = applyChalkStyles;