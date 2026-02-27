'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowUpRight, RotateCcw } from 'lucide-react';
import { usePathname } from 'next/navigation';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';
import { sendMessageStreaming } from '@/lib/chat-api';
import { usePostHog } from 'posthog-js/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Pool of all available prompts for rotation
const allPrompts = [
  // General nutrition
  "¿Qué alimentos debo evitar?",
  "¿Cómo controlar el potasio?",
  "Ayúdame con mi dieta",
  "¿Qué puedo comer con enfermedad renal?",
  "Recetas bajas en potasio",

  // Meal planning
  "Ideas para el desayuno",
  "Recetas bajas en sodio",
  "¿Cómo controlar el fósforo?",
  "Plan de comidas semanal",
  "¿Qué frutas puedo comer?",

  // Specific needs
  "¿Cuánta agua puedo tomar?",
  "Alternativas a la leche",
  "Proteínas bajas en fósforo",
  "¿Puedo comer aguacate?",
  "Alimentos ricos en hierro",

  // Educational
  "¿Qué es la diálisis?",
  "¿Por qué limitar el potasio?",
  "¿Cómo funcionan los riñones?",
];

// Different rotation intervals for each position (in milliseconds)
const rotationIntervals = [5000, 6500, 8000];

const followUpSuggestions = [
  '¿Qué puedo desayunar?',
  '¿Cuánta agua puedo tomar?',
  'Dame un menú semanal',
  '¿Puedo comer frutas?',
];

// Simple markdown-like formatting with XSS protection
function formatMessage(content: string) {
  const formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle headings (must process ### before ## before #)
    .replace(/^### (.*$)/gm, '<p class="font-semibold text-gray-700 mt-3 mb-1.5 text-sm">$1</p>')
    .replace(/^## (.*$)/gm, '<p class="font-semibold text-gray-800 mt-3 mb-1.5 text-sm">$1</p>')
    .replace(/^# (.*$)/gm, '<p class="font-semibold text-gray-900 mt-4 mb-2 text-base">$1</p>')
    // Handle emoji headers (e.g., "🌅 Desayuno" at start of line)
    .replace(/^([\u{1F300}-\u{1F9FF}][\u{FE00}-\u{FE0F}]?\s+\S.*$)/gmu, '<p class="font-medium text-gray-800 mt-3 mb-1.5 text-sm">$1</p>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-sm">$1</li>')
    .replace(/---/g, '<hr class="my-2 border-gray-200">')
    // Convert URLs to clickable links (handles with or without https://)
    .replace(
      /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^\s<]*)?/g,
      (match) => {
        const url = match.startsWith('http') ? match : `https://${match}`;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-alba-primary hover:underline">${match}</a>`;
      }
    )
    .replace(/\n\n/g, '</p><p class="mt-1.5">')
    .replace(/\n/g, '<br />');

  // Sanitize HTML to prevent XSS attacks
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ['strong', 'p', 'li', 'hr', 'a', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [streamingContent, setStreamingContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [promptIndices, setPromptIndices] = useState<number[]>([0, 5, 10]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const posthog = usePostHog();

  // Track chat widget open/close
  const handleOpenChat = () => {
    setIsOpen(true);
    posthog?.capture('chat_widget_opened', {
      source_page: pathname,
    });
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Check if we're on the home page
  const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';

  // Scroll-based visibility (only on home page)
  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling past ~80% of viewport height (past hero)
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Check if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Set up rotation intervals for each prompt position
  useEffect(() => {
    if (prefersReducedMotion || !isOpen || messages.length > 0) return;

    const intervals: NodeJS.Timeout[] = [];

    promptIndices.forEach((_, position) => {
      const interval = setInterval(() => {
        setPromptIndices(prev => {
          const newIndices = [...prev];
          newIndices[position] = (newIndices[position] + 1) % allPrompts.length;
          return newIndices;
        });
      }, rotationIntervals[position]);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [prefersReducedMotion, isOpen, messages.length]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Track message sent
    posthog?.capture('chat_message_sent', {
      source_page: pathname,
      message_length: content.trim().length,
      is_first_message: messages.length === 0,
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    let fullResponse = '';

    await sendMessageStreaming(content, sessionId, {
      onStart: (newSessionId) => {
        if (!sessionId) {
          setSessionId(newSessionId);
        }
      },
      onChunk: (chunk) => {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      },
      onComplete: () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fullResponse,
        };
        setMessages(prev => [...prev, botMessage]);
        setStreamingContent('');
        setIsLoading(false);
      },
      onError: () => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
        };
        setMessages(prev => [...prev, errorMessage]);
        setStreamingContent('');
        setIsLoading(false);
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setSessionId(undefined);
    setStreamingContent('');
  };

  const showWelcome = messages.length === 0;
  const showFollowUp = messages.length > 0 && !isLoading && !streamingContent;

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={handleOpenChat}
            className="fixed bottom-24 right-6 z-[9999] w-14 h-14 bg-alba-primary hover:bg-alba-primary-dark flex items-center justify-center shadow-lg shadow-alba-primary/30 transition-all duration-300 group rounded-full"
            aria-label="Abrir chat de nutrición"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6 text-gray-900" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="fixed bottom-6 right-6 z-[9999] w-[520px] h-[700px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-100px)] flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-gray-200/50 bg-[#FAFAF7]/95 backdrop-blur-xl isolate"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-900/10 bg-white/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-alba-primary" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 tracking-wide">
                    Asistente Nutricional
                  </h3>
                  <p className="text-xs text-gray-500">Alba Diálisis</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-900/5 transition-all duration-300 rounded-lg"
                    aria-label="Nueva conversación"
                    title="Nueva conversación"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleCloseChat}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-900/5 transition-all duration-300 rounded-lg"
                  aria-label="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area - Fixed scroll */}
            <div
              ref={messagesContainerRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-none p-5"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--color-primary) transparent',
                overscrollBehavior: 'none',
                touchAction: 'pan-y',
              }}
              onWheel={(e) => {
                const container = e.currentTarget;
                const { scrollTop, scrollHeight, clientHeight } = container;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

                // Prevent page scroll when at boundaries
                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                  e.preventDefault();
                }
                e.stopPropagation();
              }}
            >
              {/* Welcome State */}
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <div className="mb-6">
                    <h4 className="text-2xl font-light text-gray-900 mb-2 leading-tight">
                      ¿En qué puedo ayudarte?
                    </h4>
                    <p className="text-sm text-gray-500">
                      Pregunta sobre nutrición renal
                    </p>
                  </div>

                  {/* Quick prompts - Rotating */}
                  <div className="space-y-0 border-t border-gray-900/10">
                    {promptIndices.map((promptIndex, position) => {
                      const prompt = allPrompts[promptIndex % allPrompts.length];
                      const displayId = String(position + 1).padStart(2, '0');
                      return (
                        <div key={position} className="relative h-[57px] border-b border-gray-900/10">
                          <AnimatePresence mode="wait">
                            <motion.button
                              key={`${position}-${promptIndex}`}
                              onClick={() => handleSend(prompt)}
                              className="absolute inset-0 w-full text-left py-4 hover:bg-white/50 transition-all duration-300 group flex items-center justify-between px-0"
                              initial={!prefersReducedMotion ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={!prefersReducedMotion ? { opacity: 0, y: -8 } : {}}
                              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-400 font-medium">
                                  {displayId}
                                </span>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                  {prompt}
                                </span>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-alba-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </motion.button>
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Conversation */}
              {!showWelcome && (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[90%] px-4 py-3 rounded-2xl',
                          message.role === 'user'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700'
                        )}
                      >
                        {message.role === 'assistant' ? (
                          <div
                            className="text-sm leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Streaming response */}
                  {streamingContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[90%] px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700">
                        <div
                          className="text-sm leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: formatMessage(streamingContent) }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Loading indicator */}
                  {isLoading && !streamingContent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Follow-up suggestions */}
                  {showFollowUp && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-4 border-t border-gray-200/50"
                    >
                      <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
                        Sugerencias
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {followUpSuggestions.slice(0, 3).map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(suggestion)}
                            className="px-3 py-1.5 text-xs text-gray-600 bg-white/60 hover:bg-white border border-gray-200/50 hover:border-gray-300 rounded-full transition-all duration-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-900/10 bg-white/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-3 bg-white/70 border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300 rounded-xl"
                />
                <motion.button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-alba-primary hover:bg-alba-primary-dark text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-xl"
                  aria-label="Enviar mensaje"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingChatWidget;
