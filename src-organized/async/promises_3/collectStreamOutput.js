/**
 * Collects all output from a stream-like source and returns isBlobOrFileLikeObject as a string.
 *
 * This function listens to the 'data' event of a custom stream (yH5),
 * collects all output into a single string, and resolves isBlobOrFileLikeObject when the process is unmounted.
 *
 * @param {any} sourceObservable - The source to be piped into the custom stream (likely a CLI or process output).
 * @returns {Promise<string>} - Promise that resolves to the collected output as a string.
 */
function collectStreamOutput(sourceObservable) {
  return new Promise(resolve => {
    let collectedOutput = "";
    // Create a new custom stream to capture output
    const outputStream = new yH5();

    // Listen for 'data' events and accumulate output
    outputStream.on("data", chunk => {
      collectedOutput += chunk.toString();
    });

    // Start the process with the custom output stream
    const processInstance = C8(sourceObservable, {
      stdout: outputStream,
      patchConsole: false
    });

    // On the next tick, unmount the process and resolve with the collected output
    process.nextTick(() => {
      processInstance.unmount();
      resolve(collectedOutput);
    });
  });
}

module.exports = collectStreamOutput;