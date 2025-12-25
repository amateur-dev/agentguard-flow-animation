import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, CheckCircle, XCircle, Code, Play, Settings, Cpu, HardDrive, Lock } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [configVisible, setConfigVisible] = useState(false);
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (text, type = 'info', delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { text, type, id: Date.now() + Math.random() }]);
        resolve();
      }, delay);
    });
  };

  const runFlow = async () => {
    setLogs([]);
    setStep(1);
    
    // Step 1: Install
    await addLog("> npm install agentguard", "command", 500);
    await addLog("added 42 packages, and audited 43 packages in 2s", "system", 800);
    
    // Step 2: Init
    setStep(2);
    await addLog("> npx agentguard init", "command", 1000);
    await addLog("✔ Created agent-guard.config.ts", "success", 500);
    await addLog("✔ Detected portfolio management patterns", "success", 300);
    
    // Step 3: Config
    setStep(3);
    setConfigVisible(true);
    await addLog("Applying security policies...", "info", 1000);
    await addLog("• Policy: Max Spend ($10,000)", "info", 300);
    await addLog("• Policy: Token Allowlist [USDC, WETH, cbETH]", "info", 300);
    await addLog("• Policy: Approved Routers Only", "info", 300);

    // Step 4: Normal Run (Success)
    setStep(4);
    await addLog("> npm run start-agent", "command", 1500);
    await addLog("[Agent] Strategy: Rebalance 5% USDC to WETH", "agent", 800);
    await addLog("[Agent] Proposed Action: swap(100 USDC, WETH)", "agent", 500);
    await addLog("[AgentGuard] INTERCEPTING PROPOSED ACTION...", "guard-header", 500);
    await addLog("  [√] Token In (USDC) is allowlisted", "success", 400);
    await addLog("  [√] Token Out (WETH) is allowlisted", "success", 300);
    await addLog("  [√] Amount (100) < Max Spend ($10k)", "success", 300);
    await addLog("[AgentGuard] RESULT: PASS", "pass", 500);
    await addLog("[Agent] Executing transaction via Smart Wallet...", "agent", 500);
    await addLog("[Sheriff] On-chain verification: VALID", "success", 400);
    await addLog("✔ Transaction Confirmed: 0x82...f4a", "success", 300);

    // Step 5: Threat Run (Blocked)
    setStep(5);
    await addLog("\n[Agent] Strategy: High Yield Opportunity Detected", "agent", 2000);
    await addLog("[Agent] Proposed Action: swap(50,000 USDC, SHADY_TOKEN)", "agent", 800);
    await addLog("[AgentGuard] INTERCEPTING PROPOSED ACTION...", "guard-header", 500);
    await addLog("  [X] Token Out (SHADY_TOKEN) NOT ALLOWLISTED", "error", 600);
    await addLog("  [X] Amount (50,000) > Max Spend ($10k)", "error", 400);
    await addLog("[AgentGuard] RESULT: FAIL - BLOCKING EXECUTION", "fail", 800);
    await addLog("[Agent] Error: Action rejected by AgentGuard policy", "error", 500);
    
    setStep(6);
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'command': return 'text-blue-400 font-mono';
      case 'system': return 'text-gray-400 font-mono italic';
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-red-400';
      case 'agent': return 'text-purple-400';
      case 'guard-header': return 'text-yellow-400 font-bold border-l-2 border-yellow-400 pl-2 my-1';
      case 'pass': return 'bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/50 inline-block font-bold';
      case 'fail': return 'bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-500/50 inline-block font-bold';
      default: return 'text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Shield className="text-blue-500 w-8 h-8" />
              AgentGuard Flow
            </h1>
            <p className="text-slate-400 mt-1">Interactive integration & runtime visualization</p>
          </div>
          <button 
            onClick={runFlow}
            disabled={step > 0 && step < 6}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
              step > 0 && step < 6 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Play size={18} fill="currentColor" />
            {step === 0 ? 'Start Animation' : step === 6 ? 'Re-run Simulation' : 'Running...'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Visual Steps */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-1">Pipeline Stages</h2>
            {[
              { id: 1, label: 'Install Dependencies', icon: HardDrive },
              { id: 2, label: 'Initialize Config', icon: Settings },
              { id: 3, label: 'Policy Definition', icon: Lock },
              { id: 4, label: 'Runtime Interception', icon: Cpu },
              { id: 6, label: 'On-chain Enforcement', icon: Shield },
            ].map((s) => (
              <div 
                key={s.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                  step >= s.id 
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className={`p-2 rounded-lg ${step >= s.id ? 'bg-blue-500 text-white' : 'bg-slate-800'}`}>
                  <s.icon size={18} />
                </div>
                <span className="font-medium">{s.label}</span>
                {step >= s.id && step < 6 && s.id === (step === 4 || step === 5 ? 4 : step) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                )}
                {step === 6 && <CheckCircle size={16} className="ml-auto text-emerald-500" />}
              </div>
            ))}
          </div>

          {/* Right Column: Terminal & Config */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Terminal Window */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[500px]">
              <div className="bg-slate-800/50 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Terminal size={12} />
                  <span>bash — agent-runtime</span>
                </div>
              </div>
              
              <div className="p-6 font-mono text-sm overflow-y-auto flex-1 space-y-2 scrollbar-hide">
                {logs.length === 0 ? (
                  <div className="text-slate-600 italic">Click "Start Animation" to begin the flow...</div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className={`${getLogColor(log.type)} whitespace-pre-wrap leading-relaxed`}>
                      {log.text}
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Config Preview (appears when initialized) */}
            {configVisible && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-800 text-xs text-slate-400">
                    <Code size={12} />
                    <span>agent-guard.config.ts</span>
                  </div>
                  <pre className="p-4 text-xs md:text-sm overflow-x-auto text-blue-300">
                    {`export default {
  policies: {
    onChain: {
      maxSpendPerTx: 10000, // $10k limit
      tokenAllowlist: ['USDC', 'WETH', 'cbETH'],
      routerAllowlist: ['0x7a25...'], // Uniswap V2
    },
    offChain: {
      vendors: ['binance.com', 'coinbase.com'],
      maxApiOrderSize: 5000
    }
  }
}`}
                  </pre>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Legend / Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <Shield size={18} />
              The Pre-execution Guard
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AgentGuard sits as a gatekeeper in your application logic. Every action the AI agent decides to take
              is first analyzed against your defined policies. If it fails, the code never reaches the broadcast step.
            </p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
            <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 text-lg">
              <Lock size={18} />
              Sheriff Enforcement
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Even if the runtime is compromised, the Smart Wallet uses "Sheriff" to verify the policy on-chain.
              This provides a secondary, immutable layer of defense that cannot be bypassed by software bugs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
