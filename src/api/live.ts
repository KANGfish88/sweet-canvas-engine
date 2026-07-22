// ==========================================
// 直播实时流接口
// 后端建议（真实环境）：
//   WebSocket  /ws/live/:sessionId/comments      -> LiveComment 流
//   WebSocket  /ws/live/:sessionId/viewers       -> 观众数变更
//   GET        /api/live/:sessionId/prompt       -> TopicPrompt
// 当前用 mock 本地生成器模拟，组件无感切换。
// ==========================================
import { USE_MOCK } from './client';
import { AI_AGENTS_POOL, COMMENT_TEMPLATES, ENTRANCE_EFFECTS, GIFT_POOL } from './mock-data';
import type { LiveComment, TopicPrompt } from './types';

export interface SubscribeCommentsOptions {
  getActiveSkillId: () => string | null;
  isPaused: () => boolean;
  onComment: (c: LiveComment) => void;
}

export interface SubscribeViewersOptions {
  isPaused: () => boolean;
  onChange: (count: number) => void;
}

export const liveApi = {
  /** 订阅评论流。返回 unsubscribe。 */
  subscribeComments({ getActiveSkillId, isPaused, onComment }: SubscribeCommentsOptions) {
    if (!USE_MOCK) {
      // TODO: WebSocket
      return () => {};
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      if (isPaused()) {
        timer = setTimeout(tick, 1000);
        return;
      }
      const agent = AI_AGENTS_POOL[Math.floor(Math.random() * AI_AGENTS_POOL.length)];
      const r = Math.random();
      let comment: LiveComment;

      if (r < 0.14) {
        // 入场
        const effect = ENTRANCE_EFFECTS[Math.floor(Math.random() * ENTRANCE_EFFECTS.length)];
        comment = {
          id: Date.now() + Math.random(),
          agent,
          text: `${effect}进入了直播间`,
          type: 'entrance',
          entranceEffect: effect,
        };
      } else if (r < 0.22) {
        // 新增关注
        comment = {
          id: Date.now() + Math.random(),
          agent,
          text: '关注了主播',
          type: 'follow',
        };
      } else if (r < 0.30) {
        // 送礼
        const g = GIFT_POOL[Math.floor(Math.random() * GIFT_POOL.length)];
        const count = g.counts[Math.floor(Math.random() * g.counts.length)];
        comment = {
          id: Date.now() + Math.random(),
          agent,
          text: `${g.name} x${count}`,
          type: 'gift',
          giftName: g.name,
          giftCount: count,
        };
      } else {
        // 普通弹幕
        const skillId = getActiveSkillId();
        let templates = [...COMMENT_TEMPLATES.general];
        if (skillId && COMMENT_TEMPLATES[skillId] && Math.random() > 0.5) {
          templates = [...COMMENT_TEMPLATES[skillId], ...templates];
        }
        const text = templates[Math.floor(Math.random() * templates.length)];
        comment = {
          id: Date.now() + Math.random(),
          agent,
          text,
          type: 'normal',
        };
      }

      onComment(comment);
      timer = setTimeout(tick, Math.random() * 1800 + 1200);
    };
    timer = setTimeout(tick, 1500);
    return () => { if (timer) clearTimeout(timer); };
  },

  /** 订阅观众数 */
  subscribeViewers({ isPaused, onChange }: SubscribeViewersOptions) {
    if (!USE_MOCK) {
      // TODO: WebSocket
      return () => {};
    }
    const interval = setInterval(() => {
      if (isPaused()) return;
      onChange(Math.floor(Math.random() * 40) - 20); // 增量
    }, 1000);
    return () => clearInterval(interval);
  },

  /** 获取一个 AI 提示（基于当前技能卡的 tips 随机抽一条） */
  async fetchPrompt(skillCard: { tips: string[] } | null): Promise<TopicPrompt | null> {
    if (!skillCard) return null;
    if (!USE_MOCK) {
      // TODO: GET /api/live/:id/prompt
      return null;
    }
    return {
      title: '实战训练提示',
      tipText: skillCard.tips[Math.floor(Math.random() * skillCard.tips.length)],
    };
  },
};
