# 布局系统

## 1. 内置布局

框架内置两个布局，根据浏览器视口自动切换：

### Default 布局（PC 和平板，>= 768px）

```
┌──────────────────────────────────────────────────┐
│  Sidebar  │  Header: [语言] [主题]               │
│  [Logo]   ├──────────────────────────────────────┤
│  [应用名] │  Tab Bar: [首页] [页面A] [×] ...     │
│  ──────── ├──────────────────────────────────────┤
│  [菜单]   │                                      │
│           │      当前标签页内容                   │
│           │                                      │
├───────────┴──────────────────────────────────────┤
│  Footer: [版权]              ← 默认隐藏          │
└──────────────────────────────────────────────────┘
```

### Mobile 布局（移动端，< 768px）

```
┌──────────────────────────┐
│  Header: [Logo] [应用名] │
├──────────────────────────┤
│                          │
│      页面内容（全屏）     │
│                          │
├──────────────────────────┤
│  BottomNav: [首页] [...] │
└──────────────────────────┘
```

## 2. 自定义布局

在 `src/layouts/` 下创建目录：

```
src/layouts/
  └── portal/
      ├── layout.meta.json        ← 平台声明
      └── PortalLayout.tsx        ← 布局组件
```

### layout.meta.json

```json
{
  "platform": "desktop",
  "description": "门户风格布局"
}
```

| `platform` 值 | 说明 |
|----------------|------|
| `desktop` | PC 和平板（>= 768px） |
| `mobile` | 移动端（< 768px） |
| `all` | 全平台 |

### 布局组件

```tsx
// src/layouts/portal/PortalLayout.tsx
interface PortalLayoutProps {
  children?: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div>
      <header>门户顶栏</header>
      <main>{children}</main>
      <footer>门户底部</footer>
    </div>
  );
}
```

### 覆盖默认布局

创建同名目录即可覆盖框架内置布局：

```
src/layouts/default/     ← 覆盖 PC 布局
src/layouts/mobile/      ← 覆盖移动端布局
```

## 3. KeepAlive 标签页

PC 模式下，框架自动启用多标签页功能：

| 操作 | 说明 |
|------|------|
| 路由导航 | 自动新增标签页 |
| 点击标签 | 切换到该页面 |
| 点击 × | 关闭标签页 |
| 右键菜单 | 刷新 / 关闭 / 关闭其他 / 关闭全部 |

### 在组件中操作标签页

```typescript
import { useKeepAliveTabs } from '@qingfengweb/core';

function MyComponent() {
  const { tabs, activeTab, addTab, closeTab } = useKeepAliveTabs();

  return (
    <button onClick={() => addTab('/settings', '设置')}>
      打开设置页
    </button>
  );
}
```

## 4. 布局注册 API

如需在代码中手动注册布局：

```typescript
import { registerLayout } from '@qingfengweb/core';
import MyLayout from './MyLayout';

registerLayout({
  name: 'custom',
  meta: { platform: 'desktop', description: '自定义布局' },
  component: MyLayout,
});
```

## 5. 国际化

### 添加文案

在 `src/locales/` 下创建语言目录：

```json
// src/locales/zh-CN/common.json
{
  "myModule": {
    "title": "我的模块",
    "greeting": "你好，{name}"
  }
}
```

```json
// src/locales/en-US/common.json
{
  "myModule": {
    "title": "My Module",
    "greeting": "Hello, {name}"
  }
}
```

### 使用

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('myModule.title')}</h1>;
}
```

### 切换语言

```typescript
import { useAppConfig, i18n } from '@qingfengweb/core';

function LanguageSwitcher() {
  const { locale, setLocale } = useAppConfig();

  const toggle = () => {
    const newLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  return <button onClick={toggle}>当前: {locale}</button>;
}
```

语言偏好自动持久化到 `localStorage`。
