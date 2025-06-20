/**
 * Extracts attributes from a string and processes them according to parser options.
 *
 * @description
 * Parses a string containing attributes, applies namespace resolution, optional transformation,
 * value processing, and returns an object mapping attribute names to their processed values.
 * Handles boolean attributes, value trimming, entity replacement, and grouping under a custom key if specified.
 *
 * @param {string} attributeString - The string containing attributes to extract and process.
 * @param {any} parentElement - The parent element or context, passed to value processors.
 * @param {any} additionalContext - Additional context or options, passed to value processors.
 * @returns {object|undefined} An object mapping processed attribute names to their values, possibly grouped under a custom key, or undefined if no attributes found.
 */
function extractAndProcessAttributes(attributeString, parentElement, additionalContext) {
  // If attribute parsing is disabled or input is not a string, do nothing
  if (this.options.ignoreAttributes || typeof attributeString !== "string") {
    return;
  }

  // Extract all attribute matches from the string using the configured regex
  const attributeMatches = fpA.getAllMatches(attributeString, F84);
  const totalMatches = attributeMatches.length;
  const processedAttributes = {};

  // Iterate over each matched attribute
  for (let matchIndex = 0; matchIndex < totalMatches; matchIndex++) {
    const match = attributeMatches[matchIndex];
    const rawAttributeName = match[1];
    let attributeValue = match[4];

    // Resolve namespace for the attribute name
    const resolvedAttributeName = this.resolveNameSpace(rawAttributeName);
    let processedAttributeName = this.options.attributeNamePrefix + resolvedAttributeName;

    // Only process if the resolved name is not empty
    if (resolvedAttributeName.length) {
      // Optionally transform the attribute name
      if (this.options.transformAttributeName) {
        processedAttributeName = this.options.transformAttributeName(processedAttributeName);
      }

      // Prevent prototype pollution by renaming __proto__
      if (processedAttributeName === "__proto__") {
        processedAttributeName = "#__proto__";
      }

      if (attributeValue !== undefined) {
        // Optionally trim whitespace from the value
        if (this.options.trimValues) {
          attributeValue = attributeValue.trim();
        }

        // Replace XML/HTML entities in the value
        attributeValue = this.replaceEntitiesValue(attributeValue);

        // Optionally process the attribute value using a custom processor
        const processedValue = this.options.attributeValueProcessor(
          resolvedAttributeName,
          attributeValue,
          parentElement
        );

        // If processor returns null/undefined, use the original value
        if (processedValue === null || processedValue === undefined) {
          processedAttributes[processedAttributeName] = attributeValue;
        } else if (
          typeof processedValue !== typeof attributeValue ||
          processedValue !== attributeValue
        ) {
          // If processor returns a different value, use isBlobOrFileLikeObject
          processedAttributes[processedAttributeName] = processedValue;
        } else {
          // Optionally parse the attribute value (e.g., convert to number/boolean)
          processedAttributes[processedAttributeName] = parseStringOrReturnIfExists(
            attributeValue,
            this.options.parseAttributeValue,
            this.options.numberParseOptions
          );
        }
      } else if (this.options.allowBooleanAttributes) {
        // Handle boolean attributes (attributes without a value)
        processedAttributes[processedAttributeName] = true;
      }
    }
  }

  // If no attributes were processed, return undefined
  if (!Object.keys(processedAttributes).length) {
    return;
  }

  // Optionally group all attributes under a custom key
  if (this.options.attributesGroupName) {
    const groupedAttributes = {};
    groupedAttributes[this.options.attributesGroupName] = processedAttributes;
    return groupedAttributes;
  }

  // Return the processed attributes object
  return processedAttributes;
}

module.exports = extractAndProcessAttributes;
