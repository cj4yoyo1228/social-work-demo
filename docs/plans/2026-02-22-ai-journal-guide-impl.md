# AI 引導日誌系統 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在 Demo 1 加入 4 步 AI 引導班級日誌，在 Demo 2 加入「AI 幫我寫」引導模式，降低社工撰寫難度。

**Architecture:** 純前端靜態 HTML，用 CSS 動畫做步驟切換，JavaScript 管理引導狀態和日誌組合。所有 AI 行為為前端模擬。

**Tech Stack:** HTML + Tailwind CSS CDN + 原生 JavaScript（ES5 相容）

---

## Task 1：Demo 1 — 新增 AI 引導日誌 CSS 樣式

**Files:**

- Modify: `demo1-class.html:363-390`（現有日誌 CSS 區塊）

**Step 1: 在現有 .journal-textarea 樣式後面，新增 AI 引導相關 CSS**

在 `demo1-class.html` 的 `</style>` 前（約 line 399 後），加入以下 CSS：

```css
/* ══════════════════════════
   AI 引導日誌系統樣式
══════════════════════════ */

/* 進度圓點列 */
.journal-progress {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 0 8px;
}
.progress-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
  transition: all 0.3s ease;
}
.progress-dot.active {
  background: #6366f1;
  transform: scale(1.3);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}
.progress-dot.done {
  background: #10b981;
}

/* AI 提問泡泡 */
.ai-bubble {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  animation: fadeSlideUp 0.4s ease;
}
.ai-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.ai-question {
  background: #f0f0ff;
  border-radius: 14px 14px 14px 4px;
  padding: 12px 16px;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  flex: 1;
}

/* emoji 快選按鈕 */
.emoji-choices {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.emoji-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Noto Sans TC", sans-serif;
}
.emoji-btn:hover {
  border-color: #a5b4fc;
  background: #f5f3ff;
}
.emoji-btn.selected {
  border-color: #6366f1;
  background: #eef2ff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

/* pill 標籤快選 */
.tag-pill {
  display: inline-block;
  padding: 7px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 6px 8px 0;
  background: white;
  color: #374151;
  font-family: "Noto Sans TC", sans-serif;
}
.tag-pill:hover {
  border-color: #a5b4fc;
}
.tag-pill.selected {
  border-color: #6366f1;
  background: #6366f1;
  color: white;
}

/* 步驟容器切換動畫 */
.journal-step {
  display: none;
  animation: fadeSlideUp 0.35s ease;
}
.journal-step.active {
  display: block;
}

/* 補充文字框 */
.step-textarea {
  width: 100%;
  min-height: 60px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  font-family: "Noto Sans TC", sans-serif;
  resize: none;
  outline: none;
  color: #374151;
  transition: border-color 0.2s ease;
}
.step-textarea:focus {
  border-color: #6366f1;
}
.step-textarea::placeholder {
  color: #c4c9d4;
}

/* 缺席學生關注卡片 */
.concern-student {
  background: #fff7ed;
  border: 1.5px solid #fed7aa;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 8px;
}
.concern-student .name {
  font-weight: 700;
  font-size: 14px;
  color: #9a3412;
}
.concern-student .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

/* 下一步 / 略過按鈕 */
.step-nav {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
.btn-step-next {
  flex: 1;
  padding: 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  transition: background 0.2s ease;
}
.btn-step-next:hover {
  background: #4f46e5;
}
.btn-step-skip {
  padding: 12px 16px;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
}

/* AI 組合預覽 */
.journal-preview {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: #374151;
  min-height: 150px;
  white-space: pre-wrap;
}
.journal-preview[contenteditable] {
  outline: none;
}
.journal-preview[contenteditable]:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* 新增學生按鈕 */
.btn-add-student {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1.5px dashed #d1d5db;
  border-radius: 10px;
  background: white;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  margin-top: 8px;
}
.btn-add-student:hover {
  border-color: #6366f1;
  color: #6366f1;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Step 2: Commit**

```bash
git add demo1-class.html
git commit -m "style: Demo 1 AI 引導日誌 CSS 樣式"
```

---

## Task 2：Demo 1 — 替換日誌 HTML 為 4 步引導介面

**Files:**

- Modify: `demo1-class.html:1201-1252`（現有日誌卡片 HTML）

**Step 1: 把現有的日誌卡片區塊（lines 1201-1252）替換為 AI 引導介面**

替換 `<!-- 日誌卡片 -->` 到 `<!-- 返回首頁 -->` 之間的整段 HTML。

新的 HTML 結構：

```html
<!-- AI 引導日誌系統 -->
<div id="journal-section">
  <!-- 入口按鈕（預設顯示） -->
  <div
    id="journal-trigger"
    style="background:white; border-radius:18px; padding:18px; box-shadow:0 2px 14px rgba(0,0,0,0.07); margin-bottom:14px;"
  >
    <p
      style="font-size:11px; font-weight:600; color:#9ca3af; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px;"
    >
      今日日誌
    </p>
    <button
      class="btn-primary"
      onclick="startJournalGuide()"
      style="font-size:15px; padding:14px;"
    >
      🤖 AI 幫我寫日誌
    </button>
  </div>

  <!-- 引導流程（點擊後出現） -->
  <div id="journal-guide" style="display:none;">
    <div
      style="background:white; border-radius:18px; padding:18px; box-shadow:0 2px 14px rgba(0,0,0,0.07); margin-bottom:14px;"
    >
      <!-- 進度圓點 -->
      <div class="journal-progress">
        <div class="progress-dot active" id="dot-0"></div>
        <div class="progress-dot" id="dot-1"></div>
        <div class="progress-dot" id="dot-2"></div>
        <div class="progress-dot" id="dot-3"></div>
      </div>

      <!-- Step 1: 課堂氣氛 -->
      <div class="journal-step active" id="step-0">
        <div class="ai-bubble">
          <div class="ai-avatar">🤖</div>
          <div class="ai-question">
            今天課堂整體氣氛如何？選一個最接近的感覺吧！
          </div>
        </div>
        <div class="emoji-choices">
          <button class="emoji-btn" onclick="selectMood(this, '活潑')">
            😊 <span>活潑開心</span>
          </button>
          <button class="emoji-btn" onclick="selectMood(this, '普通')">
            😐 <span>普通平穩</span>
          </button>
          <button class="emoji-btn" onclick="selectMood(this, '低迷')">
            😔 <span>有點低迷</span>
          </button>
          <button class="emoji-btn" onclick="selectMood(this, '躁動')">
            😤 <span>躁動不安</span>
          </button>
        </div>
        <textarea
          class="step-textarea"
          id="mood-detail"
          placeholder="想補充什麼嗎？（選填）"
        ></textarea>
        <div class="step-nav">
          <button
            class="btn-step-next"
            onclick="nextStep(1)"
            id="step0-next"
            disabled
          >
            下一步 →
          </button>
        </div>
      </div>

      <!-- Step 2: 特別關注學生 -->
      <div class="journal-step" id="step-1">
        <div class="ai-bubble">
          <div class="ai-avatar">🤖</div>
          <div class="ai-question">
            有沒有需要特別關注的學生？我幫你帶入了今天的缺席名單 👇
          </div>
        </div>
        <div id="concern-students-list"></div>
        <button class="btn-add-student" onclick="addConcernStudent()">
          ＋ 新增其他學生
        </button>
        <div class="step-nav">
          <button class="btn-step-skip" onclick="skipConcern()">
            沒有特別需要關注的
          </button>
          <button class="btn-step-next" onclick="nextStep(2)">下一步 →</button>
        </div>
      </div>

      <!-- Step 3: 教學反思 -->
      <div class="journal-step" id="step-2">
        <div class="ai-bubble">
          <div class="ai-avatar">🤖</div>
          <div class="ai-question">
            今天教學上有什麼反思或心得？可以多選標籤，再補充說明 📝
          </div>
        </div>
        <div id="reflect-tags" style="margin-bottom:10px;"></div>
        <textarea
          class="step-textarea"
          id="reflect-detail"
          placeholder="想補充什麼嗎？（選填）"
          style="min-height:70px;"
        ></textarea>
        <div class="step-nav">
          <button class="btn-step-skip" onclick="nextStep(3)">略過</button>
          <button class="btn-step-next" onclick="nextStep(3)">下一步 →</button>
        </div>
      </div>

      <!-- Step 4: 明日計畫 -->
      <div class="journal-step" id="step-3">
        <div class="ai-bubble">
          <div class="ai-avatar">🤖</div>
          <div class="ai-question">
            最後一步！明天有什麼需要特別注意或準備的嗎？
          </div>
        </div>
        <div id="plan-tags" style="margin-bottom:10px;"></div>
        <textarea
          class="step-textarea"
          id="plan-detail"
          placeholder="想補充什麼嗎？（選填）"
          style="min-height:70px;"
        ></textarea>
        <div class="step-nav">
          <button class="btn-step-skip" onclick="composeJournal()">略過</button>
          <button class="btn-step-next" onclick="composeJournal()">
            完成 ✨
          </button>
        </div>
      </div>

      <!-- 完成：AI 組合的日誌預覽 -->
      <div class="journal-step" id="step-preview">
        <div class="ai-bubble">
          <div class="ai-avatar">🤖</div>
          <div class="ai-question">
            日誌已幫你整理好了！可以直接修改，或確認儲存 👇
          </div>
        </div>
        <div
          class="journal-preview"
          id="journal-composed"
          contenteditable="true"
        ></div>
        <div class="step-nav" style="margin-top:12px;">
          <button
            class="btn-step-next"
            onclick="saveComposedJournal()"
            style="background:linear-gradient(135deg,#10b981,#059669);"
          >
            確認儲存 💾
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Step 2: Commit**

```bash
git add demo1-class.html
git commit -m "feat: Demo 1 AI 引導日誌 HTML 結構"
```

---

## Task 3：Demo 1 — 新增 AI 引導日誌 JavaScript 邏輯

**Files:**

- Modify: `demo1-class.html`（JS 區塊，替換 openJournal + saveJournal 函式，約 lines 1580-1605）

**Step 1: 替換 openJournal() 和 saveJournal() 函式為完整的引導邏輯**

刪除原有的 `openJournal()` 和 `saveJournal()`，新增以下函式：

```javascript
// ══════════════════════════
// AI 引導日誌系統
// ══════════════════════════

// 日誌引導狀態
let journalStep = 0;
let journalData = {
  mood: "",
  moodDetail: "",
  concerns: [],
  reflectTags: [],
  reflectDetail: "",
  planTags: [],
  planDetail: "",
};

// 反思標籤選項
const REFLECT_TAGS = [
  "教學進度順利",
  "活動效果好",
  "需要調整教材",
  "時間不夠用",
  "學生反應冷淡",
];
// 明日計畫標籤選項
const PLAN_TAGS = [
  "準備教材",
  "跟進個案",
  "聯繫家長",
  "調整座位",
  "無特別事項",
];
// 關注標籤選項
const CONCERN_TAGS = ["情緒波動", "人際衝突", "學習困難", "家庭狀況"];

// 啟動日誌引導
function startJournalGuide() {
  // 重設狀態
  journalStep = 0;
  journalData = {
    mood: "",
    moodDetail: "",
    concerns: [],
    reflectTags: [],
    reflectDetail: "",
    planTags: [],
    planDetail: "",
  };

  // 切換顯示
  document.getElementById("journal-trigger").style.display = "none";
  document.getElementById("journal-guide").style.display = "block";

  // 渲染 Step 2 的缺席名單
  renderConcernStudents();
  // 渲染 Step 3 和 Step 4 的標籤
  renderTagPills("reflect-tags", REFLECT_TAGS, "reflectTags");
  renderTagPills("plan-tags", PLAN_TAGS, "planTags");

  // 重設所有步驟
  showJournalStep(0);
}

// 顯示指定步驟
function showJournalStep(idx) {
  journalStep = idx;
  // 切換 step 顯示
  document.querySelectorAll(".journal-step").forEach(function (el, i) {
    el.classList.remove("active");
  });
  var targetId = idx === 4 ? "step-preview" : "step-" + idx;
  var target = document.getElementById(targetId);
  if (target) {
    // 強制重新觸發動畫
    target.style.animation = "none";
    void target.offsetWidth;
    target.style.animation = "";
    target.classList.add("active");
  }
  // 更新進度圓點
  for (var d = 0; d < 4; d++) {
    var dot = document.getElementById("dot-" + d);
    dot.className = "progress-dot";
    if (d < idx) dot.classList.add("done");
    else if (d === idx && idx < 4) dot.classList.add("active");
    else if (idx === 4) dot.classList.add("done"); // 全完成
  }
}

// Step 1: 選擇課堂氣氛
function selectMood(btn, mood) {
  journalData.mood = mood;
  // 取消其他選取
  document.querySelectorAll(".emoji-btn").forEach(function (b) {
    b.classList.remove("selected");
  });
  btn.classList.add("selected");
  // 啟用下一步按鈕
  document.getElementById("step0-next").disabled = false;
}

// 前進到下一步
function nextStep(toIdx) {
  // 收集當前步驟的資料
  if (journalStep === 0) {
    journalData.moodDetail = document
      .getElementById("mood-detail")
      .value.trim();
  } else if (journalStep === 2) {
    journalData.reflectDetail = document
      .getElementById("reflect-detail")
      .value.trim();
  } else if (journalStep === 3) {
    journalData.planDetail = document
      .getElementById("plan-detail")
      .value.trim();
  }
  showJournalStep(toIdx);
}

// Step 2: 渲染缺席學生關注列表
function renderConcernStudents() {
  var container = document.getElementById("concern-students-list");
  container.innerHTML = "";
  // 從點名資料取得缺席名單
  var students = STUDENTS[currentClassIndex] || [];
  var absentList = [];
  students.forEach(function (name, i) {
    var data = attendanceData[i];
    if (data && !data.present) {
      absentList.push({ name: name, reason: data.reason || "", index: i });
    }
  });

  if (absentList.length === 0) {
    container.innerHTML =
      '<p style="color:#9ca3af; font-size:13px; padding:8px 0;">今天全勤，沒有缺席的學生 🎉</p>';
    return;
  }

  absentList.forEach(function (s, idx) {
    var card = document.createElement("div");
    card.className = "concern-student";
    card.innerHTML =
      '<div style="display:flex; align-items:center; justify-content:space-between;">' +
      '<span class="name">⚠️ ' +
      s.name +
      "</span>" +
      '<span style="font-size:12px; color:#9ca3af;">' +
      (s.reason || "缺席") +
      "</span>" +
      "</div>" +
      '<div class="tags">' +
      CONCERN_TAGS.map(function (tag) {
        return (
          '<span class="tag-pill" style="font-size:11px; padding:4px 10px;" onclick="toggleConcernTag(this,' +
          idx +
          ",'" +
          tag +
          "')\">" +
          tag +
          "</span>"
        );
      }).join("") +
      "</div>" +
      '<input type="text" placeholder="補充說明（選填）" ' +
      'style="width:100%; margin-top:6px; padding:7px 10px; border:1px solid #e5e7eb; border-radius:8px; font-size:12px; font-family:Noto Sans TC,sans-serif; outline:none;" ' +
      'oninput="updateConcernNote(' +
      idx +
      ', this.value)">';
    container.appendChild(card);
    // 初始化 concern 資料
    if (!journalData.concerns[idx]) {
      journalData.concerns[idx] = {
        name: s.name,
        reason: s.reason || "缺席",
        tags: [],
        note: "",
      };
    }
  });
}

// 切換缺席學生的標籤
function toggleConcernTag(el, studentIdx, tag) {
  el.classList.toggle("selected");
  var concern = journalData.concerns[studentIdx];
  if (!concern) return;
  var tagIdx = concern.tags.indexOf(tag);
  if (tagIdx >= 0) concern.tags.splice(tagIdx, 1);
  else concern.tags.push(tag);
}

// 更新缺席學生備註
function updateConcernNote(studentIdx, val) {
  if (journalData.concerns[studentIdx]) {
    journalData.concerns[studentIdx].note = val;
  }
}

// Step 2: 略過關注
function skipConcern() {
  journalData.concerns = [];
  nextStep(2);
}

// 新增額外關注學生
function addConcernStudent() {
  var container = document.getElementById("concern-students-list");
  var idx = journalData.concerns.length;
  journalData.concerns[idx] = {
    name: "",
    reason: "出席但需關注",
    tags: [],
    note: "",
  };

  var card = document.createElement("div");
  card.className = "concern-student";
  card.style.borderColor = "#bfdbfe";
  card.style.background = "#eff6ff";
  card.innerHTML =
    '<input type="text" placeholder="輸入學生姓名" ' +
    'style="width:100%; padding:7px 10px; border:1px solid #93c5fd; border-radius:8px; font-size:13px; font-weight:700; font-family:Noto Sans TC,sans-serif; outline:none; margin-bottom:6px;" ' +
    'oninput="journalData.concerns[' +
    idx +
    '].name=this.value">' +
    '<div class="tags">' +
    CONCERN_TAGS.map(function (tag) {
      return (
        '<span class="tag-pill" style="font-size:11px; padding:4px 10px;" onclick="toggleConcernTag(this,' +
        idx +
        ",'" +
        tag +
        "')\">" +
        tag +
        "</span>"
      );
    }).join("") +
    "</div>" +
    '<input type="text" placeholder="補充說明（選填）" ' +
    'style="width:100%; margin-top:6px; padding:7px 10px; border:1px solid #e5e7eb; border-radius:8px; font-size:12px; font-family:Noto Sans TC,sans-serif; outline:none;" ' +
    'oninput="updateConcernNote(' +
    idx +
    ', this.value)">';
  container.appendChild(card);
}

// 渲染 pill 標籤選項
function renderTagPills(containerId, tags, dataKey) {
  var container = document.getElementById(containerId);
  container.innerHTML = "";
  tags.forEach(function (tag) {
    var pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.textContent = tag;
    pill.onclick = function () {
      pill.classList.toggle("selected");
      var arr = journalData[dataKey];
      var idx = arr.indexOf(tag);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(tag);
    };
    container.appendChild(pill);
  });
}

// 組合日誌
function composeJournal() {
  // 收集最後一步資料
  if (journalStep === 3) {
    journalData.planDetail = document
      .getElementById("plan-detail")
      .value.trim();
  }

  // 用模板拼接結構化日誌
  var lines = [];
  var cls = CLASSES[currentClassIndex];
  var students = STUDENTS[currentClassIndex] || [];
  var presentCount = Object.values(attendanceData).filter(function (d) {
    return d.present;
  }).length;

  lines.push("【" + cls.name + "】班級日誌");
  lines.push("日期：" + new Date().toLocaleDateString("zh-TW"));
  lines.push("出席：" + presentCount + "/" + students.length + " 人");
  lines.push("");

  // 課堂氣氛
  var moodEmoji = { 活潑: "😊", 普通: "😐", 低迷: "😔", 躁動: "😤" };
  lines.push(
    "📍 課堂氣氛：" +
      (moodEmoji[journalData.mood] || "") +
      " " +
      journalData.mood,
  );
  if (journalData.moodDetail) {
    lines.push("   " + journalData.moodDetail);
  }
  lines.push("");

  // 特別關注
  var validConcerns = journalData.concerns.filter(function (c) {
    return c && c.name;
  });
  if (validConcerns.length > 0) {
    lines.push("⚠️ 需特別關注：");
    validConcerns.forEach(function (c) {
      var detail = c.reason;
      if (c.tags.length > 0) detail += "（" + c.tags.join("、") + "）";
      if (c.note) detail += " — " + c.note;
      lines.push("  · " + c.name + "：" + detail);
    });
    lines.push("");
  }

  // 教學反思
  if (journalData.reflectTags.length > 0 || journalData.reflectDetail) {
    lines.push("📝 教學反思：");
    if (journalData.reflectTags.length > 0) {
      lines.push("  " + journalData.reflectTags.join("、"));
    }
    if (journalData.reflectDetail) {
      lines.push("  " + journalData.reflectDetail);
    }
    lines.push("");
  }

  // 明日計畫
  if (journalData.planTags.length > 0 || journalData.planDetail) {
    lines.push("📋 明日計畫：");
    if (journalData.planTags.length > 0) {
      lines.push("  " + journalData.planTags.join("、"));
    }
    if (journalData.planDetail) {
      lines.push("  " + journalData.planDetail);
    }
  }

  // 顯示預覽
  document.getElementById("journal-composed").textContent = lines.join("\n");
  showJournalStep(4); // 進度 = preview
}

// 儲存組合好的日誌
function saveComposedJournal() {
  var btn = document.querySelector("#step-preview .btn-step-next");
  btn.textContent = "已儲存 ✅";
  btn.disabled = true;
  btn.style.background = "#10b981";
  btn.style.boxShadow = "0 4px 16px rgba(16,185,129,0.35)";
}
```

**Step 2: 更新 finishRoll() 中的日誌重設邏輯**

把原有的重設邏輯改為新版：

```javascript
// 重設日誌區塊（每次進入都是乾淨的）
document.getElementById("journal-trigger").style.display = "block";
document.getElementById("journal-guide").style.display = "none";
```

**Step 3: Commit**

```bash
git add demo1-class.html
git commit -m "feat: Demo 1 AI 引導日誌 JavaScript 邏輯"
```

---

## Task 4：Demo 2 — 新增「AI 幫我寫」引導按鈕和 CSS

**Files:**

- Modify: `demo2-case.html`（CSS 區塊 + view-new-record HTML）

**Step 1: 在 CSS 區塊加入 AI 幫我寫相關樣式**

```css
/* ===== AI 幫我寫引導模式 ===== */
.ai-write-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
}
.ai-write-btn:hover {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  transform: translateY(-1px);
}

/* AI 引導問答容器 */
.ai-write-flow {
  background: #f8f5ff;
  border: 1.5px solid #e0d7ff;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 12px;
  animation: fadeSlideUp 0.35s ease;
}
.ai-write-flow .ai-q {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
.ai-write-flow .ai-q-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}
.ai-write-flow .ai-q-text {
  background: white;
  border-radius: 10px 10px 10px 3px;
  padding: 8px 12px;
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
}
.ai-write-flow textarea {
  width: 100%;
  min-height: 50px;
  border: 1.5px solid #e0d7ff;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  font-family: "Noto Sans TC", sans-serif;
  resize: none;
  outline: none;
  margin-bottom: 8px;
}
.ai-write-flow textarea:focus {
  border-color: #6366f1;
}
.ai-write-flow .btn-ai-next {
  padding: 8px 16px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Noto Sans TC", sans-serif;
}
.ai-write-compose {
  text-align: center;
  padding: 12px;
  color: #6366f1;
  font-size: 13px;
  font-weight: 600;
  animation: pulse 1.5s ease infinite;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

**Step 2: 在 view-new-record 的觀察描述文字框上方加入「AI 幫我寫」按鈕和引導容器**

在 `demo2-case.html` 的 `<!-- 簡短描述文字框 -->` 區塊（line 1133）前面加入：

```html
<!-- AI 幫我寫入口 -->
<div class="form-section card">
  <button class="ai-write-btn" id="ai-write-btn" onclick="startAiWriteMode()">
    🤖 AI 幫我寫觀察紀錄
  </button>
  <div id="ai-write-container" style="display:none;"></div>
</div>
```

**Step 3: Commit**

```bash
git add demo2-case.html
git commit -m "feat: Demo 2 AI 幫我寫按鈕和 CSS"
```

---

## Task 5：Demo 2 — 新增「AI 幫我寫」JavaScript 邏輯

**Files:**

- Modify: `demo2-case.html`（JS 區塊，在 AI_SCENARIOS 之前加入新函式）

**Step 1: 加入 AI 幫我寫的 JavaScript 邏輯**

```javascript
/* ============================================================
   AI 幫我寫引導模式
   ============================================================ */

// 根據學生歷史標籤生成引導問題
var AI_WRITE_QUESTIONS = {
  default: [
    "今天這位學生的整體表現如何？有什麼特別的觀察嗎？",
    "跟上次比較，有沒有什麼變化或進步？",
  ],
  "💭 情緒狀態": [
    "今天這位學生的情緒狀態如何？有沒有特別開心或不開心的時候？",
    "情緒上跟之前比有什麼變化嗎？你覺得可能的原因是什麼？",
  ],
  "🏠 家庭狀況": [
    "最近有沒有聽到或觀察到任何跟家庭相關的狀況？",
    "這位學生在學校的行為有沒有反映出家庭的影響？",
  ],
  "👫 人際互動": [
    "今天這位學生跟同學的互動如何？有沒有什麼特別的社交行為？",
    "跟上次比，人際互動上有什麼變化嗎？",
  ],
  "📚 學習表現": [
    "今天在課堂上的學習參與度如何？有沒有主動回答或提問？",
    "學習上遇到什麼困難嗎？你覺得可以怎麼協助？",
  ],
  "📋 課堂參與": [
    "今天在課堂活動中的參與程度如何？",
    "跟之前比，課堂參與度有什麼變化？",
  ],
};

var aiWriteStep = 0;
var aiWriteAnswers = [];
var aiWriteQuestions = [];

function startAiWriteMode() {
  var student = STUDENTS[currentStudentIndex];
  if (!student) return;

  // 根據學生最近紀錄的標籤決定問題
  aiWriteQuestions = [];
  aiWriteAnswers = [];
  aiWriteStep = 0;

  // 找出該學生最近紀錄的標籤
  var recentTags = [];
  if (student.records && student.records.length > 0) {
    recentTags = student.records[0].tags || [];
  }

  // 根據標籤選問題（優先用匹配的，不足再用 default）
  var usedQuestions = [];
  recentTags.forEach(function (tag) {
    var qs = AI_WRITE_QUESTIONS[tag];
    if (qs) {
      qs.forEach(function (q) {
        if (usedQuestions.indexOf(q) < 0) usedQuestions.push(q);
      });
    }
  });
  // 補足到至少 2 題
  if (usedQuestions.length < 2) {
    AI_WRITE_QUESTIONS["default"].forEach(function (q) {
      if (usedQuestions.length < 2 && usedQuestions.indexOf(q) < 0) {
        usedQuestions.push(q);
      }
    });
  }
  // 最多 3 題
  aiWriteQuestions = usedQuestions.slice(0, 3);

  // 隱藏按鈕，顯示容器
  document.getElementById("ai-write-btn").style.display = "none";
  var container = document.getElementById("ai-write-container");
  container.style.display = "block";

  // 顯示第一題
  showAiWriteQuestion(0);
}

function showAiWriteQuestion(idx) {
  var container = document.getElementById("ai-write-container");
  if (idx >= aiWriteQuestions.length) {
    // 所有問題回答完畢，組合紀錄
    composeAiWriteRecord();
    return;
  }

  container.innerHTML =
    '<div class="ai-write-flow">' +
    '<div class="ai-q">' +
    '<div class="ai-q-avatar">🤖</div>' +
    '<div class="ai-q-text">' +
    aiWriteQuestions[idx] +
    "</div>" +
    "</div>" +
    '<p style="font-size:11px; color:#9ca3af; margin-bottom:6px;">第 ' +
    (idx + 1) +
    " / " +
    aiWriteQuestions.length +
    " 題</p>" +
    '<textarea id="ai-write-answer" placeholder="寫下你的觀察..."></textarea>' +
    '<div style="display:flex; gap:8px;">' +
    '<button class="btn-ai-next" onclick="submitAiWriteAnswer(' +
    idx +
    ')">' +
    (idx < aiWriteQuestions.length - 1 ? "下一題 →" : "完成 ✨") +
    "</button>" +
    (idx < aiWriteQuestions.length - 1
      ? '<button style="padding:8px 12px; background:#f3f4f6; color:#6b7280; border:none; border-radius:8px; font-size:13px; cursor:pointer; font-family:Noto Sans TC,sans-serif;" onclick="submitAiWriteAnswer(' +
        idx +
        ')">略過</button>'
      : "") +
    "</div>" +
    "</div>";
}

function submitAiWriteAnswer(idx) {
  var answer = document.getElementById("ai-write-answer").value.trim();
  aiWriteAnswers[idx] = answer;
  aiWriteStep = idx + 1;
  showAiWriteQuestion(idx + 1);
}

function composeAiWriteRecord() {
  var container = document.getElementById("ai-write-container");
  container.innerHTML =
    '<div class="ai-write-compose">🤖 AI 正在整理你的觀察紀錄...</div>';

  // 模擬 AI 組合延遲
  setTimeout(function () {
    var student = STUDENTS[currentStudentIndex];
    var lines = [];

    aiWriteQuestions.forEach(function (q, i) {
      if (aiWriteAnswers[i]) {
        lines.push(aiWriteAnswers[i]);
      }
    });

    var composed = lines.join("。\n");
    if (composed && !composed.endsWith("。")) composed += "。";

    // 填入文字框
    var textarea = document.getElementById("record-note");
    textarea.value = composed;
    // 觸發 input 事件（讓關鍵字偵測也能啟動）
    textarea.dispatchEvent(new Event("input"));

    // 顯示完成提示
    container.innerHTML =
      '<div class="ai-write-flow" style="text-align:center; padding:14px;">' +
      '<p style="font-size:14px; font-weight:600; color:#059669; margin-bottom:6px;">✅ 已自動填入觀察紀錄</p>' +
      '<p style="font-size:12px; color:#6b7280;">你可以在下方繼續修改，AI 也會即時分析喔</p>' +
      "</div>";
  }, 1200);
}
```

**Step 2: 在 showView 函式中重設 AI 幫我寫狀態**

在 `showView('new-record')` 的重設邏輯中加入：

```javascript
// 重設 AI 幫我寫
document.getElementById("ai-write-btn").style.display = "flex";
document.getElementById("ai-write-container").style.display = "none";
```

**Step 3: Commit**

```bash
git add demo2-case.html
git commit -m "feat: Demo 2 AI 幫我寫引導邏輯"
```

---

## Task 6：整合驗證 + 最終推送

**Step 1: 在瀏覽器開啟驗證**

- 開啟 `demo1-class.html`：點名完成後 → 點「AI 幫我寫日誌」→ 走完 4 步 → 確認日誌預覽
- 開啟 `demo2-case.html`：進入學生 → 新增紀錄 → 點「AI 幫我寫」→ 回答問題 → 確認填入

**Step 2: 推送到 GitHub**

```bash
git push origin main && git push origin main:gh-pages
```
