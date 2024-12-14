import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

async function getOptimizeDepsElementPlusIncludes() {
  const optimizeDepsElementPlusIncludes = ["element-plus/es"];
  const componentsDir = path.join('node_modules', 'element-plus', 'es', 'components');
  
  if (fs.existsSync(componentsDir)) {
    const componentDirs = fs.readdirSync(componentsDir);
    for (const dirname of componentDirs) {
      const stylePath = path.join(componentsDir, dirname, 'style', 'css.mjs');
      if (fs.existsSync(stylePath)) {
        optimizeDepsElementPlusIncludes.push(`element-plus/es/components/${dirname}/style/css`);
      }
    }
  }

  return optimizeDepsElementPlusIncludes;
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const optimizeDepsElementPlusIncludes = await getOptimizeDepsElementPlusIncludes();

  return {
    plugins: [vue()],
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    }
  };
});