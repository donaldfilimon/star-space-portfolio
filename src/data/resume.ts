export type ResumeEntry = {
  label: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const resumeIntro =
  "My work lives at the intersection of systems engineering, intelligent software, developer experience, and product design — from Apple compiler tooling to founder-led AI platforms.";

export const resumeEntries: ResumeEntry[] = [
  {
    label: "NOW",
    title: "Software Engineer",
    summary: "Systems, tooling, and platform work across Zig, Swift, LLVM, and TypeScript.",
    bullets: [
      "Swift and LLVM compiler infrastructure, performance tuning, and developer tooling",
      "ABI / Abbey: local AI orchestration, MCP transport, GPU reporting, and agent memory",
      "Production interfaces and CLIs on top of low-level, performance-minded foundations",
    ],
  },
  {
    label: "APPLE",
    title: "Machine Learning & Open Source",
    summary: "Compiler optimization, Swift tooling, and privacy-first AI experiments at scale.",
    bullets: [
      "Swift compiler and LLVM optimization passes for faster builds and runtime efficiency",
      "AI-assisted developer tooling and inference pipeline work in self-hosted environments",
      "Open-source contributions across Swift.org and related compiler ecosystems",
    ],
  },
  {
    label: "FOUNDER",
    title: "The Donald Company / MLAI",
    summary: "Building Abbey, WDBX, and a private adaptive intelligence stack under Star Space.",
    bullets: [
      "WDBX vector memory with provenance-aware retrieval, plugins, and persistence layers",
      "MLAI product surfaces and corporate web presence for the broader intelligence stack",
      "Star Space identity and portfolio systems tying product, brand, and engineering together",
    ],
  },
  {
    label: "FOCUS",
    title: "Systems + AI + Design",
    summary: "Depth in systems languages with a bias toward memorable product experiences.",
    bullets: [
      "Zig, Swift, TypeScript, React, Metal, and WebGPU",
      "Local-first architecture, agent memory, and multimodal / cinematic demos",
      "Game engines and creative tooling — Nyon, Gama, and real-time 3D experiments",
    ],
  },
];
