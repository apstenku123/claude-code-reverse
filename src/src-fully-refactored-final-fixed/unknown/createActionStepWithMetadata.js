/**
 * Creates a new action step object by merging provided metadata with additional properties.
 *
 * @param {Object} metadata - Additional properties to include in the action step object.
 * @param {string} actionType - The type or name of the action being performed.
 * @param {string|number} stepKey - a unique identifier for this action step.
 * @param {number} stepIndex - The index or order of this step in a sequence.
 * @returns {Object} The merged action step object containing all provided and generated properties.
 */
function createActionStepWithMetadata(metadata, actionType, stepKey, stepIndex) {
  // Merge the provided metadata with the required action step properties
  return Object.assign({
    key: stepKey,           // Unique identifier for the step
    action: actionType,     // Type or name of the action
    step: stepIndex,        // Step index in the sequence
    timestamp: Date.now()   // Current timestamp in milliseconds
  }, metadata);
}

module.exports = createActionStepWithMetadata;