/**
 * Checks if the provided function reference is strictly equal to the noop utility function.
 *
 * @param {Function} candidateFunction - The function to compare against the noop utility.
 * @returns {boolean} True if the candidateFunction is the noop function; otherwise, false.
 */
const mapInteractionsToRoutes = require('utils/array/mapInteractionsToRoutes'); // Dependency (not used here, but contextually present)
const noop = require('./noop'); // The noop utility function

function isNoopFunction(candidateFunction) {
  // Strictly compare the provided function to the noop utility
  return candidateFunction === noop;
}

module.exports = isNoopFunction;
