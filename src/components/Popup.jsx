import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAdvertisementPopup } from "@/hooks/useAdvertisementPopup";

const AdvertisementPopup = () => {
    const { showPopup, handleClosePopup } = useAdvertisementPopup();
    const navigate = useNavigate();

    if (!showPopup) {
        return null; // Ne rend pas la popup si elle n'est pas visible
    }

    return (
        <>
            {/* Popup pour les écrans moyens et plus grands */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
                    <button
                        onClick={handleClosePopup}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                        <X size={24} />
                    </button>
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Offre Spéciale Applyons!</h3>
                        <p className="text-lg mb-4">
                            Inscrivez-vous dès maintenant et obtenez une réduction sur votre premier achat.
                        </p>
                        <p className="mb-2 text-center text-sm">
                            *Excepté les produits en promotion
                        </p>
                        <button
                            onClick={() => {
                                navigate('/signup');
                                handleClosePopup();
                            }}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                        >
                            J'en profite!
                        </button>
                        <p className="text-sm mt-3 text-center">
                            *Offre valable pour tout nouvel client sur Applyons
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertisementPopup;
