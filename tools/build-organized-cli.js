#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/build-organized-cli.js
 * File name: build-organized-cli.js
 * Author: davidgornshtein@gmail.com
 * Description: Builds the CLI from the organized source structure
 * Purpose: Creates an executable CLI from properly categorized modules
 * Patterns: Module collection, dependency resolution, CommonJS bundling
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    sourceDir: path.join(__dirname, '../src-organized'),
    outputFile: path.join(__dirname, '../cli-organized.cjs'),
    moduleMapFile: path.join(__dirname, '../module-map.json')
};

// Node.js modules to import
const NODE_MODULES = [
    'fs', 'path', 'os', 'util', 'child_process', 
    'crypto', 'process', 'stream', 'events', 'url',
    'querystring', 'http', 'https', 'net', 'tls',
    'zlib', 'buffer', 'console', 'assert', 'vm'
];

// External modules that should use Node.js require
const EXTERNAL_MODULES = [
    'commander', '@babel/parser', '@babel/traverse', '@babel/generator',
    'chalk', 'dotenv', 'glob', 'rimraf', 'mkdirp'
];

// Collect all modules recursively
function collectModules(dir, baseDir = dir, modules = {}, moduleMap = {}) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            collectModules(filePath, baseDir, modules, moduleMap);
        } else if (file.endsWith('.js')) {
            const relativePath = path.relative(baseDir, filePath);
            const moduleName = relativePath.replace(/\.js$/, '').replace(/\\/g, '/');
            
            // Read the file
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Extract the function name from the file
            const functionNameMatch = content.match(/function\s+(\w+)|const\s+(\w+)\s*=|module\.exports\s*=\s*{\s*(\w+)/);
            const functionName = functionNameMatch ? (functionNameMatch[1] || functionNameMatch[2] || functionNameMatch[3]) : path.basename(file, '.js');
            
            // Store both the categorized path and the function name
            modules[moduleName] = content;
            moduleMap[functionName] = moduleName;
            
            // Also store with original name pattern if it looks like a refactored name
            if (functionName.includes('_')) {
                const originalName = functionName.split('_').pop();
                if (!moduleMap[originalName]) {
                    moduleMap[originalName] = moduleName;
                }
            }
        }
    }
    
    return { modules, moduleMap };
}

// Generate the bundled output
function generateBundle(modules, moduleMap) {
    let output = `#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * Claude Code CLI v1.0.19 - Organized Build
 * Built from reverse-engineered and reorganized source
 */

'use strict';

// Import Node.js built-in modules
${NODE_MODULES.map(m => `const ${m} = require('${m}');`).join('\n')}

// Module system
const modules = {};
const moduleExports = {};
const moduleMap = ${JSON.stringify(moduleMap, null, 2)};

// Define function for registering modules
function define(id, factory) {
    modules[id] = factory;
}

// Custom require function
function requireModule(id) {
    // Check module map for function names
    if (moduleMap[id]) {
        id = moduleMap[id];
    }
    
    // Check if already loaded
    if (moduleExports[id]) {
        return moduleExports[id];
    }
    
    // Check if it's a built-in or external module
    if (${JSON.stringify(NODE_MODULES)}.includes(id) || ${JSON.stringify(EXTERNAL_MODULES)}.includes(id)) {
        try {
            return require(id);
        } catch (e) {
            console.error('Failed to load external module:', id, e.message);
            return {};
        }
    }
    
    // Check if module exists
    if (!modules[id]) {
        // Try variations
        const variations = [
            id,
            id.replace(/^app\\//, ''),
            id.replace(/^core\\//, ''),
            id.replace(/^unknown\\//, ''),
            'utils/general/' + id,
            'patterns/accessors/' + id,
            'patterns/factories/' + id
        ];
        
        for (const variant of variations) {
            if (modules[variant]) {
                id = variant;
                break;
            }
        }
        
        if (!modules[id]) {
            console.warn('Module not found:', id);
            return {};
        }
    }
    
    // Create module exports object
    const module = { exports: {} };
    const exports = module.exports;
    
    // Execute module factory
    try {
        modules[id](module, exports, requireModule);
    } catch (error) {
        console.error('Error loading module:', id, error);
        return {};
    }
    
    // Cache and return exports
    moduleExports[id] = module.exports;
    return module.exports;
}

// Make requireModule available globally
global.requireModule = requireModule;

`;

    // Add all modules
    for (const [moduleName, moduleContent] of Object.entries(modules)) {
        // Wrap module content
        const wrappedContent = `
define('${moduleName}', function(module, exports, require) {
${moduleContent.replace(/require\(/g, 'requireModule(')}
});
`;
        output += wrappedContent;
    }

    // Add main execution
    output += `
// Main execution
try {
    // Try to load the main CLI module from various locations
    const cliModule = requireModule('errors/logging_2/initializeClaudeCli') ||
                     requireModule('app/initializeClaudeCli') || 
                     requireModule('initializeClaudeCli') ||
                     requireModule('config/initialization/initializeClaudeCli') ||
                     requireModule('errors/logging/initializeClaudeCli');
    
    if (cliModule && typeof cliModule === 'function') {
        cliModule();
    } else if (cliModule && cliModule.default) {
        cliModule.default();
    } else if (cliModule && cliModule.initializeClaudeCli) {
        cliModule.initializeClaudeCli();
    } else {
        console.error('Could not find CLI initialization function');
        console.log('Available modules:', Object.keys(modules).filter(m => m.includes('Cli')).slice(0, 10));
    }
} catch (error) {
    console.error('Failed to start CLI:', error);
    process.exit(1);
}
`;

    return output;
}

// Main build function
async function buildOrganizedCLI() {
    console.log('Building organized CLI...\n');
    
    // Check if organized source exists
    if (!fs.existsSync(CONFIG.sourceDir)) {
        console.error(`Source directory not found: ${CONFIG.sourceDir}`);
        console.log('Please run reorganize-functions.js first');
        process.exit(1);
    }
    
    // Collect all modules
    console.log('Collecting modules...');
    const { modules, moduleMap } = collectModules(CONFIG.sourceDir);
    console.log(`Found ${Object.keys(modules).length} modules`);
    
    // Save module map for debugging
    fs.writeFileSync(CONFIG.moduleMapFile, JSON.stringify(moduleMap, null, 2));
    console.log(`Module map saved to: ${CONFIG.moduleMapFile}`);
    
    // Generate bundle
    console.log('\nGenerating bundle...');
    const bundle = generateBundle(modules, moduleMap);
    
    // Write output
    fs.writeFileSync(CONFIG.outputFile, bundle);
    fs.chmodSync(CONFIG.outputFile, '755');
    
    console.log(`\n✓ Build complete: ${CONFIG.outputFile}`);
    console.log(`  Size: ${(fs.statSync(CONFIG.outputFile).size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Modules: ${Object.keys(modules).length}`);
    
    // Show sample module categories
    const categories = {};
    for (const moduleName of Object.keys(modules)) {
        const category = moduleName.split('/')[0];
        categories[category] = (categories[category] || 0) + 1;
    }
    
    console.log('\nModule distribution:');
    for (const [category, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${category}: ${count} modules`);
    }
}

// Run build
if (require.main === module) {
    buildOrganizedCLI().catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    });
}

module.exports = { buildOrganizedCLI };