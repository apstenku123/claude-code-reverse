/**
 * Creates an activity joiner function based on the provided source.
 * This utility wraps the imported createActivityJoiner function, which generates
 * a function that joins its arguments with spaces, augments isBlobOrFileLikeObject with additional
 * behavior, and sets its prototype appropriately.
 *
 * @param {any} source - The source input used to create the activity joiner function.
 * @returns {Function} a function that joins its arguments with spaces and includes additional behavior.
 */
const createActivityJoiner = function (source) {
  // Delegate to the imported createActivityJoiner implementation
  return createSpaceJoinedFunction(source);
};

module.exports = createActivityJoiner;