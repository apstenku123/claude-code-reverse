#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: fix-missing-functions.js
 * Location: /Volumes/external/faiss/test22/1.0.19/claude-code-reverse/fix-missing-functions.js
 * Author: davidgornshtein@gmail.com
 * Description: Adds missing functions to the CLI that aren't in the module map
 * Purpose: Fix runtime errors by ensuring all required functions are available
 * Patterns: Direct function injection into the CLI runtime
 */

const fs = require('fs');
const path = require('path');

console.log('Adding missing functions to CLI...');

// Read the working CLI
const cliPath = path.join(__dirname, 'claude-working.js');
let content = fs.readFileSync(cliPath, 'utf-8');

// Add missing functions after the globals setup
const missingFunctions = `
// Add missing functions that aren't in the module map
global.setNonInteractiveSessionFlag = function(isNonInteractiveSession) {
    N9.isNonInteractiveSession = isNonInteractiveSession;
};

global.getPermissionMode = function() {
    return global.permissionMode || 'default';
};

global.setPermissionMode = function(mode) {
    global.permissionMode = mode;
};

// Add any other missing globals
global.messageRequested = false;
global.latestResponseMessage = null;
`;

// Insert after the N9 setup
content = content.replace(
    'global.N9 = { isNonInteractiveSession: false };',
    `global.N9 = { isNonInteractiveSession: false };

${missingFunctions}`
);

// Write the fixed version
fs.writeFileSync(cliPath, content);

console.log('✅ Added missing functions to claude-working.js');
console.log('The CLI should now handle --print mode properly.');