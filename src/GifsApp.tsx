import { GifList } from "./gifs/GifList";
import { useGifs } from "./gifs/hooks/useGifs";
import { PreviousSearches } from "./gifs/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  {
    /* Custom Hooks */
  }
  const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

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
