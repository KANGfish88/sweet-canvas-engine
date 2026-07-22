import type { SkillCard, TrainSession, AIAgent } from './types';

export const MOCK_SKILL_CARDS: SkillCard[] = [
  {
    id: 'sc-1',
    title: '「开场破冰」30秒快速建立亲和力',
    category: '互动停留',
    difficulty: 3,
    sourceVideo: '@带货王阿强 的爆款切片',
    sourceLink: 'https://v.douyin.com/ieRoE8W3/',
    dimensions: ['开场设计', '情绪调动'],
    estimatedDuration: '约5分钟',
    targetSessions: 5,
    trainedSessions: 3,
    keyPoints: [
      '以饱满的精神面貌打招呼，切记不要死板地走流程。',
      '3秒内抛出第一个用户痛点提问，建立认知共鸣。',
      '迅速透传本场福利政策，锚定后续留存。',
    ],
    tips: [
      '不要平铺直叙说"大家好我是谁"这类套话。',
      '可用"今天通勤一路上被吹懵了..."等真实生活现状切入。',
      '开场不超过30秒，迅速进入主题。',
    ],
    trainingGoal: '在开场30秒内完整实践"抛出悬念"、"痛点引入"、"过渡主题"，且AI评分达8/10以上。',
  },
  {
    id: 'sc-2',
    title: '「评论区互动」精准识别高留存弹幕',
    category: '促单转化',
    difficulty: 4,
    sourceVideo: '@精致美妆Lily 直播实录',
    sourceLink: 'https://v.douyin.com/aeRoE8W4/',
    dimensions: ['互动技巧', '促单转化'],
    estimatedDuration: '约8分钟',
    targetSessions: 5,
    trainedSessions: 1,
    keyPoints: [
      '视线快速扫过评论流，筛选有明确消费意向/高价值的话题。',
      '以名字互动（例："感谢小丸子的提问..."），加深专属感。',
      "运用'追问法'与观众进行二轮交互，带动其他围观党回复。",
    ],
    tips: [
      '不应顺着负面偏激弹幕对线，忽略并迅速切开话题。',
      '点名回复时带上观众昵称。',
      '一个评论最多聊1分钟，避免被带偏。',
    ],
    trainingGoal: '每场训练完成至少3次高质量评论互动，互动深度评分达7/10以上。',
  },
  {
    id: 'sc-3',
    title: '「冷场救急」3秒话题平滑切换',
    category: '氛围防御',
    difficulty: 5,
    sourceVideo: '@科技狂潮 互动分析',
    sourceLink: 'https://v.douyin.com/ceRoE8W5/',
    dimensions: ['节奏把控', '话题结构'],
    estimatedDuration: '约5分钟',
    targetSessions: 5,
    trainedSessions: 2,
    keyPoints: ['识别冷场前兆信号。', '3个万能话题池随时调用。', '切换不突兀的衔接句式。'],
    tips: [
      '冷场不是坏事，是切换话题的机会。',
      '准备3-5个备选话题放在手边。',
      "切换时用'说到这个我突然想到...'自然过渡。",
    ],
    trainingGoal: '冷场时3秒内调用备选话题，切换自然度评分达7/10以上。',
  },
];

export const TAG_OPTIONS = [
  '穿搭', '美妆', '美食', '聊天', '知识分享', '好物推荐',
  '职场', '学生', '生活记录', '情感', '搞笑', '游戏',
  '读书', '运动健身', '音乐', '宠物', '母婴', '旅行',
];

export const AI_AGENTS_POOL: AIAgent[] = [
  { name: '剁手党小王', level: 'Lv.28', avatar: '👗', character: '冲动消费/爱跟风' },
  { name: '理智老法师', level: 'Lv.42', avatar: '🧐', character: '爱问参数/挑剔' },
  { name: '摸鱼达人', level: 'Lv.15', avatar: '🐱', character: '爱互动/捧场王' },
  { name: '美妆护肤Lily', level: 'Lv.31', avatar: '💄', character: '注重细节/大款' },
  { name: '黑粉阿强', level: 'Lv.8', avatar: '🤖', character: '毒舌/爱质疑' },
  { name: '吃瓜首席代表', level: 'Lv.22', avatar: '🍉', character: '打酱油/复读机' },
  { name: '精致辣妈', level: 'Lv.35', avatar: '🍼', character: '看重性价比' },
  { name: '科技发烧友', level: 'Lv.50', avatar: '⚡', character: '极其关注质量' },
];

export const COMMENT_TEMPLATES: Record<string, string[]> = {
  general: [
    '主播终于开播啦！支持支持！',
    '今天卖什么好货？先蹲一个',
    '主播声音好听，关注了',
    '前排占座！',
    '怎么买？几号链接？',
  ],
  'sc-1': [
    '卧槽，被主播抓住了，什么福利？',
    '留下来看看，不要骗我哦！',
    '5，4，3，2，1 蹲着呢！',
    '刚下班，进来看看',
    '气氛一下就来了',
  ],
  'sc-2': [
    '主播看到我了！感动！',
    '刚才回答那个提问真的专业',
    '支持主播互动，太用心了',
    '对微胖身材友好吗？',
    '被翻牌了，已下单',
  ],
  'sc-3': [
    '哈哈哈，说到这个我也想聊聊了',
    '转话题好自然',
    '真实，就是这样的',
    '不想划走了，想听主播聊',
    '对对对！支持',
  ],
};

/** 入场坐骑/特效描述 */
export const ENTRANCE_EFFECTS: string[] = [
  '骑着小野马',
  '踩着七彩祥云',
  '开着法拉利',
  '乘着热气球',
  '披着星光斗篷',
  '带着 VIP 光环',
  '踏着滑板',
];

/** 礼物池：名称 + 常见连击数量 */
export const GIFT_POOL: Array<{ name: string; counts: number[] }> = [
  { name: '小心心', counts: [1, 6, 10] },
  { name: '玫瑰', counts: [1, 9, 66] },
  { name: '墨镜', counts: [1, 10, 66] },
  { name: '跑车', counts: [1] },
  { name: '嘉年华', counts: [1] },
  { name: '告白气球', counts: [1, 52, 520] },
];

export const MOCK_INITIAL_ARCHIVE: TrainSession[] = [
  {
    id: 'session-001',
    date: '2024-01-15 20:30',
    duration: 754,
    durationStr: '12分34秒',
    skillCards: ['开场破冰', '评论区互动'],
    scores: { rhythm: 8, interaction: 6, topic: 8 },
    summary:
      '本次训练中，你积极调动了设定的技能卡，在开场破冰环节表现自然流畅。评论区互动仍需加强，冷场时的应对可以更灵活。',
    suggestions: [
      '开场时尝试用场景感带入',
      '互动时先认同再展开回答',
      "冷场时用'说到这个我突然想到...'自然过渡",
    ],
  },
];

export const MOCK_USER_PROFILE = {
  username: '直播练习生',
  totalSessions: 12,
  totalSkills: 8,
  totalFavorites: 3,
};

export const MOCK_BASIC_SETTINGS = {
  persona: '我是一个分享通勤穿搭的上班族，风格偏简约...',
  tags: ['穿搭', '职场'],
};
