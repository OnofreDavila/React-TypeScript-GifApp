import { GifList } from "./gifs/GifList";
import { PreviousSearches } from "./gifs/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  {
    /* Hooks */
  }
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  {
    /*manejadores handles */
  }
  const handleTermClicked = (term: string) => {
    console.log({ term });
  };
  const handleSearch = async (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;
    if (previousTerms.includes(term)) return; // Evita duplicados
    setPreviousTerms([term, ...previousTerms.slice(0, 7)]); // Limita a los últimos 7 términos y con splice modifico el array original con slice no lo haría
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />
      {/* Input search */}
      <SearchBar placeholder="Buscar Gifs" onQuery={handleSearch} />
      {/* Busquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />
      {/* GifList */}
      <GifList gifs={gifs} />
    </>
  );
};
