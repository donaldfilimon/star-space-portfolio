export type Project = {
  name: string;
  eyebrow: string;
  description: string;
  outcome: string;
  year: string;
  tags: string[];
  accent: "violet" | "indigo" | "white";
  href?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    name: "Abbey / ABI",
    eyebrow: "Personal AI System",
    description:
      "A modular Zig framework for local AI orchestration — agents, MCP, GPU reporting, and a private intelligence stack.",
    outcome: "17-star open-source core with docs on GitHub Pages.",
    year: "2025–26",
    tags: ["Zig", "Agents", "MCP"],
    accent: "violet",
    href: "https://donaldfilimon.github.io/abi/",
    repoUrl: "https://github.com/donaldfilimon/abi",
  },
  {
    name: "WDBX",
    eyebrow: "Cognitive Data Layer",
    description:
      "Vector memory for AI apps — provenance-aware retrieval, plugins, and implementations spanning Zig (in ABI) and Python.",
    outcome: "Active Zig + Python lines (wdbx-py) with extensible plugins.",
    year: "2024–26",
    tags: ["Zig", "Python", "Vector Search"],
    accent: "indigo",
    href: "https://github.com/donaldfilimon/wdbx-py",
    repoUrl: "https://github.com/donaldfilimon/wdbx-py",
  },
  {
    name: "Gama",
    eyebrow: "Swift Framework",
    description:
      "A Swift framework for building modular apps, games, and tools with a clear developer experience.",
    outcome: "Public Swift package with community Discord.",
    year: "2024–26",
    tags: ["Swift", "SwiftPM", "Cross-platform"],
    accent: "white",
    href: "https://github.com/donaldfilimon/gama",
    repoUrl: "https://github.com/donaldfilimon/gama",
  },
  {
    name: "Nyon",
    eyebrow: "Zig Game Engine",
    description:
      "A minimal Zig game engine with raylib integration, node-based geometry editing, and a plugin system for sandboxes and servers.",
    outcome: "Open engine codebase exploring fast 3D iteration in Zig.",
    year: "2024–26",
    tags: ["Zig", "raylib", "Game Dev"],
    accent: "indigo",
    href: "https://github.com/donaldfilimon/nyon-game",
    repoUrl: "https://github.com/donaldfilimon/nyon-game",
  },
  {
    name: "Alien Invasion",
    eyebrow: "WebGPU Cinematic",
    description:
      "A real-time WebGL / WebGPU cinematic in React 19 + Three.js — seven chapters, one continuous 3D world, one camera move.",
    outcome: "Shipped as an interactive TypeScript experience on GitHub.",
    year: "2026",
    tags: ["React", "Three.js", "WebGPU"],
    accent: "violet",
    href: "https://github.com/donaldfilimon/alien-invasion",
    repoUrl: "https://github.com/donaldfilimon/alien-invasion",
  },
  {
    name: "MLAI",
    eyebrow: "Corporate Platform",
    description:
      "Web presence and product surface for MLAI Corporation — the company layer behind Abbey, WDBX, and Star Space.",
    outcome: "TypeScript corporate site repo tied to the MLAI product line.",
    year: "2025–26",
    tags: ["TypeScript", "Product", "Web"],
    accent: "white",
    href: "https://github.com/donaldfilimon/MLAI-CORPORATION-WWW",
    repoUrl: "https://github.com/donaldfilimon/MLAI-CORPORATION-WWW",
  },
];
