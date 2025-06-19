/**
 * Initializes and configures XML builder options for the current instance.
 *
 * This function merges default options with user-provided options, sets up attribute handling,
 * and configures formatting behaviors such as indentation and new line characters.
 *
 * @param {Object} userOptions - Custom options to override the default XML builder configuration.
 * @returns {void}
 */
function initializeXmlBuilderOptions(userOptions) {
  // Merge default options (k84) with user-provided options
  this.options = Object.assign({}, k84, userOptions);

  // If attributes should be ignored or grouped, disable attribute detection
  if (this.options.ignoreAttributes || this.options.attributesGroupName) {
    /**
     * Always returns false, indicating that no property is considered an attribute.
     * @returns {boolean}
     */
    this.isAttribute = function () {
      return false;
    };
  } else {
    // Store the length of the attribute name prefix for quick access
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    // Use external attribute detection function
    this.isAttribute = getAttributeNameWithoutPrefix;
  }

  // Assign the node processing function (external)
  this.processTextOrObjNode = buildNodeFromObject;

  // Configure formatting: pretty print with indentation and new lines if enabled
  if (this.options.format) {
    // Use external indentation function
    this.indentate = x84;
    // Tag end character includes a new line
    this.tagEndChar = '>' + '\n';
    this.newLine = '\n';
  } else {
    // No indentation or new lines for compact output
    this.indentate = function () {
      return "";
    };
    this.tagEndChar = ">";
    this.newLine = "";
  }
}

module.exports = initializeXmlBuilderOptions;