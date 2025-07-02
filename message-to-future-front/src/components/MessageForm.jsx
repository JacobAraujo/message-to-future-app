import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { sendMessage } from '../services/api';
import PopupMessage from './PopupMessage';
import CopyLinkButton from './CopyLinkButton';

registerLocale('pt-BR', ptBR);

function MessageForm({ onMessageSent }) {
  const [formData, setFormData] = useState({
    messageText: '',
    recipientName: '',
    openingDateTime: null,
    narrativeTheme: 'default',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenLink, setTokenLink] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.openingDateTime) {
      alert('Por favor, selecione a data e hora de abertura.');
      return;
    }

    const formattedDateTime = format(
      formData.openingDateTime,
      'dd/MM/yyyy HH:mm:ss',
      { locale: ptBR }
    );

    const updatedFormData = {
      ...formData,
      openingDateTime: formattedDateTime,
    };

    try {
      const data = await sendMessage(updatedFormData);

      setSuccessMessage('Mensagem enviada com sucesso!');
      setErrorMessage('');
      setTokenLink(`${window.location.origin}/message/${data.linkToken}`);
      setShowPopup(true);

      if (onMessageSent) onMessageSent();
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage(
          'Já existe uma mensagem agendada para este destinatário nessa data e hora de entrega.'
        );
      } else if (err.status === 412) {
        setErrorMessage('Limite de mensagens atingido.');
      } else {
        setErrorMessage(
          'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.'
        );
      }
      setSuccessMessage('');
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-white rounded-lg shadow-2xl p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Mensagem para o Futuro
        </h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Texto da Mensagem
          </label>
          <textarea
            name="messageText"
            value={formData.messageText}
            onChange={handleChange}
            required
            className="block w-full h-32 resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Escreva sua mensagem aqui..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Nome do Destinatário
          </label>
          <input
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="block w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nome do destinatário"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Data e Hora de Abertura
          </label>
          <ReactDatePicker
            selected={formData.openingDateTime}
            onChange={(date) =>
              setFormData({ ...formData, openingDateTime: date })
            }
            showTimeSelect
            timeFormat="HH:mm:ss"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm:ss"
            placeholderText="Data e hora de abertura"
            locale="pt-BR"
            className="block w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            wrapperClassName="w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Narrativa/Tema
          </label>
          <select
            name="narrativeTheme"
            value={formData.narrativeTheme}
            onChange={handleChange}
            className="block w-full h-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="default">Padrão</option>
            <option value="space">Espaço</option>
            <option value="bottle">Mensagem na Garrafa</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Cadastrar
        </button>
      </form>

      {showPopup && (
        <PopupMessage
          message={successMessage || errorMessage}
          onClose={() => setShowPopup(false)}
        >
          {successMessage && (
            <div className="flex items-center justify-between mt-4 p-2 border border-gray-300 rounded">
              <span className="text-gray-600 text-sm">Link da mensagem:</span>
              <div className="flex items-center">
                <a
                  href={tokenLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline mr-2 break-all"
                >
                  {tokenLink}
                </a>
                <CopyLinkButton link={tokenLink} />
              </div>
            </div>
          )}
        </PopupMessage>
      )}
    </div>
  );
}

export default MessageForm;
