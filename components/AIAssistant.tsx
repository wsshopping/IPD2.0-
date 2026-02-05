import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, X, Bot, User, Loader2, MessageSquare, GripHorizontal } from 'lucide-react';

// 上下文数据：让 AI 知道它是一个度量系统的助手
const SYSTEM_INSTRUCTION = `
你是一个专业的 IPD (集成产品开发) 度量分析助手。
你正在服务于 "IPD 度量指挥中心" 系统。

以下是当前的系统关键数据概览，请基于此回答用户问题：

1. **项目概况**：
   - 在研项目总数：142个 (正常 112, 预警 20, 风险 10)。
   - 重点项目：
     * "XDR 威胁检测引擎 v3.0" (大安全体系): 处于 TR6 验收阶段，状态正常，是山头项目。
     * "HCI 超融合 6.9" (大云体系): 处于 DCP5 上市阶段，状态正常。
     * "天问大模型 Gen2": 处于开发阶段，AI Native 模式试点项目。

2. **质量红线**：
   - 集团遗留 DI 值：54 (处于预警状态)。
   - Reopen 总数：15 (超标)。
   - 严重问题 (S1)：0 (安全)。

3. **人力资源**：
   - 总人数：3050人。
   - 分布：大安全(40%), 大云(25%), 平台(15%), AI体系(20%)。
   - AI 人才渗透率：28%。

4. **效率指标**：
   - 平均 TTM (上市周期)：8.5个月 (同比缩短 5%)。
   - 研发投产比 (ROI)：1:4.2。

**你的角色设定**：
- 语气专业、客观、富有洞察力。
- 回答简练，直接切中要害。
- 如果用户问到数据异常（如风险项目、质量超标），请提供分析建议。
- 你可以解释 IPD 术语 (如 TR, DCP, TTM, DI 值等)。
`;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好！我是 IPD 度量分析助手。我可以为您解读项目风险、质量趋势或人力投入情况。请问有什么可以帮您？',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dragging State
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pointer Event Handlers for Robust Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (windowRef.current) {
      // Vital: Capture the pointer so events keep firing even if mouse moves outside
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      isDragging.current = true;
      
      const rect = windowRef.current.getBoundingClientRect();
      
      // Calculate where we clicked relative to the window's top-left
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // If this is the first move, snap to current calculated position to prevent jumping
      if (!position) {
          setPosition({ x: rect.left, y: rect.top });
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
       e.preventDefault();
       const newX = e.clientX - dragOffset.current.x;
       const newY = e.clientY - dragOffset.current.y;
       setPosition({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
       e.preventDefault();
       isDragging.current = false;
       // Release capture
       (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY; 
      
      if (!apiKey) {
        throw new Error("API Key 未配置");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: [
          { role: 'user', parts: [{ text: inputText }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "抱歉，我无法生成回答。",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "连接 AI 服务失败 (可能缺少 API Key)。\n\n为了演示，我是一个模拟回答：\n根据当前数据，XDR 项目目前进度正常，但需关注 TR6 验收的遗留问题。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Draggable Chat Window */}
      {isOpen && (
        <div 
            ref={windowRef}
            style={
                position 
                ? { left: `${position.x}px`, top: `${position.y}px`, bottom: 'auto', right: 'auto' } 
                : { bottom: '90px', right: '24px' }
            }
            className={`fixed z-50 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden ${!position ? 'animate-in fade-in zoom-in-95 duration-200 origin-bottom-right' : ''}`}
        >
          
          {/* Header - Draggable Handle */}
          <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white cursor-move touch-none select-none"
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">度量分析助手</h3>
                <div className="flex items-center gap-1 text-[10px] text-blue-100 opacity-90">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Gemini 2.5 Flash Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
                 {/* Grip Icon */}
                <div className="p-1 pointer-events-none opacity-50">
                   <GripHorizontal className="w-5 h-5" />
                </div>
                {/* Stop propagation on close button to prevent dragging when clicking close */}
                <button 
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => setIsOpen(false)} 
                  className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-600 text-white'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-xs text-slate-500">正在思考...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="询问关于项目进度、质量或资源的问题..."
                className="w-full bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-2">
              AI 内容由 Gemini 生成，仅供参考。
            </div>
          </div>

        </div>
      )}

      {/* Floating Toggle Button (Always Fixed) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-110 active:scale-95 group relative"
        >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

    </>
  );
};
