/**
 * Chat API Service for Alba Nutritional Chatbot
 * Handles communication with Lambda Function URLs (streaming)
 */

export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  session_id: string;
  title?: string;
}

export interface StreamingCallbacks {
  onStart?: (sessionId: string, title: string) => void;
  onChunk?: (content: string) => void;
  onComplete?: (agentUsed: string) => void;
  onError?: (error: string) => void;
}

const STREAMING_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_STREAMING_ENDPOINT;

/**
 * Send a message with streaming response
 * Returns chunks in real-time via callbacks
 */
export async function sendMessageStreaming(
  message: string,
  sessionId: string | undefined,
  callbacks: StreamingCallbacks
): Promise<void> {
  if (!STREAMING_ENDPOINT) {
    callbacks.onError?.('Chat endpoint not configured');
    return;
  }

  try {
    const requestBody: ChatRequest = { message };
    if (sessionId) {
      requestBody.session_id = sessionId;
    }

    const response = await fetch(STREAMING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      callbacks.onError?.(`Error del servidor (${response.status})`);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      callbacks.onError?.('No se pudo iniciar la lectura de la respuesta');
      return;
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));

            switch (data.type) {
              case 'start':
                callbacks.onStart?.(data.session_id, data.title);
                break;
              case 'chunk':
                callbacks.onChunk?.(data.content);
                break;
              case 'end':
                callbacks.onComplete?.(data.agent_used);
                break;
              case 'error':
                callbacks.onError?.(data.content);
                break;
            }
          } catch (parseError) {
            console.warn('Failed to parse SSE data:', line);
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      callbacks.onError?.('No se pudo conectar al servidor. Verifica tu conexión a internet.');
    } else {
      callbacks.onError?.('Error inesperado al comunicarse con el servidor');
    }
  }
}
