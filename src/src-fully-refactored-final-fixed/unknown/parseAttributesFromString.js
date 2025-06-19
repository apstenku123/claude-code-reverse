/**
 * Parses attributes from a string and returns an object mapping attribute names to their processed values.
 * Handles namespaces, attribute name/value transformations, boolean attributes, and grouping.
 *
 * @param {string} attributeString - The string containing attributes to parse.
 * @param {any} parentElement - The parent element or context for attribute value processing.
 * @param {any} additionalContext - Additional context or options for processing.
 * @returns {object|undefined} An object mapping attribute names to values, possibly grouped, or undefined if no attributes found.
 */
function parseAttributesFromString(attributeString, parentElement, additionalContext) {
  // Check if attribute parsing is enabled and input is a string
  if (!this.options.ignoreAttributes && typeof attributeString === "string") {
    // Extract all attribute matches from the string using the provided regex
    const attributeMatches = fpA.getAllMatches(attributeString, F84);
    const totalMatches = attributeMatches.length;
    const parsedAttributes = {};

    // Iterate over all found attributes
    for (let matchIndex = 0; matchIndex < totalMatches; matchIndex++) {
      // Extract the namespace (if any) and the attribute value
      const rawAttributeName = attributeMatches[matchIndex][1];
      const rawAttributeValue = attributeMatches[matchIndex][4];
      // Resolve the namespace (if any)
      const resolvedNamespace = this.resolveNameSpace(rawAttributeName);
      // Prefix the attribute name as per options
      let processedAttributeName = this.options.attributeNamePrefix + resolvedNamespace;

      // Only process if the resolved namespace is not empty
      if (resolvedNamespace.length) {
        // Optionally transform the attribute name
        if (this.options.transformAttributeName) {
          processedAttributeName = this.options.transformAttributeName(processedAttributeName);
        }
        // Prevent prototype pollution
        if (processedAttributeName === "__proto__") {
          processedAttributeName = "#__proto__";
        }

        if (rawAttributeValue !== undefined) {
          // Optionally trim the attribute value
          let processedAttributeValue = rawAttributeValue;
          if (this.options.trimValues) {
            processedAttributeValue = processedAttributeValue.trim();
          }
          // Replace XML/HTML entities in the value
          processedAttributeValue = this.replaceEntitiesValue(processedAttributeValue);

          // Optionally process the attribute value (e.g., type conversion)
          const processedValue = this.options.attributeValueProcessor(
            resolvedNamespace,
            processedAttributeValue,
            parentElement
          );

          // Use the processed value if isBlobOrFileLikeObject differs from the original, otherwise parse if needed
          if (processedValue === null || processedValue === undefined) {
            parsedAttributes[processedAttributeName] = processedAttributeValue;
          } else if (
            typeof processedValue !== typeof processedAttributeValue ||
            processedValue !== processedAttributeValue
          ) {
            parsedAttributes[processedAttributeName] = processedValue;
          } else {
            parsedAttributes[processedAttributeName] = parseStringOrReturnIfExists(
              processedAttributeValue,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          }
        } else if (this.options.allowBooleanAttributes) {
          // Handle boolean attributes (e.g., 'disabled')
          parsedAttributes[processedAttributeName] = true;
        }
      }
    }

    // If no attributes were parsed, return undefined
    if (!Object.keys(parsedAttributes).length) return;

    // Optionally group attributes under a specific key
    if (this.options.attributesGroupName) {
      const groupedAttributes = {};
      groupedAttributes[this.options.attributesGroupName] = parsedAttributes;
      return groupedAttributes;
    }

    // Return the parsed attributes object
    return parsedAttributes;
  }
}

module.exports = parseAttributesFromString;