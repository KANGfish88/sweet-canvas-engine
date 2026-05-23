// ==========================================
// 用户信息 接口
// 后端：GET /api/user/profile , PUT /api/user/profile
// ==========================================
import { USE_MOCK, http, sleep, storage } from './client';
import { MOCK_USER_PROFILE } from './mock-data';
import type { UserProfile } from './types';

const LS_KEY = 'user-profile';

export const userApi = {
  async getProfile(): Promise<UserProfile> {
    if (!USE_MOCK) return http.get<UserProfile>('/api/user/profile');
    await sleep(20);
    return storage.get<UserProfile>(LS_KEY, MOCK_USER_PROFILE);
  },
  async saveProfile(p: UserProfile): Promise<void> {
    if (!USE_MOCK) return http.put('/api/user/profile', p);
    storage.set(LS_KEY, p);
  },
};
