import React, { useState, useCallback, useMemo, useContext } from "react";

const GameResultContext = React.createContext(null);

export const GameResultProvider = ({ children }) => {
	const [gameResult, setGameResult] = useState(null);

	const handleSetGameResult = useCallback((result) => {
		setGameResult(result);
	}, []);

	const handleResetGameResult = useCallback(() => {
		setGameResult(null);
	}, []);

	const value = useMemo(
		() => ({
			gameResult,
			handleSetGameResult,
			handleResetGameResult,
		}),
		[gameResult, handleSetGameResult, handleResetGameResult]
	);

	return (
		<GameResultContext.Provider value={value}>
			{children}
		</GameResultContext.Provider>
	);
};

export const useGameResult = () => {
	const context = useContext(GameResultContext);

	return context;
};
