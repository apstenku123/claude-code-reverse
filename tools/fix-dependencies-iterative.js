#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/fix-dependencies-iterative.js
 * File name: fix-dependencies-iterative.js
 * Author: davidgornshtein@gmail.com
 * Description: Iteratively fixes all dependencies using Babel until everything is resolved
 * Purpose: Create a fully functional CLI with all dependencies properly connected
 * Patterns: Iterative AST analysis, comprehensive dependency resolution
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
const outputDir = path.join(projectRoot, 'src-fully-fixed');

// Load module map
const moduleMap = JSON.parse(fs.readFileSync(moduleMapPath, 'utf-8'));

// Global state
const functionToPath = {};
const allFunctions = new Set();
const builtins = new Set([
    'require', 'module', 'exports', 'console', 'process', 'global', 'Buffer',
    'Array', 'Object', 'String', 'Number', 'Boolean', 'Function', 'Date', 'RegExp',
    'Error', 'Math', 'JSON', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet',
    'Symbol', 'Proxy', 'Reflect', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
    'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'setImmediate',
    '__dirname', '__filename', 'undefined', 'null', 'true', 'false'
]);

// Build function to path mapping
for (const [func, filePath] of Object.entries(moduleMap)) {
    functionToPath[func] = filePath;
    allFunctions.add(func);
}

console.log('Iterative Dependency Fixer');
console.log('=========================');
console.log(`Found ${allFunctions.size} mapped functions`);

// Create output directory
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
}

// Copy all files first
function copyDirectory(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else if (entry.name.endsWith('.js')) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('\nCopying source files...');
copyDirectory(srcDir, outputDir);

// Analyze a file for dependencies
function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const definedInFile = new Set();
    const importedInFile = new Set();
    const usedInFile = new Set();
    
    try {
        const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
            errorRecovery: true
        });
        
        // Find what's defined in this file
        traverse(ast, {
            FunctionDeclaration(path) {
                if (path.node.id && path.node.id.name) {
                    definedInFile.add(path.node.id.name);
                }
            },
            VariableDeclarator(path) {
                if (path.node.id && path.node.id.type === 'Identifier') {
                    // Check if it's a function
                    if (path.node.init && 
                        (path.node.init.type === 'FunctionExpression' ||
                         path.node.init.type === 'ArrowFunctionExpression' ||
                         (path.node.init.type === 'CallExpression' && path.node.init.callee.name === 'require'))) {
                        definedInFile.add(path.node.id.name);
                    }
                }
            },
            AssignmentExpression(path) {
                // Handle global assignments like global.FA = ...
                if (path.node.left.type === 'MemberExpression' &&
                    path.node.left.object.name === 'global' &&
                    path.node.left.property.type === 'Identifier') {
                    definedInFile.add(path.node.left.property.name);
                }
            }
        });
        
        // Find what's already imported
        traverse(ast, {
            VariableDeclarator(path) {
                if (path.node.init && 
                    path.node.init.type === 'CallExpression' &&
                    path.node.init.callee.name === 'require' &&
                    path.node.id.type === 'Identifier') {
                    importedInFile.add(path.node.id.name);
                }
            }
        });
        
        // Find what's used
        traverse(ast, {
            Identifier(path) {
                const name = path.node.name;
                
                // Skip if it's not a reference
                if (!path.isReferencedIdentifier()) return;
                
                // Skip if it's a property
                if (path.isMemberExpression({ property: path.node })) return;
                
                // Skip if it's in object pattern
                if (path.isObjectProperty({ key: path.node })) return;
                
                // Skip builtins
                if (builtins.has(name)) return;
                
                // Skip if defined or imported in this file
                if (definedInFile.has(name) || importedInFile.has(name)) return;
                
                // Check if it's a known function
                if (allFunctions.has(name)) {
                    usedInFile.add(name);
                }
            },
            CallExpression(path) {
                // Handle direct function calls
                if (path.node.callee.type === 'Identifier') {
                    const name = path.node.callee.name;
                    if (!builtins.has(name) && !definedInFile.has(name) && 
                        !importedInFile.has(name) && allFunctions.has(name)) {
                        usedInFile.add(name);
                    }
                }
            }
        });
        
    } catch (e) {
        console.warn(`Error parsing ${filePath}:`, e.message);
        return { definedInFile, importedInFile, usedInFile, missing: new Set() };
    }
    
    // Calculate missing
    const missing = new Set();
    for (const used of usedInFile) {
        if (!importedInFile.has(used) && !definedInFile.has(used)) {
            missing.add(used);
        }
    }
    
    return { definedInFile, importedInFile, usedInFile, missing };
}

// Fix dependencies in a file
function fixFile(filePath, missing) {
    if (missing.size === 0) return false;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    try {
        const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
            errorRecovery: true
        });
        
        // Find where to insert imports
        let lastImportEnd = 0;
        let firstNonImport = content.length;
        let hasRequires = false;
        
        traverse(ast, {
            Program(path) {
                // Find the position after all top-level requires
                for (const statement of path.node.body) {
                    if (statement.type === 'VariableDeclaration' &&
                        statement.declarations.some(d => 
                            d.init && d.init.type === 'CallExpression' && 
                            d.init.callee.name === 'require')) {
                        lastImportEnd = statement.end;
                        hasRequires = true;
                    } else if (statement.type === 'ExpressionStatement' &&
                               statement.expression.type === 'CallExpression' &&
                               statement.expression.callee.name === 'require') {
                        lastImportEnd = statement.end;
                        hasRequires = true;
                    } else if (!hasRequires && firstNonImport === content.length) {
                        firstNonImport = statement.start;
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
            if (lastImportEnd > 0) {
                // After existing requires
                content = content.slice(0, lastImportEnd) + '\n' + imports.join('\n') + content.slice(lastImportEnd);
            } else {
                // At the beginning, before first non-import
                const insertPos = Math.min(firstNonImport, content.length);
                if (insertPos === 0) {
                    content = imports.join('\n') + '\n\n' + content;
                } else {
                    content = content.slice(0, insertPos) + imports.join('\n') + '\n\n' + content.slice(insertPos);
                }
            }
            
            fs.writeFileSync(filePath, content);
            return true;
        }
    } catch (e) {
        console.warn(`Error fixing ${filePath}:`, e.message);
    }
    
    return false;
}

// Main iteration loop
let iteration = 0;
let totalFixed = 0;
let lastTotalMissing = -1;

while (true) {
    iteration++;
    console.log(`\nIteration ${iteration}:`);
    console.log('==============');
    
    let filesWithMissing = 0;
    let totalMissing = 0;
    let fixedInIteration = 0;
    
    // Analyze all files
    function processDirectory(dir, prefix = '') {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.join(prefix, entry.name);
            
            if (entry.isDirectory()) {
                processDirectory(fullPath, relativePath);
            } else if (entry.name.endsWith('.js')) {
                const analysis = analyzeFile(fullPath);
                
                if (analysis.missing.size > 0) {
                    filesWithMissing++;
                    totalMissing += analysis.missing.size;
                    
                    if (fixFile(fullPath, analysis.missing)) {
                        fixedInIteration++;
                        totalFixed++;
                    }
                }
            }
        }
    }
    
    processDirectory(outputDir);
    
    console.log(`Files with missing deps: ${filesWithMissing}`);
    console.log(`Total missing deps: ${totalMissing}`);
    console.log(`Fixed in this iteration: ${fixedInIteration}`);
    
    // Check if we're done or stuck
    if (totalMissing === 0) {
        console.log('\n✅ All dependencies resolved!');
        break;
    }
    
    if (totalMissing === lastTotalMissing) {
        console.log('\n⚠️ No progress made in this iteration.');
        console.log('Remaining unresolved dependencies might be:');
        console.log('- Circular dependencies');
        console.log('- Missing from module map');
        console.log('- Incorrectly named functions');
        break;
    }
    
    lastTotalMissing = totalMissing;
    
    if (iteration > 20) {
        console.log('\n⚠️ Reached maximum iterations.');
        break;
    }
}

console.log(`\n✅ Dependency fixing complete!`);
console.log(`   Total iterations: ${iteration}`);
console.log(`   Total fixes applied: ${totalFixed}`);
console.log(`   Output directory: ${outputDir}`);

// Create final build script
console.log('\nCreating build script...');

const buildScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = '${outputDir}';
const output = path.join(__dirname, '../claude-code-complete');
const moduleMap = ${JSON.stringify(moduleMap, null, 2)};

console.log('Building CLI from fully fixed source...');

let cli = \`#!/usr/bin/env node
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

// Externals
try { global.chalk = require('chalk'); } catch(e) { 
    global.chalk = { yellow: s => s, green: s => s, red: s => s, blue: s => s, gray: s => s, default: s => s };
}
try { global.commander = require('commander'); } catch(e) {}

// Module system
const modules = {};
const moduleExports = {};

function define(id, factory) {
    modules[id] = factory;
}

function requireModule(id) {
    if (moduleMap[id]) id = moduleMap[id];
    if (moduleExports[id]) return moduleExports[id];
    
    const builtins = ["fs","path","os","util","child_process","crypto","process","stream","events","url","querystring","http","https","net","tls","zlib","buffer","console","assert","vm"];
    if (builtins.includes(id)) return require(id);
    
    try {
        if (!modules[id]) {
            for (const [k, v] of Object.entries(moduleMap)) {
                if (v === id || v.endsWith('/' + id)) { 
                    id = v; 
                    break; 
                }
            }
        }
        
        if (!modules[id]) {
            return require(id); // Try external
        }
        
        const module = { exports: {} };
        modules[id](module, module.exports, requireModule);
        moduleExports[id] = module.exports;
        return module.exports;
    } catch(e) {
        console.warn('Module error:', id, e.message);
        return {};
    }
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
            const match = content.match(/\\nmodule\\.exports\\s*=\\s*(\\w+);?\\s*$/);
            const name = match ? match[1] : path.basename(modPath);
            content = content.replace(/\\nmodule\\.exports\\s*=\\s*\\w+;?\\s*$/, '');
            
            cli += \`
define('\${modPath}', function(module, exports, require) {
\${content}
module.exports = \${name};
});
\`;
        }
    }
}

loadDir(srcDir);

// Initialize
cli += \`

// Globals
global.N9 = { isNonInteractiveSession: false };
global.wk = () => process.cwd();
global.TU5 = () => {};
global.FA = global.chalk || { yellow: s => s, green: s => s, red: s => s, blue: s => s, gray: s => s, default: s => s };
global.JB = { default: { createElement: (t, p, ...c) => ({type:t,props:p,children:c}), Fragment: Symbol('Fragment') } };
global.k_2 = { context: 'cli' };
global.H4 = () => ({ success: 10, error: 9, warning: 11 });

// Start
try {
    const main = requireModule('errors/handlers_5/main');
    if (typeof main === 'function') {
        main().catch(err => {
            console.error('Error:', err.message);
            process.exit(1);
        });
    }
} catch (e) {
    console.error('Failed to start:', e.message);
    process.exit(1);
}
\`;

fs.writeFileSync(output, cli);
fs.chmodSync(output, '755');
console.log('✅ Built:', output);
console.log('   Size:', (cli.length / 1024 / 1024).toFixed(2), 'MB');
`;

const buildPath = path.join(projectRoot, 'tools/build-complete.js');
fs.writeFileSync(buildPath, buildScript);
fs.chmodSync(buildPath, '755');

console.log('\n🎉 All done! Now run:');
console.log('   node tools/build-complete.js');
console.log('\nThen test with:');
console.log('   ./claude-code-complete --help');
console.log('   ./claude-code-complete -p "Hello"');
console.log('   ./claude-code-complete');