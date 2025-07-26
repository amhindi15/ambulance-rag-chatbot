
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          padding: '0.8rem 1rem',
          backgroundColor: '#e11d48',
          color: 'white',
          border: 'none',
          borderRadius: '9999px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}
      >
        {isOpen ? 'إغلاق المساعد' : 'المساعد الإسعافي'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '4rem',
            right: '1rem',
            width: '300px',
            maxHeight: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            padding: '1rem',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '0.5rem' }}>
                <strong>{m.role === 'user' ? 'أنت' : 'المساعد'}:</strong> {m.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="اكتب سؤالك الطبي..."
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc',
              }}
              disabled={isLoading}
            />
          </form>
        </div>
      )}
    </>
  );
}
