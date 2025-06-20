/**
 * Initializes and normalizes options for the HTML sanitizer.
 *
 * This function processes the provided options object, applies defaults,
 * handles mutually exclusive options, and prepares the sanitizer instance
 * for use. It ensures that all necessary callbacks and configuration
 * properties are set, and that CSS filtering is properly configured.
 *
 * @param {Object} userOptions - The options object provided by the user for sanitizer configuration.
 * @returns {void}
 */
function initializeSanitizerOptions(userOptions) {
  // Ensure options is an object and normalize its structure
  const normalizedOptions = shallowCopyObject(userOptions || {});

  // Handle mutually exclusive options: stripIgnoreTag and onIgnoreTag
  if (normalizedOptions.stripIgnoreTag) {
    if (normalizedOptions.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    // Force onIgnoreTag to the default strip-all handler
    normalizedOptions.onIgnoreTag = lX.onIgnoreTagStripAll;
  }

  // Normalize whiteList/allowList
  if (normalizedOptions.whiteList || normalizedOptions.allowList) {
    normalizedOptions.whiteList = normalizeObjectKeysAndArrayValuesToLowercase(
      normalizedOptions.whiteList || normalizedOptions.allowList
    );
  } else {
    normalizedOptions.whiteList = lX.whiteList;
  }

  // Set attribute wrap sign based on singleQuotedAttributeValue option
  this.attributeWrapSign =
    normalizedOptions.singleQuotedAttributeValue === true
      ? "'"
      : lX.attributeWrapSign;

  // Assign callbacks, falling back to defaults if not provided
  normalizedOptions.onTag = normalizedOptions.onTag || lX.onTag;
  normalizedOptions.onTagAttr = normalizedOptions.onTagAttr || lX.onTagAttr;
  normalizedOptions.onIgnoreTag = normalizedOptions.onIgnoreTag || lX.onIgnoreTag;
  normalizedOptions.onIgnoreTagAttr = normalizedOptions.onIgnoreTagAttr || lX.onIgnoreTagAttr;
  normalizedOptions.safeAttrValue = normalizedOptions.safeAttrValue || lX.safeAttrValue;
  normalizedOptions.escapeHtml = normalizedOptions.escapeHtml || lX.escapeHtml;

  // Store the processed options on the instance
  this.options = normalizedOptions;

  // Configure CSS filtering
  if (normalizedOptions.css === false) {
    this.cssFilter = false;
  } else {
    normalizedOptions.css = normalizedOptions.css || {};
    this.cssFilter = new eP6(normalizedOptions.css);
  }
}

module.exports = initializeSanitizerOptions;