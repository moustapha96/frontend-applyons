"use client"

import { Link } from "react-router-dom"

/**
 * Menu de navigation commun à toutes les pages Applyons.
 * Utilise /#section pour que les ancres fonctionnent depuis n'importe quelle page (redirection vers / puis scroll).
 */
export function getApplyonsMenuItems(t) {
  return [
    { key: "home", label: <a href="/">{t("nav.home")}</a> },
    { key: "features", label: <a href="/#features">{t("nav.features")}</a> },
    { key: "app", label: <Link to="/app">{t("nav.app")}</Link> },
    { key: "pricing", label: <a href="/#pricing">{t("nav.pricings")}</a> },
    { key: "concuPour", label: <a href="/#concuPour">{t("nav.concuPour")}</a> },
    { key: "about", label: <Link to="/about">{t("nav.about")}</Link> },
    { key: "contact", label: <Link to="/contact">{t("nav.contact")}</Link> },
  ]
}
