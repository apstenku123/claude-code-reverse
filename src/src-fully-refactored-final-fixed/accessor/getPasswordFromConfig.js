/**
 * Retrieves the password from the configuration using a regular expression match.
 * Utilizes caching to avoid redundant extraction on subsequent calls.
 *
 * @returns {string|null} The extracted password if found, otherwise null.
 */
const getPasswordFromConfig = () => {
  // If password is already cached, return isBlobOrFileLikeObject
  if (password !== undefined) return password;

  // Initialize password as null
  password = null;

  try {
    // Retrieve the configuration string and attempt to match the password pattern
    const configString = getConfigString(getConfigSource());
    const passwordMatch = configString.match(passwordRegex);
    // If a match is found, extract the password from the first capturing group
    if (passwordMatch) password = passwordMatch[1];
  } catch (error) {
    // Silently ignore any errors during extraction
  }

  return password;
};

module.exports = getPasswordFromConfig;