# 前端接口层 (`src/api`)

所有数据访问都收敛在这里。组件只调用 `api.*`，不直接读写 `localStorage` 或写死 mock。

## 文件结构

| 文件 | 职责 | 后端建议 endpoint |
|---|---|---|
| `client.ts` | fetch 封装、`USE_MOCK` 开关、`BASE_URL`、`storage` 工具 | — |
| `types.ts`  | 全部 TS 类型定义（与后端字段对齐） | — |
| `mock-data.ts` | 本地 mock 静态数据 | — |
| `skills.ts` | 技能卡库 / 选中 / 链接解析 | `/api/skill-cards*` |
| `settings.ts` | 基础设置（人设、标签） | `/api/settings/basic` |
| `sessions.ts` | 训练记录、收藏、开播/收播 | `/api/train/*`, `/api/live/sessions/*` |
| `user.ts` | 用户信息 | `/api/user/profile` |
| `live.ts` | 直播实时流（评论、观众数、提示） | WebSocket `/ws/live/*` |

## 切换到真实后端

1. 把 `client.ts` 中的 `USE_MOCK = true` 改成 `false`；
2. 在 `.env` 中配置 `VITE_API_BASE_URL=https://your.api`；
3. 各 `*.ts` 中 `if (!USE_MOCK) return http.get(...)` 已经预留分支，按需补全 path 与 payload；
4. `live.ts` 中的 `subscribeComments` / `subscribeViewers` 把 mock 生成器替换为 WebSocket 即可；
5. 类型保持不变，组件无需改动。

## 调用规范

- 组件中初始化用 `useEffect(() => { api.x().then(setX) }, [])`；
- 写入后立即 `api.x.save(value)`，不要再使用 `localStorage.setItem` 直写；
- 实时流用 `subscribe*` 返回的 unsubscribe 在 `useEffect` cleanup 调用。
