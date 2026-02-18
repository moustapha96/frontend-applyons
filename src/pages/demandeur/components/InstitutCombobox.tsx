import React, { useState, useEffect, useRef } from 'react';

interface Institut {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
}

interface InstitutComboboxProps {
  instituts: Institut[];
  onSelect: (institutId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  t: (key: string) => string;
  setValue: (name: string, value: any) => void; // Add setValue prop
}

const InstitutCombobox: React.FC<InstitutComboboxProps> = ({
  instituts,
  onSelect,
  searchTerm,
  setSearchTerm,
  t,
  setValue, // Destructure setValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstitut, setSelectedInstitut] = useState<Institut | null>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const matchingInstitut = instituts.find(inst => inst.name === searchTerm);
    setSelectedInstitut(matchingInstitut || null);
  }, [searchTerm, instituts]);

  const filteredInstituts = instituts.filter(institut =>
    institut.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setSelectedInstitut(null);
  };

  const handleSelectInstitut = (institut: Institut) => {
    onSelect(institut.id);
    setSearchTerm(institut.name);
    setSelectedInstitut(institut);
    setIsOpen(false);
    // Use setValue to update the form fields
    setValue("nameInstitut", institut.name);
    setValue("emailInstitut", institut.email);
    setValue("phoneInstitut", institut.phone);
    setValue("adresseInstitut", institut.address);
    setValue("paysInstitut", institut.country);
  };

  return (
    <div id="hs-combobox-institut" className="relative" ref={comboboxRef}>
      <div className="relative">
        <input
          className="py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={t('demandeur.searchInstitut')}
        />
        <div
          className="absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700">
          {filteredInstituts.length > 0 ? (
            filteredInstituts.map((institut) => (
              <div
                key={institut.id}
                className={`cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800 ${
                  selectedInstitut?.id === institut.id ? 'bg-blue-100 dark:bg-blue-800' : ''
                }`}
                onClick={() => handleSelectInstitut(institut)}
              >
                <div className="flex justify-between items-center w-full">
                  <div>
                    <div className="hidden">{institut.id}</div>
                    <div>{institut.name}</div>
                  </div>
                  {selectedInstitut?.id === institut.id && (
                    <span>
                      <svg
                        className="shrink-0 size-3.5 text-blue-600 dark:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-2">{t('demandeur.noInstitutFound')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstitutCombobox;
