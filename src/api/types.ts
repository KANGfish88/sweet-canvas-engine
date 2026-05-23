// ==========================================
// 数据类型定义（与后端接口对齐）
// ==========================================

export interface SkillCard {
  id: string;
  title: string;
  category: string;
  difficulty: number; // 1-5
  sourceVideo: string;
  sourceLink: string;
  dimensions: string[];
  estimatedDuration: string;
  targetSessions: number;
  trainedSessions: number;
  keyPoints: string[];
  tips: string[];
  trainingGoal: string;
}

export interface BasicSettings {
  persona: string;
  tags: string[];
}

export interface UserProfile {
  username: string;
  totalSessions: number;
  totalSkills: number;
  totalFavorites: number;
}

export interface TrainSession {
  id: string;
  date: string;            // "YYYY-MM-DD HH:mm"
  duration: number;        // seconds
  durationStr: string;
  skillCards: string[];    // 技能卡标题简写
  scores: { rhythm: number; interaction: number; topic: number };
  summary: string;
  suggestions: string[];
}

export interface AIAgent {
  name: string;
  level: string;
  avatar: string;
  character: string;
}

export type CommentType = 'normal' | 'buy' | 'gift';

export interface LiveComment {
  id: number | string;
  agent: AIAgent;
  text: string;
  type: CommentType;
}

export interface TopicPrompt {
  title: string;
  tipText: string;
}

/** 解析视频链接进度回调 */
export interface ParseProgress {
  progress: number;    // 0-100
  stepIdx: number;     // 当前命中分析步骤索引
}
