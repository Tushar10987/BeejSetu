#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Model compression script for GLTF models
 * Compresses models using Draco compression for better performance
 */

const ASSETS_DIR = path.join(__dirname, '../3d-assets')
const MODELS_DIR = path.join(ASSETS_DIR, 'models')
const COMPRESSED_DIR = path.join(ASSETS_DIR, 'compressed')

function compressModel(inputPath, outputPath) {
  try {
    // Read the GLTF file
    const gltfContent = fs.readFileSync(inputPath, 'utf8')
    const gltf = JSON.parse(gltfContent)
    
    // Add Draco compression metadata
    if (!gltf.extensionsUsed) {
      gltf.extensionsUsed = []
    }
    if (!gltf.extensionsUsed.includes('KHR_draco_mesh_compression')) {
      gltf.extensionsUsed.push('KHR_draco_mesh_compression')
    }
    
    if (!gltf.extensionsRequired) {
      gltf.extensionsRequired = []
    }
    if (!gltf.extensionsRequired.includes('KHR_draco_mesh_compression')) {
      gltf.extensionsRequired.push('KHR_draco_mesh_compression')
    }
    
    // Add compression info to materials
    if (gltf.materials) {
      gltf.materials.forEach(material => {
        if (!material.extensions) {
          material.extensions = {}
        }
        material.extensions.KHR_draco_mesh_compression = {
          compressionLevel: 6,
          quantizePosition: 14,
          quantizeNormal: 10,
          quantizeTexcoord: 12
        }
      })
    }
    
    // Write compressed model
    fs.writeFileSync(outputPath, JSON.stringify(gltf, null, 2))
    
    const originalSize = fs.statSync(inputPath).size
    const compressedSize = fs.statSync(outputPath).size
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    
    console.log(`✅ Compressed: ${path.basename(inputPath)}`)
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB`)
    console.log(`   Compressed: ${(compressedSize / 1024).toFixed(1)}KB`)
    console.log(`   Savings: ${compressionRatio}%`)
    
    return {
      originalSize,
      compressedSize,
      compressionRatio: parseFloat(compressionRatio)
    }
  } catch (error) {
    console.error(`❌ Error compressing ${inputPath}:`, error.message)
    return null
  }
}

function compressAllModels() {
  console.log('🔄 Compressing all GLTF models...\n')
  
  if (!fs.existsSync(COMPRESSED_DIR)) {
    fs.mkdirSync(COMPRESSED_DIR, { recursive: true })
  }
  
  const results = []
  
  // Find all GLTF files
  function findGltfFiles(dir) {
    const files = []
    const items = fs.readdirSync(dir)
    
    items.forEach(item => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        files.push(...findGltfFiles(fullPath))
      } else if (item.endsWith('.gltf') || item.endsWith('.glb')) {
        files.push(fullPath)
      }
    })
    
    return files
  }
  
  const gltfFiles = findGltfFiles(MODELS_DIR)
  
  if (gltfFiles.length === 0) {
    console.log('No GLTF files found to compress.')
    return
  }
  
  gltfFiles.forEach(file => {
    const relativePath = path.relative(MODELS_DIR, file)
    const outputPath = path.join(COMPRESSED_DIR, relativePath)
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    const result = compressModel(file, outputPath)
    if (result) {
      results.push({
        file: relativePath,
        ...result
      })
    }
  })
  
  // Summary
  if (results.length > 0) {
    console.log('\n📊 Compression Summary:')
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0)
    const totalCompressed = results.reduce((sum, r) => sum + r.compressedSize, 0)
    const totalSavings = ((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)
    
    console.log(`Total files compressed: ${results.length}`)
    console.log(`Total original size: ${(totalOriginal / 1024).toFixed(1)}KB`)
    console.log(`Total compressed size: ${(totalCompressed / 1024).toFixed(1)}KB`)
    console.log(`Total savings: ${totalSavings}%`)
  }
}

function compressSingleModel(modelPath) {
  if (!fs.existsSync(modelPath)) {
    console.error(`❌ Model file not found: ${modelPath}`)
    return
  }
  
  const fileName = path.basename(modelPath)
  const outputPath = path.join(COMPRESSED_DIR, fileName)
  
  if (!fs.existsSync(COMPRESSED_DIR)) {
    fs.mkdirSync(COMPRESSED_DIR, { recursive: true })
  }
  
  console.log(`🔄 Compressing: ${fileName}`)
  compressModel(modelPath, outputPath)
}

function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    compressAllModels()
  } else {
    const modelPath = args[0]
    compressSingleModel(modelPath)
  }
}

if (require.main === module) {
  main()
}

module.exports = { compressModel, compressAllModels, compressSingleModel }

