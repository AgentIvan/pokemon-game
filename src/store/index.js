import { configureStore } from "@reduxjs/toolkit";

import pokemons from "./pokemons";
import game from "./game";

export default configureStore({
  reducer: {
    pokemons,
    game,
  },
});
