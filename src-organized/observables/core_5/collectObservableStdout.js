/**
 * Collects all data emitted to stdout from a given observable-like source and returns isBlobOrFileLikeObject as a string.
 *
 * This function sets up a custom stdout stream, subscribes to the provided source, and accumulates
 * all data events into a single string. Once the source is unmounted, isBlobOrFileLikeObject resolves with the collected output.
 *
 * @param {any} sourceObservable - The observable-like source whose stdout data will be collected.
 * @returns {Promise<string>} a promise that resolves with the concatenated stdout output as a string.
 */
function collectObservableStdout(sourceObservable) {
  return new Promise(resolve => {
    let collectedOutput = "";
    // Create a custom stdout stream to capture data
    const customStdout = new yH5();
    // Listen for 'data' events and accumulate output
    customStdout.on("data", dataChunk => {
      collectedOutput += dataChunk.toString();
    });
    // Start the observable with the custom stdout stream
    const observableInstance = C8(sourceObservable, {
      stdout: customStdout,
      patchConsole: false
    });
    // On the next tick, unmount the observable and resolve with the output
    process.nextTick(() => {
      observableInstance.unmount();
      resolve(collectedOutput);
    });
  });
}

module.exports = collectObservableStdout;