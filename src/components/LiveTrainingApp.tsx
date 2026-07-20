// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import mascotImg from '@/assets/mascot.png';
import {
  TAG_OPTIONS,
  skillsApi,
  settingsApi,
  sessionsApi,
  userApi,
  liveApi,
} from '@/api';


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
// 2. 模拟数据已迁移至 src/api/mock-data.ts
// 组件通过 src/api 调用，可一键切换真实后端。
// ==========================================


// ==========================================
// 3. 主应用容器 (Main Container)
// ==========================================
export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [toast, setToast] = useState(null);

  // 数据状态：初始空值 → useEffect 异步从 api 加载；写入自动经 api 持久化
  const [skillCardLibrary, setSkillCardLibraryState] = useState([]);
  const [selectedSkills, setSelectedSkillsState] = useState([]);
  const [trainSessions, setTrainSessionsState] = useState([]);
  const [favoriteSessions, setFavoriteSessionsState] = useState([]);
  const [userProfile, setUserProfileState] = useState({ username: '', totalSessions: 0, totalSkills: 0, totalFavorites: 0 });
  const [basicSettings, setBasicSettingsState] = useState({ persona: '', tags: [] });
  const [dataReady, setDataReady] = useState(false);

  // 初次挂载：并行拉取全部数据
  useEffect(() => {
    let mounted = true;
    Promise.all([
      skillsApi.list(),
      skillsApi.getSelected(),
      sessionsApi.listTrain(),
      sessionsApi.listFavorites(),
      userApi.getProfile(),
      settingsApi.get(),
    ]).then(([lib, sel, train, fav, prof, basic]) => {
      if (!mounted) return;
      setSkillCardLibraryState(lib);
      setSelectedSkillsState(sel);
      setTrainSessionsState(train);
      setFavoriteSessionsState(fav);
      setUserProfileState(prof);
      setBasicSettingsState(basic);
      setDataReady(true);
    });
    return () => { mounted = false; };
  }, []);

  // 写入封装：state 更新后自动调用 api 持久化（mock 走 localStorage，真后端走 HTTP）
  const wrap = (setter, save) => (updater) => {
    setter(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (dataReady) save(next);
      return next;
    });
  };
  const setSkillCardLibrary = wrap(setSkillCardLibraryState, skillsApi.saveLibrary);
  const setSelectedSkills    = wrap(setSelectedSkillsState,    skillsApi.setSelected);
  const setTrainSessions     = wrap(setTrainSessionsState,     sessionsApi.saveTrain);
  const setFavoriteSessions  = wrap(setFavoriteSessionsState,  sessionsApi.saveFavorites);
  const setUserProfile       = wrap(setUserProfileState,       userApi.saveProfile);
  const setBasicSettings     = wrap(setBasicSettingsState,     settingsApi.save);


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
              setSelectedSkills={setSelectedSkills}
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
              basicSettings={basicSettings}
              setBasicSettings={setBasicSettings}
              triggerToast={triggerToast}
            />
          )}
        </div>

        {/* 底部导航 TabBar (不在 /live 显示) */}
        {currentPath !== '/live' && (
          <nav className="h-[68px] pb-safe bg-black/40 backdrop-blur-xl border-t border-white/5 flex items-center justify-around shrink-0 z-50">
            {[
              { path: '/', icon: Icons.Home, label: '首页' },
              { path: '/live', icon: Icons.Radio, label: '直播', isLive: true },
              { path: '/profile', icon: Icons.User, label: '我的' },
            ].map(tab => {
              const active = currentPath === tab.path;
              return (
                <button
                  key={tab.path}
                  onClick={() => setCurrentPath(tab.path)}
                  className={`flex flex-col items-center gap-0.5 w-1/3 py-2 transition-all ${active ? 'text-[#FF4D6D]' : 'text-white/30 hover:text-white/60'}`}
                >
                  <span className={`w-1 h-1 rounded-full mb-1 transition-all ${active ? 'bg-[#FF4D6D] shadow-[0_0_8px_rgba(255,77,109,0.8)]' : 'bg-transparent'}`} />
                  <div className="relative">
                    <tab.icon size={20} />
                    {tab.isLive && !active && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold font-display tracking-wide mt-0.5">{tab.label}</span>
                </button>
              );
            })}
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


  const analysisSteps = ["话题结构", "互动技巧", "节奏把控", "情绪调动", "开场设计", "收尾引导"];

  const handleParseLink = () => {
    if (!linkInput.trim()) {
      triggerToast("请先粘贴分享链接", "error");
      return;
    }
    setParseState('parsing');
    setAnalysisProgress(0);
    setActiveStepIdx(-1);

    skillsApi
      .parseFromLink(linkInput, ({ progress, stepIdx }) => {
        setAnalysisProgress(progress);
        setActiveStepIdx(stepIdx);
      })
      .then(newCard => {
        setParseState('completed');
        setSkillCardLibrary(prev => [newCard, ...prev]);
        setSelectedSkills(prev => [...prev, newCard.id]);
        triggerToast("AI分析完成，已提炼新技能卡", "success");
      })
      .catch(() => {
        setParseState('error');
        triggerToast("解析失败，请检查链接是否有效", "error");
      });
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



  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-24 animate-[fade-in_0.3s_ease-out] relative font-body">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-[-8%] right-[-15%] w-72 h-72 bg-[#FF4D6D]/15 blur-[100px] rounded-full animate-ambient z-0" />
      <div className="pointer-events-none absolute top-[40%] left-[-20%] w-72 h-72 bg-[#4ECDC4]/12 blur-[110px] rounded-full animate-ambient-slow z-0" />

      <header className="px-5 pt-6 pb-4 flex items-center justify-between sticky top-0 z-40 bg-[#0F0F0F]/80 backdrop-blur-xl relative">
        <div>
          <h1 className="text-[24px] font-bold font-display tracking-tight leading-none">
            <span className="text-[#FF4D6D]">播练</span><span className="text-white">营</span>
          </h1>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-display mt-1">Live Practice Camp</p>
        </div>
        <img src={mascotImg} alt="播练营吉祥物" className="h-14 w-14 object-contain drop-shadow-[0_4px_16px_rgba(255,77,109,0.45)] absolute right-5 top-1/2 -translate-y-1/2" />
      </header>

      <main className="px-5 space-y-7 relative z-10">

        {/* 素材导入区 */}
        <section className="space-y-3 pt-2">
          {parseState !== 'completed' ? (
            <div className="space-y-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF4D6D] to-[#4ECDC4] rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                <div className="relative flex items-center bg-[#1A1A1A] rounded-2xl border border-white/10 p-1.5">
                  <div className="flex-1 flex items-center px-3 min-w-0">
                    <Icons.Link size={16} className={`mr-2 shrink-0 transition-colors ${linkInput ? 'text-[#4ECDC4]' : 'text-white/30'}`} />
                    <input
                      type="text"
                      placeholder="粘贴抖音视频分享链接..."
                      value={linkInput}
                      onChange={(e) => {
                        setLinkInput(e.target.value);
                        if (parseState === 'error') setParseState('idle');
                      }}
                      disabled={parseState === 'parsing'}
                      className="bg-transparent border-none outline-none text-[14px] text-white w-full py-2.5 placeholder:text-white/25"
                    />
                  </div>
                  <button
                    onClick={handleParseLink}
                    disabled={parseState === 'parsing'}
                    className="px-5 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl font-display active:scale-95 disabled:opacity-50 transition-transform"
                  >
                    解析
                  </button>
                </div>
              </div>

              {parseState === 'parsing' && (
                <div className="space-y-2 px-1 animate-[fade-in_0.2s]">
                  <div className="flex items-center justify-between text-[12px] text-[#4ECDC4]">
                    <span className="flex items-center gap-1">
                      <Icons.Loader size={14} className="animate-spin" /> 正在解析视频...
                    </span>
                    <span className="font-mono">{Math.floor(analysisProgress)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4ECDC4] to-[#FF4D6D] transition-all duration-300" style={{ width: `${analysisProgress}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {analysisSteps.map((step, idx) => (
                      <span key={step} className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${idx <= activeStepIdx ? 'bg-[#4ECDC4]/10 border-[#4ECDC4]/30 text-[#4ECDC4]' : 'bg-white/5 border-white/10 text-white/30'}`}>
                        {idx <= activeStepIdx && '✓ '}{step}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {parseState === 'error' && (
                <div className="text-[12px] text-[#FF4D6D] flex items-center justify-between px-1">
                  <span>解析失败，请检查链接是否有效</span>
                  <button onClick={() => setParseState('idle')} className="underline font-medium">重试</button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4ECDC4]/30 to-transparent rounded-2xl blur opacity-30" />
              <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-3 flex items-center gap-3 animate-[fade-in_0.3s]">
                <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#262626] to-[#0F0F0F] flex items-center justify-center shrink-0 text-xl border border-white/10">🎬</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white truncate">超长待机精选带货案例切片</p>
                  <p className="text-[11px] text-white/50 mt-0.5">时长 15:32 · @带货达人</p>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] bg-[#4ECDC4]/10 text-[#4ECDC4] w-fit px-2 py-0.5 rounded-full border border-[#4ECDC4]/20">
                    <Icons.Check size={10} /> 解析完成 · 已识别6个维度
                  </div>
                </div>
                <button onClick={() => { setParseState('idle'); setLinkInput(''); }} className="p-1.5 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
                  <Icons.X size={16} />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 技能卡模块 */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[18px] font-bold text-white font-display">技能卡</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-display mt-1">Skillset Engine v2.0</p>
            </div>
            <div className="px-3 py-1 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-full">
              <span className="text-[#4ECDC4] text-[10px] font-bold tracking-wide">
                已选 {selectedSkills.length} / {skillCardLibrary.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1 pb-1 scrollbar-none">
            {skillCardLibrary.map(card => {
              const isSelected = selectedSkills.includes(card.id);
              const isStop = card.category === "互动停留";
              const isConvert = card.category === "促单转化";
              const accent = isStop ? '#4ECDC4' : isConvert ? '#FF4D6D' : '#FFD166';

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedDetailCard(card)}
                  className="relative p-[1px] rounded-3xl overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
                  style={{ backgroundImage: `linear-gradient(135deg, ${isSelected ? accent + '66' : 'rgba(255,255,255,0.12)'}, transparent)` }}
                >
                  <div className="bg-[#161616] p-4 rounded-[23px] h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                        style={{ background: `${accent}22`, color: accent }}
                      >
                        {card.category || "综合技巧"}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="w-1 h-1 rounded-full" style={{ background: i < card.difficulty ? '#FFD166' : 'rgba(255,255,255,0.12)' }} />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-[13px] font-bold text-white mb-2 leading-tight">{card.title}</h3>
                    <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed flex-1 mb-3 min-h-[32px]">
                      {card.keyPoints[0]}
                    </p>

                    <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
                      <span className="text-[10px] text-white/30 italic">难度: {card.difficulty > 3 ? '困难' : '简单'}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSkillCardSelection(card.id); }}
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-transparent text-black' : 'border-white/30 bg-transparent'}`}
                        style={isSelected ? { background: accent } : undefined}
                      >
                        {isSelected && <Icons.Check size={12} strokeWidth={3} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>



      </main>

      {/* 底部"开始直播"操作栏 */}
      {selectedSkills.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-10 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-transparent pointer-events-auto animate-[slide-in-up_0.3s_ease-out]">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[28px] p-3 shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 pl-1 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4ECDC4] to-[#FF4D6D] flex items-center justify-center shrink-0 shadow-lg shadow-[#FF4D6D]/20">
                <Icons.Sparkles size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-white leading-tight truncate">技能卡配置就绪</p>
                <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-mono mt-0.5">
                  {selectedSkills.length} skills loaded
                </p>
              </div>
            </div>
            <button
              onClick={() => { triggerToast(`已加载 ${selectedSkills.length} 张技能卡`, 'success'); setCurrentPath('/live'); }}
              className="shrink-0 h-11 px-5 rounded-2xl bg-gradient-to-r from-[#FF4D6D] to-[#FF6B85] text-white text-[13px] font-bold font-display flex items-center gap-1.5 animate-cta-pulse active:scale-95 transition-transform"
            >
              开始直播 <Icons.ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}


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
                <p className="text-[12px] text-[#B3B3B3]">视频标题：{selectedDetailCard.sourceVideo}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[14px] font-semibold text-white">具体内容</h3>
                <div className="bg-[#0F0F0F] border border-[#333333] rounded-xl p-4 space-y-3">
                  {selectedDetailCard.keyPoints.map((point, idx) => (
                    <p key={idx} className="text-[14px] text-[#B3B3B3] leading-relaxed">
                      {idx + 1}. {point}
                    </p>
                  ))}
                  {selectedDetailCard.tips.map((tip, idx) => (
                    <p key={idx} className="text-[14px] text-[#B3B3B3] leading-relaxed flex items-start gap-1.5">
                      <span className="text-[#FFD166] mt-0.5">•</span> <span>{tip}</span>
                    </p>
                  ))}
                  <p className="text-[14px] text-[#B3B3B3] leading-relaxed border-t border-[#333333] pt-3 mt-1">
                    {selectedDetailCard.trainingGoal}
                  </p>
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
function VirtualLiveRoom({ selectedSkills, setSelectedSkills, basicSettings, skillCardLibrary, triggerToast, setCurrentPath, setTrainSessions }) {
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [viewerCount, setViewerCount] = useState(5432);
  const [showViewerPill, setShowViewerPill] = useState(true);
  const [totalLikes, setTotalLikes] = useState(264000);
  const [likeBurst, setLikeBurst] = useState(0);
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
  const [promptExpanded, setPromptExpanded] = useState(false);

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

  // 全局计时器（直播时长 + 当前技能卡进度）
  useEffect(() => {
    let interval;
    if (!isLivePaused && !showReportOverlay) {
      interval = setInterval(() => {
        setLiveSeconds(prev => {
          const next = prev + 1;
          if (next === 300) setShowSummaryPill(true);
          return next;
        });
        setSkillProgress(p => Math.min(100, p + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLivePaused, showReportOverlay]);

  // 观众数：订阅后端推送（mock 模式下本地模拟）
  useEffect(() => {
    return liveApi.subscribeViewers({
      isPaused: () => isLivePaused || showReportOverlay,
      onChange: (delta) => setViewerCount(prev => Math.max(100, prev + delta)),
    });
  }, [isLivePaused, showReportOverlay]);

  // 点赞数：mock 自增
  useEffect(() => {
    if (isLivePaused || showReportOverlay) return;
    const t = setInterval(() => {
      setTotalLikes(prev => prev + Math.floor(Math.random() * 120) + 20);
    }, 1500);
    return () => clearInterval(t);
  }, [isLivePaused, showReportOverlay]);

  // 评论流：订阅后端推送（mock 模式下按当前激活技能卡生成）
  useEffect(() => {
    return liveApi.subscribeComments({
      getActiveSkillId: () => activeSkillCard?.id ?? null,
      isPaused: () => isLivePaused || showReportOverlay,
      onComment: (c) => setComments(prev => [...prev.slice(-39), c]),
    });
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

  const triggerPrompt = async () => {
    if (!activeSkillCard) return;
    const prompt = await liveApi.fetchPrompt(activeSkillCard);
    if (!prompt) return;
    setPromptCountdown(12);
    setTopicPrompt(prompt);
    setPromptExpanded(true);
  };

  // 有新提示时自动展开
  useEffect(() => {
    if (topicPrompt) setPromptExpanded(true);
  }, [topicPrompt]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const saveAndExit = async () => {
    const session = await sessionsApi.endLive({
      sessionId: `session-${Date.now()}`,
      duration: liveSeconds,
      skillCards: activeSkillCards.map(c => c.title.split('」')[0].substring(1)),
    });
    setTrainSessions(prev => [session, ...prev]);
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



      <div className="absolute top-safe pt-4 left-4 right-4 z-30 pointer-events-auto flex items-center gap-2">
        {/* 直播中 + 时间 — 玻璃 chip */}
        <div className="bg-[#0F0F0F]/60 backdrop-blur-2xl border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)] whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse shadow-[0_0_6px_#FF4D6D] shrink-0" />
            <span className="text-[10px] text-white font-bold tracking-wide uppercase font-display">直播中</span>
          </div>
          <div className="w-[1px] h-3 bg-white/10" />
          <span className="text-[10px] text-white/60 tabular-nums font-display">{formatTime(liveSeconds)}</span>
        </div>
        {/* 技能卡 chip */}
        <button
          onClick={() => setShowSkillSheet(true)}
          className="flex-1 min-w-0 bg-[#4ECDC4]/10 backdrop-blur-2xl border border-[#4ECDC4]/30 rounded-xl px-3 py-2 flex items-center justify-between gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:bg-[#4ECDC4]/15 transition-colors"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[10px] shrink-0">🏷️</span>
            <span className="text-[10px] text-[#4ECDC4] font-bold truncate font-display">
              {activeSkillCards.length === 0
                ? '未选择技能卡'
                : activeSkillCards.length === 1
                  ? activeSkillCards[0].title.replace(/[「」]/g, '')
                  : `${activeSkillCards[currentSkillIdx]?.title.replace(/[「」]/g, '').substring(0, 6)} +${activeSkillCards.length - 1}`}
            </span>
          </div>
          <Icons.ChevronDown size={12} className="shrink-0 text-[#4ECDC4]" />
        </button>
        {/* 场观 / 在线人数 胶囊 */}
        {showViewerPill && (
          <div className="shrink-0 bg-black/55 backdrop-blur-2xl border border-white/10 rounded-full pl-2.5 pr-1 py-1 flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90 shrink-0">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-[11px] text-white font-semibold tabular-nums font-display leading-none">
              {viewerCount.toLocaleString()}
            </span>
            <button
              onClick={() => setShowViewerPill(false)}
              aria-label="关闭在线人数"
              className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition-colors"
            >
              <Icons.X size={10} />
            </button>
          </div>
        )}
      </div>

      {/* 右侧竖栏 — 点赞 */}
      <div className="absolute right-3 top-[calc(env(safe-area-inset-top)+72px)] z-30 pointer-events-auto flex flex-col items-center">
        <button
          onClick={() => { setTotalLikes(v => v + 1); setLikeBurst(b => b + 1); }}
          aria-label="点赞"
          className="relative w-11 h-11 rounded-full bg-black/55 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.45)] active:scale-90 transition-transform"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF3B5C" stroke="none" className="drop-shadow-[0_0_6px_rgba(255,59,92,0.6)]">
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z" />
          </svg>
          {likeBurst > 0 && (
            <span key={likeBurst} className="absolute -top-1 text-[10px] text-[#FF3B5C] font-bold animate-[slide-in-up_0.6s_ease-out]">+1</span>
          )}
        </button>
        <span className="mt-1 text-[10px] font-semibold text-white tabular-nums font-display drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {totalLikes >= 10000 ? `${(totalLikes / 10000).toFixed(1)}万` : totalLikes.toLocaleString()}
        </span>
      </div>



      {/* 5分钟提示 */}
      {showSummaryPill && (
        <div className="absolute top-[170px] inset-x-4 z-40 animate-[slide-in-down_0.3s_ease-out]">
          <div onClick={() => { setShowSummaryPill(false); setShowSummarySheet(true); }} className="bg-[#FFD166] text-black rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg cursor-pointer">
            <span className="text-[12px] font-medium">📊 第1个5分钟小结已生成</span>
            <span className="text-[10px] bg-black/10 px-2 py-0.5 rounded-full font-medium">点击查看</span>
          </div>
        </div>
      )}

      {/* 智能提示条 — 位于评论区正上方 */}
      <div className="absolute bottom-[calc(80px+30vh+8px)] left-4 right-4 z-30 pointer-events-auto">
        <div className="w-[85%]">
          {promptExpanded ? (
            <div className="relative bg-black/40 backdrop-blur-md border border-[#FFD166]/50 rounded-xl shadow-2xl px-3 py-2.5 pr-8 animate-[fade-in_0.2s]">
              <button
                onClick={() => setPromptExpanded(false)}
                aria-label="收起智能提示"
                className="absolute top-1 right-1 w-5 h-5 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icons.ChevronDown size={12} />
              </button>
              {topicPrompt ? (
                <div className="flex items-start gap-2">
                  <div className="shrink-0 mt-0.5">
                    <Icons.Lightbulb size={13} className="text-[#FFD166]" />
                  </div>
                  <p className="flex-1 text-[12px] leading-snug text-white/95 font-body pr-2">
                    {topicPrompt.tipText}
                  </p>
                  <span className="shrink-0 text-[10px] font-display tabular-nums text-[#FFD166]/80 mt-0.5">
                    {promptCountdown}s
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 min-h-[18px]">
                  <Icons.Lightbulb size={12} className="text-[#FFD166]/50" />
                  <span className="text-[11px] text-white/40 font-body">暂无提示</span>
                  {activeSkillCard && (
                    <button
                      onClick={triggerPrompt}
                      className="ml-auto mr-2 text-[10px] text-[#FFD166] hover:text-[#FFD166]/80 font-display uppercase tracking-wider"
                    >
                      获取
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setPromptExpanded(true)}
              aria-label="展开智能提示"
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-[#FFD166]/50 shadow-2xl flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Icons.Lightbulb size={14} className="text-[#FFD166]" />
            </button>
          )}
        </div>
      </div>

      {/* 评论区 */}
      <div className="absolute bottom-[80px] inset-x-4 h-[30vh] z-30 flex flex-col justify-end pointer-events-none">
        <div className="overflow-y-auto space-y-2.5 pr-2 pb-2 scrollbar-none pointer-events-auto mask-image-bottom max-h-full">
          {comments.map(c => {
            const isBuy = c.type === 'buy';
            const isGift = c.type === 'gift';
            return (
              <div key={c.id} className="flex items-start gap-2 max-w-[85%] animate-[slide-in-left_0.2s_ease-out]">
                <div className={`rounded-2xl rounded-bl-none px-3 py-2 backdrop-blur-xl border ${
                  isBuy ? 'bg-[#FF4D6D]/15 border-[#FF4D6D]/40' : isGift ? 'bg-[#FFD166]/15 border-[#FFD166]/40' : 'bg-white/5 border-white/10'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-bold text-white/40 tracking-tight font-display">{c.agent.name}</span>
                    <span className="px-1.5 py-0.5 rounded-sm bg-white/10 text-[7px] text-white/60 font-bold uppercase font-display">{c.agent.level}</span>
                  </div>
                  <p className={`text-[13px] leading-relaxed font-body ${isBuy ? 'text-[#FF4D6D] font-medium' : isGift ? 'text-[#FFD166] font-medium' : 'text-white'}`}>
                    {c.text}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={commentsEndRef} />
        </div>
      </div>

      {/* 底部控制 — 玻璃 */}
      <div className="absolute bottom-0 inset-x-0 h-[88px] bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between px-4 pb-safe z-30 pointer-events-auto">
        <button onClick={() => { setIsLivePaused(true); setShowExitConfirm(true); }} className="h-12 w-12 rounded-full bg-[#FF4D6D] text-white flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,77,109,0.4)] active:scale-95 transition-transform">
          <div className="w-3.5 h-3.5 bg-white rounded-sm mb-0.5" />
          <span className="text-[8px] font-bold uppercase tracking-wide font-display">结束</span>
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsLivePaused(!isLivePaused)} className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 flex items-center justify-center active:scale-95 hover:bg-white/10 transition-all">
            {isLivePaused ? <span className="text-[14px]">▶</span> : <div className="flex gap-1"><div className="w-1 h-3.5 bg-white/80"/><div className="w-1 h-3.5 bg-white/80"/></div>}
          </button>
          <button onClick={() => setShowSkillSheet(true)} className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 flex items-center justify-center active:scale-95 hover:bg-white/10 transition-all">
            <Icons.RefreshCw size={16} />
          </button>
          <button onClick={() => setMicState(!micState)} className={`h-12 w-12 rounded-full border backdrop-blur-xl flex items-center justify-center active:scale-95 transition-all ${micState ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' : 'bg-[#FF4D6D]/15 border-[#FF4D6D]/40 text-[#FF4D6D]'}`}>
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
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSkillSheet(false)}>
          <div className="w-full max-w-[430px] bg-[#1A1A1A] rounded-t-2xl border-t border-[#333333] p-5 max-h-[60vh] flex flex-col animate-[slide-in-up_0.25s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-4 border-b border-[#333333]">
              <div>
                <h3 className="text-[16px] font-semibold text-white">切换实训技能卡</h3>
                <p className="text-[11px] text-[#6B6B6B] mt-0.5">单击选中 / 再次单击取消 · 支持多选</p>
              </div>
              <button onClick={() => setShowSkillSheet(false)} className="text-[#6B6B6B] hover:text-white"><Icons.X size={20} /></button>
            </div>
            <div className="overflow-y-auto space-y-3 py-4 flex-1">
              {skillCardLibrary.length === 0 && <p className="text-center text-[#6B6B6B] text-[14px] py-4">技能卡库为空</p>}
              {skillCardLibrary.map((card) => {
                const isSelected = selectedSkills.includes(card.id);
                const isCurrent = isSelected && activeSkillCards[currentSkillIdx]?.id === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      const next = isSelected ? selectedSkills.filter((x) => x !== card.id) : [...selectedSkills, card.id];
                      setSelectedSkills(next);
                      if (isSelected) {
                        triggerToast('已取消该技能卡');
                        if (isCurrent) setCurrentSkillIdx(0);
                      } else {
                        triggerToast('已加入该技能卡');
                        setCurrentSkillIdx(next.filter((id) => skillCardLibrary.some((c) => c.id === id)).indexOf(card.id));
                        setSkillProgress(0);
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-[#4ECDC4] bg-[#4ECDC4]/15 shadow-[0_0_0_1px_rgba(78,205,196,0.3)]'
                        : isSelected
                          ? 'border-[#4ECDC4]/60 bg-[#4ECDC4]/5'
                          : 'border-[#333333] bg-[#0F0F0F] hover:border-[#4ECDC4]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80 font-medium mb-2 inline-block">{card.category}</span>
                        <p className="text-[14px] font-medium text-white">{card.title}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${isSelected ? 'bg-[#4ECDC4] border-[#4ECDC4]' : 'border-[#555]'}`}>
                        {isSelected && <Icons.Check size={12} className="text-black" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
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
  basicSettings,
  setBasicSettings,
  triggerToast 
}) {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(userProfile.username);
  const [calendarOffset, setCalendarOffset] = useState(0);
  const [selectedArchiveId, setSelectedArchiveId] = useState(null);
  const [tagInput, setTagInput] = useState('');

  const addTag = (raw: string) => {
    const t = raw.trim().replace(/[,，\s]+$/, '');
    if (!t) return;
    if (basicSettings.tags.includes(t)) { setTagInput(''); return; }
    setBasicSettings(prev => ({ ...prev, tags: [...prev.tags, t] }));
    setTagInput('');
  };
  const removeTag = (t: string) => {
    setBasicSettings(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }));
  };

  const handleSaveUsername = () => {
    if (tempUsername.trim()) {
      setUserProfile(prev => ({ ...prev, username: tempUsername }));
      triggerToast("昵称已更新", "success");
    } else {
      setTempUsername(userProfile.username);
    }
    setIsEditingUsername(false);
  };

  // 真实月份计算（基于 calendarOffset 与今天）
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + calendarOffset, 1);
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // 训练密度热力图：根据 trainSessions 按日期聚合
  const densityMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    trainSessions.forEach(s => {
      // 兼容 session.date 形如 "2026年5月23日 14:30"，否则尝试 Date.parse
      let key: string | null = null;
      if (typeof s.date === 'string') {
        const m = s.date.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
        if (m) key = `${m[1]}-${parseInt(m[2], 10)}-${parseInt(m[3], 10)}`;
      }
      if (!key && s.timestamp) {
        const d = new Date(s.timestamp);
        if (!isNaN(d.getTime())) key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      }
      if (key) map[key] = (map[key] || 0) + 1;
    });
    // demo 默认数据（仅当前月无任何训练时显示，便于预览热力图效果）
    if (Object.keys(map).length === 0 && calendarOffset === 0) {
      const y = today.getFullYear(), m = today.getMonth() + 1;
      [[10,1],[13,1],[14,2],[15,3],[20,1],[23,1],[24,2]].forEach(([d,c]) => { map[`${y}-${m}-${d}`] = c; });
    }
    return map;
  }, [trainSessions, calendarOffset]);

  const getCalendarDays = () => {
    const days: Array<{ blank?: boolean; dayNum?: number; density?: number; isToday?: boolean }> = [];
    // 周一为一周起点：JS getDay() 周日=0，转换：(getDay()+6)%7
    const firstWeekday = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    for (let i = 0; i < firstWeekday; i++) days.push({ blank: true });
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    for (let d = 1; d <= lastDay; d++) {
      const density = densityMap[`${viewYear}-${viewMonth + 1}-${d}`] || 0;
      const isToday = d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
      days.push({ dayNum: d, density, isToday });
    }
    return days;
  };

  const monthLabel = `${viewYear}年${viewMonth + 1}月`;

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
    <div className="flex-1 flex flex-col overflow-y-auto pb-24 animate-[fade-in_0.3s_ease-out] relative">
      {/* 氛围光晕 */}
      <div className="pointer-events-none absolute -top-20 -left-16 w-72 h-72 rounded-full bg-[#FF4D6D]/10 blur-3xl animate-ambient" />
      <div className="pointer-events-none absolute top-40 -right-20 w-72 h-72 rounded-full bg-[#4ECDC4]/10 blur-3xl animate-ambient" style={{ animationDelay: '-4s' }} />

      <header className="px-5 pt-5 pb-3 sticky top-0 z-40 bg-[#0F0F0F]/85 backdrop-blur-xl">
        <h1 className="font-display text-[22px] font-bold text-white tracking-tight">我的</h1>
        <p className="text-[11px] text-white/40 font-body mt-0.5">Personal Archive</p>
      </header>

      <main className="px-4 pt-2 space-y-4 relative z-10">
        {/* 个人信息 */}
        <section className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#FF4D6D]/40 via-white/5 to-[#4ECDC4]/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="rounded-2xl bg-[#161616]/95 backdrop-blur-xl p-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF4D6D] to-[#4ECDC4] p-[2px] shadow-[0_0_20px_rgba(255,77,109,0.3)]">
                <div className="w-full h-full bg-[#161616] rounded-[14px] flex items-center justify-center font-display font-bold text-[18px] text-white">
                  {userProfile.username.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {isEditingUsername ? (
                  <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} onBlur={handleSaveUsername} onKeyDown={(e) => e.key === 'Enter' && handleSaveUsername()} autoFocus className="bg-[#0F0F0F] border border-white/15 text-[15px] px-2.5 py-1.5 rounded-lg text-white outline-none w-full font-body" />
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-[17px] font-semibold text-white truncate">@{userProfile.username}</h2>
                    <button onClick={() => setIsEditingUsername(true)} className="text-white/40 hover:text-white text-[12px]">✏️</button>
                  </div>
                )}
                <p className="text-[11px] text-white/40 font-body mt-0.5 tracking-wide">LIVE TRAINER · LV.2</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-white/5">
              {[
                { val: trainSessions.length, label: '累计场次', color: '#FF4D6D' },
                { val: userProfile.totalSkills, label: '掌握技能', color: '#4ECDC4' },
                { val: favoriteSessions.length, label: '我的收藏', color: '#FFD166' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-[20px] font-bold tabular-nums" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[11px] text-white/40 mt-0.5 font-body">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 基础设置 */}
        <section className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF4D6D]/15 to-[#4ECDC4]/15 rounded-3xl blur opacity-30 pointer-events-none"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF4D6D] shadow-[0_0_8px_#FF4D6D]"></div>
              <h3 className="font-display text-[12px] font-bold text-white uppercase tracking-wider">基础设置</h3>
            </div>

            {/* 人设设定 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 font-display">人设设定</label>
              <div className="bg-[#0F0F0F]/60 rounded-2xl border border-white/10 p-3 focus-within:border-[#4ECDC4]/40 transition-colors">
                <textarea
                  value={basicSettings.persona}
                  onChange={(e) => setBasicSettings(prev => ({ ...prev, persona: e.target.value }))}
                  placeholder="用一段话描述你的人设，比如'我是一个分享通勤穿搭的上班族，风格偏简约...'"
                  className="w-full bg-transparent border-none outline-none p-0 text-[13px] text-white/85 placeholder:text-white/25 resize-none min-h-[68px]"
                />
              </div>
            </div>

            {/* 标签 —— 输入生成气泡 */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 font-display">标签</label>
              <div className="bg-[#0F0F0F]/60 rounded-2xl border border-white/10 p-2.5 focus-within:border-[#4ECDC4]/40 transition-colors">
                <div className="flex flex-wrap gap-1.5 items-center">
                  {basicSettings.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/40 text-[#4ECDC4] text-[12px] font-medium">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="w-4 h-4 rounded-full hover:bg-[#4ECDC4]/25 flex items-center justify-center">
                        <Icons.X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (/[,，]$/.test(v)) { addTag(v.slice(0, -1)); } else { setTagInput(v); }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }
                      else if (e.key === 'Backspace' && !tagInput && basicSettings.tags.length) {
                        removeTag(basicSettings.tags[basicSettings.tags.length - 1]);
                      }
                    }}
                    onBlur={() => tagInput && addTag(tagInput)}
                    placeholder={basicSettings.tags.length ? '继续添加…' : '输入标签后按回车 / 逗号添加'}
                    className="flex-1 min-w-[120px] bg-transparent border-none outline-none px-2 py-1 text-[13px] text-white/85 placeholder:text-white/25"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 训练日历 — 发光玻璃 */}
        <section className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF4D6D]/20 to-[#4ECDC4]/20 rounded-3xl blur opacity-30 pointer-events-none"></div>
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4] shadow-[0_0_8px_#4ECDC4]"></div>
                <h3 className="font-display text-[12px] font-bold text-white uppercase tracking-wider">训练日历</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCalendarOffset(p => p - 1)} className="w-6 h-6 rounded-md bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors"><Icons.ChevronLeft size={12} /></button>
                <span className="text-[11px] text-white/70 font-medium min-w-[72px] text-center tabular-nums font-body">{monthLabel}</span>
                <button onClick={() => setCalendarOffset(p => p + 1)} className="w-6 h-6 rounded-md bg-white/5 text-white/50 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors"><Icons.ChevronRight size={12} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
              {['一', '二', '三', '四', '五', '六', '日'].map(w => <span key={w} className="text-[10px] text-white/30 font-bold">{w}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {getCalendarDays().map((cell, idx) => {
                if (cell.blank) return <div key={idx} className="aspect-square" />;
                const hasDensity = cell.density > 0;
                let cls = 'text-white/20';
                if (hasDensity) {
                  cls = 'bg-white/5 border border-white/5 text-white/80';
                  if (cell.density >= 3) cls = 'bg-[#4ECDC4]/15 border border-[#4ECDC4]/30 text-white shadow-[inset_0_0_10px_rgba(78,205,196,0.18)]';
                  else if (cell.density === 2) cls = 'bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 text-white';
                }
                if (cell.isToday) cls = 'bg-[#FF4D6D]/10 border-2 border-[#FF4D6D] text-white font-bold shadow-[inset_0_0_12px_rgba(255,77,109,0.2)]';
                return (
                  <div key={idx} className={`aspect-square rounded-lg flex items-center justify-center text-[11px] font-display tabular-nums transition-colors relative ${cls}`}>
                    {cell.dayNum}
                    {cell.isToday && <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD166] rounded-full border border-[#0F0F0F]" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 训练档案 — 发光玻璃 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-display text-[12px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-[#FF4D6D] rounded-full shadow-[0_0_6px_#FF4D6D]" />
              训练档案
            </h3>
            <span className="text-[10px] text-[#4ECDC4] font-bold tracking-tighter font-display tabular-nums">{trainSessions.length} REC</span>
          </div>

          {trainSessions.length === 0 ? (
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF4D6D]/10 to-[#4ECDC4]/10 rounded-2xl blur opacity-30 pointer-events-none" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-8 text-center">
                <p className="text-[13px] text-white font-medium mb-1 font-display">还没有训练记录</p>
                <p className="text-[11px] text-white/40 font-body">去首页导入素材，开始第一场训练</p>
              </div>
            </div>
          ) : (
            <div className="max-h-[240px] overflow-y-auto pr-1 space-y-2.5 archive-scroll">
              {trainSessions.map(session => {
                const isExpanded = selectedArchiveId === session.id;
                const isFav = favoriteSessions.includes(session.id);
                return (
                  <div key={session.id} className="relative group">
                    {isExpanded && <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4ECDC4]/30 to-[#FF4D6D]/20 rounded-2xl blur opacity-40 pointer-events-none" />}
                    <div className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all ${isExpanded ? 'border-[#4ECDC4]/40 bg-white/[0.06]' : 'border-white/10 bg-white/5 hover:bg-white/[0.08]'}`}>
                      <div onClick={() => setSelectedArchiveId(isExpanded ? null : session.id)} className="p-4 cursor-pointer flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[13px] font-display font-bold text-white truncate">{session.date}</p>
                            {isFav && <span className="text-[#FFD166] text-[11px] shrink-0">✦</span>}
                          </div>
                          <p className="text-white/40 text-[11px] truncate font-body">时长 {session.durationStr} · {session.skillCards.join(' · ')}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'border-[#4ECDC4]/40 text-[#4ECDC4] bg-[#4ECDC4]/10' : 'border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white'}`}>
                          {isExpanded ? <Icons.ChevronUp size={14} /> : <Icons.ChevronRight size={14} />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3 animate-[fade-in_0.2s_ease-out]">
                          <div>
                            <h4 className="text-[10px] font-display font-bold text-[#4ECDC4] mb-1.5 uppercase tracking-widest">综合诊断</h4>
                            <p className="text-[11px] text-white/70 leading-relaxed font-body">{session.summary}</p>
                          </div>
                          {session.suggestions?.length > 0 && (
                            <div>
                              <h4 className="text-[10px] font-display font-bold text-[#FFD166] mb-1.5 uppercase tracking-widest">改进建议</h4>
                              <div className="space-y-1">
                                {session.suggestions.map((item, idx) => (
                                  <p key={idx} className="text-[11px] text-white/70 flex items-start gap-1.5 font-body leading-relaxed"><span className="text-[#FFD166] mt-0.5 shrink-0">›</span> {item}</p>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2 pt-1">
                            <button onClick={() => toggleFavorite(session.id)} className={`flex-1 py-2 rounded-xl text-[12px] font-medium border flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors ${isFav ? 'bg-[#FFD166]/10 border-[#FFD166]/30 text-[#FFD166]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                              <Icons.Star size={12} fill={isFav ? 'currentColor' : 'none'} /> {isFav ? '已收藏' : '收藏'}
                            </button>
                            <button onClick={() => deleteSession(session.id)} className="px-3 py-2 rounded-xl border border-white/10 text-[#FF4D6D] bg-white/5 hover:bg-[#FF4D6D]/10 backdrop-blur-md transition-colors flex items-center justify-center">
                              <Icons.Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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