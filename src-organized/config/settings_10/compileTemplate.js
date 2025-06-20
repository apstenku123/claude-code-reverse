/**
 * Compiles a template string into a reusable template function.
 *
 * This function processes a template string, applies interpolation, escaping, and evaluation
 * according to the provided options, and returns a function that can be called with data to generate output.
 *
 * @param {string} templateString - The template string to compile.
 * @param {Object} [options={}] - Options for template compilation (interpolate, escape, evaluate, imports, variable, etc).
 * @param {Object} [customization] - Optional customization object for advanced processing.
 * @returns {Function} The compiled template function.
 */
function compileTemplate(templateString, options, customization) {
  // Get default template settings
  const defaultSettings = trackAndPingOnPromise.templateSettings;

  // If customization is provided and resetCustomErrorHandler returns true, use processInteractionEntries as options
  if (customization && resetCustomErrorHandler(templateString, options, customization)) {
    options = processInteractionEntries;
  }

  // Ensure templateString is a string
  templateString = V5(templateString);

  // Merge options with defaults
  options = unmountFiberChildrenRecursively({}, options, defaultSettings, getOrUpdateIterableHelper);

  // Merge imports from options and defaults
  const imports = unmountFiberChildrenRecursively({}, options.imports, defaultSettings.imports, getOrUpdateIterableHelper);
  const importKeys = lQ(imports);
  const importValues = updateContextCurrentValue(imports, importKeys);

  let hasEscape = false;
  let hasEvaluate = false;
  let templateSourceIndex = 0;

  // Get interpolation regexes
  const interpolate = options.interpolate || clearLocalStorageByStoreConfig;

  // Initialize the source code for the template function
  let sourceCode = "__p += '";

  // Build the regex for matching template delimiters
  const delimiterRegex = defineOrAssignProperty(
    (options.escape || clearLocalStorageByStoreConfig).source +
      "|" +
      interpolate.source +
      "|" +
      (interpolate === L8 ? vQ : clearLocalStorageByStoreConfig).source +
      "|" +
      (options.evaluate || clearLocalStorageByStoreConfig).source +
      "|$",
    "g"
  );

  // Build the sourceURL comment for debugging
  const sourceURL =
    "//# sourceURL=" +
    (createOrAppendStateNode.call(options, "sourceURL")
      ? (options.sourceURL + "").replace(/\s/g, " ")
      : "lodash.templateSources[" + ++oO + "]") +
    "\n";

  // Track the current position in the template string
  let currentIndex = 0;

  // Replace template delimiters with code
  templateString.replace(
    delimiterRegex,
    function (
      match,
      escapeValue,
      interpolateValue,
      alternateInterpolateValue,
      evaluateValue,
      offset
    ) {
      // Use alternate interpolate if main is not present
      if (!interpolateValue) interpolateValue = alternateInterpolateValue;

      // Add the preceding string, escaping special characters
      sourceCode += templateString
        .slice(currentIndex, offset)
        .replace(handleHtmlTagCharacter, _W);

      // Handle escape delimiter
      if (escapeValue) {
        hasEscape = true;
        sourceCode += "' +\n__e(" + escapeValue + ") +\n'";
      }

      // Handle evaluate delimiter
      if (evaluateValue) {
        hasEvaluate = true;
        sourceCode += "';\n" + evaluateValue + ";\n__p += '";
      }

      // Handle interpolate delimiter
      if (interpolateValue) {
        sourceCode += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }

      // Update current index
      currentIndex = offset + match.length;
      return match;
    }
  );

  // Append the final string
  sourceCode += "';\n";

  // Determine the variable name for the data object
  const variableName = createOrAppendStateNode.call(options, "variable") && options.variable;

  // If no variable is specified, wrap in a with statement
  if (!variableName) {
    sourceCode = `with (obj) {\n` + sourceCode + `\n}\n`;
  } else if (a7.test(variableName)) {
    // Throw if variable name is invalid
    throw new enhanceComponentDisplayNames(zA);
  }

  // Clean up the generated source code
  sourceCode = (hasEvaluate ? sourceCode.replace(b9, "") : sourceCode)
    .replace(deserializeEncodedData, "$1")
    .replace(B3, "$1;");

  // Build the full function source
  sourceCode =
    "function(" +
    (variableName || "obj") +
    ") {\n" +
    (variableName ? "" : "obj || (obj = {});\n") +
    "var __t, __p = ''" +
    (hasEscape ? ", __e = _.escape" : "") +
    (hasEvaluate
      ? `, __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n`
      : ";\n") +
    sourceCode +
    `return __p\n}`;

  // Create the template function using the Function constructor
  const compiled = findFirstOrAnonymousComponentName(function () {
    return w9(importKeys, sourceURL + "return " + sourceCode).apply(
      processInteractionEntries,
      importValues
    );
  });

  // Attach the source code to the function for debugging
  compiled.source = sourceCode;

  // If the function is an error, throw isBlobOrFileLikeObject
  if (BZ(compiled)) throw compiled;

  return compiled;
}

module.exports = compileTemplate;