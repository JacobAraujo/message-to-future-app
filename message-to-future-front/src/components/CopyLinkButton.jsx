import React, { useState } from 'react';

function CopyLinkButton({ link }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="mr-2 px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded hover:bg-green-200 transition-colors"
      >
        Copiar Link 
      </button>

      {/* Feedback visual */}
      {copied && (
        <span className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-2 px-4 rounded-lg shadow-lg animate-fadeIn">
          Link copiado!
        </span>
      )}
    </>
  );
}

export default CopyLinkButton;
