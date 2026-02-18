const DetailsInstitut = ({ institut }) => {
    if (!institut) {
        return <div>Sélectionnez un institut pour voir les détails</div>;
    }

    return (
        <div className="space-y-6">
            {/* Informations de base */}
            <div className="rounded-md border border-default-200 bg-white p-6">
                <h2 className="text-2xl font-semibold mb-4">{institut.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2"><span className="font-semibold">Code:</span> {institut.codeUser}</p>
                        <p className="mb-2"><span className="font-semibold">Type:</span> {institut.type}</p>
                        <p className="mb-2"><span className="font-semibold">Email:</span> {institut.email}</p>
                        <p className="mb-2"><span className="font-semibold">Téléphone:</span> {institut.phone}</p>
                    </div>
                    <div>
                        <p className="mb-2"><span className="font-semibold">Adresse:</span> {institut.adresse}</p>
                        <p className="mb-2"><span className="font-semibold">Pays:</span> {institut.paysResidence}</p>
                        <p className="mb-2"><span className="font-semibold">Site Web:</span> 
                            <a href={institut.siteWeb} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {institut.siteWeb}
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Liste des demandes */}
            <div className="rounded-md border border-default-200 bg-white p-6">
                <h3 className="text-xl font-semibold mb-4">Liste des demandes ({institut.demandes.length})</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code ADN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intitulé</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Obtention</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Année</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {institut.demandes.map((demande) => (
                                <tr key={demande.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{demande.codeAdn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{demande.typeDocument}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{demande.intitule}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(demande.dateObtention).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{demande.anneeObtention}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${demande.statut === 'Accepted' ? 'bg-green-100 text-green-800' : 
                                            demande.statut === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {demande.statut}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailsInstitut;
