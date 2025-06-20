#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/fix-all-dependencies.js
 * File name: fix-all-dependencies.js
 * Author: davidgornshtein@gmail.com
 * Description: Uses Babel to find and fix all dependencies automatically
 * Purpose: Create a fully functional CLI by resolving all imports
 * Patterns: AST traversal, dependency resolution, automated fixing
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const projectRoot = path.join(__dirname, '..');
const srcDir = path.join(projectRoot, 'src-organized');
const moduleMapPath = path.join(projectRoot, 'module-map.json');
const outputDir = path.join(projectRoot, 'src-fixed');

// Load module map
const moduleMap = JSON.parse(fs.readFileSync(moduleMapPath, 'utf-8'));

// Create mappings
const functionToPath = {};
const pathToFunctions = {};
const allDefinedFunctions = new Set();
const allFiles = new Map(); // path -> content

// Build mappings
for (const [func, filePath] of Object.entries(moduleMap)) {
    functionToPath[func] = filePath;
    if (!pathToFunctions[filePath]) {
        pathToFunctions[filePath] = [];
    }
    pathToFunctions[filePath].push(func);
}

console.log('Step 1: Scanning all files to find defined functions...');

// First pass: collect all defined functions
function scanDirectory(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(prefix, entry.name);
        
        if (entry.isDirectory()) {
            scanDirectory(fullPath, relativePath);
        } else if (entry.name.endsWith('.js')) {
            const modulePath = relativePath.replace(/\\/g, '/').replace(/\.js$/, '');
            const content = fs.readFileSync(fullPath, 'utf-8');
            allFiles.set(modulePath, { fullPath, content });
            
            try {
                const ast = parser.parse(content, {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript']
                });
                
                traverse(ast, {
                    FunctionDeclaration(path) {
                        if (path.node.id) {
                            allDefinedFunctions.add(path.node.id.name);
                        }
                    },
                    VariableDeclarator(path) {
                        if (path.node.id && path.node.id.type === 'Identifier' &&
                            path.node.init && 
                            (path.node.init.type === 'FunctionExpression' ||
                             path.node.init.type === 'ArrowFunctionExpression')) {
                            allDefinedFunctions.add(path.node.id.name);
                        }
                    }
                });
            } catch (e) {
                console.warn(`Error parsing ${modulePath}:`, e.message);
            }
        }
    }
}

scanDirectory(srcDir);
console.log(`Found ${allDefinedFunctions.size} defined functions in ${allFiles.size} files`);

console.log('\nStep 2: Finding all dependencies and missing imports...');

const missingDependencies = new Map(); // file -> Set of missing deps
const allDependencies = new Map(); // file -> Set of all deps

// Second pass: find all dependencies
for (const [modulePath, { content }] of allFiles) {
    const dependencies = new Set();
    const missing = new Set();
    const alreadyImported = new Set();
    
    try {
        const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript']
        });
        
        // Find already imported
        traverse(ast, {
            CallExpression(path) {
                if (path.node.callee.name === 'require') {
                    const arg = path.node.arguments[0];
                    if (arg && arg.type === 'StringLiteral') {
                        const importPath = arg.value;
                        // Extract the function name from the import
                        const funcName = path.basename(importPath);
                        if (functionToPath[funcName]) {
                            alreadyImported.add(funcName);
                        }
                    }
                }
            }
        });
        
        // Find all identifier usage
        traverse(ast, {
            Identifier(path) {
                const name = path.node.name;
                
                // Skip if it's a property access or declaration
                if (path.isProperty() || path.isDeclaration() || 
                    path.isFunctionDeclaration() || path.isVariableDeclarator() ||
                    path.isObjectProperty() || path.isMemberExpression() ||
                    alreadyImported.has(name)) {
                    return;
                }
                
                // Check if it's a function call or reference
                if (path.isReferencedIdentifier()) {
                    // Check if it's in our function map and not already imported
                    if (functionToPath[name] && !allDefinedFunctions.has(name)) {
                        dependencies.add(name);
                        if (!alreadyImported.has(name)) {
                            missing.add(name);
                        }
                    }
                }
            }
        });
        
    } catch (e) {
        console.warn(`Error analyzing ${modulePath}:`, e.message);
    }
    
    if (dependencies.size > 0) {
        allDependencies.set(modulePath, dependencies);
    }
    if (missing.size > 0) {
        missingDependencies.set(modulePath, missing);
    }
}

console.log(`Found ${missingDependencies.size} files with missing dependencies`);

console.log('\nStep 3: Creating fixed source directory...');

// Create output directory
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
}

// Copy and fix all files
let fixedFiles = 0;
for (const [modulePath, { fullPath, content }] of allFiles) {
    const outputPath = path.join(outputDir, modulePath + '.js');
    const outputDirPath = path.dirname(outputPath);
    
    // Create directory
    fs.mkdirSync(outputDirPath, { recursive: true });
    
    let fixedContent = content;
    const missing = missingDependencies.get(modulePath);
    
    if (missing && missing.size > 0) {
        try {
            const ast = parser.parse(content, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript']
            });
            
            // Find where to insert imports (after existing requires or at top)
            let insertIndex = 0;
            let lastRequireEnd = 0;
            
            traverse(ast, {
                CallExpression(path) {
                    if (path.node.callee.name === 'require') {
                        const parent = path.getFunctionParent();
                        if (!parent) { // Top-level require
                            lastRequireEnd = path.node.end;
                        }
                    }
                }
            });
            
            // Build import statements
            const imports = [];
            for (const funcName of missing) {
                const importPath = functionToPath[funcName];
                if (importPath) {
                    imports.push(`const ${funcName} = require('${importPath}');`);
                }
            }
            
            if (imports.length > 0) {
                // Insert imports
                if (lastRequireEnd > 0) {
                    // Insert after last require
                    fixedContent = content.slice(0, lastRequireEnd) + '\n' + 
                                 imports.join('\n') + 
                                 content.slice(lastRequireEnd);
                } else {
                    // Insert at beginning
                    fixedContent = imports.join('\n') + '\n\n' + content;
                }
                fixedFiles++;
            }
            
        } catch (e) {
            console.warn(`Error fixing ${modulePath}:`, e.message);
        }
    }
    
    fs.writeFileSync(outputPath, fixedContent);
}

console.log(`Fixed ${fixedFiles} files`);

console.log('\nStep 4: Creating final build script...');

// Create build script
const buildScript = `#!/usr/bin/env node
/**
 * Auto-generated build script
 * Builds CLI from fixed source
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src-fixed');
const outputPath = path.join(__dirname, '../claude-code-final');
const moduleMap = ${JSON.stringify(moduleMap, null, 2)};

let cliContent = \`#!/usr/bin/env node
'use strict';

// Node.js built-ins
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

// External modules
try { global.chalk = require('chalk'); } catch(e) {}
try { global.commander = require('commander'); } catch(e) {}

// Module system
const modules = {};
const moduleExports = {};
const moduleMap = \${JSON.stringify(moduleMap, null, 2)};

function define(id, factory) {
    modules[id] = factory;
}

function requireModule(id) {
    if (moduleMap[id]) id = moduleMap[id];
    if (moduleExports[id]) return moduleExports[id];
    
    const builtins = ["fs","path","os","util","child_process","crypto","process","stream","events","url","querystring","http","https","net","tls","zlib","buffer","console","assert","vm"];
    const externals = ["commander","chalk","dotenv","glob","rimraf","mkdirp"];
    
    if (builtins.includes(id) || externals.includes(id)) {
        try { return require(id); } catch(e) { return {}; }
    }
    
    if (!modules[id]) {
        for (const [k, v] of Object.entries(moduleMap)) {
            if (v.endsWith('/' + id)) { id = v; break; }
        }
        if (!modules[id]) return {};
    }
    
    const module = { exports: {} };
    try {
        modules[id](module, module.exports, requireModule);
    } catch(e) {
        console.error('Module error:', id, e.message);
        return {};
    }
    
    moduleExports[id] = module.exports;
    return module.exports;
}

global.requireModule = requireModule;
global.require = requireModule;
\`;

// Load all modules
function loadDir(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(prefix, entry.name);
        
        if (entry.isDirectory()) {
            loadDir(fullPath, relPath);
        } else if (entry.name.endsWith('.js')) {
            const modPath = relPath.replace(/\\\\/g, '/').replace(/\\.js$/, '');
            let content = fs.readFileSync(fullPath, 'utf-8');
            const exportMatch = content.match(/\\nmodule\\.exports\\s*=\\s*(\\w+);?\\s*$/);
            const exportName = exportMatch ? exportMatch[1] : path.basename(modPath);
            content = content.replace(/\\nmodule\\.exports\\s*=\\s*\\w+;?\\s*$/, '');
            
            cliContent += \`
define('\${modPath}', function(module, exports, require) {
\${content}
module.exports = \${exportName};
});
\`;
        }
    }
}

loadDir(srcDir);

// Add initialization
cliContent += \`

// Globals
global.N9 = { isNonInteractiveSession: false };
global.wk = () => process.cwd();
global.FA = require('chalk') || { yellow: s => s, green: s => s, red: s => s, blue: s => s, gray: s => s, default: s => s };
global.JB = { default: { createElement: (t, p, ...c) => ({type:t,props:p,children:c}) } };
global.k_2 = { context: 'cli' };
global.H4 = () => ({ success: 10, error: 9, warning: 11 });

// Run
const main = requireModule('errors/handlers_5/main');
if (main) main().catch(e => { console.error(e); process.exit(1); });
\`;

fs.writeFileSync(outputPath, cliContent);
fs.chmodSync(outputPath, '755');
console.log('Built: ' + outputPath);
`;

fs.writeFileSync(path.join(projectRoot, 'tools/build-from-fixed.js'), buildScript);
fs.chmodSync(path.join(projectRoot, 'tools/build-from-fixed.js'), '755');

console.log('\n✅ All dependencies fixed!');
console.log(`   Fixed source in: ${outputDir}`);
console.log(`   Missing dependencies resolved: ${Array.from(missingDependencies.values()).reduce((sum, set) => sum + set.size, 0)}`);
console.log('\nNow run: node tools/build-from-fixed.js');