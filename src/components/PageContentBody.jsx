"use client"

import { useTranslation } from "react-i18next"
import { useSettingsContext } from "@/context/useSettingsContext"

/**
 * Affiche le contenu d'une page issu du backend (admin) si présent (body HTML),
 * sinon affiche le contenu par défaut (children) avec les textes i18n.
 * titleKey, subtitleKey, lastUpdatedKey : clés i18n pour les champs par défaut.
 * wrapChildrenInCard : si false, les children sont rendus sans la card (pour pages avec plusieurs blocs).
 */
export default function PageContentBody({
  pageKey,
  titleKey,
  subtitleKey,
  lastUpdatedKey,
  wrapChildrenInCard = true,
  children,
}) {
  const { t, i18n } = useTranslation()
  const { pageContent } = useSettingsContext()
  const lang = (i18n.language || "fr").split("-")[0]
  const content = pageContent?.[pageKey]?.[lang]
  const hasBody = content?.body && String(content.body).trim().length > 0

  const title = content?.title ?? (titleKey ? t(titleKey) : "")
  const subtitle = content?.subtitle ?? (subtitleKey ? t(subtitleKey) : "")
  const lastUpdated = content?.lastUpdated ?? (lastUpdatedKey ? t(lastUpdatedKey) : "")

  return (
    <>
      <div className="text-center mb-12">
        {title && (
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {String(subtitle).trim().startsWith("<") ? (
              <span dangerouslySetInnerHTML={{ __html: subtitle }} />
            ) : (
              subtitle
            )}
          </p>
        )}
        {lastUpdated && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{lastUpdated}</p>
        )}
      </div>

      {hasBody ? (
        <div className="bg-white dark:bg-slate-800/80 shadow-xl rounded-xl p-8 space-y-8 border border-transparent dark:border-slate-700">
          <div
            className="page-content-html text-gray-600 dark:text-gray-300 prose prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-a:text-[#254c6b] dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />
        </div>
      ) : wrapChildrenInCard ? (
        <div className="bg-white dark:bg-slate-800/80 shadow-xl rounded-xl p-8 space-y-8 border border-transparent dark:border-slate-700">
          {children}
        </div>
      ) : (
        children
      )}
    </>
  )
}
