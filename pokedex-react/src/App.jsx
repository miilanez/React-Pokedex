import React, { useState } from 'react';
import GlobalStyles from './styles/global';
import * as S from './styles/styles';
import pokeball from './assets/pokeball.svg';
import api from './services/api';
import Spinner from './components/Spinner';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTypedPokemon(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typedPokemon) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${typedPokemon}`);
      setPokemon(response.data);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError('Pokemon não encontrado!');
      setIsLoading(false);
      setPokemon(null);
    }
  };

  return (
    <div>
      <S.Wrapper>
        <S.Welcome>React Pokedex</S.Welcome>
        <S.Instructions>
          Informe o Id ou Nome do Pokemón!
        </S.Instructions>
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            value={typedPokemon}
            placeholder="Nome do pokemon/id"
            onChange={handleChange}
            hasError={!!error}
          />
          <S.Button type="submit">
            {isLoading ? (
              <span>carregando...</span>
            ) : (
              <>
                Buscar <img src={pokeball} alt="pokeball" />{' '}
              </>
            )}
          </S.Button>
        </S.Form>
        {error && <span>{error}</span>}
        {pokemon && (
          <S.PokemonCard key={pokemon.id}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <S.AvatarWrapper>
                  <S.PokemonName>{pokemon.name}</S.PokemonName>
                  <S.Avatar
                    src={pokemon.sprites['front_default']}
                    alt={pokemon.name}
                  />
                </S.AvatarWrapper>
                <S.PokemonDetails>
                  <span>
                    <strong>Altura</strong>: {pokemon.height * 10} cm
                  </span>
                  <span>
                    <strong>Peso</strong>: {pokemon.weight / 10} kg
                  </span>
                  <span>
                    <strong>Tipo</strong>: {pokemon.types[0].type.name}
                  </span>
                  <span>
                    <strong>Id</strong>: {pokemon.id}
                  </span>
                </S.PokemonDetails>
              </>
            )}
          </S.PokemonCard>
        )}

        <GlobalStyles />
      </S.Wrapper>

      <p className='creditos'>by: Gabriel Milanez</p>
    </div>
  );
};

export default App;
