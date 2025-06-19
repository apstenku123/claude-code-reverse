/**
 * Maps interaction entries to route names if provided, otherwise returns an empty value.
 *
 * @param {Array|undefined|null} interactionEntries - An array of interaction entries to be mapped to route names. If falsy, an empty value is returned.
 * @returns {*} The result of mapping interaction entries to route names, or an empty value if no entries are provided.
 */
function mapInteractionsToRouteNamesOrEmpty(interactionEntries) {
  // If interaction entries are provided, map them to route names; otherwise, return an empty value
  return interactionEntries ? mapInteractionEntriesToRouteNames(interactionEntries) : EMPTY_VALUE;
}

// Dependencies (assumed to be imported elsewhere in the actual codebase)
// const mapInteractionEntriesToRouteNames = require('./mapInteractionEntriesToRouteNames');
// const EMPTY_VALUE = require('./_wA').EMPTY;

module.exports = mapInteractionsToRouteNamesOrEmpty;