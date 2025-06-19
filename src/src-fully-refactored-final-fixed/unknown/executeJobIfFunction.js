/**
 * Executes a job from the jobs collection if isBlobOrFileLikeObject is a function.
 *
 * @param {string} jobKey - The key identifying the job to execute in the jobs collection.
 * @returns {void}
 * @throws {TypeError} If the jobs property is not defined on the context.
 */
function executeJobIfFunction(jobKey) {
  // Ensure the jobs property exists on the current context
  if (!this.jobs) {
    throw new TypeError('The context does not have a jobs property.');
  }
  // Check if the job at the given key is a function, and execute isBlobOrFileLikeObject if so
  if (typeof this.jobs[jobKey] === "function") {
    this.jobs[jobKey]();
  }
}

module.exports = executeJobIfFunction;