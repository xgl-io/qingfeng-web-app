/**
 * 用户项目 Vite 配置
 *
 * 极简配置 - 所有框架级配置由 @qingfengweb/core 的 qingfengPlugin 自动处理。
 * 包括：React 插件、环境变量注入、开发服务器配置等。
 *
 * 用户只需在此文件中添加自己项目特有的 Vite 配置即可。
 */
import { defineConfig } from 'vite';
import { qingfengPlugin } from '@qingfengweb/core/vite';

export default defineConfig({
  plugins: [qingfengPlugin()],
});
