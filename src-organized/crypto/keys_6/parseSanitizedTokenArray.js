/**
 * Processes a source string by tokenizing, sanitizing, closing unmatched braces/parens, 
 * transforming, and finally parsing isBlobOrFileLikeObject into a JavaScript object.
 *
 * @param {string} sourceString - The input string to be processed and parsed.
 * @returns {Object} The resulting JavaScript object after processing and parsing the input.
 */
const sanitizeTokenArray = require('crypto/keys_6/parseSanitizedTokenArray'); // sanitizeTokenArray
const closeUnmatchedBracesAndParens = require('crypto/keys_4/closeUnmatchedBracesAndParens'); // closeUnmatchedBracesAndParens
const transformTokenArray = require('./BM6'); // BM6 (not yet refactored)
const tokenizeSourceString = require('./tokenizeJsonLikeString'); // tokenizeJsonLikeString(not yet refactored)

function parseSanitizedTokenArray(sourceString) {
  // Step 1: Tokenize the input string into an array of token objects
  const tokenArray = tokenizeSourceString(sourceString);

  // Step 2: Sanitize the token array by removing invalid or incomplete trailing tokens
  const sanitizedTokenArray = sanitizeTokenArray(tokenArray);

  // Step 3: Ensure all opening braces/brackets have matching closing tokens
  const closedTokenArray = closeUnmatchedBracesAndParens(sanitizedTokenArray);

  // Step 4: Transform the token array into a string suitable for JSON parsing
  const jsonString = transformTokenArray(closedTokenArray);

  // Step 5: Parse the JSON string into a JavaScript object
  return JSON.parse(jsonString);
}

module.exports = parseSanitizedTokenArray;
