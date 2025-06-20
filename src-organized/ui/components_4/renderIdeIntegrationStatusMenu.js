/**
 * Renders the IDE Integration Status Menu component, gathering and displaying
 * various status sections related to IDE integration, MCP servers, and installation state.
 *
 * @param {Object} props - The properties for the component.
 * @param {Function} props.onClose - Callback function to invoke when the menu is closed.
 * @param {string} props.ideInstallationStatus - Current IDE installation status string.
 * @returns {React.Element} The rendered IDE Integration Status Menu component.
 */
function renderIdeIntegrationStatusMenu({
  onClose,
  ideInstallationStatus
}) {
  // Retrieve MCP context (assumed to provide clients and related info)
  const [mcpContext] = useAppState();

  // State for the menu sections to display
  const [menuSections, setMenuSections] = uK.useState([]);

  // Static version info
  const VERSION = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  }.VERSION;

  // Gather all status sections when dependencies change
  uK.useEffect(() => {
    async function gatherStatusSections() {
      // Await recent input entries aggregation
      const recentInputEntries = await initializeSyntaxHighlighting$();
      const sections = [];

      // Add section from getWorkingDirectoryInfo if available
      const mz5Section = getWorkingDirectoryInfo();
      if (mz5Section) sections.push(mz5Section);

      // If there are recent input entries, add getInstallationItems section
      if (recentInputEntries) {
        const dz5Section = await getInstallationItems();
        if (dz5Section) sections.push(dz5Section);
      }

      // Add IDE integration status section
      const ideIntegrationStatusSection = buildIdeIntegrationStatus(mcpContext.mcp.clients, ideInstallationStatus);
      if (ideIntegrationStatusSection) sections.push(ideIntegrationStatusSection);

      // Add MCP server menu config section
      const mcpServerMenuConfigSection = gz5(mcpContext.mcp.clients);
      if (mcpServerMenuConfigSection) sections.push(mcpServerMenuConfigSection);

      // Add getAccountInfoSummary and getApiConfigurationInfo sections if available
      const uz5Section = getAccountInfoSummary();
      const pz5Section = getApiConfigurationInfo();
      if (uz5Section) sections.push(uz5Section);
      if (pz5Section) sections.push(pz5Section);

      // Add generateMemoryDiagnostics section if available
      const hz5Section = generateMemoryDiagnostics();
      if (hz5Section) sections.push(hz5Section);

      // Update state with all gathered sections
      setMenuSections(sections);
    }
    gatherStatusSections();
  }, [mcpContext.mcp.clients, ideInstallationStatus]);

  // Render the menu component with gathered sections and version info
  return uK.createElement(StatusPanel, {
    sections: menuSections,
    version: VERSION,
    onClose: onClose
  });
}

module.exports = renderIdeIntegrationStatusMenu;