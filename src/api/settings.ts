// ==========================================
// 基础设置 接口
// 后端：GET /api/settings/basic , PUT /api/settings/basic
// ==========================================
import { USE_MOCK, http, sleep, storage } from './client';
import { MOCK_BASIC_SETTINGS } from './mock-data';
import type { BasicSettings } from './types';

const LS_KEY = 'basic-settings';

export const settingsApi = {
  async get(): Promise<BasicSettings> {
    if (!USE_MOCK) return http.get<BasicSettings>('/api/settings/basic');
    await sleep(20);
    return storage.get<BasicSettings>(LS_KEY, MOCK_BASIC_SETTINGS);
  },
  async save(value: BasicSettings): Promise<void> {
    if (!USE_MOCK) return http.put('/api/settings/basic', value);
    storage.set(LS_KEY, value);
  },
};
