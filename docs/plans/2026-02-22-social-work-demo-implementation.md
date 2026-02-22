# 社工管理系統互動原型 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 產出三個可互動 HTML 原型（班級管理、個案紀錄、行政報表），部署到線上網址。

**Architecture:** 純靜態網站，每個 Demo 一個獨立 HTML 檔案，共用一個 CSS 檔和一個 JS 假資料檔。所有互動用原生 JavaScript，樣式用 Tailwind CDN + 少量自定義 CSS。無建置步驟，直接部署。

**Tech Stack:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript, Noto Sans TC (Google Fonts), Vercel (部署)

---

## 注意事項

- 這是純前端原型，**沒有後端**，不需要 npm/node
- 沒有測試框架，驗證方式是**瀏覽器開啟確認畫面正確**
- 所有檔案在 `/Users/shanyuhu/Projects/social-work-demo/` 目錄下
- 設計文件：`docs/plans/2026-02-22-social-work-demo-design.md`

## 色彩與設計 Token

```
主色（按鈕、重點）: #6366F1
輔色（警告、異常）: #EC4899
成功色（出席、正常）: #10B981
背景色: #F8FAFC
卡片底色: #FFFFFF
卡片圓角: 12px
卡片陰影: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
字體: 'Noto Sans TC', sans-serif
```

---

### Task 1: 共用基礎 — shared.js 假資料

**Files:**

- Create: `shared.js`

**說明：** 建立所有 Demo 需要的假資料。這是所有頁面的資料來源。

**Step 1: 建立 shared.js**

`shared.js` 必須包含以下資料結構：

```javascript
// === 社工資料 ===
const SOCIAL_WORKERS = [
  { id: "sw1", name: "小明" },
  { id: "sw2", name: "小張" },
  { id: "sw3", name: "小李" },
];

// === 班級資料（Demo 1 + Dashboard 使用）===
const CLASSES = [
  {
    id: "c1",
    name: "光明國小 A班",
    school: "光明國小",
    time: "09:00 - 11:00",
    socialWorker: "sw1",
    studentCount: 12,
  },
  {
    id: "c2",
    name: "希望國小 B班",
    school: "希望國小",
    time: "14:00 - 16:00",
    socialWorker: "sw2",
    studentCount: 15,
  },
  // ... 共 12 個班級供 Dashboard 使用
];

// === 學生資料（Demo 1 點名 + Demo 2 個案紀錄）===
const STUDENTS = {
  c1: [
    {
      id: "s1",
      name: "王小明",
      grade: "三年級",
      tags: ["情緒起伏大", "學習落後"],
    },
    { id: "s2", name: "李小華", grade: "三年級", tags: [] },
    // ... 共 12 人
  ],
  c2: [
    // ... 共 15 人
  ],
};

// === 個案紀錄假資料（Demo 2 使用）===
const CASE_RECORDS = {
  s1: [
    {
      date: "2026-02-20",
      category: "課堂參與",
      note: "今天情緒明顯低落，上課幾乎沒有參與討論",
    },
    {
      date: "2026-02-18",
      category: "人際互動",
      note: "與同學發生口角，經調解後和好",
    },
  ],
  // ... 其他有紀錄的學生
};

// === Dashboard 假資料（Demo 3 使用）===
const DASHBOARD_DATA = {
  totalClasses: 12,
  todayAttendanceRate: 94.2,
  journalSubmitRate: 78.5,
  alertCount: 3,
  alerts: [
    {
      type: "danger",
      worker: "小張",
      class: "希望國小 B班",
      message: "連續 2 天未繳交日誌",
    },
    {
      type: "warning",
      class: "光明國小 A班",
      message: "近一週請假率 25%（高於平均）",
    },
    {
      type: "warning",
      worker: "小李",
      class: "陽光國小 C班",
      message: "今日尚未點名（已超過上課時間）",
    },
  ],
  weeklyTrend: [92.1, 94.5, 93.8, 95.2, 94.2], // 週一到週五
  classStatus: [
    // 12 筆：{ className, school, worker, attendanceRate, journalStatus, status }
  ],
};

// === 觀察面向標籤（Demo 2 使用）===
const OBSERVATION_TAGS = [
  "課堂參與",
  "人際互動",
  "情緒",
  "學習表現",
  "家庭狀況",
];
```

每個班級需要有完整的中文學生名字（從常見姓名中挑選），Dashboard 的 classStatus 需要 12 筆完整資料。

**Step 2: 驗證**

在瀏覽器 Console 載入確認資料結構正確：

```
打開任一 HTML → F12 Console → 確認 CLASSES.length === 12
```

**Step 3: Commit**

```bash
git add shared.js
git commit -m "feat: 新增共用假資料檔案（社工、班級、學生、個案紀錄、Dashboard）"
```

---

### Task 2: 共用基礎 — shared.css

**Files:**

- Create: `shared.css`

**說明：** Tailwind CDN 處理大部分樣式，shared.css 只放 Tailwind 做不到的自定義樣式。

**Step 1: 建立 shared.css**

必須包含：

- 手機外框樣式（Demo 1 用）
- 狀態切換的過渡動畫
- KPI 數字動畫的 keyframes（Demo 3 用）
- 標籤選取的切換樣式（Demo 2 用）
- 自定義 scrollbar 樣式

```css
/* 手機模擬器外框 */
.phone-frame { ... }

/* 狀態切換動畫 */
.view-transition { ... }

/* KPI 數字跳動動畫 */
@keyframes countUp { ... }

/* 標籤切換 */
.tag-chip { ... }
.tag-chip.selected { ... }
```

**Step 2: Commit**

```bash
git add shared.css
git commit -m "feat: 新增共用自定義樣式（手機框、動畫、標籤）"
```

---

### Task 3: 首頁入口 — index.html

**Files:**

- Create: `index.html`

**說明：** 導覽頁，三張大卡片分別連到三個 Demo。

**Step 1: 建立 index.html**

頁面結構：

1. `<head>`: Tailwind CDN + Google Fonts (Noto Sans TC) + shared.css
2. 頂部：系統名稱「社工管理系統」+ 副標「互動原型展示」
3. 三張卡片用 CSS Grid 排列（手機一欄、桌面三欄）
4. 每張卡片：emoji icon + Demo 名稱 + 一句話說明 + 連結按鈕

卡片內容：

- 📱 班級管理中心 — 「30 秒完成點名，預設全勤、例外管理」→ demo1-class.html
- 📋 個案服務紀錄 — 「結構化標籤輸入，告別冗長文字紀錄」→ demo2-case.html
- 📊 行政管理報表 — 「異常自動浮現，一鍵提醒不漏接」→ demo3-dashboard.html

**Step 2: 瀏覽器開啟驗證**

```
open index.html
```

確認：三張卡片正確顯示、連結可點擊、響應式正常。

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: 新增首頁導覽頁（三個 Demo 入口卡片）"
```

---

### Task 4: Demo 1 — 班級管理中心（手機版）

**Files:**

- Create: `demo1-class.html`

**說明：** 手機版點名系統，有 3 個狀態切換。用一個 HTML 檔內的 div 切換實現（不是多頁面）。

**Step 1: 建立 HTML 骨架**

頁面結構：

1. `<head>`: Tailwind CDN + Google Fonts + shared.css
2. `<body>`: 外層是居中的手機框 `.phone-frame`（390px 寬）
3. 手機框內有 3 個 view div，同一時間只顯示一個：
   - `#view-tasks` — 今日任務列表
   - `#view-attendance` — 點名畫面
   - `#view-complete` — 點名完成
4. `<script src="shared.js">` + 行內 `<script>` 處理互動

**Step 2: 實作狀態 1 — 今日任務列表**

- 頂部問候語：「👋 早安，小明」+「今天有 2 堂課要上」
- 動態生成班級卡片（從 CLASSES 中篩選 socialWorker === 'sw1'）
- 每張卡片有「開始點名」按鈕，點擊後帶入班級 ID 切換到狀態 2

**Step 3: 實作狀態 2 — 點名畫面**

- 頂部：「← 返回」按鈕 + 班名 + 「X/Y 出席」即時計數
- 學生列表：從 STUDENTS[classId] 動態生成
- 每個學生一行：預設顯示 ✅ + 名字
- 點擊學生行 → 切換為灰色 ⬜，展開下方區塊顯示：
  - 下拉選單（缺席/請假）
  - 文字輸入框（原因，placeholder: 「選填：輸入原因」）
- 再次點擊 → 收起，恢復 ✅
- 頂部計數器即時更新
- 底部固定「✅ 完成點名」按鈕

**Step 4: 實作狀態 3 — 點名完成**

- 大勾勾動畫 + 「點名完成！」
- 顯示出席統計：「今日出席：11/12」
- 列出缺席學生及原因
- 「📝 撰寫今日日誌」大按鈕（點擊顯示 toast 提示「Demo 模式：日誌功能即將推出」）
- 「← 返回首頁」按鈕（切換回狀態 1）

**Step 5: 瀏覽器驗證**

```
open demo1-class.html
```

驗證完整流程：首頁 → 點名 → 標記缺席 → 完成 → 返回。

**Step 6: Commit**

```bash
git add demo1-class.html
git commit -m "feat: 新增 Demo 1 班級管理中心（手機版點名系統）"
```

---

### Task 5: Demo 2 — 個案服務紀錄（響應式）

**Files:**

- Create: `demo2-case.html`

**說明：** 個案紀錄系統，響應式設計（手機/電腦都能用）。同樣用 div 切換實現 3 個狀態。

**Step 1: 建立 HTML 骨架**

頁面結構：

1. `<head>`: Tailwind CDN + Google Fonts + shared.css
2. `<body>`: 容器 max-width 800px 居中（電腦版）、手機版全寬
3. 3 個 view div：
   - `#view-list` — 學生列表
   - `#view-profile` — 學生個別頁面
   - `#view-new-record` — 新增紀錄
4. `<script src="shared.js">` + 行內 `<script>`

**Step 2: 實作狀態 1 — 學生列表**

- 頂部：「📋 個案服務紀錄」標題
- 搜尋框（輸入時即時篩選學生名字）
- 學生卡片列表（從 STUDENTS 的所有班級中彙整）
- 每張卡片：名字、班級、標籤（彩色小標籤）、最近紀錄日期
- 點擊卡片 → 帶入學生 ID，切換到狀態 2

**Step 3: 實作狀態 2 — 學生個別頁面**

- 頂部：「← 返回」+ 學生名字
- 基本資訊區塊：班級、年級、標籤
- 「近期紀錄」區塊：時間軸式排列
  - 每筆紀錄：日期 + 類別標籤 + 描述文字
  - 從 CASE_RECORDS[studentId] 讀取
- 底部固定「＋ 新增紀錄」按鈕

**Step 4: 實作狀態 3 — 新增紀錄**

- 頂部：「← 返回」+ 「新增紀錄 — {學生名字}」
- 觀察面向標籤（用 OBSERVATION_TAGS 生成）
  - 可多選，選中變紫色背景
- 簡短描述文字框（textarea，3-4 行高）
- Phase 2 預留按鈕區塊：
  - 🎤 語音輸入（灰色，cursor: not-allowed，hover tooltip: 「Phase 2 即將推出」）
  - 🤖 AI 輔助整理（同上）
- 「✅ 儲存紀錄」按鈕
  - 點擊後：收集選中的標籤和描述文字，新增一筆到該學生的紀錄（記憶體中）
  - 切換回狀態 2，新紀錄出現在最上方
  - Toast 提示「紀錄已儲存」

**Step 5: 瀏覽器驗證**

```
open demo2-case.html
```

驗證：搜尋篩選 → 點擊學生 → 查看紀錄 → 新增紀錄 → 返回確認新紀錄存在。

**Step 6: Commit**

```bash
git add demo2-case.html
git commit -m "feat: 新增 Demo 2 個案服務紀錄（結構化輸入 + 響應式）"
```

---

### Task 6: Demo 3 — 行政管理報表（桌面 Dashboard）

**Files:**

- Create: `demo3-dashboard.html`

**說明：** 桌面版管理 Dashboard，單頁面，4 個區塊。

**Step 1: 建立 HTML 骨架**

頁面結構：

1. `<head>`: Tailwind CDN + Google Fonts + shared.css
2. `<body>`: 全寬背景 + 容器 max-width 1200px 居中
3. 4 個區塊垂直排列
4. `<script src="shared.js">` + 行內 `<script>`

**Step 2: 實作區塊 1 — KPI 卡片列**

- 頂部橫幅：「📊 社工管理系統 — 行政報表」+ 今日日期
- 4 張 KPI 卡片（CSS Grid，一行四個）：
  - 班級總數（12）
  - 今日出席率（94.2%，綠色 ✅）
  - 日誌繳交率（78.5%，橘色 ⚠️）
  - 需關注項目（3，紅色 🔴）
- 數字用 JavaScript 實現從 0 跳到最終值的動畫（duration: 1s）

**Step 3: 實作區塊 2 — 異常預警列表**

- 標題：「⚠️ 需要關注的異常」
- 從 DASHBOARD_DATA.alerts 動態生成
- 每個異常一行：
  - 左側：紅色/橘色圓點 + 人名/班名 + 描述
  - 右側：操作按鈕
    - 「一鍵提醒」→ 點擊後變成「✅ 已提醒」（disable，綠色）
    - 「查看詳情」→ 點擊後展開下方區塊顯示更多假資料

**Step 4: 實作區塊 3 — 出席趨勢圖**

- 標題：「📈 本週班級出席趨勢」
- 用 Canvas 繪製簡單折線圖
  - X 軸：週一到週五
  - Y 軸：出席率 85% - 100%
  - 資料點用圓點標記，hover 顯示數值
  - 折線用主色 #6366F1
  - 填充用半透明主色

**Step 5: 實作區塊 4 — 班級狀態表格**

- 標題：「📋 各班級狀態總覽」
- HTML table，從 DASHBOARD_DATA.classStatus 生成
- 欄位：班級、學校、社工、出席率、日誌、狀態
- 出席率欄位點擊可排序（升序/降序切換）
- 日誌狀態：✅ 已交 / ❌ 缺交
- 狀態：正常（綠色）/ ⚠️ 注意（橘色）/ 🔴 異常（紅色）

**Step 6: 瀏覽器驗證**

```
open demo3-dashboard.html
```

驗證：KPI 數字動畫 → 一鍵提醒按鈕 → 查看詳情展開 → 折線圖顯示 → 表格排序。

**Step 7: Commit**

```bash
git add demo3-dashboard.html
git commit -m "feat: 新增 Demo 3 行政管理報表 Dashboard（KPI + 異常預警 + 趨勢圖 + 表格）"
```

---

### Task 7: 最終整合驗證

**Files:**

- All files

**Step 1: 完整流程測試**

1. 開啟 `index.html` → 確認三張卡片正確連結
2. 點進 Demo 1 → 走完點名流程
3. 點進 Demo 2 → 走完個案紀錄流程
4. 點進 Demo 3 → 確認所有互動
5. 確認手機版（Chrome DevTools 切換 390px 寬度）

**Step 2: 每個 Demo 頁面加上「← 回到首頁」的導覽連結**

確保評審在任何頁面都能輕鬆返回。

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: 完成三個互動原型整合與導覽連結"
```

---

### Task 8: 部署到 Vercel

**Files:**

- 無新增檔案

**Step 1: 建立 GitHub repo 並推送**

```bash
# 在 GitHub 建立 repo（使用 gh CLI）
gh repo create social-work-demo --public --source=. --push
```

**Step 2: 部署到 Vercel**

```bash
# 安裝 Vercel CLI（如果還沒有）
npm i -g vercel

# 部署
cd /Users/shanyuhu/Projects/social-work-demo
vercel --prod
```

部署設定：

- Framework: Other（純靜態）
- Output Directory: `.`（根目錄）
- Build Command: 無

**Step 3: 驗證線上版本**

用手機和電腦分別打開 Vercel 給的網址，確認三個 Demo 都正常運作。

---

## 依賴關係

```
Task 1 (shared.js) ─┐
Task 2 (shared.css) ─┤
                     ├── Task 3 (index.html)
                     ├── Task 4 (Demo 1) ──┐
                     ├── Task 5 (Demo 2) ──┤── Task 7 (整合驗證) → Task 8 (部署)
                     └── Task 6 (Demo 3) ──┘
```

Task 1+2 必須先完成。之後 Task 3/4/5/6 可以**平行執行**。Task 7 等全部完成後做。Task 8 最後。
