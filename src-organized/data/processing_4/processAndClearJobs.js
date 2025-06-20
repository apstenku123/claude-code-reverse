/**
 * Iterates over all job keys in the provided context'createInteractionAccessor `jobs` object,
 * invoking the `executeJobIfFunction` function for each key with the context bound to the provided object.
 * After processing all jobs, clears the `jobs` object.
 *
 * @param {Object} context - The object containing a `jobs` property (an object of jobs).
 * @returns {void}
 */
function processAndClearJobs(context) {
  // Iterate over each job key in the jobs object
  Object.keys(context.jobs).forEach(
    // Call executeJobIfFunction for each job key, binding 'this' to the context
    executeJobIfFunction.bind(context)
  );

  // Clear all jobs after processing
  context.jobs = {};
}

module.exports = processAndClearJobs;