import { createSlice } from "@reduxjs/toolkit";

import axios from "../services/axios";

const slice = createSlice({
  name: "game",
  initialState: {
    isFetching: false,
    fetchError: null,
    board: [],
    playerOneCards: [],
    playerTwoCards: [],
    chosenCard: null,
    turn: 0,
    currentPlayer: null,
    result: null,
  },
  reducers: {
    getBoard: (state) => ({
      ...state,
      isFetching: true,
    }),
    getBoardSuccess: (state, action) => ({
      ...state,
      isFetching: false,
      board: action.payload,
    }),
    getBoardFailure: (state, action) => ({
      ...state,
      isFetching: false,
      fetchError: action.payload,
    }),
    setPlayerOneCards: (state, action) => ({
      ...state,
      playerOneCards: action.payload,
    }),
    setPlayerTwoCards: (state, action) => ({
      ...state,
      playerTwoCards: action.payload,
    }),
    setChosenCard: (state, action) => ({
      ...state,
      chosenCard: action.payload,
    }),
    setTurn: (state, action) => ({
      ...state,
      turn: action.payload,
    }),
    setCurrentPlayer: (state, action) => ({
      ...state,
      currentPlayer: action.payload,
    }),
    setResult: (state, action) => ({
      ...state,
      result: action.payload,
    }),
    clearGameData: (state) => ({
      ...state,
      board: [],
      playerOneCards: [],
      playerTwoCards: [],
      chosenCard: null,
      turn: 0,
      currentPlayer: null,
      result: null,
    }),
  },
});

export const {
  getBoard,
  getBoardSuccess,
  getBoardFailure,
  setPlayerOneCards,
  setPlayerTwoCards,
  setResult,
  setCurrentPlayer,
  setTurn,
  setChosenCard,
  clearGameData,
} = slice.actions;

export const setupInitialData = () => async (dispatch) => {
  try {
    dispatch(getBoard());

    const [boardData, playerTwoCardsData] = await Promise.all([
      axios.get("board"),
      axios.get("create-player"),
    ]);

    dispatch(getBoardSuccess(boardData.data));
    dispatch(setPlayerTwoCards(playerTwoCardsData.data));
  } catch (err) {
    dispatch(getBoardFailure(err));
  }
};

export const updateBoardData = (params) => async (dispatch) => {
  try {
    dispatch(getBoard());

    const newBoardData = await axios.post("players-turn", params);
    
    dispatch(getBoardSuccess(newBoardData.data));
  } catch (err) {
    dispatch(getBoardFailure(err));
  }
};

export const selectIsFetching = (state) => state.game.isFetching;
export const selectBoard = (state) => state.game.board;
export const selectPlayerOneCards = (state) => state.game.playerOneCards;
export const selectPlayerTwoCards = (state) => state.game.playerTwoCards;
export const selectChosenCard = (state) => state.game.chosenCard;
export const selectTurn = (state) => state.game.turn;
export const selectCurrentPlayer = (state) => state.game.currentPlayer;
export const selectResult = (state) => state.game.result;

export default slice.reducer;
