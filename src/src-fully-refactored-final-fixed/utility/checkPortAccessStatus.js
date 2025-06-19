/**
 * Determines if access to a port is blocked or allowed based on the provided observable.
 *
 * @param {any} sourceObservable - The observable or source object to check port access for.
 * @returns {string} Returns "blocked" if the port is restricted, otherwise "allowed".
 */
function checkPortAccessStatus(sourceObservable) {
  // Extract configuration or connection details from the observable
  const config = getLastUrlFromList(sourceObservable);

  // Check if the config is valid and if the port is in the blocked ports set
  if (isHttpOrHttpsProtocol(config) && XF6.has(config.port)) {
    return "blocked";
  }

  // If not blocked, access is allowed
  return "allowed";
}

module.exports = checkPortAccessStatus;