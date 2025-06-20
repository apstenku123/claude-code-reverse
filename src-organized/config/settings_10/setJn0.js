/**
 * Sets the Jn0 accessor by applying the getAgentConfigFilePath transformation to the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to set or update.
 * @param {Object} config - The configuration object to be transformed and applied.
 * @returns {void}
 */
function setAgentConfigFilePath(sourceObservable, config) {
  // Transform the configuration using the getAgentConfigFilePath function before passing to Jn0
  Jn0(sourceObservable, getAgentConfigFilePath(config));
}

module.exports = setAgentConfigFilePath;