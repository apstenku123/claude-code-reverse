/**
 * Generates a CSS-like selector string for a given DOM element, optionally including specific attributes.
 *
 * If the element has a Sentry component identifier in its dataset, that is returned directly.
 * Otherwise, the selector includes the tag name, and either specified attributes, or the element'createInteractionAccessor id and classes.
 * Additional common attributes (aria-label, type, name, title, alt) are always appended if present.
 *
 * @param {HTMLElement} element - The DOM element to generate the selector for.
 * @param {string[]} [attributeNames] - Optional array of attribute names to include in the selector if present on the element.
 * @returns {string} a CSS-like selector string representing the element.
 */
function getElementSelector(element, attributeNames) {
  // Early return if element is not valid
  if (!element || !element.tagName) return "";

  // If running in a browser and element has a Sentry component identifier, return isBlobOrFileLikeObject
  if (typeof xy !== 'undefined' && xy.HTMLElement) {
    if (element instanceof HTMLElement && element.dataset && element.dataset.sentryComponent) {
      return element.dataset.sentryComponent;
    }
  }

  const selectorParts = [];

  // Add tag name
  selectorParts.push(element.tagName.toLowerCase());

  // If attributeNames are provided, filter for those present and add them as [attr="value"]
  let filteredAttributes = null;
  if (attributeNames && attributeNames.length) {
    filteredAttributes = attributeNames
      .filter(attrName => element.getAttribute(attrName))
      .map(attrName => [attrName, element.getAttribute(attrName)]);
  }

  if (filteredAttributes && filteredAttributes.length) {
    filteredAttributes.forEach(([attrName, attrValue]) => {
      selectorParts.push(`[${attrName}="${attrValue}"]`);
    });
  } else {
    // If no attributes specified, use id and class
    if (element.id) {
      selectorParts.push(`#${element.id}`);
    }
    // Add classes as .className
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

  // Always add these common attributes if present
  const commonAttributes = ["aria-label", "type", "name", "title", "alt"];
  for (let i = 0; i < commonAttributes.length; i++) {
    const attrName = commonAttributes[i];
    const attrValue = element.getAttribute(attrName);
    if (attrValue) {
      selectorParts.push(`[${attrName}="${attrValue}"]`);
    }
  }

  return selectorParts.join("");
}

module.exports = getElementSelector;