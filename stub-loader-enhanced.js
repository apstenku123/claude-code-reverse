/**
 * Enhanced stub loader - provides complete implementations for missing functions
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 */

// N9 - Session state object
const N9 = {
    isNonInteractiveSession: false
};
global.N9 = N9;

// Stub implementation
function setNonInteractiveSessionFlag(isNonInteractive) {
    if (global.N9) {
        global.N9.isNonInteractiveSession = isNonInteractive;
    }
}
global.setNonInteractiveSessionFlag = setNonInteractiveSessionFlag;

// Get working directory
function wk() {
    return process.cwd();
}
global.wk = wk;

// Color utilities (using chalk)
const chalk = require('chalk');
const FA = {
    yellow: chalk.yellow,
    ansi256: (code) => chalk,
    default: chalk,
    green: chalk.green,
    red: chalk.red,
    blue: chalk.blue,
    gray: chalk.gray
};
global.FA = FA;

// React placeholder
const JB = {
    default: {
        createElement: (type, props, ...children) => ({ type, props, children }),
    }
};
global.JB = JB;

// Permission and config functions
function getPermissionMode(options) { 
    return options.permissionModeCli || options.dangerouslySkipPermissions ? 'bypassPermissions' : 'default'; 
}
global.getPermissionMode = getPermissionMode;

function getCachedOrFreshConfig() { 
    return { 
        todoFeatureEnabled: false,
        theme: 'dark',
        verbose: false
    }; 
}
global.getCachedOrFreshConfig = getCachedOrFreshConfig;

function logTelemetryEventIfEnabled(event, data) { 
    // Silent telemetry stub
}
global.logTelemetryEventIfEnabled = logTelemetryEventIfEnabled;

// Important functions with proper return values
function buildToolPermissionContext(options) { 
    return {
        toolPermissionContext: {
            allowedTools: options.allowedToolsCli || [],
            disallowedTools: options.disallowedToolsCli || [],
            permissionMode: options.permissionMode || 'default',
            additionalDirectories: options.addDirs || []
        },
        warnings: []
    };
}
global.buildToolPermissionContext = buildToolPermissionContext;

function runInitialAppSetupFlow(permissionMode) {
    // Simulate login success
    return Promise.resolve(true);
}
global.runInitialAppSetupFlow = runInitialAppSetupFlow;

function checkAndSyncDataSharingStatus() {
    // No-op
}
global.checkAndSyncDataSharingStatus = checkAndSyncDataSharingStatus;

function checkMinimumVersionRequirement() {
    // Pass version check
    return true;
}
global.checkMinimumVersionRequirement = checkMinimumVersionRequirement;

function Jr1(config) {
    // MCP config handler
    return Promise.resolve({
        clients: [],
        tools: [],
        commands: []
    });
}
global.Jr1 = Jr1;

function getInputOrReturnSource(prompt, format) {
    return Promise.resolve(prompt);
}
global.getInputOrReturnSource = getInputOrReturnSource;

function Hk(context, todoEnabled) {
    return {
        context,
        todoEnabled,
        permissions: []
    };
}
global.Hk = Hk;

function initializeSessionAndRestoreTerminalSettings(dir, mode, printMode) {
    return Promise.resolve({
        sessionId: Date.now().toString(),
        directory: dir
    });
}
global.initializeSessionAndRestoreTerminalSettings = initializeSessionAndRestoreTerminalSettings;

function yAA() {
    // Load commands
    return Promise.resolve([
        { name: 'help', description: 'Show help' },
        { name: 'exit', description: 'Exit CLI' }
    ]);
}
global.yAA = yAA;

function YK() {
    // Get MCP servers
    return {};
}
global.YK = YK;

// Interactive mode functions
function createTerminalInteractionConfig(debug) {
    return Promise.resolve({
        debug,
        interactive: true,
        render: () => {}
    });
}
global.createTerminalInteractionConfig = createTerminalInteractionConfig;

function getRelevantTip(context) {
    return Promise.resolve("Welcome to Claude Code!");
}
global.getRelevantTip = getRelevantTip;

const k_2 = { context: 'cli' };
global.k_2 = k_2;

function isResourceAvailableAndNotInUse() {
    return false;
}
global.isResourceAvailableAndNotInUse = isResourceAvailableAndNotInUse;

function mergeValidSubscriptions() {
    return {
        model: 'claude-3-sonnet-20240229'
    };
}
global.mergeValidSubscriptions = mergeValidSubscriptions;

function setMainLoopModelOverride(model) {
    // Store model override
}
global.setMainLoopModelOverride = setMainLoopModelOverride;

function setInitialMainLoopModel(model) {
    // Set initial model
}
global.setInitialMainLoopModel = setInitialMainLoopModel;

function getAnthropicModelName() {
    return 'claude-3-sonnet-20240229';
}
global.getAnthropicModelName = getAnthropicModelName;

function M01() {
    return 'claude-3-sonnet-20240229';
}
global.M01 = M01;

function setInteractionEntriesObservable(context) {
    // Set up interaction tracking
}
global.setInteractionEntriesObservable = setInteractionEntriesObservable;

function incrementStartupCountAndRefreshConfig() {
    // Increment startup counter
}
global.incrementStartupCountAndRefreshConfig = incrementStartupCountAndRefreshConfig;

// UI Rendering function
function C8(component, config) {
    console.log('\n=== Claude Code CLI (Stub Mode) ===');
    console.log('This is a reverse-engineered version with stub implementations.');
    console.log('Most features are not functional.\n');
    
    if (config && config.exitOnCtrlC !== false) {
        console.log('Press Ctrl+C to exit.\n');
    }
    
    return {
        unmount: () => {},
        waitUntilExit: () => Promise.resolve()
    };
}
global.C8 = C8;

// Component stubs
function h3(props) {
    return { type: 'AppState', props };
}
global.h3 = h3;

function syncAppStateWithConfig(state) {
    // Sync app state
}
global.syncAppStateWithConfig = syncAppStateWithConfig;

function createConversationFactory(props) {
    return { type: 'Conversation', props };
}
global.createConversationFactory = createConversationFactory;

// Session management
function getInteractionEntryByKey(key) {
    return Promise.resolve(null);
}
global.getInteractionEntryByKey = getInteractionEntryByKey;

function processFirstMessageSession(session) {
    // Process session
}
global.processFirstMessageSession = processFirstMessageSession;

function processAgentConfigFile(config) {
    return [];
}
global.processAgentConfigFile = processAgentConfigFile;

function g9() {
    return {};
}
global.g9 = g9;

function NA1(messages, tools) {
    return messages || [];
}
global.NA1 = NA1;

// Error handling
function reportErrorIfAllowed(error) {
    console.error('Error:', error.message);
}
global.reportErrorIfAllowed = reportErrorIfAllowed;

// Session resume
function getValidRouteName(route) {
    return typeof route === 'string' ? route : null;
}
global.getValidRouteName = getValidRouteName;

function J71(sessionId) {
    return Promise.resolve(null);
}
global.J71 = J71;

function F71() {
    return Promise.resolve([]);
}
global.F71 = F71;

function LogSelector(props) {
    return { type: 'LogSelector', props };
}
global.LogSelector = LogSelector;

// Utils
function H4() {
    return {
        success: 10,
        error: 9,
        warning: 11
    };
}
global.H4 = H4;

function f8(input) {
    try {
        return JSON.parse(input);
    } catch {
        return null;
    }
}
global.f8 = f8;

const vb = {
    safeParse: (data) => ({
        success: true,
        data: { mcpServers: data.mcpServers || {} }
    })
};
global.vb = vb;

function qU5(path) {
    const fs = require('fs');
    try {
        return fs.readFileSync(path, 'utf-8');
    } catch {
        return '{}';
    }
}
global.qU5 = qU5;

function loadAndValidateMcpConfig(config) {
    return {
        mcpServers: JSON.parse(config).mcpServers || {}
    };
}
global.loadAndValidateMcpConfig = loadAndValidateMcpConfig;

// File system
function $U5(path) {
    const fs = require('fs');
    return fs.existsSync(path);
}
global.$U5 = $U5;

// MCP functions
function initializeClaudeTenguAccessor(dir, debug, verbose) {
    return Promise.resolve();
}
global.initializeClaudeTenguAccessor = initializeClaudeTenguAccessor;

function uO() {
    return false; // Not running from local installation
}
global.uO = uO;

// UI Components
function LocalInstallerFlow(props) {
    return { type: 'LocalInstallerFlow', props };
}
global.LocalInstallerFlow = LocalInstallerFlow;

function AutoUpdaterStatusPanel(props) {
    return { type: 'AutoUpdaterStatusPanel', props };
}
global.AutoUpdaterStatusPanel = AutoUpdaterStatusPanel;

function importMcpServersFromClaudeDesktop(props) {
    return { type: 'ImportMcpServers', props };
}
global.importMcpServersFromClaudeDesktop = importMcpServersFromClaudeDesktop;

// Config management
function getValidScope(scope) {
    const validScopes = ['local', 'user', 'project'];
    return validScopes.includes(scope) ? scope : 'local';
}
global.getValidScope = getValidScope;

function validateTransportType(type) {
    return type === 'sse' ? 'sse' : 'stdio';
}
global.validateTransportType = validateTransportType;

function parseHeadersArrayToObject(headers) {
    const result = {};
    headers.forEach(h => {
        const [key, value] = h.split(':');
        if (key && value) {
            result[key.trim()] = value.trim();
        }
    });
    return result;
}
global.parseHeadersArrayToObject = parseHeadersArrayToObject;

function updateMcpServerConfig(name, config, scope) {
    console.log(`Would update MCP server ${name} in ${scope} config`);
}
global.updateMcpServerConfig = updateMcpServerConfig;

function parseEnvironmentVariables(envArray) {
    const result = {};
    if (envArray) {
        envArray.forEach(env => {
            const [key, value] = env.split('=');
            if (key && value) {
                result[key] = value;
            }
        });
    }
    return result;
}
global.parseEnvironmentVariables = parseEnvironmentVariables;

function removeMcpServerByScope(name, scope) {
    console.log(`Would remove MCP server ${name} from ${scope} config`);
}
global.removeMcpServerByScope = removeMcpServerByScope;

function getMcpServerConfigByScope(name) {
    return null;
}
global.getMcpServerConfigByScope = getMcpServerConfigByScope;

function getSecurityScopeDescription(scope) {
    return scope || 'local';
}
global.getSecurityScopeDescription = getSecurityScopeDescription;

function registerServerConfiguration(name, json, scope) {
    console.log(`Would register server ${name} in ${scope} config`);
}
global.registerServerConfiguration = registerServerConfiguration;

function rQ() {
    return process.platform;
}
global.rQ = rQ;

function getValidMcpServersConfig() {
    return {};
}
global.getValidMcpServersConfig = getValidMcpServersConfig;

function getProjectSubscriptionConfig() {
    return {
        enabledMcpjsonServers: [],
        disabledMcpjsonServers: [],
        enableAllProjectMcpServers: false
    };
}
global.getProjectSubscriptionConfig = getProjectSubscriptionConfig;

function updateProjectInConfig(config) {
    console.log('Would update project config');
}
global.updateProjectInConfig = updateProjectInConfig;

// Config commands
function getConfigValueByKey(key, isGlobal) {
    console.log(`Would get config value for ${key} (global: ${isGlobal})`);
    return '';
}
global.getConfigValueByKey = getConfigValueByKey;

function setConfigValue(key, value, isGlobal) {
    console.log(`Would set ${key} = ${value} (global: ${isGlobal})`);
}
global.setConfigValue = setConfigValue;

function isArrayPropertyInConfigOrHL(key, isGlobal) {
    return ['allowedTools', 'disallowedTools', 'addDir'].includes(key);
}
global.isArrayPropertyInConfigOrHL = isArrayPropertyInConfigOrHL;

function removeConfigArrayEntries(key, values, isGlobal, silent) {
    console.log(`Would remove ${values.join(', ')} from ${key} (global: ${isGlobal})`);
}
global.removeConfigArrayEntries = removeConfigArrayEntries;

function deleteConfigKey(key, isGlobal) {
    console.log(`Would delete ${key} (global: ${isGlobal})`);
}
global.deleteConfigKey = deleteConfigKey;

function getTenguConfigList(isGlobal) {
    return {
        theme: 'dark',
        verbose: false,
        todoFeatureEnabled: false
    };
}
global.getTenguConfigList = getTenguConfigList;

function addArrayConfigEntries(key, values, isGlobal, silent) {
    console.log(`Would add ${values.join(', ')} to ${key} (global: ${isGlobal})`);
}
global.addArrayConfigEntries = addArrayConfigEntries;

// Handle print mode
function handlePrintModeSession(prompt, context, clients, commands, commandList, permission, tools, options) {
    console.log('\n=== Print Mode ===');
    console.log('Prompt:', prompt);
    console.log('\nThis is a stub implementation. In a real system, this would:');
    console.log('1. Send your prompt to Claude API');
    console.log('2. Execute any requested tools');
    console.log('3. Return the response');
    process.exit(0);
}
global.handlePrintModeSession = handlePrintModeSession;

// Check for updates function
async function checkAndUpdateCliVersion() {
    console.log('Checking for updates...');
    console.log('Claude Code is up to date (stub mode).');
    process.exit(0);
}
global.checkAndUpdateCliVersion = checkAndUpdateCliVersion;

console.log('Enhanced stub loader initialized');