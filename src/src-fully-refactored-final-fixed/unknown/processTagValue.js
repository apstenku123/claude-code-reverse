/**
 * Processes and transforms a tag value based on parser options and processors.
 *
 * @param {string} tagValue - The value of the tag to process.
 * @param {string} tagName - The name of the tag being processed.
 * @param {object} parentTag - The parent tag object (context for processing).
 * @param {boolean} isValueTrimmed - Indicates if the value has already been trimmed.
 * @param {object} attributeMap - Map of tag attributes (if any).
 * @param {object} jPath - The JSON path or location of the tag.
 * @param {boolean} skipEntityReplacement - If true, skips entity replacement in the value.
 * @returns {any} The processed tag value, possibly transformed or parsed.
 */
function processTagValue(
  tagValue,
  tagName,
  parentTag,
  isValueTrimmed,
  attributeMap,
  jPath,
  skipEntityReplacement
) {
  // If tagValue is undefined, return undefined
  if (tagValue !== undefined) {
    // Optionally trim the value if trimValues is enabled and value is not already trimmed
    if (this.options.trimValues && !isValueTrimmed) {
      tagValue = tagValue.trim();
    }

    // Only process non-empty values
    if (tagValue.length > 0) {
      // Optionally replace entities in the value unless skipping is requested
      if (!skipEntityReplacement) {
        tagValue = this.replaceEntitiesValue(tagValue);
      }

      // Apply the tag value processor function
      const processedValue = this.options.tagValueProcessor(
        tagName,
        tagValue,
        parentTag,
        attributeMap,
        jPath
      );

      // If the processor returns null or undefined, return the original value
      if (processedValue === null || processedValue === undefined) {
        return tagValue;
      }
      // If the processor returns a different value or type, return isBlobOrFileLikeObject
      else if (typeof processedValue !== typeof tagValue || processedValue !== tagValue) {
        return processedValue;
      }
      // If trimValues is enabled, parse the value
      else if (this.options.trimValues) {
        return parseStringOrReturnIfExists(tagValue, this.options.parseTagValue, this.options.numberParseOptions);
      }
      // If the value is already trimmed, parse isBlobOrFileLikeObject
      else if (tagValue.trim() === tagValue) {
        return parseStringOrReturnIfExists(tagValue, this.options.parseTagValue, this.options.numberParseOptions);
      }
      // Otherwise, return the original value
      else {
        return tagValue;
      }
    }
  }
}

module.exports = processTagValue;