/**
 * Retrieves the value of the first CSS property defined for a given class name from the document'createInteractionAccessor stylesheets.
 * Utilizes a cache to avoid redundant lookups for the same class name.
 *
 * @param {string} className - The class name (without the leading dot) to search for in the stylesheets.
 * @returns {string|null} The value of the first CSS property found for the class, or null if not found.
 */
function getCssPropertyValueForClass(className) {
  // Check if the value is already cached
  if (getDynamicConfigOrFallback.has(className)) {
    return getDynamicConfigOrFallback.get(className);
  }

  // Iterate through all stylesheets in the document
  for (let stylesheetIndex = 0; stylesheetIndex < document.styleSheets.length; stylesheetIndex++) {
    const stylesheet = document.styleSheets[stylesheetIndex];
    let cssRules = null;
    try {
      cssRules = stylesheet.cssRules;
    } catch (error) {
      // Accessing cssRules may throw a security error for cross-origin stylesheets
      continue;
    }
    if (!cssRules) continue;

    // Iterate through all CSS rules in the stylesheet
    for (let ruleIndex = 0; ruleIndex < cssRules.length; ruleIndex++) {
      const rule = cssRules[ruleIndex];
      // Only process CSSStyleRule instances (ignore @media, @font-face, etc.)
      if (!(rule instanceof CSSStyleRule)) continue;

      const selectorText = rule.selectorText;
      const cssText = rule.cssText;
      const styleDeclaration = rule.style;

      // Check if the selector matches the class name (e.g., ".myClass")
      if (selectorText != null && selectorText.startsWith(`.${className}`)) {
        // Extract the first CSS property name using a regular expression
        const propertyMatch = cssText.match(/{ *([a-z\-]+):/);
        if (propertyMatch !== null) {
          const propertyName = propertyMatch[1];
          const propertyValue = styleDeclaration.getPropertyValue(propertyName);
          // Cache the result for future lookups
          getDynamicConfigOrFallback.set(className, propertyValue);
          return propertyValue;
        } else {
          // No property found in the rule
          return null;
        }
      }
    }
  }
  // No matching class or property found
  return null;
}

module.exports = getCssPropertyValueForClass;