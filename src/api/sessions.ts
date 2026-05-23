// ==========================================
// 直播会话 & 训练记录 接口
// 后端建议：
//   POST   /api/live/sessions/start       -> { sessionId }
//   POST   /api/live/sessions/:id/end     { duration, skillCards } -> TrainSession
//   GET    /api/train/sessions            -> TrainSession[]
//   DELETE /api/train/sessions/:id
//   GET    /api/train/favorites           -> string[]
//   POST   /api/train/favorites/:id/toggle
// ==========================================
import { USE_MOCK, http, sleep, storage } from './client';
import { MOCK_INITIAL_ARCHIVE } from './mock-data';
import type { TrainSession } from './types';

const LS_TRAIN = 'train-sessions';
const LS_FAV = 'favorite-sessions';

export const sessionsApi = {
  async listTrain(): Promise<TrainSession[]> {
    if (!USE_MOCK) return http.get<TrainSession[]>('/api/train/sessions');
    await sleep(30);
    return storage.get<TrainSession[]>(LS_TRAIN, MOCK_INITIAL_ARCHIVE);
  },
  async saveTrain(sessions: TrainSession[]): Promise<void> {
    if (!USE_MOCK) return; // 真实后端按单条增删
    storage.set(LS_TRAIN, sessions);
  },
  async addTrain(session: TrainSession): Promise<void> {
    if (!USE_MOCK) {
      await http.post('/api/train/sessions', session);
      return;
    }
    const list = await sessionsApi.listTrain();
    await sessionsApi.saveTrain([session, ...list]);
  },

  async listFavorites(): Promise<string[]> {
    if (!USE_MOCK) return http.get<string[]>('/api/train/favorites');
    await sleep(20);
    return storage.get<string[]>(LS_FAV, ['session-001']);
  },
  async saveFavorites(ids: string[]): Promise<void> {
    if (!USE_MOCK) return;
    storage.set(LS_FAV, ids);
  },

  /** 开始直播会话（mock 直接生成 id） */
  async startLive(_payload: { skillIds: string[] }): Promise<{ sessionId: string }> {
    if (!USE_MOCK) return http.post('/api/live/sessions/start', _payload);
    await sleep(50);
    return { sessionId: `live-${Date.now()}` };
  },

  /** 结束直播 + 生成训练报告 */
  async endLive(payload: {
    sessionId: string;
    duration: number;
    skillCards: string[];
  }): Promise<TrainSession> {
    if (!USE_MOCK) {
      return http.post<TrainSession>(`/api/live/sessions/${payload.sessionId}/end`, payload);
    }
    await sleep(80);
    const min = Math.floor(payload.duration / 60);
    const sec = payload.duration % 60;
    return {
      id: payload.sessionId,
      date: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-').slice(0, 16),
      duration: payload.duration,
      durationStr: `${min}分${sec}秒`,
      skillCards: payload.skillCards,
      scores: {
        rhythm: 7 + Math.floor(Math.random() * 3),
        interaction: 6 + Math.floor(Math.random() * 4),
        topic: 7 + Math.floor(Math.random() * 3),
      },
      summary: '本次训练已完成，AI 已根据你的表现生成分析。',
      suggestions: ['保持节奏稳定', '加强评论区互动', '尝试更多话题切换'],
    };
  },
};
