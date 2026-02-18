
"use client"
import { Typography, Carousel, Image } from "antd"
import { useTranslation } from "react-i18next"

const { Title } = Typography

export default function BrandsSection() {
    // Logos réels des marques partenaires
    const { t } = useTranslation()
    const brands = [
        {
            name: "L'Oréal",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/L%27Or%C3%A9al_logo.svg/1560px-L%27Or%C3%A9al_logo.svg.png",
            link: "https://www.loreal.com"
        },
        {
            name: "Danone",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Danone_logo.svg/1560px-Danone_logo.svg.png",
            link: "https://www.danone.com"
        },
        {
            name: "Total",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Total_logo.svg/2560px-Total_logo.svg.png",
            link: "https://www.total.com"
        },
        {
            name: "Air France",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Air_France_logo.svg/2560px-Air_France_logo.svg.png",
            link: "https://www.airfrance.com"
        },
        {
            name: "BNP Paribas",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/BNP_Paribas.svg/2560px-BNP_Paribas.svg.png",
            link: "https://www.bnpparibas.com"
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    }

    return (
        <div style={{ padding: "80px 0", background: "linear-gradient(to bottom, #ffffff, #f9fafb)" }}>
            <div className="container mx-auto px-4">
                <Title level={2} style={{
                    textAlign: "center",
                    color: "#254c6b",
                    marginBottom: "20px",
                    fontWeight: "600"
                }}>
                   {t("applyons.brands.title")}
                </Title>
                <p style={{
                    textAlign: "center",
                    color: "#666",
                    marginBottom: "40px",
                    fontSize: "1.1rem"
                }}>
                   {t("applyons.brands.subtitle")}
                </p>

                <Carousel {...settings}>
                    {brands.map((brand, idx) => (
                        <div key={idx} style={{ padding: "0 15px" }}>
                            <a
                                href={brand.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "block",
                                    transition: "transform 0.3s ease",
                                    ":hover": {
                                        transform: "scale(1.05)"
                                    }
                                }}
                            >
                                <div
                                    style={{
                                        filter: "grayscale(100%)",
                                        transition: "all 0.3s ease",
                                        padding: "20px",
                                        background: "white",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        ":hover": {
                                            filter: "grayscale(0%)",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                        }
                                    }}
                                >
                                    <Image
                                        src={brand.logo}
                                        alt={`Logo ${brand.name}`}
                                        width={150}
                                        height={60}
                                        style={{
                                            objectFit: "contain",
                                            margin: "0 auto",
                                            display: "block"
                                        }}
                                        preview={false}
                                    />
                                </div>
                            </a>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}