"use client"

import { useTranslation } from "react-i18next"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQ = () => {
    const { t } = useTranslation()
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "applyons.faq.questions.q1",
            answer: "applyons.faq.answers.a1"
        },
        {
            question: "applyons.faq.questions.q2",
            answer: "applyons.faq.answers.a2"
        },
        {
            question: "applyons.faq.questions.q3",
            answer: "applyons.faq.answers.a3"
        },
        {
            question: "applyons.faq.questions.q4",
            answer: "applyons.faq.answers.a4"
        },
        {
            question: "applyons.faq.questions.q5",
            answer: "applyons.faq.answers.a5"
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("applyons.faq.title")}</h2>
                    <p className="text-lg text-gray-600">{t("applyons.faq.subtitle")}</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        {t(faq.question)}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{t(faq.answer)}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
