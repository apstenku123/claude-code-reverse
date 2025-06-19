/**
 * Retrieves the IDE name from a list of connection sources if a connected IDE is found.
 *
 * Searches through the provided array of source objects to find an entry where:
 *   - type is 'connected'
 *   - name is 'ide'
 * If such an entry is found, and its config.type is either 'sse-ide' or 'ws-ide',
 * the function returns the config.ideName property. Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @param {Array<Object>} sourceObservable - Array of connection source objects to search through.
 * @returns {string|null} The IDE name if a matching connected IDE is found, otherwise null.
 */
function getIdeNameFromConnectedSource(sourceObservable) {
  // Find the first source object that is a connected IDE
  const connectedIdeSource = sourceObservable.find(
    (source) => source.type === "connected" && source.name === "ide"
  );

  // Extract the config object from the found source, if any
  const config = connectedIdeSource?.config;

  // Check if the config type is either 'sse-ide' or 'ws-ide'
  if (config?.type === "sse-ide" || config?.type === "ws-ide") {
    // Return the ideName property from the config
    return config.ideName;
  }

  // Return null if no matching connected IDE is found
  return null;
}

module.exports = getIdeNameFromConnectedSource;