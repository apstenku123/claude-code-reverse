const { Command, Option } = require('commander');

// Application name constant
const m0 = 'Claude Code';

// Stub functions - TODO: Import from actual modules
const checkAndUpdateCliVersion = async () => {
  console.log('Checking for updates...');
  console.log('Claude Code is up to date.');
  process.exit(0);
};

/**
 * Initializes and configures the Claude CLI application, including all commands, options, and subcommands.
 * Handles the main interactive session, configuration management, MCP server management, migration, doctor, and update commands.
 *
 * @async
 * @returns {Promise<Command>} The configured CLI application instance.
 */
async function initializeClaudeCli() {
  // Initialize terminal and environment
  // TU5(); // TODO: Find what this function should be

  // Create the main CLI command instance
  const cli = new Command();

  // Main 'claude' command setup
  cli
    .name("claude")
    .description(`${m0} - starts an interactive session by default, use "-p/--print" for non-interactive output`)
    .argument("[prompt]", "Your prompt", String)
    .helpOption("-h, --help", "Display help for command")
    .option("-d, --debug", "Enable debug mode", () => true)
    .option("--verbose", "Override verbose mode setting from config", () => true)
    .option("-p, --print", "Print response and exit (useful for pipes)", () => true)
    .addOption(
      new Option(
        "--output-format <format>",
        'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)'
      ).choices(["text", "json", "stream-json"])
    )
    .addOption(
      new Option(
        "--input-format <format>",
        'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)'
      ).choices(["text", "stream-json"])
    )
    .option(
      "--mcp-debug",
      "[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)",
      () => true
    )
    .option(
      "--dangerously-skip-permissions",
      "Bypass all permission checks. Recommended only for sandboxes with no internet access.",
      () => true
    )
    .addOption(
      new Option(
        "--max-turns <turns>",
        "Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)"
      )
        .argParser(Number)
        .hideHelp()
    )
    .option(
      "--allowedTools <tools...>",
      'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")'
    )
    .option(
      "--disallowedTools <tools...>",
      'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")'
    )
    .option(
      "--mcp-config <file or string>",
      "Load MCP servers from a JSON file or string"
    )
    .addOption(
      new Option(
        "--permission-prompt-tool <tool>",
        "MCP tool to use for permission prompts (only works with --print)"
      )
        .argParser(String)
        .hideHelp()
    )
    .addOption(
      new Option(
        "--system-prompt <prompt>",
        "System prompt to use for the session  (only works with --print)"
      )
        .argParser(String)
        .hideHelp()
    )
    .addOption(
      new Option(
        "--append-system-prompt <prompt>",
        "Append a system prompt to the default system prompt (only works with --print)"
      )
        .argParser(String)
        .hideHelp()
    )
    .addOption(
      new Option(
        "--permission-mode <mode>",
        "Permission mode to use for the session (only works with --print)"
      )
        .argParser(String)
        .hideHelp()
        .choices(["default", "acceptEdits", "bypassPermissions"])
    )
    .option(
      "-c, --continue",
      "Continue the most recent conversation",
      () => true
    )
    .option(
      "-r, --resume [sessionId]",
      "Resume a conversation - provide a session updateSnapshotAndNotify or interactively select a conversation to resume",
      sessionId => sessionId || true
    )
    .option(
      "--model <model>",
      "Model for the current session. Provide an alias for the latest model (e.g. 'sonnet' or 'opus') or a model's full name (e.g. 'claude-sonnet-4-20250514')."
    )
    .option(
      "--add-dir <directories...>",
      "Additional directories to allow tool access to (must be absolute paths)"
    )
    .action(async (prompt, options) => {
      // Destructure options with defaults
      const {
        debug = false,
        verbose = false,
        print: printMode,
        dangerouslySkipPermissions,
        allowedTools = [],
        disallowedTools = [],
        mcpConfig,
        outputFormat,
        inputFormat,
        permissionMode,
        addDir = []
      } = options;

      // Determine if running in print (non-interactive) mode
      const isPrintMode = printMode ?? !process.stdout.isTTY;
      setNonInteractiveSessionFlag(isPrintMode);

      // Build permission context
      const permissionModeContext = getPermissionMode({
        permissionModeCli: permissionMode,
        dangerouslySkipPermissions
      });

      let dynamicMcpConfig = undefined;
      // Parse MCP config if provided
      if (mcpConfig) {
        try {
          const parsedConfig = f8(mcpConfig);
          if (parsedConfig) {
            const validation = vb.safeParse(parsedConfig);
            if (!validation.success) {
              const errorMsg = validation.error.errors
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");
              throw new Error(`Invalid MCP configuration: ${errorMsg}`);
            }
            dynamicMcpConfig = validation.data.mcpServers;
          } else {
            const configString = qU5(mcpConfig);
            dynamicMcpConfig = loadAndValidateMcpConfig(configString).mcpServers;
          }
        } catch (err) {
          console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
          process.exit(1);
        }
      }

      // Interactive login if not in print mode
      if (!isPrintMode) {
        const loginResult = await runInitialAppSetupFlow(permissionModeContext);
        if (loginResult && prompt?.trim().toLowerCase() === "/login") prompt = "";
        if (!loginResult) checkAndSyncDataSharingStatus();
      }

      // Build tool permission context and collect warnings
      const {
        toolPermissionContext,
        warnings
      } = buildToolPermissionContext({
        allowedToolsCli: allowedTools,
        disallowedToolsCli: disallowedTools,
        permissionMode: permissionModeContext,
        addDirs: addDir
      });
      // Print warnings if any
      warnings.forEach(warning => {
        console.error(warning);
      });

      // Additional setup
      checkMinimumVersionRequirement();
      Jr1(dynamicMcpConfig);

      // Validate input/output formats
      if (inputFormat && inputFormat !== "text" && inputFormat !== "stream-json") {
        console.error(`Error: Invalid input format "${inputFormat}".`);
        process.exit(1);
      }
      if (inputFormat === "stream-json" && outputFormat !== "stream-json") {
        console.error("Error: --input-format=stream-json requires output-format=stream-json.");
        process.exit(1);
      }

      // Prepare initial prompt and context
      const initialPrompt = await getInputOrReturnSource(prompt || "", inputFormat ?? "text");
      const todoFeatureEnabled = getCachedOrFreshConfig().todoFeatureEnabled;
      const toolPermission = Hk(toolPermissionContext, todoFeatureEnabled);

      // Load clients, tools, commands in parallel
      const [
        [, loadedCommands, {
          clients = [],
          tools = [],
          commands = []
        }]
      ] = [
        await Promise.all([
          initializeSessionAndRestoreTerminalSettings(wk(), permissionModeContext, printMode),
          yAA(),
          initialPrompt ? await Jr1(dynamicMcpConfig) : { clients: [], tools: [], commands: [] }
        ])
      ];

      // Track CLI startup event
      logTelemetryEventIfEnabled("tengu_init", {
        entrypoint: "claude",
        hasInitialPrompt: Boolean(prompt),
        hasStdin: Boolean(initialPrompt),
        verbose,
        debug,
        print: printMode,
        outputFormat,
        numAllowedTools: allowedTools.length,
        numDisallowedTools: disallowedTools.length,
        mcpClientCount: Object.keys(YK()).length
      });

      // Handle print (non-interactive) mode
      if (isPrintMode) {
        handlePrintModeSession(
          initialPrompt,
          toolPermissionContext,
          clients,
          loadedCommands,
          commands,
          toolPermission,
          tools,
          {
            continue: options.continue,
            resume: options.resume,
            verbose: options.verbose,
            outputFormat: options.outputFormat,
            permissionPromptToolName: options.permissionPromptTool,
            allowedTools,
            maxTurns: options.maxTurns,
            systemPrompt: options.systemPrompt,
            appendSystemPrompt: options.appendSystemPrompt,
            userSpecifiedModel: options.model
          }
        );
        return;
      }

      // Interactive mode: prepare state and UI
      const [mainLoop, tipOfTheDay] = await Promise.all([
        createTerminalInteractionConfig(false),
        getRelevantTip(k_2)
      ]);

      logTelemetryEventIfEnabled("tengu_startup_manual_model_config", {
        cli_flag: options.model,
        env_var: process.env.ANTHROPIC_MODEL,
        settings_file: mergeValidSubscriptions().model
      });

      // Determine which model to use
      const selectedModel = options.model || process.env.ANTHROPIC_MODEL || mergeValidSubscriptions().model;
      if (isResourceAvailableAndNotInUse() && selectedModel !== undefined && selectedModel.includes("opus")) {
        console.error(
          FA.yellow(
            "Claude Pro users are not currently able to use Opus 4 in Claude Code. The current model is now Sonnet 4."
          )
        );
      }
      setMainLoopModelOverride(options.model);
      setInitialMainLoopModel(getAnthropicModelName() || null);

      // Build initial app state
      const initialAppState = {
        verbose: verbose ?? false,
        mainLoopModel: M01(),
        todoFeatureEnabled: getCachedOrFreshConfig().todoFeatureEnabled,
        toolPermissionContext,
        maxRateLimitFallbackActive: false,
        mcp: {
          clients: [],
          tools: [],
          commands: [],
          resources: {}
        }
      };

      // Final setup
      setInteractionEntriesObservable(toolPermissionContext);
      incrementStartupCountAndRefreshConfig();

      // Handle --continue
      if (options.continue) {
        try {
          logTelemetryEventIfEnabled("tengu_continue", {});
          const continuedSession = await getInteractionEntryByKey(0);
          if (!continuedSession) {
            console.error("No conversation found to continue");
            process.exit(1);
          }
          processFirstMessageSession(continuedSession);
          const initialTodos = processAgentConfigFile(g9());
          C8(
            JB.default.createElement(h3, {
              initialState: initialAppState,
              onChangeAppState: syncAppStateWithConfig
            },
              JB.default.createElement(createConversationFactory, {
                debug,
                initialPrompt: "",
                shouldShowPromptInput: true,
                commands: [...loadedCommands, ...commands],
                initialTools: tools,
                initialMessages: NA1(continuedSession.messages, tools),
                initialTodos,
                mcpClients: clients,
                dynamicMcpConfig
              })
            ),
            mainLoop
          );
        } catch (err) {
          reportErrorIfAllowed(err instanceof Error ? err : new Error(String(err)));
          process.exit(1);
        }
      } else if (options.resume) {
        let resumedMessages = null;
        const sessionId = getValidRouteName(options.resume);
        if (sessionId) {
          try {
            const resumedSession = await J71(sessionId);
            if (!resumedSession) {
              console.error(`No conversation found with session updateSnapshotAndNotify: ${sessionId}`);
              process.exit(1);
            }
            processFirstMessageSession(resumedSession);
            resumedMessages = resumedSession.messages;
          } catch (err) {
            reportErrorIfAllowed(err instanceof Error ? err : new Error(String(err)));
            console.error(`Failed to resume session ${sessionId}`);
            process.exit(1);
          }
        }
        if (resumedMessages) {
          C8(
            JB.default.createElement(h3, {
              initialState: initialAppState,
              onChangeAppState: syncAppStateWithConfig
            },
              JB.default.createElement(createConversationFactory, {
                debug,
                initialPrompt,
                shouldShowPromptInput: true,
                commands: [...loadedCommands, ...commands],
                initialTools: tools,
                initialMessages: resumedMessages,
                mcpClients: clients,
                dynamicMcpConfig
              })
            ),
            mainLoop
          );
        } else {
          // No sessionId provided, show session picker
          const context = {};
          const logs = await F71();
          if (!logs.length) {
            console.error("No conversations found to resume");
            process.exit(1);
          }
          const { unmount } = C8(
            JB.default.createElement(LogSelector, {
              commands: [...loadedCommands, ...commands],
              context,
              debug,
              logs,
              initialTools: tools,
              mcpClients: clients,
              dynamicMcpConfig,
              appState: initialAppState,
              onChangeAppState: syncAppStateWithConfig
            }),
            mainLoop
          );
          context.unmount = unmount;
        }
      } else {
        // Default: new session
        const initialTodos = processAgentConfigFile(g9());
        C8(
          JB.default.createElement(h3, {
            initialState: initialAppState,
            onChangeAppState: syncAppStateWithConfig
          },
            JB.default.createElement(createConversationFactory, {
              debug,
              commands: [...loadedCommands, ...commands],
              initialPrompt,
              shouldShowPromptInput: true,
              initialTools: tools,
              initialTodos,
              tipOfTheDay,
              mcpClients: clients,
              dynamicMcpConfig
            })
          ),
          mainLoop
        );
      }
    })
    .version(
      `${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/en/docs/claude-code",
        VERSION: "1.0.19"
      }.VERSION} (${m0})`,
      "-v, --version",
      "Output the version number"
    );

  // Config command group
  const configCommand = cli.command("config").description("Manage configuration (eg. claude config set -g theme dark)").helpOption("-h, --help", "Display help for command");

  configCommand
    .command("get <key>")
    .description("Get a config value")
    .option("-g, --global", "Use global config")
    .helpOption("-h, --help", "Display help for command")
    .action(async (key, { global }) => {
      await initializeSessionAndRestoreTerminalSettings(wk(), "default");
      console.log(getConfigValueByKey(key, global ?? false));
      process.exit(0);
    });

  configCommand
    .command("set <key> <value>")
    .description("Set a config value")
    .option("-g, --global", "Use global config")
    .helpOption("-h, --help", "Display help for command")
    .action(async (key, value, { global }) => {
      await initializeSessionAndRestoreTerminalSettings(wk(), "default");
      setConfigValue(key, value, global ?? false);
      console.log(`Set ${key} to ${value}`);
      process.exit(0);
    });

  configCommand
    .command("remove <key> [values...]")
    .alias("rm")
    .description("Remove a config value or items from a config array")
    .option("-g, --global", "Use global config")
    .helpOption("-h, --help", "Display help for command")
    .action(async (key, values, { global }) => {
      await initializeSessionAndRestoreTerminalSettings(wk(), "default");
      if (isArrayPropertyInConfigOrHL(key, global ?? false) && values && values.length > 0) {
        // Remove specific values from array config
        const valueList = values
          .flatMap(val => val.includes(",") ? val.split(",") : val)
          .map(val => val.trim())
          .filter(val => val.length > 0);
        if (valueList.length === 0) {
          console.error("Error: No valid values provided");
          process.exit(1);
        }
        removeConfigArrayEntries(key, valueList, global ?? false, false);
        console.log(`Removed from ${key} in ${global ? "global" : "project"} config: ${valueList.join(", ")}`);
      } else {
        // Remove entire key
        deleteConfigKey(key, global ?? false);
        console.log(`Removed ${key}`);
      }
      process.exit(0);
    });

  configCommand
    .command("list")
    .alias("ls")
    .description("List all config values")
    .option("-g, --global", "Use global config", false)
    .helpOption("-h, --help", "Display help for command")
    .action(async ({ global }) => {
      await initializeSessionAndRestoreTerminalSettings(wk(), "default");
      console.log(JSON.stringify(getTenguConfigList(global ?? false), null, 2));
      process.exit(0);
    });

  configCommand
    .command("add <key> <values...>")
    .description("Add items to a config array (space or comma separated)")
    .option("-g, --global", "Use global config")
    .helpOption("-h, --help", "Display help for command")
    .action(async (key, values, { global }) => {
      await initializeSessionAndRestoreTerminalSettings(wk(), "default");
      const valueList = values
        .flatMap(val => val.includes(",") ? val.split(",") : val)
        .map(val => val.trim())
        .filter(val => val.length > 0);
      if (valueList.length === 0) {
        console.error("Error: No valid values provided");
        process.exit(1);
      }
      addArrayConfigEntries(key, valueList, global ?? false, false);
      console.log(`Added to ${key} in ${global ? "global" : "project"} config: ${valueList.join(", ")}`);
      process.exit(0);
    });

  // MCP command group
  const mcpCommand = cli.command("mcp").description("Configure and manage MCP servers").helpOption("-h, --help", "Display help for command");

  mcpCommand
    .command("serve")
    .description(`Start the ${m0} MCP server`)
    .helpOption("-h, --help", "Display help for command")
    .option("-d, --debug", "Enable debug mode", () => true)
    .option("--verbose", "Override verbose mode setting from config", () => true)
    .action(async ({ debug, verbose }) => {
      const projectDir = wk();
      logTelemetryEventIfEnabled("tengu_mcp_start", {});
      if (!$U5(projectDir)) {
        console.error(`Error: Directory ${projectDir} does not exist`);
        process.exit(1);
      }
      try {
        await initializeSessionAndRestoreTerminalSettings(projectDir, "default");
        await initializeClaudeTenguAccessor(projectDir, debug ?? false, verbose ?? false);
      } catch (err) {
        console.error("Error: Failed to start MCP server:", err);
        process.exit(1);
      }
    });

  mcpCommand
    .command("add <name> <commandOrUrl> [args...]")
    .description("Add a server")
    .option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local")
    .option("-t, --transport <transport>", "Transport type (stdio, sse)", "stdio")
    .option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)")
    .option("-H, --header <header...>", 'Set HTTP headers for SSE transport (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")')
    .helpOption("-h, --help", "Display help for command")
    .action(async (name, commandOrUrl, args, options) => {
      if (!name) {
        console.error("Error: Server name is required.");
        console.error("Usage: claude mcp add <name> <command> [args...]");
        process.exit(1);
      } else if (!commandOrUrl) {
        console.error("Error: Command is required when server name is provided.");
        console.error("Usage: claude mcp add <name> <command> [args...]");
        process.exit(1);
      }
      try {
        const scope = getValidScope(options.scope);
        const transportType = validateTransportType(options.transport);
        await logTelemetryEventIfEnabled("tengu_mcp_add", {
          type: transportType,
          scope,
          source: "command",
          transport: transportType
        });
        if (transportType === "sse") {
          if (!commandOrUrl) {
            console.error("Error: URL is required for SSE transport.");
            process.exit(1);
          }
          const headers = options.header ? parseHeadersArrayToObject(options.header) : undefined;
          updateMcpServerConfig(name, {
            type: "sse",
            url: commandOrUrl,
            headers
          }, scope);
          console.log(`Added SSE MCP server ${name} with URL: ${commandOrUrl} to ${scope} config`);
          if (headers) console.log("Headers:", JSON.stringify(headers, null, 2));
        } else {
          const envVars = parseEnvironmentVariables(options.env);
          updateMcpServerConfig(name, {
            type: "stdio",
            command: commandOrUrl,
            args: args || [],
            env: envVars
          }, scope);
          console.log(`Added stdio MCP server ${name} with command: ${commandOrUrl} ${(args || []).join(" ")} to ${scope} config`);
        }
        process.exit(0);
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });

  mcpCommand
    .command("remove <name>")
    .description("Remove an MCP server")
    .option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local")
    .helpOption("-h, --help", "Display help for command")
    .action(async (name, options) => {
      try {
        const scope = getValidScope(options.scope);
        await logTelemetryEventIfEnabled("tengu_mcp_delete", { name, scope });
        removeMcpServerByScope(name, scope);
        console.log(`Removed MCP server ${name} from ${scope} config`);
        process.exit(0);
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });

  mcpCommand
    .command("list")
    .description("List configured MCP servers")
    .helpOption("-h, --help", "Display help for command")
    .action(async () => {
      await logTelemetryEventIfEnabled("tengu_mcp_list", {});
      const servers = YK();
      if (Object.keys(servers).length === 0) {
        console.log("No MCP servers configured. Use `claude mcp add` to add a server.");
      } else {
        for (const [name, server] of Object.entries(servers)) {
          if (server.type === "sse") {
            console.log(`${name}: ${server.url} (SSE)`);
          } else if (!server.type || server.type === "stdio") {
            const args = Array.isArray(server.args) ? server.args : [];
            console.log(`${name}: ${server.command} ${args.join(" ")}`);
          }
        }
      }
      process.exit(0);
    });

  mcpCommand
    .command("get <name>")
    .description("Get details about an MCP server")
    .helpOption("-h, --help", "Display help for command")
    .action(async name => {
      await logTelemetryEventIfEnabled("tengu_mcp_get", { name });
      const server = getMcpServerConfigByScope(name);
      if (!server) {
        console.error(`No MCP server found with name: ${name}`);
        process.exit(1);
      }
      console.log(`${name}:\\`);
      console.log(`  Scope: ${getSecurityScopeDescription(server.scope)}`);
      if (server.type === "sse") {
        console.log("  Type: sse");
        console.log(`  URL: ${server.url}`);
      } else if (server.type === "stdio") {
        console.log("  Type: stdio");
        console.log(`  Command: ${server.command}`);
        const args = Array.isArray(server.args) ? server.args : [];
        console.log(`  Args: ${args.join(" ")}`);
        if (server.env) {
          console.log("  Environment:");
          for (const [key, val] of Object.entries(server.env)) {
            console.log(`    ${key}=${val}`);
          }
        }
      }
      console.log(`\
To remove this server, run: claude mcp remove \\"${name}\\" -s ${server.scope}`);
      process.exit(0);
    });

  mcpCommand
    .command("add-json <name> <json>")
    .description("Add an MCP server (stdio or SSE) with a JSON string")
    .option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local")
    .helpOption("-h, --help", "Display help for command")
    .action(async (name, json, options) => {
      try {
        const scope = getValidScope(options.scope);
        const configObj = f8(json);
        const type = configObj && typeof configObj === "object" && "type" in configObj ? String(configObj.type || "stdio") : "stdio";
        await logTelemetryEventIfEnabled("tengu_mcp_add", { scope, source: "json", type });
        registerServerConfiguration(name, json, scope);
        console.log(`Added ${type} MCP server ${name} to ${scope} config`);
        process.exit(0);
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });

  mcpCommand
    .command("add-from-claude-desktop")
    .description("Import MCP servers from Claude Desktop (Mac and WSL only)")
    .option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local")
    .helpOption("-h, --help", "Display help for command")
    .action(async options => {
      try {
        const scope = getValidScope(options.scope);
        const platform = rQ();
        logTelemetryEventIfEnabled("tengu_mcp_add", { scope, platform, source: "desktop" });
        const desktopServers = getValidMcpServersConfig();
        if (Object.keys(desktopServers).length === 0) {
          console.log("No MCP servers found in Claude Desktop configuration or configuration file does not exist.");
          process.exit(0);
        }
        let importedCount = 0;
        const { unmount } = C8(
          JB.default.createElement(h3, null,
            JB.default.createElement(importMcpServersFromClaudeDesktop, {
              servers: desktopServers,
              scope,
              onDone: count => {
                importedCount = count;
                unmount();
                if (importedCount > 0) {
                  console.log(`\
${FA.ansi256(H4().success)(`Successfully imported ${importedCount} MCP server${importedCount !== 1 ? "s" : ""} to ${scope} config.`)}`);
                } else {
                  console.log("\
No servers were imported.");
                }
                process.exit(0);
              }
            })
          ),
          { exitOnCtrlC: true }
        );
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    });

  mcpCommand
    .command("reset-project-choices")
    .description("Reset all approved and rejected project-scoped (.mcp.json) servers within this project")
    .helpOption("-h, --help", "Display help for command")
    .action(async () => {
      await logTelemetryEventIfEnabled("tengu_mcp_reset_mcpjson_choices", {});
      const projectConfig = getProjectSubscriptionConfig();
      updateProjectInConfig({
        ...projectConfig,
        enabledMcpjsonServers: [],
        disabledMcpjsonServers: [],
        enableAllProjectMcpServers: false
      });
      console.log("All project-scoped (.mcp.json) server approvals and rejections have been reset.");
      console.log("You will be prompted for approval next time you start Claude Code.");
      process.exit(0);
    });

  // Migration command
  cli
    .command("migrate-installer")
    .description("Migrate from global npm installation to local installation")
    .helpOption("-h, --help", "Display help for command")
    .action(async () => {
      if (uO()) {
        console.log("Already running from local installation. No migration needed.");
        process.exit(0);
      }
      logTelemetryEventIfEnabled("tengu_migrate_installer_command", {});
      await new Promise(resolve => {
        const { waitUntilExit } = C8(
          JB.default.createElement(h3, null, JB.default.createElement(LocalInstallerFlow, null))
        );
        waitUntilExit().then(() => {
          resolve();
        });
      });
      process.exit(0);
    });

  // Doctor command
  cli
    .command("doctor")
    .description("Check the health of your Claude Code auto-updater")
    .helpOption("-h, --help", "Display help for command")
    .action(async () => {
      logTelemetryEventIfEnabled("tengu_doctor_command", {});
      await new Promise(resolve => {
        const { unmount } = C8(
          JB.default.createElement(h3, null, JB.default.createElement(AutoUpdaterStatusPanel, {
            onDone: () => {
              unmount();
              resolve();
            },
            doctorMode: true
          })),
          { exitOnCtrlC: false }
        );
      });
      process.exit(0);
    });

  // Update command
  cli
    .command("update")
    .description("Check for updates and install if available")
    .helpOption("-h, --help", "Display help for command")
    .action(checkAndUpdateCliVersion);

  // Parse CLI arguments
  await cli.parseAsync(process.argv);
  return cli;
}

module.exports = initializeClaudeCli;