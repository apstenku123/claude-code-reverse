/**
 * Processes the provided observable source, logs the resulting configuration, and hides the terminal cursor.
 *
 * @async
 * @param {any} sourceObservable - The observable or input to be processed by collectObservableStdout.
 * @returns {Promise<void>} Resolves when processing and logging are complete.
 */
async function processAndHideCursor(sourceObservable) {
  // Await the result of processing the source observable
  const config = await collectObservableStdout(sourceObservable);
  
  // Log the resulting configuration to the console
  console.log(config);
  
  // Hide the terminal cursor using ANSI escape code
  process.stdout.write("\x1B[?25l");
}

module.exports = processAndHideCursor;