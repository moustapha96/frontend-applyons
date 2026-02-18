import { useState } from 'react';
import { Check, Copy } from 'lucide-react';



export const CopyableField = ({ icon, value, label }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (

    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0 text-blue-500">{icon}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-800">{value || "N/A"}</p>
      </div>
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};


export const CopyableFieldSimple = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (

    <div className="flex items-center space-x-3">
      <div className="flex-grow">
        <p className="text-sm text-gray-800">{value || "N/A"}</p>
      </div>
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? 
          <Check className="w-4 h-4" />
          : 
          <Copy className="w-4 h-4" />
        }
      </button>
    </div>
  );
};

