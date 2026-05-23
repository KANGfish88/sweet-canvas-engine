// ==========================================
// 技能卡 / 沙盒配置接口
// 后端接口建议：
//   GET    /api/skill-cards               -> SkillCard[]
//   POST   /api/skill-cards/parse-link    { url } -> stream(SSE) / 轮询返回 ParseProgress, 终态返回 SkillCard
//   GET    /api/skill-cards/selected      -> string[]
//   PUT    /api/skill-cards/selected      { ids: string[] } -> void
// ==========================================

import { USE_MOCK, http, sleep, storage } from './client';
import { MOCK_SKILL_CARDS } from './mock-data';
import type { ParseProgress, SkillCard } from './types';

const LS_LIB = 'skill-card-library';
const LS_SEL = 'selected-skill-cards';

export const skillsApi = {
  async list(): Promise<SkillCard[]> {
    if (!USE_MOCK) return http.get<SkillCard[]>('/api/skill-cards');
    await sleep(50);
    return storage.get<SkillCard[]>(LS_LIB, MOCK_SKILL_CARDS);
  },

  async saveLibrary(cards: SkillCard[]): Promise<void> {
    if (!USE_MOCK) {
      // 真实后端通常不会整体覆盖，改为 add/update/delete 分接口
      return;
    }
    storage.set(LS_LIB, cards);
  },

  async getSelected(): Promise<string[]> {
    if (!USE_MOCK) return http.get<string[]>('/api/skill-cards/selected');
    await sleep(30);
    return storage.get<string[]>(LS_SEL, ['sc-1', 'sc-2']);
  },

  async setSelected(ids: string[]): Promise<void> {
    if (!USE_MOCK) return http.put('/api/skill-cards/selected', { ids });
    storage.set(LS_SEL, ids);
  },

  /**
   * 解析视频链接 → 新增技能卡
   * mock 模式下用 setInterval 模拟分析进度。
   * 真实后端建议返回 SSE / WebSocket 流式进度。
   */
  parseFromLink(
    url: string,
    onProgress: (p: ParseProgress) => void,
  ): Promise<SkillCard> {
    if (!url.includes('douyin.com')) {
      return Promise.reject(new Error('INVALID_LINK'));
    }
    if (!USE_MOCK) {
      // TODO: 接入真实流式解析接口
      return http.post<SkillCard>('/api/skill-cards/parse-link', { url });
    }

    return new Promise<SkillCard>(resolve => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        onProgress({
          progress: Math.min(100, count * 12),
          stepIdx: Math.floor((count / 10) * 6),
        });
        if (count >= 10) {
          clearInterval(interval);
          onProgress({ progress: 100, stepIdx: 5 });
          setTimeout(() => {
            resolve({
              id: `sc-${Date.now()}`,
              title: '「核心停留」爆款直播留存拆解',
              category: '互动停留',
              difficulty: 4,
              sourceVideo: '@带货达人 的切片',
              sourceLink: url,
              dimensions: ['情绪调动', '收尾引导'],
              estimatedDuration: '约6分钟',
              targetSessions: 5,
              trainedSessions: 0,
              keyPoints: ['迅速展示高货产品细节', '发起高密度互动'],
              tips: ['多用极具引导性的身体姿态', '用低门槛抽奖筛选活跃粉'],
              trainingGoal: '新观众进入后的黄金互动窗口切入，促成弹幕氛围拉起。',
            });
          }, 500);
        }
      }, 250);
    });
  },
};
