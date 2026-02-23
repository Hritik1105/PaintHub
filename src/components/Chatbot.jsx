import { useMemo, useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);

  const replies = useMemo(
    () => ({
      upload: 'To upload artwork, open the Upload page and submit the form with image URL or file.',
      order: 'Use the Order page to submit custom painting, sketch, or clay requests.',
      payment: 'Checkout is demo-only right now. Connect a payment gateway for live payments.'
    }),
    []
  );

  const onSend = () => {
    const text = value.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    let bot = 'Hi! Ask about Upload, Order, or Checkout.';
    if (lower.includes('upload')) bot = replies.upload;
    if (lower.includes('order')) bot = replies.order;
    if (lower.includes('payment') || lower.includes('checkout')) bot = replies.payment;

    setMessages((prev) => [...prev, { who: 'you', text }, { who: 'bot', text: bot }]);
    setValue('');
  };

  return (
    <>
      <div className="chatbot-wrapper">
        <div className="chat-tooltip">Chat with us</div>
        <button id="chatBtn" className="chatbot-btn" type="button" onClick={() => setIsOpen((prev) => !prev)}>
          💬
        </button>
      </div>

      {isOpen && (
        <div id="chatWin" className="chatbot-window" style={{ display: 'flex' }}>
          <div className="chatbot-header">
            <span>PaintHub Assistant</span>
            <button
              type="button"
              className="chatbot-close"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div id="chatBody" className="chatbot-body">
            {messages.map((message, index) => (
              <div key={`${message.who}-${index}`} style={{ margin: 6, textAlign: message.who === 'you' ? 'right' : 'left' }}>
                {message.who === 'you' ? `You: ${message.text}` : message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              id="chatInput"
              placeholder="Ask about upload, order, payment..."
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onSend();
              }}
            />
            <button id="chatSend" type="button" onClick={onSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
