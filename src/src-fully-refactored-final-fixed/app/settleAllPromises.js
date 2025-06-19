/**
 * Processes an array of Promises and returns an array of result objects describing their fulfillment or rejection.
 * Each result object has a 'status' property (either 'fulfilled' or 'rejected') and either a 'value' (for fulfilled) or 'reason' (for rejected).
 *
 * @param {Array<Promise<any>>} promiseArray - An array of Promises to be settled.
 * @returns {Promise<Array<{status: string, value?: any, reason?: any}>>} a Promise that resolves to an array of result objects for each input Promise.
 */
async function settleAllPromises(promiseArray) {
  // Map each promise to a handler that returns an object describing its outcome
  const settledResults = promiseArray.map(async (singlePromise) => {
    try {
      // Await the promise and return a fulfilled result object
      return {
        status: "fulfilled",
        value: await singlePromise
      };
    } catch (error) {
      // If the promise rejects, return a rejected result object
      return {
        status: "rejected",
        reason: error
      };
    }
  });

  // Wait for all mapped handlers to complete and return the array of results
  return Promise.all(settledResults);
}

module.exports = settleAllPromises;