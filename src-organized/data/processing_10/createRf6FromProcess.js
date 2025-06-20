/**
 * Creates an Rf6 instance from the provided process source.
 *
 * @param {any} processSource - The source input to be processed by Rf6.
 * @returns {any} The result of Rf6.fromProcess using the provided process source.
 */
const createRf6FromProcess = (processSource) => {
  // Delegate the creation to Rf6'createInteractionAccessor fromProcess method
  return Rf6.fromProcess(processSource);
};

module.exports = createRf6FromProcess;