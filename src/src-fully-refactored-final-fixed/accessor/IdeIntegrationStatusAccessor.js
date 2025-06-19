/**
 * Renders the IDE Integration Status modal, gathering and displaying various status sections.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {Object} props.ideInstallationStatus - Current IDE installation status object.
 * @returns {React.ReactElement} The IDE Integration Status modal component.
 */
function IdeIntegrationStatusAccessor({
  onClose,
  ideInstallationStatus
}) {
  // Retrieve the MCP context (e.g., main control panel or similar)
  const [mcpContext] = useAppState();

  // State to hold the list of status sections to display in the modal
  const [statusSections, setStatusSections] = uK.useState([]);

  // Static metadata for the modal (version, URLs, etc.)
  const MODAL_METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };
  const modalVersion = MODAL_METADATA.VERSION;

  // Effect: Gather all status sections when dependencies change
  uK.useEffect(() => {
    /**
     * Asynchronously gathers all status sections and updates state.
     */
    async function gatherStatusSections() {
      // Fetch recent input entries (e.g., recent IDE events)
      const recentInputEntries = await initializeSyntaxHighlighting$();
      const sections = [];

      // Add section for miscellaneous status, if available
      const miscStatusSection = getWorkingDirectoryInfo();
      if (miscStatusSection) sections.push(miscStatusSection);

      // If there are recent input entries, process and add their section
      if (recentInputEntries) {
        const recentInputSection = await getInstallationItems();
        if (recentInputSection) sections.push(recentInputSection);
      }

      // Add IDE integration status section
      const ideIntegrationStatusSection = buildIdeIntegrationStatus(mcpContext.mcp.clients, ideInstallationStatus);
      if (ideIntegrationStatusSection) sections.push(ideIntegrationStatusSection);

      // Add additional status sections from other helpers
      const generalStatusSection = gz5(mcpContext.mcp.clients);
      if (generalStatusSection) sections.push(generalStatusSection);

      const userStatusSection = getAccountInfoSummary();
      const projectStatusSection = getApiConfigurationInfo();
      if (userStatusSection) sections.push(userStatusSection);
      if (projectStatusSection) sections.push(projectStatusSection);

      const healthStatusSection = generateMemoryDiagnostics();
      if (healthStatusSection) sections.push(healthStatusSection);

      // Update state with all gathered sections
      setStatusSections(sections);
    }

    gatherStatusSections();
  }, [mcpContext.mcp.clients, ideInstallationStatus]);

  // Render the modal with all status sections
  return uK.createElement(StatusPanel, {
    sections: statusSections,
    version: modalVersion,
    onClose
  });
}

module.exports = IdeIntegrationStatusAccessor;