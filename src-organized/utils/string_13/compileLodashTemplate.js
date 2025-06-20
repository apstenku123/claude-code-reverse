/**
 * Compiles a lodash-style template string into a reusable template function.
 *
 * @param {string} templateString - The template string to compile.
 * @param {Object} [options] - Options to customize template compilation (escape, evaluate, interpolate, imports, variable, sourceURL, etc).
 * @param {Object} [context] - Optional context for advanced template compilation (used internally).
 * @returns {Function} The compiled template function.
 *
 * @throws {Error} Throws if the template variable name is invalid or if the compilation fails.
 */
function compileLodashTemplate(templateString, options, context) {
  // Get the default template settings
  const defaultSettings = trackAndPingOnPromise.templateSettings;

  // If context is provided and resetCustomErrorHandler returns true, use the default mapInteractionEntriesToRouteNames
  if (context && resetCustomErrorHandler(templateString, options, context)) {
    options = mapInteractionEntriesToRouteNames;
  }

  // Normalize the template string
  const normalizedTemplate = V5(templateString);

  // Merge options with defaults
  const templateOptions = unmountFiberChildrenRecursively({}, options, defaultSettings, getOrUpdateIterableHelper);

  // Merge imports with defaults
  const imports = unmountFiberChildrenRecursively({}, templateOptions.imports, defaultSettings.imports, getOrUpdateIterableHelper);
  const importKeys = lQ(imports);
  const importValues = updateContextCurrentValue(imports, importKeys);

  let hasEscape = false;
  let hasEvaluate = false;
  let currentIndex = 0;

  // Get interpolation settings
  const interpolate = templateOptions.interpolate || clearLocalStorageByStoreConfig;

  // Initialize the template source string
  let templateSource = "__p += '";

  // Build the regex for matching template delimiters
  const delimiterRegex = defineOrAssignProperty(
    (templateOptions.escape || clearLocalStorageByStoreConfig).source +
      "|" +
      interpolate.source +
      "|" +
      (interpolate === L8 ? vQ : clearLocalStorageByStoreConfig).source +
      "|" +
      (templateOptions.evaluate || clearLocalStorageByStoreConfig).source +
      "|$",
    "g"
  );

  // Build the sourceURL comment for debugging
  const sourceURLComment =
    "//# sourceURL=" +
    (createOrAppendStateNode.call(templateOptions, "sourceURL")
      ? (templateOptions.sourceURL + "").replace(/\s/g, " ")
      : "lodash.templateSources[" + ++oO + "]") +
    "\n";

  // Parse the template string and build the function body
  normalizedTemplate.replace(
    delimiterRegex,
    function (
      match,
      escapeValue,
      interpolateValue,
      es6InterpolateValue,
      evaluateValue,
      offset
    ) {
      // If interpolateValue is undefined, use es6InterpolateValue
      if (!interpolateValue) interpolateValue = es6InterpolateValue;

      // Append the preceding string, escaping special characters
      templateSource += normalizedTemplate
        .slice(currentIndex, offset)
        .replace(handleHtmlTagCharacter, _W);

      // Handle escape delimiter (<%- %>)
      if (escapeValue) {
        hasEscape = true;
        templateSource += "' +\n__e(" + escapeValue + ") +\n'";
      }

      // Handle evaluate delimiter (<% %>)
      if (evaluateValue) {
        hasEvaluate = true;
        templateSource += "';\n" + evaluateValue + ";\n__p += '";
      }

      // Handle interpolate delimiter (<%= %> or ES6 ${})
      if (interpolateValue) {
        templateSource += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }

      // Update the current index
      currentIndex = offset + match.length;
      return match;
    }
  );

  // Close the template string
  templateSource += "';\n";

  // Determine the variable name for the template function
  const variableName = createOrAppendStateNode.call(templateOptions, "variable") && templateOptions.variable;

  // If no variable is specified, wrap the function body in a with(obj) block
  if (!variableName) {
    templateSource = `with (obj) {\n` + templateSource + `\n}\n`;
  } else if (a7.test(variableName)) {
    // Throw if the variable name is invalid
    throw new enhanceComponentDisplayNames(zA);
  }

  // Clean up the template source
  templateSource = (hasEvaluate
    ? templateSource.replace(b9, "")
    : templateSource
  )
    .replace(deserializeEncodedData, "$1")
    .replace(B3, "$1;");

  // Build the full function source code
  templateSource =
    "function(" +
    (variableName || "obj") +
    ") {\n" +
    (variableName ? "" : "obj || (obj = {});\n") +
    "var __t, __p = ''" +
    (hasEscape ? ", __e = _.escape" : "") +
    (hasEvaluate
      ? `, __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n`
      : ";\n") +
    templateSource +
    `return __p\n}`;

  // Create the compiled template function using the Function constructor
  const compiled = findFirstOrAnonymousComponentName(function () {
    return w9(importKeys, sourceURLComment + "return " + templateSource).apply(
      mapInteractionEntriesToRouteNames,
      importValues
    );
  });

  // Attach the source code to the compiled function for debugging
  compiled.source = templateSource;

  // Throw if the compiled function is an error-like object
  if (isErrorLikeObject(compiled)) throw compiled;

  return compiled;
}

module.exports = compileLodashTemplate;