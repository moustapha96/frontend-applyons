"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LuFile, LuFiles } from "react-icons/lu"
import { getDemandesByInstitut } from "@/services/demandeService"
import { useAuthContext } from "@/context"
import { useTranslation } from "react-i18next"

const DemandesDropdown = ({ demandesPartages }) => {
  const { t } = useTranslation()

  const { institut } = useAuthContext()
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!institut || !institut.id) {
        console.error("ID de l'institut non disponible")
        setLoading(false)
        return
      }

      try {
        const demandesData = await getDemandesByInstitut(institut.id)
        setDemandes(demandesData.filter((demande) => demande.resultat === "Pending"))
      } catch (err) {
        console.error("Erreur lors de la récupération des demandes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [institut])

  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        id="hs-dropdown-with-header"
        type="button"
        className="hs-dropdown-toggle inline-flex size-9 flex-shrink-0 items-center justify-center gap-2 rounded-md align-middle font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10"
      >
        <LuFiles className="size-5" shape="circle" />
        <span className="absolute -end-0 -top-0 size-4 rounded-full bg-blueLogo text-xs font-medium text-white">
          {demandesPartages?.length}
        </span>
      </button>
      <div className="hs-dropdown-menu duration mt-2 hidden min-w-[20rem] rounded-lg border border-default-200 bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h6 className="text-base font-semibold text-default-900"> {t('institutMenu.demandes')} </h6>
          <Link
            to="/institut/partages"
            className="border-b border-dashed border-default-300 font-semibold text-default-800"
          >
            <small>{t('common.viewAll')}</small>
          </Link>
        </div>
        <div className="h-52 overflow-y-auto border-y border-dashed border-default-200 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
          {loading ? (
            <div className="text-center py-4"> {t('common.loading')}</div>
          ) : demandesPartages?.length > 0 ? (
            demandesPartages?.map((demande, idx) => (
              <Link
                to={`/institut/partages/${demande.id}/details`}
                key={idx}
                className="mx-2 flex items-center rounded px-2 py-4 transition-all duration-200 hover:bg-default-100"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-yellow/20 text-yellow-500">
                  <LuFile className="size-5" />
                </span>
                <span className="px-3">
                  <h6 className="text-sm font-semibold text-default-800">{demande?.code}</h6>
                  <p className="text-xs text-default-600">
                    {demande?.demandeur?.name} - {new Date(demande?.dateDemande).toLocaleDateString()}
                  </p>
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center py-4"> {t('institutMenu.layout.topbar.noDemande')} </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemandesDropdown
