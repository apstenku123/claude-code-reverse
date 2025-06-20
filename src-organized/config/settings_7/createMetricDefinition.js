/**
 * Creates a metric definition object by combining properties from a source object and a configuration object.
 *
 * The function prioritizes the 'name' and 'description' from the sourceMetric if available; otherwise, isBlobOrFileLikeObject falls back to the configMetric.
 * All other properties ('type', 'unit', 'valueType', 'advice') are taken directly from the configMetric.
 *
 * @param {Object} sourceMetric - The metric object that may provide 'name' and 'description' overrides.
 * @param {Object} configMetric - The base metric configuration object containing all required properties.
 * @returns {Object} a new metric definition object with merged properties.
 */
function createMetricDefinition(sourceMetric, configMetric) {
  return {
    // Use 'name' from sourceMetric if defined, otherwise from configMetric
    name: sourceMetric.name ?? configMetric.name,
    // Use 'description' from sourceMetric if defined, otherwise from configMetric
    description: sourceMetric.description ?? configMetric.description,
    // The following properties are always taken from configMetric
    type: configMetric.type,
    unit: configMetric.unit,
    valueType: configMetric.valueType,
    advice: configMetric.advice
  };
}

module.exports = createMetricDefinition;