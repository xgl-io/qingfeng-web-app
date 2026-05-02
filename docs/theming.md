# 主题定制

## 1. 内置主题

框架内置两个主题：`light`（默认）和 `dark`。

切换主题：

```typescript
import { useAppConfig } from '@qingfengweb/core';

function ThemeSwitch() {
  const { theme, setTheme } = useAppConfig();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前: {theme}
    </button>
  );
}
```

用户的主题偏好自动持久化到 `localStorage`。

## 2. 覆盖已有主题

在 `src/themes/` 下创建同名目录，只写需要修改的变量：

```css
/* src/themes/light/tokens.css */
:root,
[data-theme="light"] {
  --qf-color-primary: #722ed1;   /* 改为紫色品牌色 */
  --qf-sidebar-bg: #1a1a2e;     /* 改为深蓝侧边栏 */
}
```

框架会将你的变量与默认主题合并，未覆盖的变量保持默认值。

## 3. 创建新主题

```css
/* src/themes/brand/tokens.css */
[data-theme="brand"] {
  --qf-color-primary: #e63946;
  --qf-color-bg-layout: #f1faee;
  --qf-color-bg-container: #ffffff;
  --qf-color-text: #1d3557;
  --qf-sidebar-bg: #1d3557;
  --qf-sidebar-text: #f1faee;
  /* ... 定义全部所需变量 */
}
```

然后通过代码切换：

```typescript
const { setTheme } = useAppConfig();
setTheme('brand');
```

## 4. Token 参考

所有 CSS Variable 以 `--qf-` 为前缀。完整列表参见框架源码 `@qingfengweb/core/src/themes/light/tokens.css`。

### 常用 Token

| Token | 说明 | Light 默认值 |
|-------|------|-------------|
| `--qf-color-primary` | 品牌主色 | `#1677ff` |
| `--qf-color-bg-layout` | 页面背景 | `#f0f2f5` |
| `--qf-color-bg-container` | 容器背景 | `#ffffff` |
| `--qf-color-text` | 正文文字 | `#1a1a2e` |
| `--qf-color-text-secondary` | 辅助文字 | `#666666` |
| `--qf-color-border` | 边框 | `#d9d9d9` |
| `--qf-sidebar-bg` | 侧边栏背景 | `#001529` |
| `--qf-sidebar-width` | 侧边栏宽度 | `240px` |
| `--qf-radius-sm` | 小圆角 | `4px` |
| `--qf-radius-md` | 中圆角 | `8px` |
| `--qf-font-size-base` | 基础字号 | `14px` |
| `--qf-transition-duration` | 过渡时长 | `0.2s` |

### 规则

- 组件样式**只引用 CSS Variables**，禁止硬编码颜色值
- 主题切换通过 `data-theme` 属性实现，无 JS 性能开销
