export interface SeriePage {
    totalElements:    number;
    totalPages:       number;
    size:             number;
    content:          Serie[];
    number:           number;
    sort:             Sort;
    first:            boolean;
    last:             boolean;
    numberOfElements: number;
    pageable:         Pageable;
    empty:            boolean;
}

export interface Serie {
    content: Serie[] | undefined;
    id:                    number;
    idSerie:               number;
    titulo:                string;
    sinopsis:              string;
    poster:                string;
    popularidad:           number;
    numTemporadas:         number;
    numEpisodiosTotal:     number;
    genero:                Genero;
    videoKey:              string;
    tituloVideo:           string;
    fechaLanzamientoSerie: Date;
    plataforma:            string;
    promedioVotos:         number;
}

export interface Temporada { 
    id:                    number;
    idTemporada:           number;
    nombreTemporada:       string;
    fechaEstrenoTemporada: Date;
    sinopsisTemporada:     string;
    posterTemporada:       string;
    numeroTemporada:       number;
    promedioTemporada:     number;
    tituloSerie:           string;
    episodios:             Episodio[];
    videoKey:              string;
    tituloVideo:           string;
}

export interface Episodio {
    id:               number;
    numEpisodio:      number;
    tituloEpisodio:   string;
    fechaEstreno:     Date;
    sinopsisEpisodio: string;
    idEpisodio:       number;
    numTemporada:     number;
    portadaEpisodio:  string;
    promedio:         number;
    tituloSerie:      string;
    videoKey:         null;
    tituloVideo:      null;
}

export enum Genero {
    Fantasia = "FANTASY",
    Accion = "ACTION",
    Animacion = "ANIMATION",
    Comedia = "COMEDY",
    Crime = "CRIME",
    Documental = "DOCUMENTARY",
    Drama = "DRAMA",
    Familia = "FAMILY",
    Niños = "KIDS",
    Misterio = "MYSTERY",
    Noticias = "NEWS",
    Reality = "REALITY",
    Tenelovela = "SOAP",
    Charla = "TALK",
    Guerra = "WAR",
    Occidental = "WESTERN" 
}


export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
