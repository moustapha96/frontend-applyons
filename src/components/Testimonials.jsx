"use client"

import { useTranslation } from "react-i18next"
import { Star } from "lucide-react"

const Testimonials = () => {
    const { t } = useTranslation()

    const testimonials = [
        {
            id: 1,
            name: "testimonials.person1.name",
            role: "testimonials.person1.role",
            content: "testimonials.person1.content",
            rating: 5
        },
        {
            id: 2,
            name: "testimonials.person2.name",
            role: "testimonials.person2.role",
            content: "testimonials.person2.content",
            rating: 5
        },
        {
            id: 3,
            name: "testimonials.person3.name",
            role: "testimonials.person3.role",
            content: "testimonials.person3.content",
            rating: 5
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("testimonials.title")}</h2>
                    <p className="text-lg text-gray-600">{t("testimonials.subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-5 w-5 text-yellow-400 fill-current"
                                    />
                                ))}
                            </div>
                            <blockquote className="text-gray-600 mb-6">
                                "{t(testimonial.content)}"
                            </blockquote>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                                </div>
                                <div className="ml-4">
                                    <div className="text-lg font-medium text-gray-900">
                                        {t(testimonial.name)}
                                    </div>
                                    <div className="text-gray-600">{t(testimonial.role)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
