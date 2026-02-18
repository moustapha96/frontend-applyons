
import { FileText, Calendar, User, Building } from "lucide-react"


const DocumentCardDashboard = ({ document }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{document.codeAdn}</span>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${document.statut === "Créé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                    >
                        {document.statut}
                    </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{document.intitule}</h3>
                <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{document.typeDocument}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Obtenu le {new Date(document.dateObtention).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>{document.demandeur.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span>
                        {document.demande.institut.name} ({document.demande.institut.type})
                    </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Détails de la demande</h4>
                    <p className="text-sm text-gray-600">{document.demande.intitule}</p>
                    <p className="text-sm text-gray-600">
                        Demandé le {new Date(document.demande.dateDemande).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Résultat: {document.demande.resultat}</p>
                </div>
            </div>
        </div>
    )
}

export default DocumentCardDashboard

