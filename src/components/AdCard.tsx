import React from 'react';

export interface Anuncio {
  id_anuncios?: number;
  titulo: string;
  contenido: string;
  tipo_usuario: string;
  fecha_inicio?: string; 
  fecha_fin?: string | null;
  activo?: boolean;
  id_suscripciones?: number | null;
}

interface Props {
  ad: Anuncio;
}

const AdCard: React.FC<Props> = ({ ad }) => {
  return (
    <div className="ad-card border p-4 rounded shadow mb-4 bg-white">
      <h2 className="text-xl font-bold">{ad.titulo}</h2>
      <p className="text-gray-700">{ad.contenido}</p>
    </div>
  );
};

export default AdCard;
