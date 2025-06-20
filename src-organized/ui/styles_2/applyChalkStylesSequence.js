/**
 * Applies a sequence of Chalk styles to a base Chalk instance.
 *
 * @param {object} chalkInstance - The base Chalk instance to apply styles to.
 * @param {Array<object>} styleGroups - An array of style group objects. Each group contains a 'styles' array and an optional 'inverse' flag.
 * @returns {object} - The resulting Chalk instance with the styles applied in sequence.
 *
 * Each style group in 'styleGroups' should have the following structure:
 *   {
 *     styles: Array<[string, ...any[]]>, // Array of [styleName, ...args] tuples
 *     inverse?: boolean // If true, the style is set to null (reset)
 *   }
 *
 * Example usage:
 *   applyChalkStylesSequence(chalk, [
 *     { styles: [['red'], ['bold']] },
 *     { styles: [['bgYellow', 'bright']] }
 *   ]);
 */
function applyChalkStylesSequence(chalkInstance, styleGroups) {
  // Build a mapping of style names to their arguments or null (if inverse)
  const styleMap = {};
  for (const styleGroup of styleGroups) {
    for (const style of styleGroup.styles) {
      const styleName = style[0];
      // If 'inverse' is true, set style to null to indicate reset
      styleMap[styleName] = styleGroup.inverse ? null : style.slice(1);
    }
  }

  // Apply each style in the order defined by styleMap
  let styledChalk = chalkInstance;
  for (const [styleName, styleArgs] of Object.entries(styleMap)) {
    // Only process if the value is an array (i.e., not null)
    if (!Array.isArray(styleArgs)) continue;
    // Ensure the style exists on the Chalk instance
    if (!(styleName in styledChalk)) {
      throw new Error(`Unknown Chalk style: ${styleName}`);
    }
    // Apply the style with arguments if provided, otherwise just the style
    styledChalk = styleArgs.length > 0 ? styledChalk[styleName](...styleArgs) : styledChalk[styleName];
  }
  return styledChalk;
}

module.exports = applyChalkStylesSequence;