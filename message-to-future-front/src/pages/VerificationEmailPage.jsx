import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const VerificationEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
      }
    };
    
    verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
        {verificationStatus === 'success' ? (
          <>
            <h1 className="text-2xl font-semibold text-green-600">Verificação Concluída!</h1>
            <p className="text-gray-700">
              Seu e-mail foi verificado com sucesso.
            </p>
            <a
              href="/login"
              className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Voltar
            </a>
          </>
        ) : verificationStatus === 'error' ? (
          <>
            <h1 className="text-2xl font-semibold text-red-600">Verificação Falhou</h1>
            <p className="text-gray-700">
              Houve um problema ao verificar seu e-mail. Por favor, tente novamente mais tarde.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-block px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Voltar
            </button>
          </>
        ) : (
          <p className="text-gray-700">Verificando seu e-mail...</p>
        )}
      </div>
    </div>
  );
};

export default VerificationEmailPage;
