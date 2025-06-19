/**
 * Creates a new action step object by merging the provided base properties with additional metadata.
 *
 * @param {Object} baseProperties - The base properties to include in the resulting object.
 * @param {string} actionType - The type or name of the action being performed.
 * @param {string|number} stepKey - a unique key or identifier for this step.
 * @param {number} stepIndex - The index or order of the step in a sequence.
 * @returns {Object} The merged object containing all properties and a current timestamp.
 */
function createActionStepWithTimestamp(baseProperties, actionType, stepKey, stepIndex) {
  // Merge the base properties with action metadata and a timestamp
  return Object.assign({
    key: stepKey,
    action: actionType,
    step: stepIndex,
    timestamp: Date.now() // Current time in milliseconds
  }, baseProperties);
}

module.exports = createActionStepWithTimestamp;