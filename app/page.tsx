'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, ArrowLeft } from 'lucide-react';

const AI_TOOLS = [
  { name: "Cursor", plans: ["Hobby", "Pro", "Business", "Enterprise"] },
  { name: "GitHub Copilot", plans: ["Individual", "Business", "Enterprise"] },
  { name: "Claude", plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API"] },
  { name: "ChatGPT", plans: ["Plus", "Team", "Enterprise", "API"] },
  { name: "Anthropic API", plans: ["API"] },
  { name: "OpenAI API", plans: ["API"] },
  { name: "Gemini", plans: ["Pro", "Ultra", "API"] },
  { name: "v0 / Windsurf", plans: ["Pro", "Team"] },
];

interface ToolEntry {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export default function AISpendAudit() {
  const [tools, setTools] = useState<ToolEntry[]>([
    { tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }
  ]);
  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState("coding");
  const [showResults, setShowResults] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aiSpendAudit');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.tools) setTools(data.tools);
      if (data.teamSize) setTeamSize(data.teamSize);
      if (data.useCase) setUseCase(data.useCase);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('aiSpendAudit', JSON.stringify({ tools, teamSize, useCase }));
  }, [tools, teamSize, useCase]);

  const addTool = () => {
    setTools([...tools, { tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }]);
  };

  const removeTool = (index: number) => {
    if (tools.length === 1) return;
    setTools(tools.filter((_, i) => i !== index));
  };

  const updateTool = (index: number, field: keyof ToolEntry, value: any) => {
    const newTools = [...tools];
    newTools[index] = { ...newTools[index], [field]: value };
    setTools(newTools);
  };

  const totalSpend = tools.reduce((sum, t) => sum + (t.monthlySpend || 0), 0);

  const runAudit = () => {
    const mockSavings = Math.floor(totalSpend * 0.35);
    setTotalSavings(mockSavings);
    setShowResults(true);
  };

  const resetForm = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={resetForm}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Form
          </button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Your AI Spend Audit</h1>
            <p className="text-3xl font-semibold text-green-400">
              Potential Monthly Savings: ${totalSavings}
            </p>
            <p className="text-2xl text-green-500">(${totalSavings * 12} per year)</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 text-center">
            <p className="text-xl mb-8">Full breakdown + smart recommendations coming tomorrow (Day 2)</p>
            <button className="mt-4 bg-white text-black px-10 py-4 rounded-2xl font-semibold text-lg">
              Capture Full Report →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Spend Audit
          </h1>
          <p className="text-xl text-zinc-400">Find out how much you're overpaying on AI tools</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Calculator className="w-6 h-6" /> Your Current AI Stack
          </h2>

          {tools.map((tool, index) => (
            <div key={index} className="mb-6 p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={tool.tool}
                  onChange={(e) => updateTool(index, 'tool', e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-lg"
                >
                  {AI_TOOLS.map(t => (
                    <option key={t.name} value={t.name}>{t.name}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => removeTool(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Plan</label>
                  <select
                    value={tool.plan}
                    onChange={(e) => updateTool(index, 'plan', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
                  >
                    {AI_TOOLS.find(t => t.name === tool.tool)?.plans.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Monthly Spend ($)</label>
                  <input
                    type="number"
                    value={tool.monthlySpend}
                    onChange={(e) => updateTool(index, 'monthlySpend', parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Seats</label>
                  <input
                    type="number"
                    value={tool.seats}
                    onChange={(e) => updateTool(index, 'seats', parseInt(e.target.value) || 1)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTool}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 font-medium"
          >
            <Plus className="w-5 h-5" /> Add another tool
          </button>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Team Size</label>
              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Primary Use Case</label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing/Content</option>
                <option value="data">Data / Analysis</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={runAudit}
          className="w-full bg-white text-black font-semibold py-4 rounded-2xl text-xl hover:bg-zinc-200 transition-all"
        >
          Run AI Spend Audit →
        </button>
      </div>
    </div>
  );
}