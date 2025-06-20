/**
 * Generates a unique CSS-like selector string for a given DOM element, optionally including specific attributes.
 *
 * @param {HTMLElement} element - The DOM element for which to generate the selector string.
 * @param {string[]} [attributeNames] - Optional array of attribute names to include in the selector string if present on the element.
 * @returns {string} a string representing the element as a CSS selector, including tag, id, classes, and selected attributes.
 */
function getElementSelectorString(element, attributeNames) {
  // Return empty string if element is not valid or does not have a tagName
  if (!element || !element.tagName) return "";

  // If running in an environment with HTMLElement and element is a Sentry component, return its sentryComponent value
  if (typeof xy !== 'undefined' && xy.HTMLElement) {
    if (
      element instanceof HTMLElement &&
      element.dataset &&
      element.dataset.sentryComponent
    ) {
      return element.dataset.sentryComponent;
    }
  }

  const selectorParts = [];
  // Add the tag name (lowercase)
  selectorParts.push(element.tagName.toLowerCase());

  // If attributeNames are provided, filter for those present and add them as [attr="value"]
  let selectedAttributes = null;
  if (attributeNames && attributeNames.length) {
    selectedAttributes = attributeNames
      .filter(attrName => element.getAttribute(attrName))
      .map(attrName => [attrName, element.getAttribute(attrName)]);
  }

  if (selectedAttributes && selectedAttributes.length) {
    // Add each selected attribute as [attr="value"]
    selectedAttributes.forEach(([attrName, attrValue]) => {
      selectorParts.push(`[${attrName}="${attrValue}"]`);
    });
  } else {
    // If no attributes matched, add id and classes if present
    if (element.id) {
      selectorParts.push(`#${element.id}`);
    }
    // Add class names as .className
    const className = element.className;
    if (className && $h2.isString(className)) {
      const classList = className.split(/\s+/);
      for (let i = 0; i < classList.length; i++) {
        if (classList[i]) {
          selectorParts.push(`.${classList[i]}`);
        }
      }
    }
  }

  // Always add certain common attributes if present
  const commonAttributes = ["aria-label", "type", "name", "title", "alt"];
  for (let i = 0; i < commonAttributes.length; i++) {
    const attrName = commonAttributes[i];
    const attrValue = element.getAttribute(attrName);
    if (attrValue) {
      selectorParts.push(`[${attrName}="${attrValue}"]`);
    }
  }

  // Join all selector parts into a single string
  return selectorParts.join("");
}

module.exports = getElementSelectorString;