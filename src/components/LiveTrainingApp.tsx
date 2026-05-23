// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

const safeGet = (key: string, fallback: any) => {
  if (typeof window === 'undefined') return fallback;
  try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const safeSet = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

// ==========================================
// 1. 图标库 (SVG Icons)
// ==========================================
const Icons = {
  Home: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Radio: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 0 1 10 10V12a10 10 0 0 1-10 10"/><path d="M12 2a10 10 0 0 0-10 10V12a10 10 0 0 0 10 10"/><path d="M19 12a7 7 0 0 0-7-7"/><path d="M12 19a7 7 0 0 0 7-7"/><path d="M5 12a7 7 0 0 0 7 7"/><path d="M12 5a7 7 0 0 0-7 7"/></svg>
  ),
  User: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Link: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  ),
  Loader: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
  ),
  Lightbulb: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  ),
  Camera: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  ),
  Eye: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Clock: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  MessageCircle: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  ),
  Mic: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
  ),
  MicOff: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="1" x2="23" y1="1" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
  ),
  RefreshCw: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
  ),
  ArrowRight: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Plus: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
  ),
  Trash2: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
  Star: ({ size = 20, className = "", fill = "none" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Check: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  X: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
  ),
  ChevronLeft: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"/></svg>
  ),
  ChevronRight: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"/></svg>
  ),
  ChevronDown: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>
  ),
  ChevronUp: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"/></svg>
  ),
  Calendar: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  Target: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  BookOpen: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  Settings: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Sparkles: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
  ),
  Flame: ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  )
};

// ==========================================
// 2. 模拟数据 (Mock Data)
// ==========================================
const MOCK_SKILL_CARDS = [
  {
    id: "sc-1",
    title: "「开场破冰」30秒快速建立亲和力",
    category: "互动停留",
    difficulty: 3,
    sourceVideo: "@带货王阿强 的爆款切片",
    sourceLink: "https://v.douyin.com/ieRoE8W3/",
    dimensions: ["开场设计", "情绪调动"],
    estimatedDuration: "约5分钟",
    targetSessions: 5,
    trainedSessions: 3,
    keyPoints: [
      "以饱满的精神面貌打招呼，切记不要死板地走流程。",
      "3秒内抛出第一个用户痛点提问，建立认知共鸣。",
      "迅速透传本场福利政策，锚定后续留存。"
    ],
    tips: [
      "不要平铺直叙说“大家好我是谁”这类套话。",
      "可用“今天通勤一路上被吹懵了...”等真实生活现状切入。",
      "开场不超过30秒，迅速进入主题。"
    ],
    trainingGoal: "在开场30秒内完整实践“抛出悬念”、“痛点引入”、“过渡主题”，且AI评分达8/10以上。"
  },
  {
    id: "sc-2",
    title: "「评论区互动」精准识别高留存弹幕",
    category: "促单转化",
    difficulty: 4,
    sourceVideo: "@精致美妆Lily 直播实录",
    sourceLink: "https://v.douyin.com/aeRoE8W4/",
    dimensions: ["互动技巧", "促单转化"],
    estimatedDuration: "约8分钟",
    targetSessions: 5,
    trainedSessions: 1,
    keyPoints: [
      "视线快速扫过评论流，筛选有明确消费意向/高价值的话题。",
      "以名字互动（例：“感谢小丸子的提问...”），加深专属感。",
      "运用‘追问法’与观众进行二轮交互，带动其他围观党回复。"
    ],
    tips: [
      "不应顺着负面偏激弹幕对线，忽略并迅速切开话题。",
      "点名回复时带上观众昵称。",
      "一个评论最多聊1分钟，避免被带偏。"
    ],
    trainingGoal: "每场训练完成至少3次高质量评论互动，互动深度评分达7/10以上。"
  },
  {
    id: "sc-3",
    title: "「冷场救急」3秒话题平滑切换",
    category: "氛围防御",
    difficulty: 5,
    sourceVideo: "@科技狂潮 互动分析",
    sourceLink: "https://v.douyin.com/ceRoE8W5/",
    dimensions: ["节奏把控", "话题结构"],
    estimatedDuration: "约5分钟",
    targetSessions: 5,
    trainedSessions: 2,
    keyPoints: [
      "识别冷场前兆信号。",
      "3个万能话题池随时调用。",
      "切换不突兀的衔接句式。"
    ],
    tips: [
      "冷场不是坏事，是切换话题的机会。",
      "准备3-5个备选话题放在手边。",
      "切换时用'说到这个我突然想到...'自然过渡。"
    ],
    trainingGoal: "冷场时3秒内调用备选话题，切换自然度评分达7/10以上。"
  }
];

const TAG_OPTIONS = [
  "穿搭", "美妆", "美食", "聊天", "知识分享", "好物推荐",
  "职场", "学生", "生活记录", "情感", "搞笑", "游戏",
  "读书", "运动健身", "音乐", "宠物", "母婴", "旅行"
];

const AI_AGENTS_POOL = [
  { name: '剁手党小王', level: 'Lv.28', avatar: '👗', character: '冲动消费/爱跟风' },
  { name: '理智老法师', level: 'Lv.42', avatar: '🧐', character: '爱问参数/挑剔' },
  { name: '摸鱼达人', level: 'Lv.15', avatar: '🐱', character: '爱互动/捧场王' },
  { name: '美妆护肤Lily', level: 'Lv.31', avatar: '💄', character: '注重细节/大款' },
  { name: '黑粉阿强', level: 'Lv.8', avatar: '🤖', character: '毒舌/爱质疑' },
  { name: '吃瓜首席代表', level: 'Lv.22', avatar: '🍉', character: '打酱油/复读机' },
  { name: '精致辣妈', level: 'Lv.35', avatar: '🍼', character: '看重性价比' },
  { name: '科技发烧友', level: 'Lv.50', avatar: '⚡', character: '极其关注质量' }
];

const COMMENT_TEMPLATES = {
  general: [
    "主播终于开播啦！支持支持！",
    "今天卖什么好货？先蹲一个",
    "主播声音好听，关注了",
    "前排占座！",
    "怎么买？几号链接？"
  ],
  'sc-1': [
    "卧槽，被主播抓住了，什么福利？",
    "留下来看看，不要骗我哦！",
    "5，4，3，2，1 蹲着呢！",
    "刚下班，进来看看",
    "气氛一下就来了"
  ],
  'sc-2': [
    "主播看到我了！感动！",
    "刚才回答那个提问真的专业",
    "支持主播互动，太用心了",
    "对微胖身材友好吗？",
    "被翻牌了，已下单"
  ],
  'sc-3': [
    "哈哈哈，说到这个我也想聊聊了",
    "转话题好自然",
    "真实，就是这样的",
    "不想划走了，想听主播聊",
    "对对对！支持"
  ]
};

const MOCK_INITIAL_ARCHIVE = [
  {
    id: "session-001",
    date: "2024-01-15 20:30",
    duration: 754,
    durationStr: "12分34秒",
    skillCards: ["开场破冰", "评论区互动"],
    scores: { rhythm: 8, interaction: 6, topic: 8 },
    summary: "本次训练中，你积极调动了设定的技能卡，在开场破冰环节表现自然流畅。评论区互动仍需加强，冷场时的应对可以更灵活。",
    suggestions: [
      "开场时尝试用场景感带入",
      "互动时先认同再展开回答",
      "冷场时用“说到这个我突然想到...”自然过渡"
    ]
  }
];

// ==========================================
// 3. 主应用容器 (Main Container)
// ==========================================
export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [toast, setToast] = useState(null);

  // localStorage States
  const [skillCardLibrary, setSkillCardLibrary] = useState(() => {
    try { const saved = localStorage.getItem('skill-card-library'); return saved ? JSON.parse(saved) : MOCK_SKILL_CARDS; } catch { return MOCK_SKILL_CARDS; }
  });
  const [selectedSkills, setSelectedSkills] = useState(() => {
    try { const saved = localStorage.getItem('selected-skill-cards'); return saved ? JSON.parse(saved) : ["sc-1", "sc-2"]; } catch { return ["sc-1", "sc-2"]; }
  });
  const [trainSessions, setTrainSessions] = useState(() => {
    try { const saved = localStorage.getItem('train-sessions'); return saved ? JSON.parse(saved) : MOCK_INITIAL_ARCHIVE; } catch { return MOCK_INITIAL_ARCHIVE; }
  });
  const [favoriteSessions, setFavoriteSessions] = useState(() => {
    try { const saved = localStorage.getItem('favorite-sessions'); return saved ? JSON.parse(saved) : ["session-001"]; } catch { return ["session-001"]; }
  });
  const [userProfile, setUserProfile] = useState(() => {
    try { const saved = localStorage.getItem('user-profile'); return saved ? JSON.parse(saved) : { username: "直播练习生", totalSessions: 12, totalSkills: 8, totalFavorites: 3 }; } catch { return { username: "直播练习生", totalSessions: 12, totalSkills: 8, totalFavorites: 3 }; }
  });
  const [basicSettings, setBasicSettings] = useState(() => {
    try { const saved = localStorage.getItem('basic-settings'); return saved ? JSON.parse(saved) : { persona: "我是一个分享通勤穿搭的上班族，风格偏简约...", tags: ["穿搭", "职场"] }; } catch { return { persona: "我是一个分享通勤穿搭的上班族，风格偏简约...", tags: ["穿搭", "职场"] }; }
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('skill-card-library', JSON.stringify(skillCardLibrary)); }, [skillCardLibrary]);
  useEffect(() => { localStorage.setItem('selected-skill-cards', JSON.stringify(selectedSkills)); }, [selectedSkills]);
  useEffect(() => { localStorage.setItem('train-sessions', JSON.stringify(trainSessions)); }, [trainSessions]);
  useEffect(() => { localStorage.setItem('favorite-sessions', JSON.stringify(favoriteSessions)); }, [favoriteSessions]);
  useEffect(() => { localStorage.setItem('user-profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('basic-settings', JSON.stringify(basicSettings)); }, [basicSettings]);

  // Toast Control
  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#FFFFFF] flex justify-center font-sans selection:bg-[#FF4D6D]/30 select-none">
      <div className="w-full max-w-[430px] min-h-screen relative bg-[#0F0F0F] shadow-2xl flex flex-col overflow-hidden">
        
        {/* 全局 Toast 通知 */}
        {toast && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[999] animate-[slide-in-down_0.3s_ease-out]">
            <div className={`px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border text-[13px] font-medium backdrop-blur-md ${
              toast.type === 'success' ? 'bg-[#4ECDC4]/20 border-[#4ECDC4]/50 text-[#4ECDC4]' :
              toast.type === 'error' ? 'bg-[#FF4D6D]/20 border-[#FF4D6D]/50 text-[#FF4D6D]' :
              'bg-[#262626] border-[#333333] text-white'
            }`}>
              {toast.type === 'success' && <Icons.Check size={16} />}
              {toast.type === 'error' && <Icons.X size={16} />}
              {toast.type === 'info' && <Icons.Lightbulb size={16} />}
              <span>{toast.msg}</span>
            </div>
          </div>
        )}

        {/* 路由页面渲染区 */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {currentPath === '/' && (
            <HomePage 
              skillCardLibrary={skillCardLibrary}
              setSkillCardLibrary={setSkillCardLibrary}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              basicSettings={basicSettings}
              setBasicSettings={setBasicSettings}
              triggerToast={triggerToast}
              setCurrentPath={setCurrentPath}
            />
          )}

          {currentPath === '/live' && (
            <VirtualLiveRoom 
              selectedSkills={selectedSkills}
              basicSettings={basicSettings}
              skillCardLibrary={skillCardLibrary}
              triggerToast={triggerToast}
              setCurrentPath={setCurrentPath}
              setTrainSessions={setTrainSessions}
            />
          )}

          {currentPath === '/profile' && (
            <ProfilePage 
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              trainSessions={trainSessions}
              setTrainSessions={setTrainSessions}
              favoriteSessions={favoriteSessions}
              setFavoriteSessions={setFavoriteSessions}
              triggerToast={triggerToast}
            />
          )}
        </div>

        {/* 底部导航 TabBar (不在 /live 显示) */}
        {currentPath !== '/live' && (
          <nav className="h-[64px] pb-safe bg-[#141414]/95 backdrop-blur-md border-t border-[#333333] flex items-center justify-around shrink-0 z-50">
            {[
              { path: '/', icon: Icons.Home, label: '首页' },
              { path: '/live', icon: Icons.Radio, label: '直播', isLive: true },
              { path: '/profile', icon: Icons.User, label: '我的' },
            ].map(tab => (
              <button 
                key={tab.path}
                onClick={() => setCurrentPath(tab.path)}
                className={`flex flex-col items-center gap-1 w-1/3 py-2 transition-all ${currentPath === tab.path ? 'text-[#FF4D6D]' : 'text-[#6B6B6B] hover:text-[#B3B3B3]'}`}
              >
                <div className="relative">
                  <tab.icon size={22} />
                  {tab.isLive && currentPath !== tab.path && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF4D6D] rounded-full animate-pulse border border-[#141414]" />
                  )}
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. 页面一：首页组件 (HomePage)
// ==========================================
function HomePage({ 
  skillCardLibrary, 
  setSkillCardLibrary, 
  selectedSkills, 
  setSelectedSkills, 
  basicSettings, 
  setBasicSettings, 
  triggerToast, 
  setCurrentPath 
}) {
  const [linkInput, setLinkInput] = useState('');
  const [parseState, setParseState] = useState('idle'); // idle, parsing, completed, error
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(-1);
  const [selectedDetailCard, setSelectedDetailCard] = useState(null);
  const [personaTab, setPersonaTab] = useState('text'); // text, auto
  const [isRecording, setIsRecording] = useState(false);
  const recordingTimerRef = useRef(null);

  const analysisSteps = ["话题结构", "互动技巧", "节奏把控", "情绪调动", "开场设计", "收尾引导"];

  const handleParseLink = () => {
    if (!linkInput.trim()) {
      triggerToast("请先粘贴分享链接", "error");
      return;
    }
    if (!linkInput.includes("douyin.com")) {
      setParseState('error');
      triggerToast("解析失败，请检查链接是否有效", "error");
      return;
    }

    setParseState('parsing');
    setAnalysisProgress(0);
    setActiveStepIdx(-1);

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setAnalysisProgress(prev => Math.min(100, prev + 12));
      setActiveStepIdx(Math.floor((count / 10) * analysisSteps.length));
      
      if (count >= 10) {
        clearInterval(interval);
        setAnalysisProgress(100);
        setActiveStepIdx(5);
        setTimeout(() => {
          setParseState('completed');
          const newId = `sc-${Date.now()}`;
          const newCard = {
            id: newId,
            title: `「核心停留」爆款直播留存拆解`,
            category: "互动停留",
            difficulty: 4,
            sourceVideo: "@带货达人 的切片",
            sourceLink: linkInput,
            dimensions: ["情绪调动", "收尾引导"],
            estimatedDuration: "约6分钟",
            targetSessions: 5,
            trainedSessions: 0,
            keyPoints: ["迅速展示高货产品细节", "发起高密度互动"],
            tips: ["多用极具引导性的身体姿态", "用低门槛抽奖筛选活跃粉"],
            trainingGoal: "新观众进入后的黄金互动窗口切入，促成弹幕氛围拉起。"
          };
          setSkillCardLibrary(prev => [newCard, ...prev]);
          setSelectedSkills(prev => [...prev, newId]);
          triggerToast("AI分析完成，已提炼新技能卡", "success");
        }, 500);
      }
    }, 250);
  };

  const toggleSkillCardSelection = (id) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(prev => prev.filter(item => item !== id));
      triggerToast("已取消选中", "info");
    } else {
      setSelectedSkills(prev => [...prev, id]);
      triggerToast("已加入本次训练", "success");
    }
  };

  const toggleTagChip = (tag) => {
    if (basicSettings.tags.includes(tag)) {
      setBasicSettings(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    } else {
      setBasicSettings(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const startRecordingSim = () => {
    if (isRecording) {
      clearInterval(recordingTimerRef.current);
      setIsRecording(false);
      setBasicSettings(prev => ({
        ...prev,
        persona: prev.persona + (prev.persona ? "，" : "") + "平时也喜欢分享一些好物。"
      }));
      triggerToast("语音转文字成功", "success");
    } else {
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {}, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-24 animate-[fade-in_0.3s_ease-out]">
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 z-40 bg-[#0F0F0F]/90 backdrop-blur-md">
        <h1 className="text-[20px] font-semibold text-white flex items-center gap-2">
          虚拟直播间
        </h1>
        <button onClick={() => setCurrentPath('/live')} className="p-2 rounded-full bg-[#1A1A1A] text-[#4ECDC4] border border-[#333333] hover:bg-[#262626] transition-colors" aria-label="快捷开播">
          <Icons.Camera size={18} />
        </button>
      </header>

      <main className="p-4 space-y-6">
        
        {/* 素材导入区 */}
        <section className="space-y-3">
          <div className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-4 shadow-lg">
            {parseState !== 'completed' ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#0F0F0F] border border-[#333333] rounded-lg flex items-center px-3 focus-within:border-[#4ECDC4] transition-colors">
                    <input 
                      type="text"
                      placeholder="粘贴抖音视频分享链接..."
                      value={linkInput}
                      onChange={(e) => {
                        setLinkInput(e.target.value);
                        if (parseState === 'error') setParseState('idle');
                      }}
                      disabled={parseState === 'parsing'}
                      className="bg-transparent border-none outline-none text-[14px] text-white w-full py-2.5 placeholder-[#6B6B6B]"
                    />
                    <Icons.Link size={16} className={`text-[#6B6B6B] ${linkInput ? 'text-[#4ECDC4]' : 'animate-pulse'}`} />
                  </div>
                  <button 
                    onClick={handleParseLink}
                    disabled={parseState === 'parsing'}
                    className="bg-[#262626] text-white px-4 rounded-lg text-[14px] font-medium border border-[#333333] hover:bg-[#333333] disabled:opacity-50 transition-colors"
                  >
                    解析
                  </button>
                </div>

                {parseState === 'parsing' && (
                  <div className="space-y-2 pt-2 animate-[fade-in_0.2s]">
                    <div className="flex items-center justify-between text-[12px] text-[#4ECDC4]">
                      <span className="flex items-center gap-1">
                        <Icons.Loader size={14} /> 正在解析视频...
                      </span>
                      <span>{Math.floor(analysisProgress)}%</span>
                    </div>
                    <div className="h-1.5 bg-[#0F0F0F] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4ECDC4] transition-all duration-300" style={{ width: `${analysisProgress}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {analysisSteps.map((step, idx) => (
                        <span key={step} className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${idx <= activeStepIdx ? 'bg-[#4ECDC4]/10 border-[#4ECDC4]/30 text-[#4ECDC4]' : 'bg-[#0F0F0F] border-[#333333] text-[#6B6B6B]'}`}>
                          {idx <= activeStepIdx && '✓ '}{step}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {parseState === 'error' && (
                  <div className="text-[12px] text-[#FF4D6D] flex items-center justify-between mt-2">
                    <span>解析失败，请检查链接是否有效</span>
                    <button onClick={() => setParseState('idle')} className="underline font-medium">重试</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#0F0F0F] rounded-lg p-3 border border-[#333333] flex items-center gap-3 animate-[fade-in_0.3s]">
                <div className="w-14 h-16 rounded bg-[#262626] flex items-center justify-center shrink-0 text-xl border border-[#333333]">🎬</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-white truncate">超长待机精选带货案例切片</p>
                  <p className="text-[12px] text-[#B3B3B3] mt-1">时长 15:32 · @带货达人</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] bg-[#4ECDC4]/10 text-[#4ECDC4] w-fit px-2 py-0.5 rounded-full border border-[#4ECDC4]/20">
                    <Icons.Check size={10} /> 解析完成 · 已识别6个维度
                  </div>
                </div>
                <button onClick={() => { setParseState('idle'); setLinkInput(''); }} className="p-1.5 hover:bg-[#262626] rounded-md text-[#6B6B6B] hover:text-white">
                  <Icons.X size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 技能卡模块 */}
        <section className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-4 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-white flex items-center gap-2">技能卡</h2>
              <p className="text-[12px] text-[#6B6B6B] mt-1">分析生成的技能卡将同步至直播间</p>
            </div>
            <span className="text-[12px] bg-[#4ECDC4]/10 text-[#4ECDC4] px-2 py-1 rounded-full border border-[#4ECDC4]/20 font-medium">
              已选 {selectedSkills.length} / {skillCardLibrary.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1 pb-1 scrollbar-none">
            {skillCardLibrary.map(card => {
              const isSelected = selectedSkills.includes(card.id);
              const isStop = card.category === "互动停留";
              const isConvert = card.category === "促单转化";

              return (
                <div 
                  key={card.id}
                  onClick={() => setSelectedDetailCard(card)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? 'border-[#4ECDC4] bg-gradient-to-br from-[#1A1A1A] to-[#4ECDC4]/5 shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'border-[#333333] bg-[#0F0F0F] hover:border-[#4ECDC4]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isStop ? 'bg-[#4ECDC4]/10 text-[#4ECDC4]' : isConvert ? 'bg-[#FF4D6D]/10 text-[#FF4D6D]' : 'bg-[#FFD166]/10 text-[#FFD166]'
                    }`}>
                      {card.category || "综合技巧"}
                    </span>
                    <div className="flex gap-0.5 text-[#FFD166]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icons.Star key={i} size={10} fill={i < card.difficulty ? 'currentColor' : 'none'} className={i < card.difficulty ? 'text-[#FFD166]' : 'text-[#333333]'} />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-[14px] font-semibold text-white mb-2 leading-snug">{card.title}</h3>
                  <p className="text-[12px] text-[#B3B3B3] line-clamp-2 leading-relaxed mb-4 min-h-[36px]">
                    {card.keyPoints[0]}
                  </p>

                  <div className="border-t border-[#333333] pt-3 flex items-center justify-between text-[12px]">
                    <span className="text-[#6B6B6B]">难度：{card.difficulty > 3 ? '困难' : '简单'}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSkillCardSelection(card.id); }}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-[#4ECDC4] border-[#4ECDC4] text-[#0F0F0F]' : 'border-[#6B6B6B] bg-transparent'}`}
                    >
                      {isSelected && <Icons.Check size={12} strokeWidth={4} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 基础设置区 */}
        <section className="bg-[#1A1A1A] rounded-xl border border-[#333333] shadow-lg overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-[#333333]">
            <h2 className="text-[16px] font-semibold text-white">基础设置</h2>
            <span className="text-[12px] text-[#6B6B6B]">展开 ▼</span>
          </div>
          
          <div className="p-4 space-y-6">
            {/* 人设 */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-medium text-[#B3B3B3]">人设</h3>
              <div className="flex gap-2">
                <button onClick={() => setPersonaTab('text')} className={`flex-1 py-1.5 text-[12px] rounded-md transition-colors ${personaTab === 'text' ? 'bg-[#262626] text-white border border-[#333333]' : 'text-[#6B6B6B]'}`}>主动输入</button>
                <button onClick={() => setPersonaTab('auto')} className={`flex-1 py-1.5 text-[12px] rounded-md transition-colors ${personaTab === 'auto' ? 'bg-[#262626] text-white border border-[#333333]' : 'text-[#6B6B6B]'}`}>动态生成</button>
              </div>
              {personaTab === 'text' ? (
                <div className="relative">
                  <textarea 
                    value={basicSettings.persona}
                    onChange={(e) => setBasicSettings(prev => ({...prev, persona: e.target.value}))}
                    placeholder="用一段话描述你的人设，比如'我是一个分享通勤穿搭的上班族，风格偏简约...'"
                    className="w-full bg-[#0F0F0F] border border-[#333333] rounded-lg p-3 text-[14px] text-white placeholder-[#6B6B6B] resize-none h-24 focus:border-[#4ECDC4] outline-none transition-colors"
                  />
                  <button 
                    onClick={startRecordingSim}
                    className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${isRecording ? 'bg-[#FF4D6D] text-white animate-pulse' : 'bg-[#262626] text-[#B3B3B3] hover:text-white'}`}
                  >
                    {isRecording ? <Icons.MicOff size={16} /> : <Icons.Mic size={16} />}
                  </button>
                  <span className="absolute bottom-3 left-3 text-[10px] text-[#6B6B6B]">{basicSettings.persona.length} 字</span>
                </div>
              ) : (
                <div className="bg-[#0F0F0F] rounded-lg border border-[#333333] p-4 text-center">
                  <p className="text-[12px] text-[#6B6B6B]">直播过程中将根据您的语音，每3分钟智能更新人设标签。</p>
                </div>
              )}
            </div>

            {/* 标签 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-medium text-[#B3B3B3]">标签</h3>
                <span className="text-[12px] text-[#4ECDC4]">已选：{basicSettings.tags.join('、') || '无'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map(tag => {
                  const isTagActive = basicSettings.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTagChip(tag)}
                      className={`text-[12px] px-3 py-1.5 rounded-full border transition-all ${isTagActive ? 'bg-[#4ECDC4]/10 border-[#4ECDC4]/40 text-[#4ECDC4]' : 'bg-[#0F0F0F] border-[#333333] text-[#6B6B6B] hover:border-[#6B6B6B]'}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

      </main>


      {/* 技能卡详情半弹窗 */}
      {selectedDetailCard && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s]">
          <div className="absolute inset-0" onClick={() => setSelectedDetailCard(null)} />
          <div className="w-full max-w-[430px] bg-[#1A1A1A] rounded-t-2xl border-t border-[#333333] z-10 flex flex-col max-h-[85vh] animate-[slide-in-up_0.25s_ease-out]">
            <div className="py-3 flex justify-center cursor-pointer" onClick={() => setSelectedDetailCard(null)}>
              <div className="w-12 h-1.5 bg-[#333333] rounded-full" />
            </div>

            <div className="px-5 pb-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-[16px] font-semibold text-white mb-1">{selectedDetailCard.title}</h2>
                <p className="text-[12px] text-[#B3B3B3]">维度：{selectedDetailCard.dimensions.join(' · ')}</p>
                <p className="text-[12px] text-[#B3B3B3]">来源：{selectedDetailCard.sourceVideo}</p>
                <p className="text-[12px] text-[#B3B3B3]">预计训练 {selectedDetailCard.estimatedDuration} · 目标 {selectedDetailCard.targetSessions} 场</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-white">关键要点</h3>
                <div className="bg-[#0F0F0F] border border-[#333333] rounded-xl p-4">
                  {selectedDetailCard.keyPoints.map((point, idx) => (
                    <p key={idx} className="text-[14px] text-[#B3B3B3] mb-2 last:mb-0 leading-relaxed">
                      {idx + 1}. {point}
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-white">核心 Tips</h3>
                <div className="bg-[#0F0F0F] border border-[#333333] rounded-xl p-4">
                  {selectedDetailCard.tips.map((tip, idx) => (
                    <p key={idx} className="text-[14px] text-[#B3B3B3] mb-2 last:mb-0 leading-relaxed flex items-start gap-1.5">
                      <span className="text-[#FFD166] mt-0.5">•</span> <span>{tip}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-white">训练目标</h3>
                <div className="bg-[#0F0F0F] border border-[#333333] rounded-xl p-4">
                  <p className="text-[14px] text-[#B3B3B3] leading-relaxed">{selectedDetailCard.trainingGoal}</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  toggleSkillCardSelection(selectedDetailCard.id);
                  setSelectedDetailCard(null);
                }}
                className={`w-full py-3.5 rounded-xl text-[14px] font-medium transition-colors ${
                  selectedSkills.includes(selectedDetailCard.id) ? 'bg-[#262626] text-[#FF4D6D] border border-[#333333]' : 'bg-[#FF4D6D] text-white shadow-lg'
                }`}
              >
                {selectedSkills.includes(selectedDetailCard.id) ? '移除' : '加入本次训练'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. 页面二：虚拟直播间组件 (VirtualLiveRoom)
// ==========================================
function VirtualLiveRoom({ selectedSkills, basicSettings, skillCardLibrary, triggerToast, setCurrentPath, setTrainSessions }) {
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [viewerCount, setViewerCount] = useState(1280);
  const [comments, setComments] = useState([]);
  const [isLivePaused, setIsLivePaused] = useState(false);
  
  const [micState, setMicState] = useState(true);
  const [cameraFailed, setCameraFailed] = useState(false);

  const activeSkillCards = skillCardLibrary.filter(card => selectedSkills.includes(card.id));
  const [currentSkillIdx, setCurrentSkillIdx] = useState(0);
  const activeSkillCard = activeSkillCards.length > 0 ? activeSkillCards[currentSkillIdx] : null;

  const [showSkillSheet, setShowSkillSheet] = useState(false);
  const [showSummaryPill, setShowSummaryPill] = useState(false);
  const [showSummarySheet, setShowSummarySheet] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showReportOverlay, setShowReportOverlay] = useState(false);

  const [skillProgress, setSkillProgress] = useState(0);
  const [topicPrompt, setTopicPrompt] = useState(null);
  const [promptCountdown, setPromptCountdown] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const commentsEndRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // 初始化摄像头
  useEffect(() => {
    let active = true;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (active && videoRef.current) {
          videoRef.current.srcObject = stream;
          mediaStreamRef.current = stream;
        }
      } catch (err) {
        console.warn("Camera fallback applied", err);
        if (active) setCameraFailed(true);
      }
    };
    startCamera();

    return () => {
      active = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Canvas Fallback 渲染循环
  useEffect(() => {
    if (!cameraFailed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 430;
      canvas.height = canvas.parentElement?.clientHeight || 800;
    };
    resize();

    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1
    }));

    let scanY = 0;
    const render = () => {
      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(78, 205, 196, 0.05)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

      ctx.fillStyle = 'rgba(78, 205, 196, 0.3)';
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });

      // 声音波形模拟
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 77, 109, 0.4)';
      ctx.lineWidth = 2;
      const waveCount = 6;
      const sliceWidth = canvas.width / waveCount;
      const midY = canvas.height * 0.45;
      for (let i = 0; i <= waveCount; i++) {
        const x = i * sliceWidth;
        const offset = Math.sin(Date.now() * 0.003 + i) * (micState && !isLivePaused ? 40 : 5);
        if (i === 0) ctx.moveTo(x, midY + offset);
        else ctx.lineTo(x, midY + offset);
      }
      ctx.stroke();

      scanY = (scanY + 2) % canvas.height;
      ctx.strokeStyle = 'rgba(78, 205, 196, 0.2)';
      ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(canvas.width, scanY); ctx.stroke();

      ctx.fillStyle = 'rgba(78, 205, 196, 0.5)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("未获取摄像头，处于模拟训练环境", canvas.width / 2, canvas.height * 0.3);

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [cameraFailed, micState, isLivePaused]);

  // 全局计时器
  useEffect(() => {
    let interval;
    if (!isLivePaused && !showReportOverlay) {
      interval = setInterval(() => {
        setLiveSeconds(prev => {
          const next = prev + 1;
          if (next === 300) setShowSummaryPill(true);
          return next;
        });
        setViewerCount(prev => Math.max(100, prev + Math.floor(Math.random() * 40) - 20));
        setSkillProgress(p => Math.min(100, p + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLivePaused, showReportOverlay]);

  // 弹幕生成器
  useEffect(() => {
    let timer;
    const generate = () => {
      const agent = AI_AGENTS_POOL[Math.floor(Math.random() * AI_AGENTS_POOL.length)];
      let templates = [...COMMENT_TEMPLATES.general];
      if (activeSkillCard && COMMENT_TEMPLATES[activeSkillCard.id]) {
        if (Math.random() > 0.5) templates = [...COMMENT_TEMPLATES[activeSkillCard.id], ...templates];
      }
      const text = templates[Math.floor(Math.random() * templates.length)];
      
      let type = 'normal';
      if (text.includes("下单") || text.includes("抢")) type = 'buy';
      else if (Math.random() < 0.1) type = 'gift';

      setComments(prev => [...prev.slice(-39), { id: Date.now() + Math.random(), agent, text, type }]);
      timer = setTimeout(generate, Math.random() * 2000 + 1500);
    };
    if (!isLivePaused && !showReportOverlay) {
      timer = setTimeout(generate, 1500);
    }
    return () => clearTimeout(timer);
  }, [isLivePaused, showReportOverlay, activeSkillCard]);

  // 滚动弹幕到底部
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // AI提词倒计时
  useEffect(() => {
    let t;
    if (topicPrompt && promptCountdown > 0 && !isLivePaused) {
      t = setTimeout(() => setPromptCountdown(c => c - 1), 1000);
    } else if (promptCountdown === 0) {
      setTopicPrompt(null);
    }
    return () => clearTimeout(t);
  }, [topicPrompt, promptCountdown, isLivePaused]);

  const triggerPrompt = () => {
    if (!activeSkillCard) return;
    setPromptCountdown(12);
    setTopicPrompt({
      title: "实战训练提示",
      tipText: activeSkillCard.tips[Math.floor(Math.random() * activeSkillCard.tips.length)]
    });
  };

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const saveAndExit = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      duration: liveSeconds,
      durationStr: `${Math.floor(liveSeconds / 60)}分${liveSeconds % 60}秒`,
      skillCards: activeSkillCards.map(c => c.title.split('」')[0].substring(1)),
      scores: { rhythm: 8, interaction: 7, topic: 8 },
      summary: "本次训练中表现自然流畅。评论区互动积极，冷场时的应对可以更灵活。",
      suggestions: ["尝试加入更多具体细节", "先认同再展开"]
    };
    setTrainSessions(prev => [newSession, ...prev]);
    setShowReportOverlay(false);
    setCurrentPath('/profile');
    triggerToast("报告已存入档案");
  };

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col justify-between overflow-hidden">
      {/* 视觉底层 */}
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* 遮罩 */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none" />

      {/* 顶部栏 */}
      <div className="absolute top-safe pt-4 inset-x-4 z-30 flex items-start justify-between pointer-events-auto">
        <div className="flex flex-col gap-2">
          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10 w-fit">
            <span className="w-2 h-2 bg-[#FF4D6D] rounded-full animate-pulse" />
            <span className="text-[12px] font-medium text-white">训练中</span>
          </div>
          {activeSkillCard && (
            <button onClick={() => setShowSkillSheet(true)} className="bg-[#4ECDC4]/90 backdrop-blur text-black text-[12px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-md w-fit">
              🏷 {activeSkillCard.title.substring(1, 5)}... <Icons.ChevronDown size={12} />
            </button>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 text-white">
          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10 text-[12px]">
            <Icons.Eye size={14} className="text-[#B3B3B3]" /> <span className="font-mono tabular-nums">{viewerCount.toLocaleString()}</span>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10 text-[12px]">
            <Icons.Clock size={14} className="text-[#B3B3B3]" /> <span className="font-mono tabular-nums">{formatTime(liveSeconds)}</span>
          </div>
        </div>
      </div>

      {/* 进度条 */}
      {activeSkillCard && (
        <div className="absolute top-[80px] left-4 right-[120px] z-30 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10 pointer-events-auto">
          <div className="flex justify-between text-[10px] text-white mb-1.5">
            <span className="truncate">{activeSkillCard.title}</span>
            <span className="text-[#4ECDC4] shrink-0 ml-2">第{activeSkillCard.trainedSessions + 1}/5场</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden relative">
            <div className="h-full bg-[#4ECDC4] transition-all duration-1000" style={{ width: `${skillProgress}%` }} />
            <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-white/80" />
          </div>
        </div>
      )}

      {/* 5分钟提示 */}
      {showSummaryPill && (
        <div className="absolute top-[130px] inset-x-4 z-40 animate-[slide-in-down_0.3s_ease-out]">
          <div onClick={() => { setShowSummaryPill(false); setShowSummarySheet(true); }} className="bg-[#FFD166] text-black rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg cursor-pointer">
            <span className="text-[12px] font-medium">📊 第1个5分钟小结已生成</span>
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-medium">点击查看</span>
          </div>
        </div>
      )}

      {/* 提词浮层 */}
      <div className="absolute bottom-[35vh] inset-x-4 z-30 pointer-events-auto">
        {topicPrompt ? (
          <div className="bg-black/60 backdrop-blur-md border border-[#FFD166]/50 p-4 rounded-xl shadow-2xl animate-[fade-in_0.2s]">
            <div className="flex justify-between items-center text-[12px] text-[#FFD166] mb-2">
              <span className="font-medium flex items-center gap-1"><Icons.Lightbulb size={14} /> {topicPrompt.title}</span>
              <span>剩余 {promptCountdown}s</span>
            </div>
            <p className="text-[14px] text-white font-medium mb-3">{activeSkillCard?.title}</p>
            <div className="bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 p-3 rounded-lg mb-3">
              <p className="text-[13px] text-[#4ECDC4] leading-relaxed">【提示】: "{topicPrompt.tipText}"</p>
            </div>
            <div className="h-1 bg-[#0F0F0F] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD166] transition-all duration-1000" style={{ width: `${(promptCountdown / 12) * 100}%` }} />
            </div>
          </div>
        ) : (
          <button onClick={triggerPrompt} className="w-full bg-black/40 backdrop-blur-md border border-white/10 py-3 rounded-full text-[12px] text-white/70 flex items-center justify-center gap-1 hover:text-white transition-colors">
            <Icons.Target size={14} /> 获取智能提词
          </button>
        )}
      </div>

      {/* 评论区 */}
      <div className="absolute bottom-[80px] inset-x-4 h-[30vh] z-30 flex flex-col justify-end pointer-events-none">
        <div className="overflow-y-auto space-y-2.5 pr-2 pb-2 scrollbar-none pointer-events-auto mask-image-bottom max-h-full">
          {comments.map(c => {
            const isBuy = c.type === 'buy';
            const isGift = c.type === 'gift';
            return (
              <div key={c.id} className="flex items-start gap-2 max-w-[85%] animate-[slide-in-left_0.2s_ease-out]">
                <div className={`rounded-xl rounded-tl-none px-3 py-2 backdrop-blur-md border ${
                  isBuy ? 'bg-[#FF4D6D]/20 border-[#FF4D6D]/40' : isGift ? 'bg-[#FFD166]/20 border-[#FFD166]/40' : 'bg-black/50 border-white/10'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-white/70 font-medium">{c.agent.name}</span>
                    <span className="text-[8px] bg-white/20 px-1 rounded text-white">{c.agent.level}</span>
                  </div>
                  <p className={`text-[14px] leading-snug ${isBuy ? 'text-[#FF4D6D] font-medium' : isGift ? 'text-[#FFD166] font-medium' : 'text-white'}`}>
                    {c.text}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={commentsEndRef} />
        </div>
      </div>

      {/* 底部控制 */}
      <div className="absolute bottom-0 inset-x-0 h-[80px] bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between px-4 pb-safe z-30 pointer-events-auto">
        <button onClick={() => { setIsLivePaused(true); setShowExitConfirm(true); }} className="w-12 h-12 rounded-full bg-[#FF4D6D] text-white flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform">
          <div className="w-4 h-4 bg-white rounded-sm mb-0.5" />
          <span className="text-[10px] font-medium">结束</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsLivePaused(!isLivePaused)} className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform">
            {isLivePaused ? <span className="text-[14px]">▶</span> : <div className="flex gap-1"><div className="w-1 h-3 bg-white"/><div className="w-1 h-3 bg-white"/></div>}
          </button>
          <button onClick={() => setShowSkillSheet(true)} className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform">
            <Icons.RefreshCw size={16} />
          </button>
          <button onClick={() => setMicState(!micState)} className={`w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-md active:scale-95 transition-colors ${micState ? 'bg-black/60 border-white/20 text-white' : 'bg-[#FF4D6D]/20 border-[#FF4D6D] text-[#FF4D6D]'}`}>
            {micState ? <Icons.Mic size={16} /> : <Icons.MicOff size={16} />}
          </button>
        </div>
      </div>

      {/* 5分钟小结弹窗 */}
      {showSummarySheet && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s]">
          <div className="w-full max-w-[430px] bg-[#1A1A1A] rounded-t-2xl border-t border-[#333333] p-5 space-y-5 animate-[slide-in-up_0.25s_ease-out]">
            <h3 className="text-[16px] font-semibold text-white">5分钟阶段小结</h3>
            <div className="bg-[#0F0F0F] rounded-xl p-4 border border-[#333333]">
              <p className="text-[14px] text-[#B3B3B3] italic">"刚才开场的时候节奏很快，抓住了用户痛点，但是在透传福利时稍微有些生硬..."</p>
            </div>
            <div className="border-l-2 border-[#4ECDC4] pl-3">
              <span className="text-[12px] text-[#4ECDC4] font-medium block mb-1">AI 建议</span>
              <p className="text-[14px] text-[#B3B3B3]">建议下次将福利透出包装为“暗号抢拍”，能更高效锁定互动。</p>
            </div>
            <div className="space-y-3">
              {[{ l: '节奏掌控', s: 8 }, { l: '互动频率', s: 7 }, { l: '话题张力', s: 8 }].map(i => (
                <div key={i.l}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-[#6B6B6B]">{i.l}</span>
                    <span className="text-[#FFD166]">{i.s}/10</span>
                  </div>
                  <div className="h-1.5 bg-[#0F0F0F] rounded-full"><div className="h-full bg-[#FFD166] rounded-full" style={{width: `${i.s*10}%`}}/></div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowSummarySheet(false)} className="flex-1 py-3 rounded-xl bg-[#262626] border border-[#333333] text-white text-[14px] font-medium">继续训练</button>
              <button onClick={() => { setShowSummarySheet(false); setShowReportOverlay(true); }} className="flex-1 py-3 rounded-xl bg-[#FF4D6D] text-white text-[14px] font-medium">看完整报告</button>
            </div>
          </div>
        </div>
      )}

      {/* 退出确认 */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-[300px] bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-[16px] font-semibold text-white">确定结束训练？</h3>
            <p className="text-[14px] text-[#B3B3B3]">系统将针对这段练习，生成深度诊断结案报告。</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setShowExitConfirm(false); setIsLivePaused(false); }} className="flex-1 py-2.5 rounded-lg bg-[#262626] text-white text-[14px]">取消</button>
              <button onClick={() => { setShowExitConfirm(false); setShowReportOverlay(true); }} className="flex-1 py-2.5 rounded-lg bg-[#FF4D6D] text-white text-[14px] font-medium">确定结束</button>
            </div>
          </div>
        </div>
      )}

      {/* 技能切换 Sheet */}
      {showSkillSheet && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[430px] bg-[#1A1A1A] rounded-t-2xl border-t border-[#333333] p-5 max-h-[50vh] flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-[#333333]">
              <h3 className="text-[16px] font-semibold text-white">切换实训技能卡</h3>
              <button onClick={() => setShowSkillSheet(false)} className="text-[#6B6B6B] hover:text-white"><Icons.X size={20} /></button>
            </div>
            <div className="overflow-y-auto space-y-3 py-4 flex-1">
              {activeSkillCards.length === 0 && <p className="text-center text-[#6B6B6B] text-[14px] py-4">未选择任何技能卡</p>}
              {activeSkillCards.map((card, idx) => (
                <div key={card.id} onClick={() => { setCurrentSkillIdx(idx); setSkillProgress(0); setShowSkillSheet(false); triggerToast("技能卡已切换"); }} className={`p-4 rounded-xl border cursor-pointer ${currentSkillIdx === idx ? 'border-[#4ECDC4] bg-[#4ECDC4]/10' : 'border-[#333333] bg-[#0F0F0F]'}`}>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80 font-medium mb-2 inline-block">{card.category}</span>
                  <p className="text-[14px] font-medium text-white">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 报告层 */}
      {showReportOverlay && (
        <div className="absolute inset-0 z-[100] bg-[#0F0F0F] flex flex-col justify-between overflow-y-auto animate-[fade-in_0.3s]">
          <div className="flex-1 pb-24">
            <div className="pt-12 pb-6 px-4 text-center">
              <h2 className="text-[20px] font-semibold text-white">训练报告</h2>
              <p className="text-[12px] text-[#6B6B6B] mt-2">日期: {new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className="px-4 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                  <span className="text-[12px] text-[#6B6B6B]">训练时长</span>
                  <p className="text-[18px] font-mono text-white mt-1">{formatTime(liveSeconds)}</p>
                </div>
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#333333]">
                  <span className="text-[12px] text-[#6B6B6B]">训练技能</span>
                  <p className="text-[14px] text-[#4ECDC4] font-medium mt-2 truncate">
                    {activeSkillCards.length > 0 ? activeSkillCards[0].title.substring(1, 6) : '无'}
                  </p>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#333333] space-y-4">
                <h3 className="text-[16px] font-semibold text-white">综合诊断</h3>
                <div className="bg-[#0F0F0F] rounded-lg p-4 border border-[#333333]">
                  <span className="text-[12px] text-[#B3B3B3] font-medium mb-2 block">整体表现总结</span>
                  <p className="text-[14px] text-[#FFFFFF] leading-relaxed">
                    本次训练中，你积极调动了设定的技能卡，在开场环节表现自然流畅。评论区互动仍需加强，冷场时的应对可以更灵活。
                  </p>
                </div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#333333] space-y-4">
                <h3 className="text-[16px] font-semibold text-white">改进建议</h3>
                <div className="bg-[#0F0F0F] rounded-lg p-4 border border-[#333333] space-y-3">
                  <p className="text-[14px] text-[#FFFFFF] leading-relaxed flex items-start gap-2"><span className="text-[#FFD166]">•</span>开场时尝试用场景感带入</p>
                  <p className="text-[14px] text-[#FFFFFF] leading-relaxed flex items-start gap-2"><span className="text-[#FFD166]">•</span>互动时先认同再展开回答</p>
                  <p className="text-[14px] text-[#FFFFFF] leading-relaxed flex items-start gap-2"><span className="text-[#FFD166]">•</span>冷场时用“说到这个我突然想到...”自然过渡</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 inset-x-0 p-4 bg-[#0F0F0F] border-t border-[#333333] flex gap-3 z-50 max-w-[430px] mx-auto">
            <button onClick={() => { setShowReportOverlay(false); setCurrentPath('/'); }} className="flex-1 py-3.5 rounded-xl bg-[#262626] text-white text-[14px] font-medium border border-[#333333]">放弃保存</button>
            <button onClick={saveAndExit} className="flex-1 py-3.5 rounded-xl bg-[#FF4D6D] text-white text-[14px] font-medium shadow-lg shadow-[#FF4D6D]/20">保存并退出</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. 页面三：我的 (ProfilePage)
// ==========================================
function ProfilePage({ 
  userProfile, 
  setUserProfile, 
  trainSessions, 
  setTrainSessions, 
  favoriteSessions, 
  setFavoriteSessions, 
  triggerToast 
}) {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(userProfile.username);
  const [calendarOffset, setCalendarOffset] = useState(0);
  const [selectedArchiveId, setSelectedArchiveId] = useState(null);

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUserProfile(prev => ({ ...prev, username: tempUsername }));
      triggerToast("昵称已更新", "success");
    } else {
      setTempUsername(userProfile.username);
    }
    setIsEditingUsername(false);
  };

  const getCalendarDays = () => {
    const days = [];
    for (let i = 0; i < 4; i++) days.push({ blank: true });
    const densityMap = { 10: 1, 13: 1, 14: 2, 15: 3, 20: 1, 23: 1, 24: 2 };
    for (let d = 1; d <= 31; d++) days.push({ dayNum: d, density: densityMap[d] || 0, isToday: d === 23 });
    return days;
  };

  const toggleFavorite = (id) => {
    if (favoriteSessions.includes(id)) {
      setFavoriteSessions(prev => prev.filter(fid => fid !== id));
      triggerToast("已取消收藏", "info");
    } else {
      setFavoriteSessions(prev => [...prev, id]);
      triggerToast("已收藏记录", "success");
    }
  };

  const deleteSession = (id) => {
    if (window.confirm("确定删除这场训练记录吗？删除后无法恢复。")) {
      setTrainSessions(prev => prev.filter(s => s.id !== id));
      setFavoriteSessions(prev => prev.filter(fid => fid !== id));
      triggerToast("已删除记录", "success");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-24 animate-[fade-in_0.3s_ease-out]">
      <header className="px-4 py-4 sticky top-0 z-40 bg-[#0F0F0F]/90 backdrop-blur-md">
        <h1 className="text-[20px] font-semibold text-white">我的</h1>
      </header>

      <main className="p-4 space-y-6">
        {/* 个人信息 */}
        <section className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF4D6D] to-[#4ECDC4] p-[2px]">
              <div className="w-full h-full bg-[#1A1A1A] rounded-full flex items-center justify-center font-bold text-[20px] text-white">
                {userProfile.username.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} onBlur={handleSaveUsername} onKeyDown={(e) => e.key === 'Enter' && handleSaveUsername()} autoFocus className="bg-[#0F0F0F] border border-[#333333] text-[14px] px-2 py-1 rounded text-white outline-none w-32" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] font-semibold text-white">@{userProfile.username}</h2>
                  <button onClick={() => setIsEditingUsername(true)} className="text-[#6B6B6B] hover:text-white"><span className="text-[12px]">✏️</span></button>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-[#333333]">
            <div className="text-center"><p className="text-[20px] font-mono font-semibold text-white">{trainSessions.length}</p><p className="text-[12px] text-[#6B6B6B] mt-1">累计场次</p></div>
            <div className="text-center"><p className="text-[20px] font-mono font-semibold text-white">{userProfile.totalSkills}</p><p className="text-[12px] text-[#6B6B6B] mt-1">掌握技能</p></div>
            <div className="text-center"><p className="text-[20px] font-mono font-semibold text-white">{favoriteSessions.length}</p><p className="text-[12px] text-[#6B6B6B] mt-1">我的收藏</p></div>
          </div>
        </section>

        {/* 训练日历 */}
        <section className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
              <Icons.Calendar size={16} className="text-[#4ECDC4]" /> 训练日历
            </h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setCalendarOffset(p => p - 1)} className="text-[#6B6B6B] hover:text-white"><Icons.ChevronLeft size={16} /></button>
              <span className="text-[12px] text-white font-medium">{calendarOffset === 0 ? '2026年5月' : calendarOffset < 0 ? '2026年4月' : '2026年6月'}</span>
              <button onClick={() => setCalendarOffset(p => p + 1)} className="text-[#6B6B6B] hover:text-white"><Icons.ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
            {['一', '二', '三', '四', '五', '六', '日'].map(w => <span key={w} className="text-[12px] text-[#6B6B6B] py-1">{w}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {getCalendarDays().map((cell, idx) => {
              if (cell.blank) return <div key={idx} className="aspect-square" />;
              let bg = 'bg-[#0F0F0F]';
              if (cell.density === 1) bg = 'bg-[rgba(78,205,196,0.2)]';
              else if (cell.density === 2) bg = 'bg-[rgba(78,205,196,0.45)]';
              else if (cell.density >= 3) bg = 'bg-[rgba(78,205,196,0.75)]';
              return (
                <div key={idx} className={`aspect-square rounded-md flex items-center justify-center text-[12px] font-mono ${bg} ${cell.isToday ? 'border border-[#FF4D6D]' : 'border border-[#333333]'} ${cell.density > 0 ? 'text-white' : 'text-[#6B6B6B]'}`}>
                  {cell.dayNum}
                </div>
              );
            })}
          </div>
        </section>

        {/* 训练档案 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
              <Icons.BookOpen size={16} className="text-[#FF4D6D]" /> 训练档案
            </h3>
            <span className="text-[12px] text-[#6B6B6B]">共 {trainSessions.length} 场</span>
          </div>

          {trainSessions.length === 0 ? (
            <div className="bg-[#1A1A1A] rounded-xl border border-[#333333] p-10 text-center">
              <p className="text-[14px] text-white font-medium mb-2">还没有训练记录</p>
              <p className="text-[12px] text-[#6B6B6B] mb-4">去首页导入素材，开始第一场训练吧！</p>
              <button onClick={() => setCurrentPath('/')} className="text-[#4ECDC4] text-[14px] font-medium">🎯 去首页开始</button>
            </div>
          ) : (
            <div className="space-y-3">
              {trainSessions.map(session => {
                const isExpanded = selectedArchiveId === session.id;
                const isFav = favoriteSessions.includes(session.id);
                return (
                  <div key={session.id} className={`bg-[#1A1A1A] rounded-xl border overflow-hidden transition-all ${isExpanded ? 'border-[#4ECDC4]' : 'border-[#333333]'}`}>
                    <div onClick={() => setSelectedArchiveId(isExpanded ? null : session.id)} className="p-4 cursor-pointer flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[14px] font-semibold text-white">{session.date}</span>
                          {isFav && <Icons.Star size={12} fill="#FFD166" className="text-[#FFD166]" />}
                        </div>
                        <p className="text-[12px] text-[#B3B3B3]">时长 {session.durationStr} · {session.skillCards.join(' · ')}</p>
                      </div>
                      <div className="text-[#6B6B6B] mt-1">{isExpanded ? <Icons.ChevronUp size={16} /> : <Icons.ChevronDown size={16} />}</div>
                    </div>
                    
                    {isExpanded && (
                      <div className="p-4 border-t border-[#333333] space-y-5 bg-[#0F0F0F]/50">
                        <div>
                          <h4 className="text-[14px] font-medium text-white mb-2">综合诊断</h4>
                          <div className="bg-[#0F0F0F] rounded-lg p-3 border border-[#333333]">
                            <p className="text-[12px] text-[#B3B3B3] leading-relaxed">{session.summary}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[14px] font-medium text-white mb-2">改进建议</h4>
                          <div className="bg-[#0F0F0F] rounded-lg p-3 border border-[#333333] space-y-2">
                            {session.suggestions?.map((item, idx) => (
                              <p key={idx} className="text-[12px] text-[#B3B3B3] flex items-start gap-1.5"><span className="text-[#FFD166] mt-0.5">•</span> {item}</p>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button onClick={() => toggleFavorite(session.id)} className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium border flex items-center justify-center gap-2 ${isFav ? 'bg-[#FFD166]/10 border-[#FFD166]/30 text-[#FFD166]' : 'bg-[#262626] border-[#333333] text-white'}`}>
                            <Icons.Star size={14} fill={isFav ? 'currentColor' : 'none'} /> {isFav ? '已收藏' : '收藏'}
                          </button>
                          <button onClick={() => deleteSession(session.id)} className="px-4 py-2.5 rounded-lg border border-[#333333] text-[#FF4D6D] bg-[#262626] flex items-center justify-center">
                            <Icons.Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}