// ==========================================
// 直播实时流接口
// 后端建议（真实环境）：
//   WebSocket  /ws/live/:sessionId/comments      -> LiveComment 流
//   WebSocket  /ws/live/:sessionId/viewers       -> 观众数变更
//   GET        /api/live/:sessionId/prompt       -> TopicPrompt
// 当前用 mock 本地生成器模拟，组件无感切换。
// ==========================================
import { USE_MOCK } from './client';
import { AI_AGENTS_POOL, COMMENT_TEMPLATES } from './mock-data';
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
      // TODO: 接入 WebSocket
      // const ws = new WebSocket(`${WS_URL}/live/comments`);
      // ws.onmessage = e => onComment(JSON.parse(e.data));
      // return () => ws.close();
      return () => {};
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      if (isPaused()) {
        timer = setTimeout(tick, 1000);
        return;
      }
      const agent = AI_AGENTS_POOL[Math.floor(Math.random() * AI_AGENTS_POOL.length)];
      const skillId = getActiveSkillId();
      let templates = [...COMMENT_TEMPLATES.general];
      if (skillId && COMMENT_TEMPLATES[skillId] && Math.random() > 0.5) {
        templates = [...COMMENT_TEMPLATES[skillId], ...templates];
      }
      const text = templates[Math.floor(Math.random() * templates.length)];
      let type: LiveComment['type'] = 'normal';
      if (text.includes('下单') || text.includes('抢')) type = 'buy';
      else if (Math.random() < 0.1) type = 'gift';

      onComment({ id: Date.now() + Math.random(), agent, text, type });
      timer = setTimeout(tick, Math.random() * 2000 + 1500);
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
