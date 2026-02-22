// === 社工管理系統 — 共用假資料 ===

// === 社工資料 ===
const SOCIAL_WORKERS = [
  { id: "sw1", name: "小明" },
  { id: "sw2", name: "小張" },
  { id: "sw3", name: "小李" },
  { id: "sw4", name: "小陳" },
  { id: "sw5", name: "小林" },
  { id: "sw6", name: "小王" },
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
  {
    id: "c3",
    name: "陽光國小 C班",
    school: "陽光國小",
    time: "09:30 - 11:30",
    socialWorker: "sw3",
    studentCount: 10,
  },
  {
    id: "c4",
    name: "光明國小 D班",
    school: "光明國小",
    time: "13:00 - 15:00",
    socialWorker: "sw1",
    studentCount: 13,
  },
  {
    id: "c5",
    name: "仁愛國小 E班",
    school: "仁愛國小",
    time: "10:00 - 12:00",
    socialWorker: "sw4",
    studentCount: 11,
  },
  {
    id: "c6",
    name: "信義國小 F班",
    school: "信義國小",
    time: "14:00 - 16:00",
    socialWorker: "sw4",
    studentCount: 14,
  },
  {
    id: "c7",
    name: "和平國小 G班",
    school: "和平國小",
    time: "09:00 - 11:00",
    socialWorker: "sw5",
    studentCount: 12,
  },
  {
    id: "c8",
    name: "忠孝國小 H班",
    school: "忠孝國小",
    time: "13:30 - 15:30",
    socialWorker: "sw5",
    studentCount: 10,
  },
  {
    id: "c9",
    name: "仁愛國小 I班",
    school: "仁愛國小",
    time: "09:00 - 11:00",
    socialWorker: "sw6",
    studentCount: 15,
  },
  {
    id: "c10",
    name: "信義國小 J班",
    school: "信義國小",
    time: "10:00 - 12:00",
    socialWorker: "sw6",
    studentCount: 13,
  },
  {
    id: "c11",
    name: "和平國小 K班",
    school: "和平國小",
    time: "14:00 - 16:00",
    socialWorker: "sw3",
    studentCount: 11,
  },
  {
    id: "c12",
    name: "忠孝國小 L班",
    school: "忠孝國小",
    time: "09:30 - 11:30",
    socialWorker: "sw2",
    studentCount: 12,
  },
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
    { id: "s3", name: "張小美", grade: "三年級", tags: ["人際困難"] },
    { id: "s4", name: "陳大雄", grade: "四年級", tags: ["注意力不集中"] },
    { id: "s5", name: "林志偉", grade: "三年級", tags: [] },
    { id: "s6", name: "黃雅婷", grade: "四年級", tags: ["家庭狀況特殊"] },
    { id: "s7", name: "吳宗翰", grade: "三年級", tags: [] },
    { id: "s8", name: "劉子瑜", grade: "四年級", tags: [] },
    { id: "s9", name: "蔡佳穎", grade: "三年級", tags: ["學習落後"] },
    { id: "s10", name: "周柏宏", grade: "四年級", tags: [] },
    { id: "s11", name: "鄭雨涵", grade: "三年級", tags: [] },
    { id: "s12", name: "許家豪", grade: "四年級", tags: ["情緒起伏大"] },
  ],
  c2: [
    { id: "s13", name: "楊詠晴", grade: "五年級", tags: [] },
    {
      id: "s14",
      name: "趙子軒",
      grade: "五年級",
      tags: ["人際困難", "情緒起伏大"],
    },
    { id: "s15", name: "孫雅琪", grade: "五年級", tags: [] },
    { id: "s16", name: "朱俊傑", grade: "六年級", tags: [] },
    { id: "s17", name: "何美玲", grade: "五年級", tags: ["學習落後"] },
    { id: "s18", name: "呂建志", grade: "六年級", tags: [] },
    { id: "s19", name: "施佩珊", grade: "五年級", tags: [] },
    { id: "s20", name: "廖冠宇", grade: "六年級", tags: ["注意力不集中"] },
    { id: "s21", name: "邱靜怡", grade: "五年級", tags: [] },
    { id: "s22", name: "沈宇翔", grade: "六年級", tags: [] },
    { id: "s23", name: "洪雅芳", grade: "五年級", tags: ["家庭狀況特殊"] },
    { id: "s24", name: "蕭智豪", grade: "六年級", tags: [] },
    { id: "s25", name: "范芷瑄", grade: "五年級", tags: [] },
    { id: "s26", name: "彭宏杰", grade: "六年級", tags: [] },
    { id: "s27", name: "葉思妤", grade: "五年級", tags: ["情緒起伏大"] },
  ],
  c3: [
    { id: "s28", name: "游承翰", grade: "二年級", tags: [] },
    { id: "s29", name: "簡雅筑", grade: "二年級", tags: ["學習落後"] },
    { id: "s30", name: "鍾浩然", grade: "三年級", tags: [] },
    { id: "s31", name: "詹宜蓁", grade: "二年級", tags: [] },
    { id: "s32", name: "賴冠廷", grade: "三年級", tags: ["人際困難"] },
    { id: "s33", name: "盧芷涵", grade: "二年級", tags: [] },
    { id: "s34", name: "曾柏翰", grade: "三年級", tags: [] },
    { id: "s35", name: "謝欣妤", grade: "二年級", tags: ["注意力不集中"] },
    { id: "s36", name: "姚品睿", grade: "三年級", tags: [] },
    { id: "s37", name: "蘇怡萱", grade: "二年級", tags: [] },
  ],
};

// === 個案紀錄假資料（Demo 2 使用）===
const CASE_RECORDS = {
  s1: [
    {
      date: "2026-02-20",
      category: "課堂參與",
      note: "今天情緒明顯低落，上課幾乎沒有參與討論，趴在桌上的時間較長。",
    },
    {
      date: "2026-02-18",
      category: "人際互動",
      note: "與同學發生口角，經調解後和好，但仍有些悶悶不樂。",
    },
    {
      date: "2026-02-14",
      category: "情緒",
      note: "分享了家裡的一些狀況，表現出焦慮感，已安排後續關懷。",
    },
  ],
  s3: [
    {
      date: "2026-02-21",
      category: "人際互動",
      note: "小組活動時主動找同學合作，有明顯進步。",
    },
    {
      date: "2026-02-17",
      category: "課堂參與",
      note: "課堂上比較安靜，但在一對一互動時表達意願較高。",
    },
  ],
  s4: [
    {
      date: "2026-02-20",
      category: "學習表現",
      note: "數學課時注意力特別不集中，多次需要提醒才能回到課堂。",
    },
    {
      date: "2026-02-15",
      category: "課堂參與",
      note: "美勞課表現很好，專注度明顯提升，作品很有創意。",
    },
  ],
  s6: [
    {
      date: "2026-02-19",
      category: "家庭狀況",
      note: "家長聯繫不到，已通知導師協助了解狀況。",
    },
    {
      date: "2026-02-13",
      category: "情緒",
      note: "心情不錯，主動跟社工聊天，提到週末有出去玩。",
    },
  ],
  s9: [
    {
      date: "2026-02-21",
      category: "學習表現",
      note: "國語考試進步了 15 分，給予大力鼓勵。",
    },
  ],
  s12: [
    {
      date: "2026-02-20",
      category: "情緒",
      note: "跟好朋友吵架後情緒激動，經過安撫後平復，需持續關注。",
    },
  ],
  s14: [
    {
      date: "2026-02-21",
      category: "人際互動",
      note: "午休時間獨自坐在角落，嘗試邀請他加入同學群體但被拒絕。",
    },
    {
      date: "2026-02-19",
      category: "情緒",
      note: "上課時突然哭泣，帶到輔導室聊了 20 分鐘，原因是家裡吵架。",
    },
  ],
  s17: [
    {
      date: "2026-02-20",
      category: "學習表現",
      note: "閱讀理解能力偏弱，建議安排課後補強時間。",
    },
  ],
  s23: [
    {
      date: "2026-02-18",
      category: "家庭狀況",
      note: "家訪發現居住環境需要關注，已通報社會局。",
    },
  ],
  s27: [
    {
      date: "2026-02-21",
      category: "情緒",
      note: "整天都很開心，跟同學互動良好，是近期狀況最好的一天。",
    },
  ],
};

// === Dashboard 假資料（Demo 3 使用）===
const DASHBOARD_DATA = {
  totalClasses: 12,
  todayAttendanceRate: 94.2,
  journalSubmitRate: 78.5,
  alertCount: 3,
  alerts: [
    {
      id: "a1",
      type: "danger",
      worker: "小張",
      class: "希望國小 B班",
      message: "連續 2 天未繳交日誌",
      detail: "最後一次繳交：2/19。目前累計缺交 2 次，本月已缺交 3 次。",
    },
    {
      id: "a2",
      type: "warning",
      class: "光明國小 A班",
      message: "近一週請假率 25%（高於平均）",
      detail:
        "本週請假人次：週一 3 人、週二 2 人、週三 4 人、週四 3 人。平均請假率為 12%，此班明顯偏高。",
    },
    {
      id: "a3",
      type: "warning",
      worker: "小李",
      class: "陽光國小 C班",
      message: "今日尚未點名（已超過上課時間）",
      detail: "上課時間 09:30，目前已超過 2 小時仍未完成點名。",
    },
  ],
  weeklyTrend: [92.1, 94.5, 93.8, 95.2, 94.2],
  classStatus: [
    {
      className: "光明國小 A班",
      school: "光明國小",
      worker: "小明",
      attendanceRate: 91.7,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "希望國小 B班",
      school: "希望國小",
      worker: "小張",
      attendanceRate: 93.3,
      journalStatus: false,
      status: "warning",
    },
    {
      className: "陽光國小 C班",
      school: "陽光國小",
      worker: "小李",
      attendanceRate: 96.0,
      journalStatus: true,
      status: "warning",
    },
    {
      className: "光明國小 D班",
      school: "光明國小",
      worker: "小明",
      attendanceRate: 94.5,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "仁愛國小 E班",
      school: "仁愛國小",
      worker: "小陳",
      attendanceRate: 97.2,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "信義國小 F班",
      school: "信義國小",
      worker: "小陳",
      attendanceRate: 89.3,
      journalStatus: true,
      status: "warning",
    },
    {
      className: "和平國小 G班",
      school: "和平國小",
      worker: "小林",
      attendanceRate: 95.8,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "忠孝國小 H班",
      school: "忠孝國小",
      worker: "小林",
      attendanceRate: 93.0,
      journalStatus: false,
      status: "warning",
    },
    {
      className: "仁愛國小 I班",
      school: "仁愛國小",
      worker: "小王",
      attendanceRate: 96.5,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "信義國小 J班",
      school: "信義國小",
      worker: "小王",
      attendanceRate: 94.1,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "和平國小 K班",
      school: "和平國小",
      worker: "小李",
      attendanceRate: 92.4,
      journalStatus: true,
      status: "normal",
    },
    {
      className: "忠孝國小 L班",
      school: "忠孝國小",
      worker: "小張",
      attendanceRate: 90.8,
      journalStatus: false,
      status: "danger",
    },
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

// === 工具函式 ===

// 根據社工 ID 取得名字
function getWorkerName(workerId) {
  const worker = SOCIAL_WORKERS.find((w) => w.id === workerId);
  return worker ? worker.name : "未知";
}

// 取得社工負責的班級
function getWorkerClasses(workerId) {
  return CLASSES.filter((c) => c.socialWorker === workerId);
}

// 取得所有學生（跨班級）
function getAllStudents() {
  const result = [];
  for (const classId of Object.keys(STUDENTS)) {
    const className = CLASSES.find((c) => c.id === classId);
    for (const student of STUDENTS[classId]) {
      result.push({
        ...student,
        classId,
        className: className ? className.name : "未知班級",
        school: className ? className.school : "",
      });
    }
  }
  return result;
}

// 取得學生的紀錄
function getStudentRecords(studentId) {
  return CASE_RECORDS[studentId] || [];
}

// 顯示 Toast 提示
function showToast(message, duration = 2000) {
  const existing = document.querySelector(".toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #1F2937; color: white; padding: 12px 24px; border-radius: 8px;
    font-size: 14px; z-index: 9999; opacity: 0; transition: opacity 0.3s;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// 數字動畫（從 0 跳到目標值）
function animateNumber(element, target, duration = 1000, isPercent = false) {
  const start = 0;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic 緩動函式
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    element.textContent = isPercent
      ? current.toFixed(1) + "%"
      : Math.round(current).toString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}
