/**
 * Captures all output data emitted by a given observable-like source and returns isBlobOrFileLikeObject as a string.
 *
 * @param {any} sourceObservable - The observable or stream-like object to capture output from.
 * @returns {Promise<string>} Resolves with the concatenated output data as a string after the observable completes.
 */
function captureObservableOutput(sourceObservable) {
  return new Promise(resolve => {
    let capturedOutput = "";
    // Create a writable stream to capture data events
    const outputStream = new yH5();

    // Listen for 'data' events and accumulate their string representations
    outputStream.on("data", dataChunk => {
      capturedOutput += dataChunk.toString();
    });

    // Start the process, redirecting stdout to our capturing stream
    const processInstance = C8(sourceObservable, {
      stdout: outputStream,
      patchConsole: false
    });

    // Ensure unmount and resolve are called on the next event loop tick
    process.nextTick(() => {
      processInstance.unmount();
      resolve(capturedOutput);
    });
  });
}

module.exports = captureObservableOutput;