export interface Montanya {
    id_montanya: number;
    nombre_montanya: string;
    descripcion?: string;
    dificultad?: string;
    acampar: boolean;
    pernoctar: boolean;
    especies_peligrosas: boolean;
    geojson: any; 
  }
  