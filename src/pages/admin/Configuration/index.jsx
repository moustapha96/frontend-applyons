
import { Edit2, Save, X, User, Phone, Info, Home, Mail, SaveAll, XCircle, Edit2Icon, LoaderCircleIcon } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { AdminBreadcrumb } from "@/components";
import { getConfiguration, updateConfiguration, updateLogoConfiguration } from '../../../services/configuraionService';
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

const AdminConfiguration = () => {
  const { t } = useTranslation();
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
      //console.log(response);
      const formattedConfigurations = response.map((item, index) => {
        const key = Object.keys(item)[0];
        return { id: key, cle: key, valeur: item[key], uniqueKey: `${key}-${index}` };
      });
      setConfigurations(formattedConfigurations);
    } catch (err) {
      console.error(err);
      setError(t("adminConfiguration.error_loading_configurations"));
    } finally {
      setLoading(false);
    }
  };

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
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData = configurations.reduce((acc, config) => {
        acc[config.cle] = config.valeur;
        return acc;
      }, {});
      //console.log(updatedData);
      await updateConfiguration(updatedData);
      setEditing(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(t("adminConfiguration.error_saving_changes"));
    } finally {
      setLoading(false);
    }
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
      setError(t("adminConfiguration.error_saving_changes"));
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
        setError(t("adminConfiguration.error_saving_logo"));
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
    setLoading(false);
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
      <AdminBreadcrumb title={t("configuration")} />

      {loading ?
        // <div className="container">
        //   <div className="my-6 space-y-6">
        //     <div className="p-6 sm:p-10">
        //       <div>{t("adminConfiguration.loading")}</div>
        //     </div>
        //   </div>
        // </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin size="large" tip={t("common.loading")} />
        </div>
        : (
          <section>
            <div className="container">
              <div className="my-6 space-y-6">
                <div className="p-6 sm:p-10">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{t("configuration")}</h1>

                    {!editing ? (
                      <button onClick={handleEdit} variant="outline" className="flex items-center text-blueLogo hover:text-rougeLogo">
                        <Edit2Icon className="w-5 h-5 mr-2" />
                        {t("adminConfiguration.edit")}
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button onClick={handleSave} className="flex items-center text-blueLogo hover:text-green-600">
                          {loading && <LoaderCircleIcon className="w-5 h-5 mr-2 animate-spin" />}
                          {!loading && <SaveAll className="w-5 h-5 mr-2" />}
                          {t("adminConfiguration.save")}
                        </button>
                        <button onClick={handleCancel} variant="destructive" className="flex items-center text-rougeLogo">
                          <XCircle className="w-5 h-5 mr-2" />
                          {t("adminConfiguration.cancel")}
                        </button>
                      </div>
                    )}
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {configurations.map(config => (
                      <InfoCard
                        key={config.uniqueKey}
                        icon={getIcon(config.cle)}
                        title={t(`adminConfiguration.${config.cle}`)}
                        value={config.valeur}
                        editing={editing}
                        onChange={(e) => handleChange(config.id, e.target.value)}
                      />
                    ))}
                  </div>
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

export default AdminConfiguration;
