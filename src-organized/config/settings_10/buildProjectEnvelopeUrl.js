/**
 * Constructs the envelope URL for a given project by combining the base URL and the project updateSnapshotAndNotify.
 *
 * @param {Object} projectData - An object containing project information, including the projectId.
 * @returns {string} The full envelope URL for the specified project.
 */
function buildProjectEnvelopeUrl(projectData) {
  // buildApiBaseUrl is assumed to be a function that returns the base URL for the project
  // projectData.projectId is the unique identifier for the project
  return `${buildApiBaseUrl(projectData)}${projectData.projectId}/envelope/`;
}

module.exports = buildProjectEnvelopeUrl;