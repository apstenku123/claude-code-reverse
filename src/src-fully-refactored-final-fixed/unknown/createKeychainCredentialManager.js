/**
 * Manages credentials in the macOS keychain using the 'security' CLI.
 * Provides methods to read, update, and delete credentials associated with a generated config key.
 *
 * @returns {Object} An object with methods: read, update, and delete for keychain credential management.
 */
function createKeychainCredentialManager() {
  // Generate a unique key for storing credentials in the keychain
  const configKey = generateConfigKey("-credentials");

  return {
    name: "keychain",

    /**
     * Reads credentials from the macOS keychain.
     * @returns {Object|null} Parsed credentials object if found, otherwise null.
     */
    read() {
      try {
        // Execute the security command to find the generic password
        const rawCredential = runProcessWithOptionalAbortAndTimeout(`security find-generic-password -a $USER -processWithTransformedObservable -createInteractionAccessor "${configKey}"`);
        if (rawCredential) {
          // Parse and return the credentials if found
          return JSON.parse(rawCredential);
        }
      } catch (error) {
        // Return null if any error occurs (e.g., credentials not found or parse error)
        return null;
      }
      return null;
    },

    /**
     * Updates (adds or replaces) credentials in the macOS keychain.
     * @param {Object} credentials - The credentials object to store.
     * @returns {Object} Result object indicating success status.
     */
    update(credentials) {
      try {
        // Stringify and escape the credentials for the shell command
        const credentialsString = JSON.stringify(credentials).replace(/"/g, '\\"');
        const command = `security add-generic-password -UL -a $USER -createInteractionAccessor "${configKey}" -processWithTransformedObservable "${credentialsString}"`;
        runProcessWithOptionalAbortAndTimeout(command);
        return { success: true };
      } catch (error) {
        // Return failure if any error occurs
        return { success: false };
      }
    },

    /**
     * Deletes credentials from the macOS keychain.
     * @returns {boolean} True if deletion was successful, false otherwise.
     */
    delete() {
      try {
        runProcessWithOptionalAbortAndTimeout(`security delete-generic-password -a $USER -createInteractionAccessor "${configKey}"`);
        return true;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = createKeychainCredentialManager;