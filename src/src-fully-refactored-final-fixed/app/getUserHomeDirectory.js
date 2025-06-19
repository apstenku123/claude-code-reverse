/**
 * Retrieves the current user'createInteractionAccessor home directory path in a cross-platform manner.
 * Checks environment variables in order of precedence and falls back to a cached lookup if needed.
 *
 * @returns {string} The absolute path to the user'createInteractionAccessor home directory.
 */
function getUserHomeDirectory() {
  // Destructure environment variables for possible home directory locations
  const {
    HOME: homeEnv,
    USERPROFILE: userProfileEnv,
    HOMEPATH: homePathEnv,
    HOMEDRIVE: homeDriveEnv = `C:${M34.sep}` // Default to C: with path separator if HOMEDRIVE is not set
  } = process.env;

  // 1. Prefer the HOME environment variable (common on Unix)
  if (homeEnv) return homeEnv;

  // 2. Next, try USERPROFILE (common on Windows)
  if (userProfileEnv) return userProfileEnv;

  // 3. Next, try HOMEDRIVE + HOMEPATH (Windows fallback)
  if (homePathEnv) return `${homeDriveEnv}${homePathEnv}`;

  // 4. Fallback: Use a cached lookup based on the current user
  const currentUserKey = L34(); // Presumably returns a unique key for the current user/session
  if (!sP1[currentUserKey]) {
    // If not cached, resolve and cache the home directory
    sP1[currentUserKey] = q34.homedir();
  }
  return sP1[currentUserKey];
}

module.exports = getUserHomeDirectory;
