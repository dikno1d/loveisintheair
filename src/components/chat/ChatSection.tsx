'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Peer, { DataConnection } from 'peerjs';

interface Message { id: string; text: string; sender: 'you' | 'them'; time: string }

type ViewState = 'menu' | 'creating' | 'waiting' | 'joining' | 'chat';

export default function ChatSection() {
  const [view, setView] = useState<ViewState>('menu');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const peerRef = useRef<Peer | null>(null);
  const connRef = useRef<DataConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = useCallback((text: string, sender: 'you' | 'them') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, sender, time }]);
  }, []);

  const cleanup = useCallback(() => {
    connRef.current?.close();
    peerRef.current?.destroy();
    connRef.current = null;
    peerRef.current = null;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const setupConnection = useCallback((peer: Peer) => {
    peer.on('connection', (conn) => {
      connRef.current = conn;
      conn.on('open', () => {
        setView('chat');
        setStatus('Connected!');
      });
      conn.on('data', (data) => {
        const d = data as { text: string };
        addMessage(d.text, 'them');
      });
      conn.on('close', () => {
        setStatus('Partner disconnected');
      });
    });
  }, [addMessage]);

  const createRoom = useCallback(() => {
    cleanup();
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setRoomCode(code);
    setView('creating');
    setStatus('Creating room...');

    const peer = new Peer('love-room-' + code, {
      host: '0.peerjs.com',
      port: 443,
      path: '/',
      secure: true,
    });
    peerRef.current = peer;

    peer.on('open', () => {
      setView('waiting');
      setStatus('Share this code with your partner');
    });

    peer.on('error', (err) => {
      setStatus('Error: ' + err.type);
    });

    setupConnection(peer);
  }, [cleanup, setupConnection]);

  const joinRoom = useCallback(() => {
    if (joinCode.length !== 4) return;
    cleanup();
    setView('joining');
    setStatus('Connecting...');

    const myId = 'love-peer-' + Date.now();
    const peer = new Peer(myId, {
      host: '0.peerjs.com',
      port: 443,
      path: '/',
      secure: true,
    });
    peerRef.current = peer;

    peer.on('open', () => {
      const conn = peer.connect('love-room-' + joinCode, { reliable: true });
      connRef.current = conn;

      conn.on('open', () => {
        setView('chat');
        setStatus('Connected!');
      });

      conn.on('data', (data) => {
        const d = data as { text: string };
        addMessage(d.text, 'them');
      });

      conn.on('close', () => {
        setStatus('Partner disconnected');
      });

      conn.on('error', () => {
        setStatus('Connection failed');
        setView('menu');
      });
    });

    peer.on('error', (err) => {
      setStatus('Error: ' + err.type);
      setView('menu');
    });
  }, [cleanup, joinCode, addMessage]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || !connRef.current) return;
    addMessage(input.trim(), 'you');
    connRef.current.send({ text: input.trim() });
    setInput('');
  }, [input, addMessage]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [roomCode]);

  const reset = useCallback(() => {
    cleanup();
    setView('menu');
    setRoomCode('');
    setJoinCode('');
    setMessages([]);
    setStatus('');
  }, [cleanup]);

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) clamp(12px, 3vw, 20px)',
      background: 'linear-gradient(180deg, #0d0a14, #150e22, #0d0a14)',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '12px' }}>
          Stay Connected
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Love Notes
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* MENU */}
        {view === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '360px' }}>
            <motion.button onClick={createRoom} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-glow"
              style={{ width: '100%', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
              Create Room
            </motion.button>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,248,240,0.3)', letterSpacing: '3px', textTransform: 'uppercase' }}>
              or
            </p>

            <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={joinCode}
                onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); setJoinCode(v); }}
                placeholder="Enter 4-digit code"
                maxLength={4}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px', padding: '12px 18px', color: '#fff8f0', textAlign: 'center',
                  fontFamily: 'var(--font-body)', fontSize: '1.1rem', letterSpacing: '6px', outline: 'none',
                }}
              />
              <motion.button onClick={joinRoom} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                disabled={joinCode.length !== 4}
                style={{
                  padding: '12px 24px', borderRadius: '24px',
                  background: joinCode.length === 4 ? 'linear-gradient(135deg, #e8a0bf, #d4a574)' : 'rgba(255,255,255,0.06)',
                  border: 'none', cursor: joinCode.length === 4 ? 'pointer' : 'default',
                  color: joinCode.length === 4 ? '#0d0a14' : 'rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                Join
              </motion.button>
            </div>

            {status && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#f87171', textAlign: 'center' }}>
                {status}
              </p>
            )}
          </motion.div>
        )}

        {/* WAITING (after creating room) */}
        {(view === 'waiting' || view === 'creating') && (
          <motion.div key="waiting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '360px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,248,240,0.4)', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Share this code
            </p>

            <div onClick={copyCode} style={{
              background: 'rgba(232,160,191,0.08)', border: '2px solid rgba(232,160,191,0.2)',
              borderRadius: '20px', padding: '24px 40px', cursor: 'pointer', textAlign: 'center',
              transition: 'border-color 0.3s',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 700,
                background: 'linear-gradient(135deg, #e8a0bf, #d4a574)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '12px', margin: 0 }}>
                {roomCode}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,248,240,0.3)', marginTop: '8px' }}>
                {copied ? 'Copied!' : 'Tap to copy'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,248,240,0.5)', margin: 0 }}>
                Waiting for partner...
              </p>
            </div>

            <motion.button onClick={reset} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px',
                padding: '8px 24px', color: 'rgba(255,248,240,0.4)', fontFamily: 'var(--font-body)',
                fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Cancel
            </motion.button>
          </motion.div>
        )}

        {/* JOINING */}
        {view === 'joining' && (
          <motion.div key="joining" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: '24px', height: '24px', border: '2px solid rgba(232,160,191,0.2)', borderTopColor: '#e8a0bf', borderRadius: '50%' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,248,240,0.5)' }}>
              Connecting to {joinCode}...
            </p>
          </motion.div>
        )}

        {/* CHAT */}
        {view === 'chat' && (
          <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              width: '100%', maxWidth: '480px',
              background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: '28px', overflow: 'hidden',
            }}>
            {/* Header */}
            <div style={{
              padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,248,240,0.5)', margin: 0 }}>
                  Room {roomCode || joinCode}
                </p>
              </div>
              <motion.button onClick={reset} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,240,0.3)" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.button>
            </div>

            {/* Messages */}
            <div style={{ padding: '20px', minHeight: '250px', maxHeight: '350px', overflowY: 'auto' }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(232,160,191,0.3)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(232,160,191,0.4)' }}>
                    Send a love note...
                  </p>
                </div>
              )}
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex', justifyContent: msg.sender === 'you' ? 'flex-end' : 'flex-start',
                    marginBottom: '12px',
                  }}>
                  <div style={{
                    maxWidth: '75%', padding: '10px 16px',
                    borderRadius: msg.sender === 'you' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'you'
                      ? 'linear-gradient(135deg, rgba(232,160,191,0.25), rgba(212,165,116,0.2))'
                      : 'rgba(255,255,255,0.06)',
                    border: msg.sender === 'you'
                      ? '1px solid rgba(232,160,191,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fff8f0', margin: 0, lineHeight: 1.5 }}>
                      {msg.text}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,248,240,0.3)', margin: '4px 0 0', textAlign: 'right' }}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: '10px', alignItems: 'center',
            }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a love note..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '24px', padding: '10px 18px', color: '#fff8f0',
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem', outline: 'none',
                }}
              />
              <motion.button onClick={sendMessage} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e8a0bf, #d4a574)',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(232,160,191,0.3)',
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d0a14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
