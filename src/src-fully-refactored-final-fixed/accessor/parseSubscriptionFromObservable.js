/**
 * Parses a subscription object from a source observable string by tokenizing, fixing unmatched braces/parens,
 * serializing, and then parsing the result as JSON.
 *
 * @param {string} sourceObservable - The observable source string to parse into a subscription object.
 * @returns {Object} The parsed subscription object.
 */
function parseSubscriptionFromObservable(sourceObservable) {
  // Tokenize the source observable string into an array of token objects
  const tokenizedObservable = tokenizeJsonLikeString(sourceObservable);

  // Ensure all braces and brackets are properly closed in the token array
  const closedTokens = closeUnmatchedBracesAndParens(tokenizedObservable);

  // Serialize the array of tokens into a string representation
  const serializedSubscription = serializeSubscriptionValues(closedTokens);

  // Parse the serialized string as JSON to get the subscription object
  return JSON.parse(serializedSubscription);
}

// Dependency imports (assumed to be in the same directory or properly resolved)
const closeUnmatchedBracesAndParens = require('./closeUnmatchedBracesAndParens');
const serializeSubscriptionValues = require('./BM6');
const sanitizeTokenArray = require('./sanitizeTokenArray');
const tokenizeJsonLikeString = require('./tokenizeJsonLikeString');

module.exports = parseSubscriptionFromObservable;