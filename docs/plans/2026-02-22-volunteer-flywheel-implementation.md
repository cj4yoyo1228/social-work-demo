# 永續志工：阿明的成長數據飛輪 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 製作一個 React CDN 互動展示頁面，展示志工從「職場基準設定 → AI 行為轉譯 → 數據化資產」的完整數據飛輪。

**Architecture:** 單一 HTML 檔案（`demo4-volunteer-flywheel.html`），透過 CDN 載入 React 18、Babel Standalone、Tailwind CSS。所有 React 元件寫在 `<script type="text/babel">` 區塊中。雷達圖用 SVG 手刻。狀態管理用 React useState/useEffect。

**Tech Stack:** React 18 (CDN), Babel Standalone (CDN), Tailwind CSS (CDN), SVG, Noto Sans TC (Google Fonts)

---

## 注意事項

- 這是純前端展示，**沒有後端、沒有 npm**
- 所有程式碼在一個 HTML 檔案中（React CDN 模式）
- 驗證方式：瀏覽器開啟確認畫面和互動正確
- 設計文件：`docs/plans/2026-02-22-volunteer-flywheel-design.md`
- 專案目錄：`/Users/shanyuhu/Projects/social-work-demo/`

## 色彩 Token

```
品牌藍（主色）: #1E40AF (深), #3B82F6 (亮)
暖橘（成長）: #EA580C (深), #F97316 (亮)
深灰（標題）: #1E293B
背景: #F8FAFC
卡片: #FFFFFF
成功綠: #10B981
```

---

### Task 1: HTML 骨架 + React App Shell + 頂部導覽

**Files:**

- Create: `demo4-volunteer-flywheel.html`

**Step 1: 建立 HTML 檔案骨架**

建立 `demo4-volunteer-flywheel.html`，包含：

1. `<head>` 區塊：
   - `<meta charset="UTF-8">` + viewport
   - `<title>永續志工：阿明的成長數據飛輪</title>`
   - Google Fonts: Noto Sans TC (300;400;500;700;900)
   - Tailwind CSS CDN: `https://cdn.tailwindcss.com`
   - React 18 CDN: `https://unpkg.com/react@18/umd/react.production.min.js`
   - ReactDOM 18 CDN: `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
   - Babel Standalone: `https://unpkg.com/@babel/standalone/babel.min.js`
   - Tailwind config：自訂 fontFamily 為 Noto Sans TC
   - `<style>` 區塊：CSS keyframes 動畫（fadeIn, fadeInUp, slideInRight, pulse, scaleIn, progressBar, radarBloom）

2. `<body>` 區塊：
   - `<div id="root"></div>`
   - `<script type="text/babel">` 包含所有 React 程式碼

3. React App 元件：
   - `currentStage` state（1, 2, 3, 4 代表四個狀態）
   - `stageTransition` state（控制淡入淡出）
   - `goToStage(n)` 函式：先設 transition → 延遲 300ms → 切換 stage → 移除 transition
   - 渲染：頂部導覽 `<TopNav>` + 根據 currentStage 渲染對應元件

4. `TopNav` 元件：
   - 固定在頁面頂部，白底 + 底部陰影
   - 左側：`← 回到首頁`（連結到 index.html）
   - 中間：進度指示器（三個圓點 + 連線）
     - 每個圓點：未到 = 灰色空心、當前 = 品牌藍實心脈衝、已過 = 品牌藍實心
     - 圓點之間的線：已過 = 品牌藍、未到 = 灰色
     - 圓點下方小字：「第一站」「第二站」「第三站」
   - 右側：「永續志工數據飛輪」標題文字

**Step 2: 瀏覽器驗證**

```
open /Users/shanyuhu/Projects/social-work-demo/demo4-volunteer-flywheel.html
```

確認：頁面正常載入、導覽列正確顯示、三個進度圓點顯示、左側連結能回首頁。

**Step 3: Commit**

```bash
git add demo4-volunteer-flywheel.html
git commit -m "feat: 新增阿明成長數據飛輪 — HTML 骨架與導覽列"
```

---

### Task 2: 第一站 — 職場指標對標 (3.1)

**Files:**

- Modify: `demo4-volunteer-flywheel.html`

**Step 1: 建立 Stage1 元件**

在 `<script type="text/babel">` 中新增 `Stage1` 元件：

1. 假資料（寫在元件外面，全域常數）：

```javascript
const SKILLS = [
  {
    id: "communication",
    name: "溝通力",
    icon: "💬",
    corpDef: "有效傳遞資訊並達成共識。",
    ylDef: "能引導不同背景的學童進行情緒表達與衝突調解。",
    color: "blue",
  },
  {
    id: "leadership",
    name: "領導力",
    icon: "🎯",
    corpDef: "帶領團隊達成目標，激發成員潛能。",
    ylDef: "能在混齡環境中安排小組任務並激勵學童參與。",
    color: "purple",
  },
  {
    id: "problem-solving",
    name: "問題解決",
    icon: "🧩",
    corpDef: "分析問題根因並提出有效解決方案。",
    ylDef: "能因應課堂突發狀況即時調整教學策略。",
    color: "green",
  },
  {
    id: "teamwork",
    name: "團隊合作",
    icon: "🤝",
    corpDef: "與他人協作完成共同目標。",
    ylDef: "能與班導師、家長及其他志工有效協調配合。",
    color: "pink",
  },
  {
    id: "resilience",
    name: "韌性",
    icon: "💪",
    corpDef: "面對挫折能快速調適並持續前進。",
    ylDef: "面對學童情緒爆發或教學挫折，能調整心態繼續投入。",
    color: "orange",
  },
  {
    id: "empathy",
    name: "同理心",
    icon: "❤️",
    corpDef: "理解他人感受並做出適當回應。",
    ylDef: "能感知學童情緒變化，用適齡的方式給予支持。",
    color: "red",
  },
];
```

2. 元件結構：
   - 標題區：「🏢 永齡職場力字典」+ 副標「點擊任一能力，看看企業怎麼定義，永齡怎麼實踐」
   - 2x3 網格（`grid grid-cols-2 md:grid-cols-3 gap-4`）
   - 每張卡片：
     - `selectedSkill` state 追蹤哪張被選
     - 未選中：半透明背景 + icon + 能力名稱，hover 時微浮起
     - 選中（只對「溝通力」有完整展開效果，其他卡片點擊也能展開但不觸發階段進展）：
       - 卡片展開（transition: max-height），顯示：
         - 🏢 企業定義：{corpDef}
         - 🌱 永齡實作：{ylDef}
   - 當「溝通力」被選中後，底部顯示「前往第二站 →」按鈕（品牌藍背景）

**Step 2: 瀏覽器驗證**

```
重新整理頁面
```

確認：六張能力卡片正確顯示、點擊溝通力卡片展開定義、出現「前往第二站」按鈕、點擊按鈕切換到空白的 Stage 2。

**Step 3: Commit**

```bash
git add demo4-volunteer-flywheel.html
git commit -m "feat: 新增第一站 — 職場指標對標（能力卡片 + 展開互動）"
```

---

### Task 3: 第二站 — 行為轉譯 & AI 追問 (3.2 & 3.3)

**Files:**

- Modify: `demo4-volunteer-flywheel.html`

**Step 1: 建立 Stage2 元件**

在 `<script type="text/babel">` 中新增 `Stage2` 元件。

1. State 管理：
   - `translating`: boolean — 是否正在轉譯中
   - `translated`: boolean — 轉譯是否完成
   - `answered`: boolean — 使用者是否已回答 AI 追問
   - `selectedAnswer`: string — 選了哪個回答
   - `showGrowth`: boolean — 是否顯示成長指標飛入動畫
   - `showBadge`: boolean — 是否顯示勳章解鎖

2. 進場自動觸發：`useEffect` 中 → 延遲 500ms 開始 `translating = true` → 2 秒後 `translated = true, translating = false`

3. 佈局：`flex flex-col lg:flex-row gap-8`

4. **左側（日誌區）：**
   - 標題：「📝 阿明的課後日誌」+ 日期「第 8 週 — 2026/02/18」
   - 日誌卡片（淺黃背景 `bg-amber-50`，模擬手寫感）：
     - 文字：「今天小明跟小強吵架不寫功課，我很心累但還是先讓他們冷靜，分開坐之後跟他們個別聊了一下。小明後來有跟小強道歉，雖然花了很多時間但看到他們和好覺得很值得。」
   - 下方轉譯區：
     - `translating` 為 true：「🔄 AI 轉譯中...」+ 脈衝動畫（三個跳動圓點）
     - `translated` 為 true：轉譯結果卡片
       - 「✅ 衝突解決」— 藍色標籤
       - 「✅ 情緒管理」— 藍色標籤
       - 「✅ 引導能力」— 藍色標籤
       - 淡入動畫

5. **右側（AI 對話區）：**
   - 標題：「🤖 AI 成長教練」
   - 對話氣泡區域（`bg-slate-50` 圓角卡片）：
     - AI 氣泡（左側，品牌藍背景白字）：「阿明，面對這種挫折，你是如何調整策略的？」
       - 在 `translated` 為 true 後延遲 500ms 出現（fadeIn 動畫）
     - 兩個回答選項按鈕（只在 AI 問題出現後顯示）：
       - 「我先讓自己冷靜，再想別的方法引導他們」
       - 「我請其他志工幫忙分開他們」
     - 使用者點擊 → 阿明的回答出現（右側氣泡，暖橘背景）
     - 延遲 600ms → `showGrowth = true` → 成長指標飛入：
       - 「📈 韌性指標 ↑ 15%」（slideInRight 動畫，暖橘色卡片）
     - 延遲 1000ms → `showBadge = true` → 勳章解鎖：
       - 「🏅 解鎖成就：逆境調適者」（scaleIn + 光暈動畫，金色邊框卡片）

6. 底部：`answered` 為 true 後顯示「前往第三站 →」按鈕

**Step 2: 瀏覽器驗證**

確認完整流程：進入第二站 → 日誌顯示 → AI 轉譯動畫 → 轉譯結果 → AI 追問出現 → 點選回答 → 韌性指標飛入 → 勳章解鎖 → 出現前往第三站按鈕。

**Step 3: Commit**

```bash
git add demo4-volunteer-flywheel.html
git commit -m "feat: 新增第二站 — AI 行為轉譯與追問互動"
```

---

### Task 4: 第三站 — SVG 雷達圖 + 數位履歷 (3.4 & 3.5)

**Files:**

- Modify: `demo4-volunteer-flywheel.html`

**Step 1: 建立 RadarChart 元件**

SVG 雷達圖元件，接收 `data`（五個頂點的數值）和 `onVertexClick` callback。

1. 常數：
   - `RADAR_SKILLS = ['溝通力', '問題解決', '韌性', '同理心', '領導力']`
   - `RADAR_VALUES = [85, 92, 88, 78, 72]`（0-100 分）
   - `RADAR_EVIDENCE` 物件：每個技能對應的行為證跡

```javascript
const RADAR_EVIDENCE = {
  溝通力: {
    week: 5,
    title: "引導學童表達情緒",
    desc: "成功引導小明用語言描述自己的感受，避免肢體衝突。",
  },
  問題解決: {
    week: 10,
    title: "突發狀況處理",
    desc: "課堂投影機故障時，即時改用分組討論活動填補空白。",
  },
  韌性: {
    week: 8,
    title: "衝突處理回覆",
    desc: "面對兩位學童激烈衝突，耐心引導雙方冷靜並達成和解。",
  },
  同理心: {
    week: 12,
    title: "察覺學童情緒變化",
    desc: "注意到小華連續兩天沉默，主動關心後發現家庭問題。",
  },
  領導力: {
    week: 15,
    title: "帶領小組完成任務",
    desc: "指導四人小組完成環保主題海報，每位組員都有貢獻。",
  },
};
```

2. SVG 結構（viewBox="0 0 300 300"，中心 150,150）：
   - 背景多邊形（三層同心五邊形，灰色虛線）：25%、50%、75%、100% 刻度
   - 軸線：中心到每個頂點的灰色線
   - 數據多邊形：`animationProgress` state（0→1，1.2 秒 ease-out）
     - 用 `useEffect` + `requestAnimationFrame` 控制
     - 實際數值 = `RADAR_VALUES[i] * animationProgress`
     - 填充：品牌藍半透明 `rgba(59, 130, 246, 0.2)`
     - 邊框：品牌藍 `#3B82F6`
   - 頂點圓點：每個頂點一個可點擊的圓（r=8，品牌藍填充）
     - hover：放大到 r=10 + 光暈
     - 點擊：觸發 `onVertexClick(skillName)`
   - 頂點標籤：每個頂點外側的文字 + 分數

3. 計算輔助函式：
   - `getPoint(centerX, centerY, radius, angleIndex, totalPoints)` → 回傳 {x, y}
   - 角度：從頂部（-90°）開始，順時針均分

**Step 2: 建立 Stage3 元件**

1. State：
   - `selectedVertex`: string | null — 當前選中的雷達圖頂點
   - 預設 `selectedVertex = null`

2. 佈局：`flex flex-col lg:flex-row gap-8`

3. **左側（60%）：** 雷達圖區
   - 標題：「📊 阿明的 18 週能力成長」
   - `<RadarChart>` 元件
   - 底部提示：「👆 點擊雷達圖上的能力頂點，查看行為證跡」

4. **右側（40%）：** 數位履歷預覽
   - 標題：「📄 數位履歷預覽」
   - 如果 `selectedVertex` 不為 null：
     - 行為證跡卡片（暖橘邊框）：
       - 標題：「🔍 行為證跡」
       - 「第 {week} 週 — {title}」
       - 描述文字
       - fadeIn 動畫
   - 固定顯示區域：
     - **成就摘要**（白色卡片）：
       - 「服務期間展現卓越韌性，處理超過 10 次以上突發情緒危機。在 18 週的服務歷程中，阿明展現了顯著的個人成長軌跡。」
     - **數據亮點**（三個迷你卡片一行）：
       - 「問題解決 PR 92」
       - 「韌性指標 Top 15%」
       - 「同理心 ↑ 32%」

5. **底部：** [下載永續背書之職場數位履歷] 大按鈕（暖橘漸層背景 + 白色文字 + 下載 icon）

**Step 3: 瀏覽器驗證**

確認：雷達圖綻放動畫 → 點擊「韌性」頂點 → 右側彈出行為證跡 → 數據亮點顯示 → 下載按鈕可見。

**Step 4: Commit**

```bash
git add demo4-volunteer-flywheel.html
git commit -m "feat: 新增第三站 — SVG 雷達圖 + 數位履歷預覽"
```

---

### Task 5: 狀態 4 — 證書視角

**Files:**

- Modify: `demo4-volunteer-flywheel.html`

**Step 1: 建立 CertificateView 元件**

1. 當使用者在 Stage3 點擊「下載數位履歷」按鈕時，不直接跳到 Stage 4，而是先顯示「生成中」覆蓋層。

2. 進場動畫流程（在 Stage3 中處理）：
   - `generating` state = true
   - 顯示全螢幕半透明覆蓋層 + 居中卡片：
     - 「🔄 正在生成您的數位履歷...」
     - 進度條動畫（0% → 100%，3 秒線性）
     - 進度文字：「整理能力數據...」→ 1s →「匹配職場標準...」→ 1s →「產出認證報告...」
   - 3 秒後呼叫 `goToStage(4)`

3. `CertificateView` 元件（Stage 4）：
   - 整體容器：白色背景，居中，max-width 800px，模擬 A4 紙張感
   - 外框：品牌藍細邊框 + 角落裝飾（四角有小裝飾線條或圖案）

   - **頂部（認證標章區）：**
     - 居中：「永齡希望小學」
     - 副標：「數位能力認證標章」
     - 品牌藍漸層底色，白字，padding 充足
     - 下方金色分隔線

   - **中間（個人資訊區）：**
     - 圓形頭像佔位（灰色漸層圓形 + 「阿明」文字，80x80）
     - 姓名：「志工 陳阿明」（大字粗體）
     - 服務摘要：「2025 年秋季學期 ∣ 18 週服務 ∣ 累計 216 小時」

   - **核心（職場競爭力報告）：**
     - 標題：「職場競爭力報告」
     - 左側：小型雷達圖（復用 RadarChart 元件，但尺寸較小，viewBox 不變但容器 200x200）
     - 右側：五個能力的文字列表
       - 每一項：能力名 + 進度條 + 分數
       - 進度條顏色依分數高低（高=品牌藍，中=暖橘，低=灰）
     - 下方摘要文字：「綜合評比：PR 85 ∣ 表現優於 85% 的同期志工」

   - **底部（動作按鈕區）：**
     - [🖨️ 列印此證書] 按鈕（品牌藍邊框，點擊後 toast「Demo 模式：列印功能即將開放」）
     - [🔗 分享至 LinkedIn] 按鈕（品牌藍填充，點擊後 toast「Demo 模式：分享功能即將開放」）
     - 兩個按鈕水平排列

   - 最底部：「← 重新體驗」小連結（回到 Stage 1）

**Step 2: Toast 通知元件**

建立簡單的 `Toast` 元件：

- `toastMessage` state（全域，或用 context）
- 非空時顯示在頁面底部中央
- 自動 2 秒後消失
- 深灰背景白字圓角

**Step 3: 瀏覽器驗證**

確認完整流程：Stage 3 點下載 → 生成中動畫 → 進度條跑完 → 平滑切換到證書 → 證書佈局正確 → 雷達圖顯示 → 按鈕可點擊並顯示 toast → 「重新體驗」可回到第一站。

**Step 4: Commit**

```bash
git add demo4-volunteer-flywheel.html
git commit -m "feat: 新增證書視角 — 數位能力認證報告 + 生成動畫"
```

---

### Task 6: 整合首頁 + 最終潤飾

**Files:**

- Modify: `index.html` — 新增第四張 Demo 卡片
- Modify: `demo4-volunteer-flywheel.html` — 最終潤飾

**Step 1: 更新 index.html**

在 `demo-grid` 中的第三張卡片（行政管理報表）後方新增第四張卡片：

```html
<!-- 永續志工數據飛輪 -->
<article class="demo-card">
  <div class="card-icon" style="background: #FFF7ED;">🚀</div>
  <h2 class="card-title">永續志工數據飛輪</h2>
  <p class="card-desc">
    跟著阿明走一趟 18 週的成長旅程，看 AI 如何把服務日誌轉化為可量化的職場資產。
  </p>
  <a
    href="demo4-volunteer-flywheel.html"
    class="card-link"
    style="background: linear-gradient(135deg, #1E40AF, #3B82F6);"
  >
    進入 Demo <span class="arrow">→</span>
  </a>
</article>
```

同時將 `demo-grid` 的桌面版從 `repeat(3, 1fr)` 改為 `repeat(4, 1fr)`（或改用 `repeat(2, 1fr)` 桌面版兩行兩個）。

**Step 2: 視覺潤飾**

檢查 `demo4-volunteer-flywheel.html` 中的以下細節：

- 所有動畫是否流暢
- 手機版（< 1024px）是否正確堆疊為單欄
- 頂部導覽進度指示器在每個階段是否正確更新
- 階段切換時的淡入淡出是否自然
- 證書頁面的佈局是否美觀

**Step 3: 瀏覽器驗證**

1. 開啟 `index.html` → 確認第四張卡片顯示正確
2. 點擊進入 → 走完 Stage 1 → 2 → 3 → 4 的完整流程
3. 證書頁面點「重新體驗」回到第一站
4. 用 Chrome DevTools 模擬手機寬度確認響應式

**Step 4: Commit**

```bash
git add demo4-volunteer-flywheel.html index.html
git commit -m "feat: 整合首頁入口 + 最終視覺潤飾"
```

---

## 依賴關係

```
Task 1 (骨架 + 導覽) → Task 2 (第一站) → Task 3 (第二站) → Task 4 (第三站) → Task 5 (證書) → Task 6 (整合)
```

所有 Task 必須按順序執行，因為每個階段都建立在前一個之上。
