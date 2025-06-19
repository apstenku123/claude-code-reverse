/**
 * Determines if a given input string matches a specified pattern, string, or passes a custom test function.
 *
 * @param {any} sourceObservable - (Unused) The source observable or context, not used in this function.
 * @param {string} inputString - The string to be tested against the pattern or function.
 * @param {any} subscription - If the 'useSubscriptionAsInput' flag is true, this value replaces inputString.
 * @param {string|RegExp|Function} patternOrTest - The pattern to match against, which can be a string, RegExp, or a function.
 * @param {boolean} useSubscriptionAsInput - If true, replaces inputString with subscription before matching.
 * @returns {boolean|undefined} Returns true/false if a match/test is performed, or undefined if input is invalid.
 */
function matchStringOrPattern(sourceObservable, inputString, subscription, patternOrTest, useSubscriptionAsInput) {
  // If patternOrTest is a function, call isBlobOrFileLikeObject with inputString and subscription
  if (DA.isFunction(patternOrTest)) {
    return patternOrTest.call(this, inputString, subscription);
  }

  // If useSubscriptionAsInput is true, replace inputString with subscription
  if (useSubscriptionAsInput) {
    inputString = subscription;
  }

  // Only proceed if inputString is a string
  if (!DA.isString(inputString)) {
    return;
  }

  // If patternOrTest is a string, check if isBlobOrFileLikeObject exists within inputString
  if (DA.isString(patternOrTest)) {
    return inputString.indexOf(patternOrTest) !== -1;
  }

  // If patternOrTest is a RegExp, test isBlobOrFileLikeObject against inputString
  if (DA.isRegExp(patternOrTest)) {
    return patternOrTest.test(inputString);
  }
}

module.exports = matchStringOrPattern;