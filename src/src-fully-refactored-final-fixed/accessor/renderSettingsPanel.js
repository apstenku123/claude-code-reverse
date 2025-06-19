/**
 * Renders and manages the interactive settings panel UI for the application.
 * Handles user navigation, configuration changes, and special dialogs (theme/model/external includes).
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onClose - Callback invoked when the panel is closed, with a summary of changes.
 * @param {boolean} params.isConnectedToIde - Whether the app is connected to an IDE (enables certain options).
 * @returns {React.Element} The rendered settings panel React element.
 */
function renderSettingsPanel({ onClose, isConnectedToIde }) {
  // State for current config
  const [currentConfig, setCurrentConfig] = AA1.useState(getCachedOrFreshConfig());
  // Ref to store the config at panel open (for change comparison)
  const initialConfigRef = v9.useRef(getCachedOrFreshConfig());
  // State for currently selected option index
  const [selectedOptionIndex, setSelectedOptionIndex] = AA1.useState(0);
  // Keyboard exit helper
  const exitKeyHelper = useCtrlKeyActionHandler();
  // Global config state and updater
  const [{ mainLoopModel, todoFeatureEnabled, verbose }, updateGlobalConfig] = useAppState();
  // State for pending config changes (not yet committed)
  const [pendingConfigChanges, setPendingConfigChanges] = AA1.useState({});
  // State for currently open dialog (theme/model/externalIncludes/null)
  const [openDialog, setOpenDialog] = AA1.useState(null);
  // Whether to show the external includes dialog
  const showExternalIncludesOption = hasNonUserEntryWithParentAndValidPath();

  /**
   * Handles changing the model selection.
   * @param {string} newModel - The new model to set.
   */
  async function handleModelChange(newModel) {
    logTelemetryEventIfEnabled("tengu_config_model_changed", {
      from_model: mainLoopModel,
      to_model: newModel
    });
    updateGlobalConfig(prev => ({ ...prev, mainLoopModel: newModel }));
    setPendingConfigChanges(prev => {
      const modelValue = getResourceDescription(newModel);
      if ("model" in prev) {
        const { model, ...rest } = prev;
        return { ...rest, model: modelValue };
      }
      return { ...prev, model: modelValue };
    });
  }

  /**
   * Handles toggling verbose output.
   * @param {boolean} newValue
   */
  function handleVerboseChange(newValue) {
    updateGlobalConfig(prev => ({ ...prev, verbose: newValue }));
    setPendingConfigChanges(prev => {
      if ("verbose" in prev) {
        const { verbose, ...rest } = prev;
        return rest;
      }
      return { ...prev, verbose: newValue };
    });
  }

  /**
   * Handles toggling the todo feature.
   * @param {boolean} newValue
   */
  function handleTodoFeatureChange(newValue) {
    updateGlobalConfig(prev => ({ ...prev, todoFeatureEnabled: newValue }));
    setPendingConfigChanges(prev => {
      if ("Todo List Enabled" in prev) {
        const { "Todo List Enabled": _, ...rest } = prev;
        return rest;
      }
      return { ...prev, "Todo List Enabled": newValue };
    });
  }

  // Build the list of settings options
  const settingsOptions = [
    {
      id: "autoCompactEnabled",
      label: "Auto-compact",
      value: currentConfig.autoCompactEnabled,
      type: "boolean",
      onChange(newValue) {
        const updatedConfig = { ...getCachedOrFreshConfig(), autoCompactEnabled: newValue };
        updateProjectsAccessor(updatedConfig);
        setCurrentConfig(updatedConfig);
        logTelemetryEventIfEnabled("tengu_auto_compact_setting_changed", { enabled: newValue });
      }
    },
    {
      id: "todoFeatureEnabled",
      label: "Use todo list",
      value: todoFeatureEnabled,
      type: "boolean",
      onChange: handleTodoFeatureChange
    },
    {
      id: "verbose",
      label: "Verbose output",
      value: verbose,
      type: "boolean",
      onChange: handleVerboseChange
    },
    {
      id: "theme",
      label: "Theme",
      value: currentConfig.theme,
      type: "managedEnum",
      onChange(newValue) {
        const updatedConfig = { ...getCachedOrFreshConfig(), theme: newValue };
        updateProjectsAccessor(updatedConfig);
        setCurrentConfig(updatedConfig);
      }
    },
    {
      id: "notifChannel",
      label: "Notifications",
      value: currentConfig.preferredNotifChannel,
      options: [
        "auto",
        "iterm2",
        "terminal_bell",
        "iterm2_with_bell",
        "kitty",
        "notifications_disabled"
      ],
      type: "enum",
      onChange(newValue) {
        const updatedConfig = { ...getCachedOrFreshConfig(), preferredNotifChannel: newValue };
        updateProjectsAccessor(updatedConfig);
        setCurrentConfig(updatedConfig);
      }
    },
    {
      id: "editorMode",
      label: "Editor mode",
      value: currentConfig.editorMode === "emacs" ? "normal" : currentConfig.editorMode || "normal",
      options: ["normal", "vim"],
      type: "enum",
      onChange(newValue) {
        const updatedConfig = { ...getCachedOrFreshConfig(), editorMode: newValue };
        updateProjectsAccessor(updatedConfig);
        setCurrentConfig(updatedConfig);
        logTelemetryEventIfEnabled("tengu_editor_mode_changed", { mode: newValue, source: "config_panel" });
      }
    },
    {
      id: "model",
      label: "Model",
      value: mainLoopModel === null ? "Default (recommended)" : mainLoopModel,
      type: "managedEnum",
      onChange: handleModelChange
    },
    // IDE-specific option
    ...(isConnectedToIde
      ? [
          {
            id: "diffTool",
            label: "Diff tool",
            value: currentConfig.diffTool ?? "auto",
            options: ["terminal", "auto"],
            type: "enum",
            onChange(newValue) {
              const updatedConfig = { ...getCachedOrFreshConfig(), diffTool: newValue };
              updateProjectsAccessor(updatedConfig);
              setCurrentConfig(updatedConfig);
              logTelemetryEventIfEnabled("tengu_diff_tool_changed", { tool: newValue, source: "config_panel" });
            }
          }
        ]
      : []),
    // External includes dialog option
    ...(showExternalIncludesOption
      ? [
          {
            id: "showExternalIncludesDialog",
            label: "External CLAUDE.md includes",
            value: (() => {
              if (getProjectSubscriptionConfig().hasClaudeMdExternalIncludesApproved) return "true";
              else return "false";
            })(),
            type: "managedEnum",
            onChange() {}
          }
        ]
      : []),
    // API key option if present in env
    ...(process.env.ANTHROPIC_API_KEY
      ? [
          {
            id: "apiKey",
            label: `Use custom API key: ${FA.bold(WF(process.env.ANTHROPIC_API_KEY))}`,
            value: Boolean(
              process.env.ANTHROPIC_API_KEY &&
              currentConfig.customApiKeyResponses?.approved?.includes(WF(process.env.ANTHROPIC_API_KEY))
            ),
            type: "boolean",
            onChange(newValue) {
              const updatedConfig = { ...getCachedOrFreshConfig() };
              if (!updatedConfig.customApiKeyResponses)
                updatedConfig.customApiKeyResponses = { approved: [], rejected: [] };
              if (!updatedConfig.customApiKeyResponses.approved)
                updatedConfig.customApiKeyResponses.approved = [];
              if (!updatedConfig.customApiKeyResponses.rejected)
                updatedConfig.customApiKeyResponses.rejected = [];
              if (process.env.ANTHROPIC_API_KEY) {
                const apiKeyFingerprint = WF(process.env.ANTHROPIC_API_KEY);
                if (newValue) {
                  // Approve the key
                  updatedConfig.customApiKeyResponses.approved = [
                    ...updatedConfig.customApiKeyResponses.approved.filter(k => k !== apiKeyFingerprint),
                    apiKeyFingerprint
                  ];
                  updatedConfig.customApiKeyResponses.rejected = updatedConfig.customApiKeyResponses.rejected.filter(
                    k => k !== apiKeyFingerprint
                  );
                } else {
                  // Reject the key
                  updatedConfig.customApiKeyResponses.approved = updatedConfig.customApiKeyResponses.approved.filter(
                    k => k !== apiKeyFingerprint
                  );
                  updatedConfig.customApiKeyResponses.rejected = [
                    ...updatedConfig.customApiKeyResponses.rejected.filter(k => k !== apiKeyFingerprint),
                    apiKeyFingerprint
                  ];
                }
              }
              updateProjectsAccessor(updatedConfig);
              setCurrentConfig(updatedConfig);
            }
          }
        ]
      : [])
  ];

  // Keyboard handler for navigation and actions
  return D0((inputKey, keyState) => {
    if (keyState.escape) {
      // If a dialog is open, close isBlobOrFileLikeObject
      if (openDialog !== null) {
        setOpenDialog(null);
        return;
      }
      // Otherwise, summarize changes and close panel
      const changes = Object.entries(pendingConfigChanges).map(([key, value]) => {
        logTelemetryEventIfEnabled("tengu_config_changed", { key, value });
        return `Set ${key} to ${FA.bold(value)}`;
      });
      // Special handling for API key approval state
      const envApiKeyApproved = Boolean(
        process.env.ANTHROPIC_API_KEY &&
        initialConfigRef.current.customApiKeyResponses?.approved?.includes(WF(process.env.ANTHROPIC_API_KEY))
      );
      const currentApiKeyApproved = Boolean(
        process.env.ANTHROPIC_API_KEY &&
        currentConfig.customApiKeyResponses?.approved?.includes(WF(process.env.ANTHROPIC_API_KEY))
      );
      if (envApiKeyApproved !== currentApiKeyApproved) {
        changes.push(`${currentApiKeyApproved ? "Enabled" : "Disabled"} custom API key`);
        logTelemetryEventIfEnabled("tengu_config_changed", {
          key: "env.ANTHROPIC_API_KEY",
          value: currentApiKeyApproved
        });
      }
      // Compare other config fields for changes
      if (currentConfig.theme !== initialConfigRef.current.theme)
        changes.push(`Set theme to ${FA.bold(currentConfig.theme)}`);
      if (currentConfig.preferredNotifChannel !== initialConfigRef.current.preferredNotifChannel)
        changes.push(`Set notifications to ${FA.bold(currentConfig.preferredNotifChannel)}`);
      if (currentConfig.editorMode !== initialConfigRef.current.editorMode)
        changes.push(`Set editor mode to ${FA.bold(currentConfig.editorMode || "emacs")}`);
      if (currentConfig.diffTool !== initialConfigRef.current.diffTool)
        changes.push(`Set diff tool to ${FA.bold(currentConfig.diffTool)}`);
      if (currentConfig.autoCompactEnabled !== initialConfigRef.current.autoCompactEnabled)
        changes.push(`${currentConfig.autoCompactEnabled ? "Enabled" : "Disabled"} auto-compact`);
      if (changes.length > 0) onClose(changes.join("\n"));
      else onClose();
      return;
    }
    if (openDialog !== null) return;

    // Helper for handling selection and actions
    function handleOptionAction() {
      const selectedOption = settingsOptions[selectedOptionIndex];
      if (!selectedOption || !selectedOption.onChange) return;
      if (selectedOption.type === "boolean") {
        selectedOption.onChange(!selectedOption.value);
        return;
      }
      if (selectedOption.id === "theme" && keyState.return) {
        setOpenDialog("theme");
        return;
      }
      if (selectedOption.id === "model" && keyState.return) {
        setOpenDialog("model");
        return;
      }
      if (selectedOption.id === "showExternalIncludesDialog" && keyState.return) {
        setOpenDialog("externalIncludes");
        return;
      }
      if (selectedOption.type === "enum") {
        // Cycle through enum options
        const nextIndex = (selectedOption.options.indexOf(selectedOption.value) + 1) % selectedOption.options.length;
        selectedOption.onChange(selectedOption.options[nextIndex]);
        return;
      }
    }

    if (keyState.tab || keyState.return || inputKey === " ") {
      handleOptionAction();
      return;
    }
    if (keyState.upArrow) setSelectedOptionIndex(idx => Math.max(0, idx - 1));
    if (keyState.downArrow) setSelectedOptionIndex(idx => Math.min(settingsOptions.length - 1, idx + 1));
  }),
    v9.createElement(
      v9.Fragment,
      null,
      openDialog === "theme"
        ? v9.createElement(aH1, {
            initialTheme: currentConfig.theme,
            onThemeSelect: selectedTheme => {
              const updatedConfig = { ...currentConfig, theme: selectedTheme };
              updateProjectsAccessor(updatedConfig);
              setCurrentConfig(updatedConfig);
            },
            skipExitHandling: true
          })
        : openDialog === "model"
        ? v9.createElement(ModelSelector, {
            initial: mainLoopModel,
            onSelect: selectedModel => {
              handleModelChange(selectedModel);
              setOpenDialog(null);
            }
          })
        : openDialog === "externalIncludes"
        ? v9.createElement(ExternalIncludesApprovalDialog, {
            onDone: () => {
              setOpenDialog(null);
            }
          })
        : v9.createElement(
            v9.Fragment,
            null,
            v9.createElement(
              g,
              {
                flexDirection: "column",
                borderStyle: "round",
                borderColor: getThemeStylesheet().secondaryBorder,
                paddingX: 1,
                marginTop: 1
              },
              v9.createElement(
                g,
                { flexDirection: "column", minHeight: 2, marginBottom: 1 },
                v9.createElement(_, { bold: true }, "Settings"),
                v9.createElement(_, { dimColor: true }, "Configure ", m0, " preferences")
              ),
              settingsOptions.map((option, idx) => {
                const isSelected = idx === selectedOptionIndex;
                return v9.createElement(
                  g,
                  { key: option.id, height: 2, minHeight: 2 },
                  v9.createElement(
                    g,
                    { width: 44 },
                    v9.createElement(
                      _,
                      { color: isSelected ? "blue" : undefined },
                      isSelected ? y0.pointer : " ",
                      " ",
                      option.label
                    )
                  ),
                  v9.createElement(
                    g,
                    null,
                    option.type === "boolean"
                      ? v9.createElement(_, { color: isSelected ? "blue" : undefined }, option.value.toString())
                      : option.id === "theme"
                      ? v9.createElement(
                          _,
                          { color: isSelected ? "blue" : undefined },
                          {
                            dark: "Dark mode",
                            light: "Light mode",
                            "dark-daltonized": "Dark mode (colorblind-friendly)",
                            "light-daltonized": "Light mode (colorblind-friendly)",
                            "dark-ansi": "Dark mode (ANSI colors only)",
                            "light-ansi": "Light mode (ANSI colors only)"
                          }[option.value.toString()] || option.value.toString()
                        )
                      : v9.createElement(_, { color: isSelected ? "blue" : undefined }, option.value.toString())
                  )
                );
              })
            ),
            v9.createElement(
              g,
              { marginLeft: 3 },
              v9.createElement(
                _,
                { dimColor: true },
                exitKeyHelper.pending
                  ? v9.createElement(v9.Fragment, null, "Press ", exitKeyHelper.keyName, " again to exit")
                  : v9.createElement(
                      v9.Fragment,
                      null,
                      "↑/↓ to select · Enter/Tab/Space to change · Esc to close"
                    )
              )
            )
          )
    );
}

module.exports = renderSettingsPanel;