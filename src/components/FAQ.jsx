"use client"

import { useTranslation } from "react-i18next"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Typography } from "antd"

const { Title, Paragraph } = Typography

const FAQ_KEYS = [
  { q: "applyons.faq.questions.q1", a: "applyons.faq.answers.a1" },
  { q: "applyons.faq.questions.q2", a: "applyons.faq.answers.a2" },
  { q: "applyons.faq.questions.q3", a: "applyons.faq.answers.a3" },
  { q: "applyons.faq.questions.q4", a: "applyons.faq.answers.a4" },
  { q: "applyons.faq.questions.q5", a: "applyons.faq.answers.a5" },
  { q: "applyons.faq.questions.q6", a: "applyons.faq.answers.a6" },
  { q: "applyons.faq.questions.q7", a: "applyons.faq.answers.a7" },
  { q: "applyons.faq.questions.q8", a: "applyons.faq.answers.a8" },
  { q: "applyons.faq.questions.q9", a: "applyons.faq.answers.a9" },
  { q: "applyons.faq.questions.q10", a: "applyons.faq.answers.a10" },
]

export default function FAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      style={{
        padding: "80px 0",
        minHeight: "50vh",
        position: "relative",
        overflow: "hidden",
      }}
      className="faq-section"
    >
      {/* Fond moderne : gradient + motif discret */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(165deg, #f0f4f8 0%, #e8eef5 40%, #f5f7fa 100%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(37, 76, 107, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.04) 0%, transparent 50%)",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              padding: "8px 16px",
              borderRadius: "100px",
              background: "rgba(37, 76, 107, 0.08)",
              color: "#254c6b",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            <HelpCircle size={18} strokeWidth={2} />
            FAQ
          </div>
          <Title
            level={2}
            style={{
              color: "#0f172a",
              marginBottom: "12px",
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {t("applyons.faq.title")}
          </Title>
          <Paragraph
            style={{
              fontSize: "1.0625rem",
              color: "#64748b",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {t("applyons.faq.subtitle")}
          </Paragraph>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {FAQ_KEYS.map((faq, index) => {
            const isOpen = openIndex === index
            const questionId = `faq-question-${index}`
            const answerId = `faq-answer-${index}`

            return (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  boxShadow: isOpen
                    ? "0 12px 40px rgba(37, 76, 107, 0.12), 0 0 0 1px rgba(37, 76, 107, 0.06)"
                    : "0 4px 20px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                  overflow: "hidden",
                  transition: "box-shadow 0.35s ease, transform 0.25s ease",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
                className="faq-card"
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggle(index)
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "22px 24px",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "1.0625rem",
                    fontWeight: 600,
                    color: isOpen ? "#254c6b" : "#1e293b",
                    lineHeight: 1.4,
                  }}
                  className="faq-trigger"
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: isOpen ? "linear-gradient(135deg, #254c6b 0%, #3d6b8a 100%)" : "rgba(37, 76, 107, 0.1)",
                        color: isOpen ? "#fff" : "#254c6b",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "background 0.3s ease, color 0.3s ease",
                      }}
                    >
                      {index + 1}
                    </span>
                    <span>{t(faq.q)}</span>
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isOpen ? "rgba(37, 76, 107, 0.1)" : "transparent",
                      color: "#254c6b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.35s ease, background 0.25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden
                  >
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  style={{
                    maxHeight: isOpen ? "500px" : "0",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 24px 24px 70px",
                      borderTop: "1px solid rgba(37, 76, 107, 0.08)",
                    }}
                  >
                    <Paragraph
                      style={{
                        marginTop: "18px",
                        marginBottom: 0,
                        fontSize: "1rem",
                        color: "#475569",
                        lineHeight: 1.7,
                      }}
                    >
                      {t(faq.a)}
                    </Paragraph>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq-section .faq-card:hover {
          box-shadow: 0 12px 36px rgba(37, 76, 107, 0.1), 0 0 0 1px rgba(37, 76, 107, 0.06);
        }
        .faq-section .faq-trigger:hover {
          color: #254c6b;
        }
        .faq-section .faq-trigger:focus-visible {
          outline: 2px solid #254c6b;
          outline-offset: 2px;
          border-radius: 20px;
        }
      `}</style>
    </section>
  )
}
