export interface ImageItem {
    id: string;      // Identificador único de la imagen (e.j. "a-1", "b-2")
    path: string;    // Ruta de la imagen
    type: 'a' | 'b'; // Tipo de imagen (a para izquierda, b para derecha)
    number: number;  // Número de la imagen para emparejar
}

export type Country = 'USA' | 'Australia' | 'Colombia';