import React from 'react';

function FormattedDate({ dateArray }) {
  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 5) return "Data inválida";
    
    const [year, month, day, hour, minute] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute);

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return <span>{formatDate(dateArray)}</span>;
}

export default FormattedDate;
