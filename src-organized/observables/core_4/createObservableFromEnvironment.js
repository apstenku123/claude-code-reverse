/**
 * Creates a new observable from the given source observable using environment-specific logic.
 *
 * @param {Observable} sourceObservable - The observable to be wrapped or transformed based on the environment.
 * @returns {Observable} The resulting observable created by zf6.fromEnv.
 */
const createObservableFromEnvironment = (sourceObservable) => {
  // Delegate to zf6.fromEnv to create an environment-aware observable
  return zf6.fromEnv(sourceObservable);
};

module.exports = createObservableFromEnvironment;
