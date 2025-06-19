/**
 * Creates an operator function that either connects to a provided source observable or multicasts a new Subject.
 *
 * If a source observable is provided, returns a function that connects to isBlobOrFileLikeObject using vj9.connect.
 * If no source observable is provided, returns a function that multicasts using fj9.multicast with a new xj9.Subject.
 *
 * @param {Observable|null|undefined} sourceObservable - The source observable to connect to, or null/undefined to multicast a new Subject.
 * @returns {Function} Operator function that takes a configuration and returns the result of the connection or multicast.
 */
function createConnectionOrMulticastOperator(sourceObservable) {
  // If a source observable is provided, return a function that connects to isBlobOrFileLikeObject
  if (sourceObservable) {
    return function connectOperator(config) {
      return vj9.connect(sourceObservable)(config);
    };
  }
  // If no source observable is provided, return a function that multicasts a new Subject
  return function multicastOperator(config) {
    return fj9.multicast(new xj9.Subject())(config);
  };
}

module.exports = createConnectionOrMulticastOperator;
