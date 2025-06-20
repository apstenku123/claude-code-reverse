#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/build-final-deduplicated.js
 * File name: build-final-deduplicated.js
 * Author: davidgornshtein@gmail.com
 * Description: Final build with deduplication of declarations
 * Purpose: Create the final working CLI
 * Patterns: Module wrapping with deduplication
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src-fully-fixed');
const output = path.join(__dirname, '../claude');
const moduleMapPath = path.join(__dirname, '../module-map.json');

const moduleMap = JSON.parse(fs.readFileSync(moduleMapPath, 'utf-8'));

console.log('Building final CLI with deduplication...');

let cli = `#!/usr/bin/env node
'use strict';

// Built-ins
const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util');
const child_process = require('child_process');
const crypto = require('crypto');
const process = require('process');
const stream = require('stream');
const events = require('events');
const url = require('url');
const querystring = require('querystring');
const http = require('http');
const https = require('https');
const net = require('net');
const tls = require('tls');
const zlib = require('zlib');
const buffer = require('buffer');
const console = require('console');
const assert = require('assert');
const vm = require('vm');

// Try to load external dependencies
let chalk, commander;
try { chalk = require('chalk'); } catch(e) { 
    chalk = { 
        yellow: s => \`\\x1b[33m\${s}\\x1b[0m\`,
        green: s => \`\\x1b[32m\${s}\\x1b[0m\`,
        red: s => \`\\x1b[31m\${s}\\x1b[0m\`,
        blue: s => \`\\x1b[34m\${s}\\x1b[0m\`,
        gray: s => \`\\x1b[90m\${s}\\x1b[0m\`,
        cyan: s => \`\\x1b[36m\${s}\\x1b[0m\`,
        magenta: s => \`\\x1b[35m\${s}\\x1b[0m\`,
        white: s => s,
        black: s => s,
        default: s => s,
        ansi256: () => ({ toString: s => s })
    };
}
global.chalk = chalk;

try { commander = require('commander'); } catch(e) { commander = {}; }
global.commander = commander;

// Module system
const modules = {};
const moduleExports = {};
const moduleMap = ${JSON.stringify(moduleMap, null, 2)};

function define(id, factory) {
    modules[id] = factory;
}

function requireModule(id) {
    const originalId = id;
    
    // Map function names to paths
    if (moduleMap[id]) {
        id = moduleMap[id];
    }
    
    // Return cached
    if (moduleExports[id]) {
        return moduleExports[id];
    }
    
    // Handle built-ins
    const builtins = ["fs","path","os","util","child_process","crypto","process","stream","events",
                      "url","querystring","http","https","net","tls","zlib","buffer","console","assert","vm"];
    if (builtins.includes(id)) {
        return require(id);
    }
    
    // Handle externals
    const externals = ["commander","chalk","dotenv","glob","rimraf","mkdirp","ink","react",
                       "@babel/parser","@babel/traverse","@babel/generator"];
    if (externals.includes(id)) {
        try { return require(id); } catch(e) { return {}; }
    }
    
    // Find module
    if (!modules[id]) {
        // Try to find by suffix match
        for (const [k, v] of Object.entries(moduleMap)) {
            if (v === id || v.endsWith('/' + originalId)) { 
                id = v; 
                break; 
            }
        }
        
        if (!modules[id]) {
            // console.warn('Module not found:', originalId);
            return {};
        }
    }
    
    // Execute module
    try {
        const module = { exports: {} };
        const exports = module.exports;
        
        // Create a require function that tracks what's been required
        const localRequire = (depId) => requireModule(depId);
        
        modules[id](module, exports, localRequire);
        
        moduleExports[id] = module.exports;
        if (originalId !== id) {
            moduleExports[originalId] = module.exports;
        }
        
        return module.exports;
    } catch(e) {
        console.error('Module error in', id + ':', e.message);
        return {};
    }
}

// Global require
global.requireModule = requireModule;
global.require = requireModule;

`;

// Load all modules with deduplication
let moduleCount = 0;
const loadedFiles = new Set();

function loadDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(prefix, entry.name);
        
        if (entry.isDirectory()) {
            loadDir(fullPath, relPath);
        } else if (entry.name.endsWith('.js')) {
            const modPath = relPath.replace(/\\/g, '/').replace(/\.js$/, '');
            
            // Skip if already loaded
            if (loadedFiles.has(modPath)) continue;
            loadedFiles.add(modPath);
            
            try {
                let content = fs.readFileSync(fullPath, 'utf-8');
                
                // Extract export name
                const match = content.match(/\nmodule\.exports\s*=\s*(\w+);?\s*$/);
                const exportName = match ? match[1] : path.basename(modPath);
                
                // Remove module.exports line
                content = content.replace(/\nmodule\.exports\s*=\s*\w+;?\s*$/, '');
                
                // Wrap in function to prevent duplicate declarations
                cli += `
define('${modPath}', function(module, exports, require) {
  // Module: ${modPath}
  (function() {
${content}
  })();
  
  // Export
  if (typeof ${exportName} !== 'undefined') {
    module.exports = ${exportName};
  }
});
`;
                moduleCount++;
            } catch (e) {
                console.warn(`Error loading ${modPath}:`, e.message);
            }
        }
    }
}

loadDir(srcDir);

// Add initialization
cli += `

// Set up globals
global.N9 = { isNonInteractiveSession: false };
global.wk = () => process.cwd();
global.TU5 = () => {};
global.FA = chalk;
global.JB = { 
    default: { 
        createElement: (type, props, ...children) => ({ type, props, children }), 
        Fragment: Symbol('React.Fragment') 
    } 
};
global.k_2 = { context: 'cli' };
global.H4 = () => ({ success: 10, error: 9, warning: 11 });
global.React = global.JB.default;
global.Qy1 = { default: global.JB.default };

// Start the CLI
console.log('Starting Claude Code CLI...');

try {
    // First try the main function
    const main = requireModule('errors/handlers_5/main');
    if (typeof main === 'function') {
        console.log('Running main...');
        main().catch(err => {
            console.error('\\nError in main:', err.message);
            console.error(err.stack);
            process.exit(1);
        });
    } else {
        // Fallback to initializeClaudeCli
        console.log('Main not found, trying initializeClaudeCli...');
        const initCli = requireModule('errors/logging_2/initializeClaudeCli');
        if (typeof initCli === 'function') {
            initCli().catch(err => {
                console.error('\\nError:', err.message);
                process.exit(1);
            });
        } else {
            console.error('Could not find main entry point');
            process.exit(1);
        }
    }
} catch (e) {
    console.error('\\nStartup error:', e.message);
    console.error(e.stack);
    process.exit(1);
}
`;

// Write output
fs.writeFileSync(output, cli);
fs.chmodSync(output, '755');

console.log(`✅ Built: ${output}`);
console.log(`   Modules: ${moduleCount}`);
console.log(`   Size: ${(cli.length / 1024 / 1024).toFixed(2)} MB`);
console.log('\nTest with:');
console.log('   ./claude --help');
console.log('   ./claude -p "Hello"');
console.log('   ./claude');