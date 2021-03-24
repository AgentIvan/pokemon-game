import { createSlice } from "@reduxjs/toolkit";
import Firebase from "../services/firebase";

const slice = createSlice({
  name: "pokemons",
  initialState: {
    isFetching: false,
    fetchError: null,
    pokemons: {},
    selectedPokemons: {},
  },
  reducers: {
    getPokemons: (state) => ({
      ...state,
      isFetching: true,
    }),
    getPokemonsSuccess: (state, action) => ({
      ...state,
      isFetching: false,
      pokemons: action.payload,
    }),
    getPokemonsFailure: (state, action) => ({
      ...state,
      isFetching: false,
      fetchError: action.payload,
    }),
    setSelectedPokemons: (state, action) => {
      const { key, selectModifiedPokemon } = action.payload;

      if (state.selectedPokemons[key]) {
        const { [key]: _, ...newSelectedPokemons } = state.selectedPokemons;
        return { ...state, selectedPokemons: newSelectedPokemons };
      }
      return {
        ...state,
        selectedPokemons: {
          ...state.selectedPokemons,
          [key]: selectModifiedPokemon,
        },
      };
    },
    clearSelectedPokemons: (state) => ({
      ...state,
      selectedPokemons: {},
    }),
  },
});

export const {
  getPokemons,
  getPokemonsSuccess,
  getPokemonsFailure,
  setSelectedPokemons,
	clearSelectedPokemons,
} = slice.actions;

export const requestPokemons = () => async (dispatch) => {
  try {
    dispatch(getPokemons());

    const pokemons = await Firebase.getPokemonsAtOnce();
    
    dispatch(getPokemonsSuccess(pokemons));
  } catch (err) {
    getPokemonsFailure(err);
  }
};

export const selectIsFetching = (state) => state.pokemons.isFetching;
export const selectPokemons = (state) => state.pokemons.pokemons;
export const selectSelectedPokemons = (state) =>
  state.pokemons.selectedPokemons;

export default slice.reducer;
