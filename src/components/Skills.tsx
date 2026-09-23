import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, type Timestamp } from "firebase/firestore";
import { LogOut, Send, ArrowUpRight } from "lucide-react";
import {
  HazardSectionLabel,
  HazardStripeCorner,
  HazardSectionTopLine,
  HazardBgDecoration,
} from './Warningdecorations';

/* ── Utils ── */
interface ChatMessage {
  id: string;
  text: string;
  uid: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: Timestamp;
}

const formatTime = (ts?: Timestamp) => {
  if (!ts) return "";
  return ts.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const formatDate = (ts?: Timestamp) => {
  if (!ts) return "";
  const d = ts.toDate();
  const today = new Date();
  const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
  const same = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  if (same(d, today)) return "Today";
  if (same(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
};

/* ── Contact Section ── */
export default function Contact() {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<ChatMessage, "id">) })));
    });
    return () => unsub();
  }, []);

  const firstLoadRef = useRef(true);
  useEffect(() => {
    if (!firstLoadRef.current && messages.length > 0 && user) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    firstLoadRef.current = false;
  }, [messages, user]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    await addDoc(collection(db, "messages"), {
      text: message, uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || "",
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <section id="contact" className="relative py-24" style={{ background: 'var(--surface-0)' }}>
      <style>{`
        /* Input focus glow */
        .hz-input:focus {
          border-color: rgba(200,241,53,0.5) !important;
          box-shadow: 0 0 0 3px rgba(200,241,53,0.08) !important;
          outline: none;
        }
        /* Chat box scrollbar */
        .hz-messages::-webkit-scrollbar { width: 3px; }
        .hz-messages::-webkit-scrollbar-track { background: transparent; }
        .hz-messages::-webkit-scrollbar-thumb { background: rgba(200,241,53,0.25); border-radius: 2px; }
        /* Submit button */
        .hz-submit-btn {
          background: var(--accent);
          color: #0a0a08;
          border: none;
          transition: opacity 0.2s, transform 0.1s;
        }
        .hz-submit-btn:hover { opacity: 0.9; }
        .hz-submit-btn:active { transform: scale(0.97); }
        /* Section heading */
        .hz-contact-heading {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--ink-0);
          letter-spacing: -0.02em;
          position: relative;
          display: inline-block;
        }
        .hz-contact-heading::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          border-radius: 1px;
        }
        /* Chat header stripe */
        .hz-chat-header-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 2;
          background: repeating-linear-gradient(
            90deg, #C8F135 0px, #C8F135 8px, #0a0a08 8px, #0a0a08 14px
          );
          opacity: 0.6;
        }
        .hz-stripe-corner-inner { transition: opacity 0.3s ease; }
        @keyframes hz-status-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>

      <HazardSectionTopLine />
      <HazardBgDecoration />

      <div className="container relative z-10 mt-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <HazardSectionLabel id="05">CONTACT</HazardSectionLabel>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Chat Room */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} className="md:col-span-2">
            <div className="flex flex-col h-full" style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minHeight: 500,
              position: 'relative',
            }}>
              <div className="hz-chat-header-stripe" />
              <HazardStripeCorner size={44} />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 pt-5"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-2.5">
                  {/* Live status indicator */}
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 2px rgba(200,241,53,0.2)',
                    animation: 'hz-status-dot 1.5s ease-in-out infinite',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.85rem',
                    fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.01em',
                  }}>Chat Room</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    color: 'var(--accent)', letterSpacing: '0.08em',
                    background: 'rgba(200,241,53,0.08)',
                    border: '1px solid rgba(200,241,53,0.2)',
                    borderRadius: 3, padding: '1px 6px',
                  }}>LIVE</span>
                </div>
                {user && (
                  <div className="flex items-center gap-2">
                    <img src={user.photoURL ?? ""} alt="avatar" className="w-6 h-6 rounded-full"
                      style={{ border: '1px solid rgba(200,241,53,0.3)' }} />
                    <button onClick={logout}
                      className="flex items-center justify-center w-6 h-6 rounded-lg transition-colors"
                      style={{ color: 'var(--ink-4)' }} aria-label="Logout" title="Logout">
                      <LogOut size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="hz-messages flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 300 }}>
                {messages.map((msg, idx) => {
                  const prevMsg = messages[idx - 1];
                  const curDate = formatDate(msg.createdAt);
                  const prevDate = prevMsg ? formatDate(prevMsg.createdAt) : null;
                  const showDate = curDate !== prevDate;
                  const isMe = msg.uid === user?.uid;
                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-2">
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink-4)',
                            background: 'var(--surface-3)', padding: '3px 10px',
                            borderRadius: '100px', letterSpacing: '0.05em',
                          }}>{curDate}</span>
                        </div>
                      )}
                      <div className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {!isMe && (
                          <img src={msg.photoURL || ''} alt="avatar" className="w-6 h-6 rounded-full flex-shrink-0 mb-1"
                            style={{ border: '1px solid var(--border-subtle)' }} />
                        )}
                        <div className="max-w-[75%] px-3 py-2 rounded-xl" style={{
                          background: isMe ? 'var(--accent)' : 'var(--surface-3)',
                          color: isMe ? '#0a0a08' : 'var(--ink-2)',
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                          fontWeight: 600, lineHeight: 1.5,
                          border: isMe ? 'none' : '1px solid var(--border-subtle)',
                          boxShadow: isMe ? '0 2px 8px rgba(200,241,53,0.15)' : 'none',
                        }}>
                          {!isMe && (
                            <p style={{
                              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                              color: 'var(--ink-4)', marginBottom: 2, letterSpacing: '0.03em',
                            }}>{msg.displayName}</p>
                          )}
                          <p style={{ color: isMe ? '#0a0a08' : 'var(--ink-1)' }}>{msg.text}</p>
                          <p style={{
                            fontSize: '0.58rem', opacity: 1,
                            color: isMe ? 'rgba(0,0,0,0.5)' : 'var(--ink-3)',
                            textAlign: 'right', marginTop: 3,
                          }}>{formatTime(msg.createdAt)}</p>
                        </div>
                        {isMe && (
                          <img src={msg.photoURL || ''} alt="avatar" className="w-6 h-6 rounded-full flex-shrink-0 mb-1"
                            style={{ border: '1px solid rgba(200,241,53,0.3)' }} />
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input / Login */}
              <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {user ? (
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Type a message…"
                      className="hz-input flex-1 min-w-0 px-3 py-2 rounded-xl text-sm"
                      style={{
                        background: 'var(--surface-3)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--ink-2)', fontFamily: 'var(--font-body)', fontWeight: 300,
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    />
                    <button type="submit"
                      className="hz-submit-btn flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                      aria-label="Send">
                      <Send size={14} />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-2">
                    <button onClick={loginWithGoogle}
                      className="flex items-center gap-2.5 w-full justify-center py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
                      style={{
                        background: 'var(--surface-3)', border: '1px solid var(--border-muted)',
                        color: 'var(--ink-2)', fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem', fontWeight: 500,
                      }}>
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                      Sign in with Google
                    </button>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-4)', letterSpacing: '0.03em' }}>
                      Login to chat
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} className="md:col-span-3">
            <div className="h-full" style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <HazardStripeCorner size={56} />

              {/* Top stripe bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'repeating-linear-gradient(90deg,#C8F135 0px,#C8F135 8px,#0a0a08 8px,#0a0a08 14px)',
                opacity: 0.55, zIndex: 1, pointerEvents: 'none',
              }} />

              {/* Side accent stripe */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
                background: 'linear-gradient(to bottom, transparent, rgba(200,241,53,0.3) 30%, rgba(200,241,53,0.3) 70%, transparent)',
                zIndex: 1, pointerEvents: 'none',
              }} />

              <h3 className="hz-contact-heading mb-1 relative z-10">Let's work together.</h3>
              <p className="mb-8 relative z-10 mt-4" style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                fontWeight: 300, color: 'var(--ink-4)',
              }}>Fill in the form and I'll get back to you.</p>

              <form action="https://formsubmit.co/denipurwanto800@gmail.com" method="POST" className="space-y-4 relative z-10">
                <input type="hidden" name="_subject" value="New Contact Form Submission" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
                  ].map(field => (
                    <div key={field.name} className="flex flex-col gap-2">
                      <label style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)',
                      }}>{field.label}</label>
                      <input type={field.type} name={field.name} placeholder={field.placeholder} required
                        className="hz-input px-4 py-3 rounded-xl"
                        style={{
                          background: 'var(--surface-3)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--ink-2)', fontFamily: 'var(--font-body)',
                          fontWeight: 300, fontSize: '0.88rem',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-4)',
                  }}>Message</label>
                  <textarea name="message" rows={6} placeholder="Tell me about your project…" required
                    className="hz-input px-4 py-3 rounded-xl resize-none"
                    style={{
                      background: 'var(--surface-3)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--ink-2)', fontFamily: 'var(--font-body)',
                      fontWeight: 300, fontSize: '0.88rem',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full justify-center">
                  Send Message
                  <ArrowUpRight size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}