
import { Edit2, Save, X, User, Phone, Info, Home, Mail } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { AdminBreadcrumb } from "@/components";
import { getConfiguration, updateConfiguration, updateLogoConfiguration } from '../../../services/configuraionService';

const NouveauAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [configurations, setConfigurations] = useState([]);

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        try {
            setLoading(true);
            const response = await getConfiguration();
            // //console.log(response);
            const formattedConfigurations = response.map((item, index) => {
                const key = Object.keys(item)[0];
                return { id: key, cle: key, valeur: item[key], uniqueKey: `${key}-${index}` };
            });
            setConfigurations(formattedConfigurations);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement des configurations");
        } finally {
            setLoading(false);
        }
    };

    // const getIcon = (key) => {
    //   switch (key) {
    //     case 'email': return <Mail className="w-6 h-6" />;
    //     case 'name': return <User className="w-6 h-6" />;
    //     case 'title_1':
    //     case 'title_2': return <Info className="w-6 h-6" />;
    //     case 'logo1':
    //     case 'logo2': return <Home className="w-6 h-6" />;
    //     case 'tel': return <Phone className="w-6 h-6" />;
    //     default: return <User className="w-6 h-6" />;
    //   }
    // };

    const getIcon = (key) => {
        switch (key) {
            case 'email': return <Mail className="w-6 h-6" />;
            case 'name': return <User className="w-6 h-6" />;
            case 'title_1':
            case 'title_2': return <Info className="w-6 h-6" />;
            case 'tel': return <Phone className="w-6 h-6" />;
            default: return <User className="w-6 h-6" />;
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleTextSave = async () => {
        try {
            setLoading(true);
            await Promise.all(configurations.map(config => {
                if (config.cle !== 'logo1' && config.cle !== 'logo2') {
                    return updateConfiguration(config.id, { valeur: config.valeur });
                }
                return Promise.resolve();
            }));
            setEditing(false);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la sauvegarde des modifications");
        } finally {
            setLoading(false);
        }
    };

    const handleLogoSave = async (id) => {
        const config = configurations.find(c => c.id === id);
        if (config.file) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append(config.id, config.file);
                await updateLogoConfiguration(config.id, formData);
                setEditing(false);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Erreur lors de la sauvegarde du logo");
            } finally {
                setLoading(false);
            }
        }
    };


    const handleChange = (id, value) => {
        setConfigurations(prevConfigs =>
            prevConfigs.map(config =>
                config.id === id ? { ...config, valeur: value } : config
            )
        );
    };

    const handleCancel = () => {
        fetchConfigurations();
        setEditing(false);
    };

    const handleLogoChange = (id, file) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setConfigurations(prevConfigs =>
                prevConfigs.map(config =>
                    config.id === id ? { ...config, valeur: fileReader.result, file: file } : config
                )
            );
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    };

    const textConfigurations = configurations.filter(config => config.cle !== 'logo1' && config.cle !== 'logo2');
    const logoConfigurations = configurations.filter(config => config.cle === 'logo1' || config.cle === 'logo2');

    return (
        <>
            <AdminBreadcrumb title="Configuration" />
            {loading ? <div>Chargement...</div> : (
                <section>
                    <div className="container">
                        <div className="my-6 space-y-6">
                            <div className="p-6 sm:p-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold text-gray-800">Configuration</h1>
                                    {!editing ? (
                                        <button onClick={handleEdit} className="flex items-center text-blue-500 hover:text-blue-600">
                                            <Edit2 className="w-5 h-5 mr-2" />
                                            Modifier
                                        </button>
                                    ) : (
                                        <div>
                                            <button onClick={handleTextSave} className="flex items-center text-green-500 hover:text-green-600 mr-4 mb-2">
                                                <Save className="w-5 h-5 mr-2" />
                                                Sauvegarder Texte
                                            </button>
                                            {configurations.filter(c => c.cle === 'logo1' || c.cle === 'logo2').map(config => (
                                                <button key={config.id} onClick={() => handleLogoSave(config.id)} className="flex items-center text-green-500 hover:text-green-600 mr-4 mb-2">
                                                    <Save className="w-5 h-5 mr-2" />
                                                    Sauvegarder {config.cle}
                                                </button>
                                            ))}
                                            <button onClick={handleCancel} className="flex items-center text-red-500 hover:text-red-600">
                                                <X className="w-5 h-5 mr-2" />
                                                Annuler
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {error && <div className="text-red-500 mb-4">{error}</div>}
                                {/* Affichage des configurations textuelles */}
                                <div className="text-configurations mb-6">
                                    <h2 className="text-xl font-semibold">Configurations Textuelles</h2>
                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                                        {textConfigurations.map(config => (
                                            <InfoCard
                                                key={config.uniqueKey}
                                                icon={getIcon(config.cle)}
                                                title={config.cle}
                                                value={config.valeur}
                                                editing={editing}
                                                onChange={(e) => handleChange(config.id, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Affichage des logos */}
                                <div className="logo-configurations">
                                    <h2 className="text-xl font-semibold">Configurations de Logo</h2>
                                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                                        {logoConfigurations.map(config => (
                                            <InfoCardLogo
                                                key={config.uniqueKey}
                                                icon={getIcon(config.cle)}
                                                title={config.cle}
                                                value={config.valeur}
                                                editing={editing}
                                                onLogoChange={(e) => handleLogoChange(config.id, e.target.files[0])}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                  {configurations.map(config => (
                    <React.Fragment key={config.uniqueKey}>
                      {(config.cle !== 'logo1' && config.cle !== 'logo2') ? (
                        <InfoCard
                          icon={getIcon(config.cle)}
                          title={config.cle}
                          value={config.valeur}
                          editing={editing}
                          onChange={(e) => handleChange(config.id, e.target.value)}
                        />
                      ) : (
                        <InfoCardLogo
                          icon={getIcon(config.cle)}
                          title={config.cle}
                          value={config.valeur}
                          editing={editing}
                          onLogoChange={(e) => handleLogoChange(config.id, e.target.files[0])}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

const InfoCard = ({ icon, title, value, editing, onChange }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <div className="text-blue-500">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="w-full">
                {editing ? (
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="w-full p-2 border rounded-md"
                    />
                ) : (
                    <p className="text-gray-600">{value}</p>
                )}
            </div>
        </div>
    );
};

const InfoCardLogo = ({ icon, title, value, editing, onLogoChange }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <div className="text-blue-500">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="w-full">
                {editing ? (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onLogoChange}
                        className="w-full p-2 border rounded-md mb-2"
                    />
                ) : (
                    <img src={value} alt={title} className="w-full h-auto mb-2" />
                )}
            </div>
        </div>
    );
};
export default NouveauAdmin;
