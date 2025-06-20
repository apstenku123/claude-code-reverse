/**
 * Registers an admin data service using the provided service and configuration.
 *
 * @param {Object} adminService - The admin service object to be registered.
 * @param {Object} serviceConfig - The configuration object for the admin service.
 * @returns {void}
 *
 * This function acts as a wrapper for TB6.registerAdminService, making the registration
 * process more explicit and maintainable.
 */
function registerAdminDataService(adminService, serviceConfig) {
  // Register the admin service with the provided configuration
  TB6.registerAdminService(adminService, serviceConfig);
}

module.exports = registerAdminDataService;