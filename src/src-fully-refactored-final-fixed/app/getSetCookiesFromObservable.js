/**
 * Retrieves and processes the set-cookie values from the provided observable.
 *
 * @param {object} sourceObservable - The observable object that provides set-cookie values.
 * @returns {Array<any>} An array of processed set-cookie values, or an empty array if none are found.
 */
function getSetCookiesFromObservable(sourceObservable) {
  // Ensure the function is called with exactly one argument and validate the object'createInteractionAccessor brand/type
  S6.argumentLengthCheck(arguments, 1, "getSetCookies");
  S6.brandCheck(sourceObservable, eY1, { strict: false });

  // Retrieve the set-cookie configuration from the observable
  const setCookieConfig = sourceObservable.getSetCookie();

  // If no set-cookie values are present, return an empty array
  if (!setCookieConfig) {
    return [];
  }

  // Map each set-cookie value through the YE6 transformation function
  return setCookieConfig.map(subscription => YE6(subscription));
}

module.exports = getSetCookiesFromObservable;