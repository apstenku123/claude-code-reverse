#!/usr/bin/env node
/**
 * Fix broken dependency injection patterns in source files
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src-fully-fixed');

console.log('Fixing broken dependency injection patterns...');

let fixedCount = 0;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // Pattern 1: const X = X; (self-referential)
    content = content.replace(/^const (\w+) = \1;$/gm, '// Removed: const $1 = $1;');
    
    // Pattern 2: const realName = shortName; where shortName is not defined
    // This happens after imports, so we need to remove these broken reassignments
    const lines = content.split('\n');
    const fixedLines = [];
    let inDependencyInjection = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if we're in the dependency injection section
        if (line.includes('// Dependency injection for testability')) {
            inDependencyInjection = true;
            fixedLines.push(line);
            continue;
        }
        
        // If we're in dependency injection and see const X = Y pattern
        if (inDependencyInjection && line.match(/^const \w+ = \w+;$/)) {
            // Comment it out
            fixedLines.push('// ' + line);
        } else {
            fixedLines.push(line);
            // Reset flag if we hit module.exports
            if (line.includes('module.exports')) {
                inDependencyInjection = false;
            }
        }
    }
    
    content = fixedLines.join('\n');
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        return true;
    }
    
    return false;
}

function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.name.endsWith('.js')) {
            if (fixFile(fullPath)) {
                fixedCount++;
            }
        }
    }
}

processDirectory(srcDir);

console.log(`Fixed ${fixedCount} files`);
console.log('Now rebuilding...');

// Rebuild
require('child_process').execSync('node build-real-cli.js', { stdio: 'inherit' });