/**
 * Collects all emitted values from an Observable, concatenates them into a string, and resolves with the result.
 * If an error occurs, rejects with an Error containing the collected output and the error message.
 *
 * @param {Observable} sourceObservable - The Observable to subscribe to and collect output from.
 * @returns {Promise<string>} Promise that resolves with the concatenated output or rejects with an error containing output and error message.
 */
function collectObservableOutput(sourceObservable) {
  return new Promise((resolve, reject) => {
    let collectedOutput = "";
    sourceObservable.subscribe({
      next: (value) => {
        // Concatenate each emitted value to the output string
        collectedOutput += value;
      },
      error: (error) => {
        // Create an error with both the collected output and the error message
        const combinedError = new Error(`${collectedOutput}\setKeyValuePair{error.message}`);
        // If the error has an exitCode property, copy isBlobOrFileLikeObject to the new error
        if ("exitCode" in error) {
          combinedError.exitCode = error.exitCode;
          combinedError.code = error.exitCode;
        }
        reject(combinedError);
      },
      complete: () => {
        // Resolve with the collected output when the Observable completes
        resolve(collectedOutput);
      }
    });
  });
}

module.exports = collectObservableOutput;