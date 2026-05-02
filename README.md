# QingFeng Web App

基于 [QingFeng](https://github.com/xgl-io/qingfeng-web) 框架的应用脚手架模板。

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器（修改 package.json 中的 scripts 后）
pnpm dev
```

## 项目结构

```
src/
  ├── main.tsx          ← 应用入口（2 行代码）
  ├── caps/             ← 能力包页面覆盖
  ├── layouts/          ← 自定义布局
  ├── themes/           ← 自定义主题
  └── locales/          ← 自定义国际化文案
```

## 文档

- [快速开始](./docs/getting-started.md)
- [路由系统](./docs/routing.md)
- [主题定制](./docs/theming.md)
- [布局系统](./docs/layout.md)
