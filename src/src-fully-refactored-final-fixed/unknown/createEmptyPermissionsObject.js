/**
 * Creates and returns a permissions object with empty allow and deny lists.
 *
 * @returns {Object} An object containing empty 'allow' and 'deny' arrays within a 'permissions' property.
 */
function createEmptyPermissionsObject() {
  // Initialize the permissions object with empty allow and deny arrays
  const permissions = {
    allow: [],
    deny: []
  };

  // Return the permissions object wrapped in a parent object
  return {
    permissions
  };
}

module.exports = createEmptyPermissionsObject;