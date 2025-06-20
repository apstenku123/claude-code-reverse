/**
 * Retrieves statistics for a given source observable and processes the result.
 *
 * @param {string} sourceObservable - The identifier or reference for the source observable to retrieve statistics from.
 * @param {object} config - Configuration object to be used when processing the statistics.
 * @param {function} processResultCallback - Callback function to handle the result. Receives (error, result).
 * @returns {void}
 */
function getStatAndProcessResult(sourceObservable, config, processResultCallback) {
  // Retrieve statistics for the given sourceObservable
  Uo0.stat(sourceObservable, function (error, stats) {
    // If there is an error, pass the error and 'false' as the result
    // Otherwise, process the stats with the config using $o0 and pass the result
    const result = error ? false : $o0(stats, config);
    processResultCallback(error, result);
  });
}

module.exports = getStatAndProcessResult;