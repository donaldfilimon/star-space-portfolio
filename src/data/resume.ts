export type ResumeEntry = {
  label: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const resumeIntro =
  "My work lives at the intersection of systems engineering, intelligent software, developer experience, and product design.";

export const resumeEntries: ResumeEntry[] = [
  {
    label: "NOW",
    title: "Software Engineer",
    summary: "Systems, tooling, and platform work across Zig, Swift, and TypeScript.",
    bullets: [
      "Compiler infrastructure, Swift tooling, and developer-focused platforms",
      "Performance-minded APIs, CLIs, and cross-platform application shells",
      "Shipping production-quality interfaces on top of low-level foundations",
    ],
  },
  {
    label: "FOUNDER",
    title: "The Donald Company / MLAI",
    summary: "Building Abbey, WDBX, and a private adaptive intelligence stack.",
    bullets: [
      "ABI framework: local AI orchestration, MCP transport, and GPU reporting",
      "WDBX vector memory with provenance-aware retrieval and persistence",
      "Product surfaces for MLAI and the Star Space identity system",
    ],
  },
  {
    label: "FOCUS",
    title: "Systems + AI + Design",
    summary: "Depth in systems languages with a bias toward memorable product experiences.",
    bullets: [
      "Zig, Swift, TypeScript, React, Metal, and WebGPU",
      "Local-first architecture, agent memory, and multimodal demos",
      "Creative tooling and real-time 3D / cinematic experiments",
    ],
  },
];
