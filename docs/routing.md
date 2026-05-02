# 路由系统

## 1. 约定式路由

**一个 `pages/` 下的 `.tsx` 文件 = 一个路由。** 框架在构建时自动扫描 `src/caps/` 下所有能力包的 `pages/` 目录。

### 文件名映射规则

| 文件名 | 路由路径 | 说明 |
|--------|---------|------|
| `index.tsx` | `/` | 目录默认页 |
| `list.tsx` | `/list` | 普通页面 |
| `detail.tsx` | `/detail` | 普通页面 |
| `[id].tsx` | `/:id` | 动态参数 |
| `_layout.tsx` | — | 不生成路由 |
| `_utils.ts` | — | 下划线开头 = 忽略 |

路由路径自动加上能力包名前缀：`my-module` 下的 `list.tsx` → `/my-module/list`。

### 能力包目录结构

```
src/caps/
  └── my-module/
      └── pages/
          ├── index.tsx           ← /my-module
          ├── index.meta.json     ← 元信息
          ├── list.tsx            ← /my-module/list
          ├── [id].tsx            ← /my-module/:id
          └── _helpers.ts         ← 忽略（下划线开头）
```

## 2. 路由元信息

每个页面可在同级放一个 `.meta.json` 文件，声明标题、图标等信息：

```json
{
  "title": "用户列表",
  "icon": "📋",
  "order": 2,
  "hidden": false
}
```

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | 文件名 | 页面标题（显示在菜单和标签页） |
| `icon` | string | — | 菜单图标 |
| `order` | number | 0 | 排序（数值小的在前） |
| `hidden` | boolean | false | 是否从菜单中隐藏 |

> 如果后端配置了 ModuleTree，后端字段优先，本地 `.meta.json` 作为兜底。

## 3. 页面覆盖

如果官方能力包（通过 npm 安装的 `caps/` 包）中有页面需要自定义，只需在 `src/caps/` 下创建同路径文件即可覆盖：

```
优先级：src/caps/{capName}/pages/ > 官方 caps/{capName}/src/pages/
```

**示例**：覆盖官方 `cap-user` 的列表页

```tsx
// src/caps/cap-user/pages/list.tsx
export default function MyUserList() {
  return <div>我的自定义用户列表</div>;
}
```

## 4. useRouteMeta() Hook

在任意组件中获取当前路由的完整信息：

```typescript
import { useRouteMeta } from '@qingfengweb/core';

function MyComponent() {
  const meta = useRouteMeta();

  console.log(meta.capName);   // "my-module"
  console.log(meta.path);      // "/my-module/list"
  console.log(meta.title);     // "用户列表"
  console.log(meta.icon);      // "📋"
  console.log(meta.params);    // { id: "123" }（动态路由参数）

  // 后端模块树节点（如果 ModuleTree API 可用）
  if (meta.moduleNode) {
    console.log(meta.moduleNode.nodeType);  // "Menu"
    console.log(meta.moduleNode.access);    // "Allow"
  }

  return <h1>{meta.title}</h1>;
}
```

## 5. 动态路由

使用 `[param].tsx` 文件名创建动态路由：

```tsx
// src/caps/my-module/pages/[id].tsx
import { useRouteMeta } from '@qingfengweb/core';

export default function DetailPage() {
  const { params } = useRouteMeta();

  return <div>详情页，ID: {params.id}</div>;
}
```

访问 `/my-module/123` 时，`params.id` 为 `"123"`。
