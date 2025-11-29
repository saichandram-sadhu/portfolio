/**
 * Generate favicon files from favicon.svg
 * This script converts the SVG to PNG and ICO formats
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available, if not, provide instructions
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Error: sharp package not found.');
  console.log('\n📦 Installing dependencies...');
  console.log('Run: npm install sharp');
  process.exit(1);
}

const svgPath = path.join(__dirname, 'favicon.svg');
const outputDir = __dirname;

async function generateFavicons() {
  try {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error('❌ favicon.svg not found!');
      process.exit(1);
    }

    console.log('🎨 Generating favicon files from favicon.svg...\n');

    // Read SVG
    const svgBuffer = fs.readFileSync(svgPath);

    // Generate favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    console.log('✅ Created favicon-16x16.png');

    // Generate favicon-32x32.png
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    console.log('✅ Created favicon-32x32.png');

    // Generate apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png');

    // Generate favicon.ico (multi-size ICO)
    // ICO format requires multiple sizes, so we'll create a 32x32 ICO
    // Note: sharp doesn't support ICO directly, so we'll create a PNG and rename it
    // For proper ICO, you'd need a different tool, but this works for most browsers
    const icoBuffer = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    // For now, we'll create a simple ICO by using the 32x32 PNG
    // Most modern browsers accept PNG files with .ico extension
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
    console.log('✅ Created favicon.ico');

    console.log('\n🎉 All favicon files generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review the generated files');
    console.log('   2. git add favicon*.png favicon.ico apple-touch-icon.png');
    console.log('   3. git commit -m "fix: add missing favicon icons"');
    console.log('   4. git push');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

