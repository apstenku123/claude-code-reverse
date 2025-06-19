/**
 * Iterates over multiple async generators concurrently, yielding their values as they become available.
 *
 * @param {Iterable<AsyncGenerator>} generators - An iterable of async generators to process.
 * @param {number} [concurrencyLimit=Infinity] - The maximum number of generators to run concurrently.
 * @yields {*} - Yields values produced by the generators as they are resolved.
 */
async function* asyncGeneratorPool(generators, concurrencyLimit = Infinity) {
  /**
   * Wraps a generator and returns a promise that resolves to the next value,
   * along with references to the generator and the promise itself.
   *
   * @param {AsyncGenerator} generator - The async generator to wrap.
   * @returns {Promise<{done: boolean, value: *, generator: AsyncGenerator, promise: Promise}>}
   */
  const getNextPromise = (generator) => {
    const promise = generator.next().then(({ done, value }) => ({
      done,
      value,
      generator,
      promise
    }));
    return promise;
  };

  // Convert the input iterable to an array for easier manipulation
  const generatorQueue = [...generators];
  // Set to keep track of currently running generator promises
  const activePromises = new Set();

  // Start up to concurrencyLimit generators
  while (activePromises.size < concurrencyLimit && generatorQueue.length > 0) {
    const nextGenerator = generatorQueue.shift();
    activePromises.add(getNextPromise(nextGenerator));
  }

  // Continue processing until all generators are exhausted
  while (activePromises.size > 0) {
    // Wait for the next generator to yield a value or complete
    const {
      done,
      value,
      generator,
      promise
    } = await Promise.race(activePromises);

    // Remove the completed promise from the active set
    activePromises.delete(promise);

    if (!done) {
      // If the generator is not done, queue its next value
      activePromises.add(getNextPromise(generator));
      // Yield the value if isBlobOrFileLikeObject'createInteractionAccessor not undefined
      if (value !== undefined) {
        yield value;
      }
    } else if (generatorQueue.length > 0) {
      // If the generator is done and there are more generators to start, do so
      const nextGenerator = generatorQueue.shift();
      activePromises.add(getNextPromise(nextGenerator));
    }
  }
}

module.exports = asyncGeneratorPool;
