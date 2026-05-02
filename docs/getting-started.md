# 快速开始

## 1. 环境要求

| 依赖 | 版本 |
|------|------|
| Node.js | >= 18 |
| pnpm | >= 9 |

## 2. 创建项目

```bash
# 方式一：克隆脚手架模板
git clone git@github.com:xgl-io/qingfeng-web-app.git my-app
cd my-app

# 方式二：手动创建（安装核心依赖）
mkdir my-app && cd my-app
pnpm init
pnpm add @qingfengweb/core @qingfengweb/cli react react-dom
pnpm add -D vite @vitejs/plugin-react typescript
```

## 3. 配置启动命令

修改 `package.json` 中的 scripts，将 `{应用编码}` 和 `{环境}` 替换为实际值：

```json
{
  "scripts": {
    "dev": "qingfeng run:myapp:prod",
    "build": "qingfeng build:myapp:prod"
  }
}
```

| 参数 | 说明 | 示例 |
|------|------|------|
| 应用编码 | Appx 中注册的应用代码 | `myapp` |
| 应用环境 | 后端 API 环境 | `prod`、`test` |
| Appx 环境 | 可选，追加在环境后 | `prod-dev`（应用环境=prod，Appx环境=dev） |

## 4. 启动

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:3000`。

## 5. 项目结构

```
my-app/
  ├── package.json
  ├── index.html
  ├── vite.config.ts          ← 3 行配置
  ├── tsconfig.json
  └── src/
      ├── main.tsx            ← 2 行代码，调用 bootstrap()
      ├── caps/               ← 能力包页面覆盖（按需创建）
      ├── layouts/            ← 自定义布局（可选）
      ├── themes/             ← 自定义主题（可选）
      └── locales/            ← 自定义国际化文案（可选）
```

## 6. 核心文件说明

### `src/main.tsx`

```typescript
import { bootstrap } from '@qingfengweb/core';
bootstrap();
```

一行代码启动完整应用。框架自动完成：
- 从 Appx 获取应用配置（Logo、名称、API 地址等）
- 加载主题和国际化
- 扫描能力包路由
- 渲染响应式布局

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import { qingfengPlugin } from '@qingfengweb/core/vite';

export default defineConfig({
  plugins: [qingfengPlugin()],
});
```

`qingfengPlugin()` 会自动配置 React、环境变量注入、路由扫描等。

## 7. 创建第一个页面

在 `src/caps/` 下创建能力包页面：

```
src/caps/
  └── my-module/
      └── pages/
          ├── index.tsx           ← /my-module
          ├── index.meta.json     ← 页面元信息
          └── list.tsx            ← /my-module/list
```

```tsx
// src/caps/my-module/pages/index.tsx
export default function MyModuleHome() {
  return <h1>我的模块首页</h1>;
}
```

```json
// src/caps/my-module/pages/index.meta.json
{
  "title": "我的模块",
  "icon": "📦",
  "order": 1
}
```

保存后框架自动生成路由，页面出现在侧边栏菜单中。

## 8. 全局常量

以下常量由框架自动注入，可在任意文件中直接使用：

| 常量 | 说明 | 示例 |
|------|------|------|
| `APP_CODE` | 应用编码 | `"myapp"` |
| `APP_ENV` | 应用环境 | `"prod"` |
| `APPX_API_URL` | Appx API 地址 | `"https://appx.site/api/1.0.0"` |
