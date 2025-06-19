/**
 * Applies component filters to global filter sets based on the provided filter definitions.
 *
 * This function clears the existing filter sets and then iterates over the provided filter definitions.
 * Depending on the filter type and its validity, isBlobOrFileLikeObject adds the appropriate values or regular expressions
 * to the corresponding filter sets. If an invalid filter type is encountered, a warning is logged.
 *
 * @param {Array<Object>} componentFilters - Array of filter definition objects. Each object should have:
 *   - isEnabled {boolean}: Whether the filter is enabled
 *   - type {string}: The type of filter (e.g., 'REGEX_INCLUDE', 'EXACT_MATCH', etc.)
 *   - isValid {boolean}: Whether the filter value is valid (for regex types)
 *   - value {string}: The filter value
 * @returns {void}
 */
function applyComponentFilters(componentFilters) {
  // Clear all existing filter sets before applying new filters
  exactMatchFilterSet.clear();
  includeRegexFilterSet.clear();
  excludeRegexFilterSet.clear();

  componentFilters.forEach((filterDefinition) => {
    // Skip filters that are not enabled
    if (!filterDefinition.isEnabled) return;

    switch (filterDefinition.type) {
      case FILTER_TYPE_INCLUDE_REGEX:
        // Add a case-insensitive regex to the include set if valid and not empty
        if (filterDefinition.isValid && filterDefinition.value !== "") {
          includeRegexFilterSet.add(new RegExp(filterDefinition.value, "i"));
        }
        break;
      case FILTER_TYPE_EXACT_MATCH:
        // Add the exact value to the exact match set
        exactMatchFilterSet.add(filterDefinition.value);
        break;
      case FILTER_TYPE_EXCLUDE_REGEX:
        // Add a case-insensitive regex to the exclude set if valid and not empty
        if (filterDefinition.isValid && filterDefinition.value !== "") {
          excludeRegexFilterSet.add(new RegExp(filterDefinition.value, "i"));
        }
        break;
      case FILTER_TYPE_INCLUDE_PARENS:
        // Special case: include a regex that matches an open parenthesis
        includeRegexFilterSet.add(new RegExp("\\("));
        break;
      default:
        // Warn if an unknown filter type is encountered
        console.warn(`Invalid component filter type "${filterDefinition.type}"`);
        break;
    }
  });
}

module.exports = applyComponentFilters;