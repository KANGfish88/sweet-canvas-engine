import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import LiveTrainingApp from "@/components/LiveTrainingApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "虚拟直播间 · AI 主播训练" },
      { name: "description", content: "导入素材、生成技能卡、进入虚拟直播间练习并获取 AI 诊断报告。" },
    ],
  }),
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="min-h-screen bg-[#0F0F0F]" />;
  }
  return <LiveTrainingApp />;
}
