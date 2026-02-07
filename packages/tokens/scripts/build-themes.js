import StyleDictionary from 'style-dictionary';
import configs from '../config-new.js';

console.log('🎨 Building Luma themes...\n');

configs.forEach((config, index) => {
  const themeName = config.platforms.css.files[0].options.theme;
  console.log(`Building ${themeName} theme...`);

  const sd = new StyleDictionary(config);
  sd.buildAllPlatforms();

  console.log(`✅ ${themeName} theme built successfully\n`);
});

console.log('🎉 All themes built successfully!');
