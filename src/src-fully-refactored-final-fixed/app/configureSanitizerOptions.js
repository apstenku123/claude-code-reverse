/**
 * Configures and normalizes options for the HTML sanitizer.
 *
 * This function processes the provided options object, applies defaults, resolves conflicts,
 * and prepares the sanitizer'createInteractionAccessor configuration. It ensures that mutually exclusive options
 * are not used together and initializes the CSS filter if needed.
 *
 * @param {Object} userOptions - The user-provided options for the sanitizer.
 * @returns {void}
 */
function configureSanitizerOptions(userOptions) {
  // Normalize the options object, ensuring isBlobOrFileLikeObject'createInteractionAccessor an object and applying any necessary transformations
  const options = shallowCopyObject(userOptions || {});

  // If stripIgnoreTag is enabled, ensure onIgnoreTag is not also set
  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    // Force onIgnoreTag to the default strip-all handler
    options.onIgnoreTag = lX.onIgnoreTagStripAll;
  }

  // Normalize the whitelist/allowList option
  if (options.whiteList || options.allowList) {
    options.whiteList = normalizeObjectKeysAndArrayValuesToLowercase(options.whiteList || options.allowList);
  } else {
    options.whiteList = lX.whiteList;
  }

  // Set attribute wrap sign based on singleQuotedAttributeValue option
  this.attributeWrapSign = options.singleQuotedAttributeValue === true
    ? "'"
    : lX.attributeWrapSign;

  // Assign handler functions, falling back to defaults if not provided
  options.onTag = options.onTag || lX.onTag;
  options.onTagAttr = options.onTagAttr || lX.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || lX.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || lX.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || lX.safeAttrValue;
  options.escapeHtml = options.escapeHtml || lX.escapeHtml;

  // Store the processed options on the instance
  this.options = options;

  // Handle CSS filtering: disable if css === false, otherwise initialize filter
  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new eP6(options.css);
  }
}

module.exports = configureSanitizerOptions;