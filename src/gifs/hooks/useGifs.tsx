import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  {
    /* Hooks */
  }
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});
  {
    /*manejadores handles */
  }
  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };
  const handleSearch = async (query: string) => {
    const term = query.trim().toLowerCase();
    if (term.length === 0) return;
    if (previousTerms.includes(term)) return; // Evita duplicados
    setPreviousTerms([term, ...previousTerms.slice(0, 7)]); // Limita a los últimos 7 términos y con splice modifico el array original con slice no lo haría
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };

  return {
    //Properties
    gifs,
    //Methods
    previousTerms,
    handleSearch,
    handleTermClicked,
  };
};
