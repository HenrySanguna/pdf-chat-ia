export const STANDALONE_QUESTION_TEMPLATE = `Dado el siguiente historial de conversación y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente.

Historial del chat:
{chat_history}
Pregunta de seguimiento: {question}
Pregunta independiente:`;

// Pregunta real que se hace al chat y se envía la respuesta al cliente
export const QA_TEMPLATE = `Eres un asistente de inteligencia artificial entusiasta. Utiliza los siguientes fragmentos de contexto para responder la pregunta al final.
Si no sabes la respuesta, simplemente di que no lo sabes. NO intentes inventar una respuesta.
Si la pregunta no está relacionada con el contexto, responde educadamente que sólo puedes responder preguntas relacionadas con el contexo.

{context}

Pregunta: {question}
Respuesta útil en formato markdown:`;
