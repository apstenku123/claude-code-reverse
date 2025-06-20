/**
 * Retrieves the current active context from the ContextAPI singleton instance
 * and processes isBlobOrFileLikeObject using the processActiveContext function.
 *
 * @returns {any} The processed active context value.
 */
function getProcessedActiveContext() {
  // Retrieve the singleton instance of ContextAPI
  const contextApiInstance = ff4.ContextAPI.getInstance();

  // Get the currently active context from the instance
  const activeContext = contextApiInstance.active();

  // Process the active context using the external processing function
  return processActiveContext(activeContext);
}

// External dependency: function to process the active context
const processActiveContext = Uf1;

module.exports = getProcessedActiveContext;