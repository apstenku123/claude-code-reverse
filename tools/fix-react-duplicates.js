#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/fix-react-duplicates.js
 * File name: fix-react-duplicates.js
 * Author: davidgornshtein@gmail.com
 * Description: Fixes duplicate React declarations
 * Purpose: Clean up source files before final build
 * Patterns: File processing, duplicate removal
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src-fully-fixed');

console.log('Fixing duplicate declarations...');

let fixedCount = 0;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // Fix duplicate React declarations
    // Pattern: const React = require(...); followed by const React = ...
    content = content.replace(
        /const React = require\([^)]+\);\s*\nconst React = [^;]+;/g,
        (match) => {
            const lines = match.split('\n');
            // Keep the second declaration (usually the more specific one)
            return lines[1];
        }
    );
    
    // Also fix where React is assigned from Qy1
    content = content.replace(
        /const React = Qy1\.default;/g,
        '// React already defined above'
    );
    
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

// Now run the build
console.log('\nRunning final build...');
const { execSync } = require('child_process');
execSync('node tools/build-final-deduplicated.js', { stdio: 'inherit' });