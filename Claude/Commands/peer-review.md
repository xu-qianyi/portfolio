A different team lead within the company has reviewed the current code/implementation and provided findings below. Important context:

- **They have less context than you** on this project's history and decisions
- **You are the team lead** - don't accept findings at face value
- Your job is to critically evaluate each finding

Findings from peer review:

### **✅ Looks Good**

- 没有 console.log、TODO、@ts-ignore、any，TypeScript 基本干净。
- useEffect 的事件监听有 cleanup（Escape 键监听已正确移除）。
- Drawer 结构和状态分层是对的：UI 在 AskMarttaDrawer，会话状态在 useMarttaChat。
- 发送按钮的可用状态由输入内容驱动（空输入禁用）是合理的。
- 用户气泡边框/圆角/max-width 已按当前约定落地，整体可维护。

### **⚠️ Issues Found**

- **[HIGH]** portfolio/src/components/AskMarttaDrawer.tsx:340 - Disclaimer 文案与最新你确认的版本不一致。
- 当前是：AI can make mistakes and hallucinate...
- 你之前确认的是：AI assistant can make mistakes and hallucinate...
- Fix: 用当前版本，修改 PRD, 避免 PRD/实现不一致。
- **[MEDIUM]** portfolio/src/components/AskMarttaDrawer.tsx:194-196 - Prompt hover 只处理了 mouse enter/leave，键盘 focus 没有对应视觉反馈。
- Fix: 给 prompt 增加 onFocus/onBlur（或 focus-visible 样式）复用同一 hover 色和背景逻辑。
- **MEDIUM** AskMarttaDrawer.tsx:32 — setTimeout for focus has no cleanup. If the drawer unmounts before 60ms, the timeout fires on an unmounted component.

- Fix: store the timer in a ref and clear it in the effect's cleanup: return () => clearTimeout(timer).

- **MEDIUM** AskMarttaDrawer.tsx:132–178 — Message list uses array index i as key. When mock reply is appended, React may reuse DOM nodes incorrectly causing animation flicker.

- Fix: use a stable unique ID per message. Add id: crypto.randomUUID() to ChatMessage in useMarttaChat.ts and use it as the key.

- **MEDIUM** useMarttaChat.ts:35–38 — The try/catch block catches no real async error because the mock reply is a synchronous assignment. When the real API call is added, errors won't be caught correctly unless await is in place.

- Fix: wrap the future API call in an async function that awaits, so the catch will actually fire.

- **MEDIUM** Shell.tsx:16–18 — Clicking anywhere in the main content column closes the drawer. This includes clicks on nav links, project cards, and interactive content — which may feel surprising to users.

- Fix: only close on clicks that don't originate from interactive elements, or use a dedicated overlay/backdrop instead.

---

