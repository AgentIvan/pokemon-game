import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../../../context/firebaseContext";
import { usePokemons } from "../../../context/pokemonContext";

import { useGameResult } from "../../../context/gameResultContext";
import { usePlayersCards } from "../../../context/playersCardsContext";

import Layout from "../../../Components/Layout";
import PokemonCard from "../../../Components/PokemonCard";

import layoutBG2 from "../../../Components/Layout/assets/bg_layout_2.jpg";

import s from "./StartPage.module.css";

const StartPage = () => {
	const history = useHistory();

	const [pokemons, setPokemons] = useState({});

	const { getPokemonsBySockets } = useContext(FirebaseContext);
	const { handleClearPlayersCards } = usePlayersCards();
	const { handleResetGameResult } = useGameResult();
	const {
		selectedPokemons,
		handleSelectedPokemons,
		handleClearSelectedPokemons,
	} = usePokemons();

	useEffect(() => {
		getPokemonsBySockets((pokemons) => {
			setPokemons(pokemons);
		});

		handleClearSelectedPokemons();
		handleResetGameResult();
		handleClearPlayersCards();
	}, []);

	const handleCardClick = (id) => {
		const [key, pokemon] = Object.entries(pokemons).find(
			([_, value]) => value.id === id
		);

		const selectModifiedPokemon = {
			...pokemon,
			isSelected: !pokemon.isSelected,
		};

		setPokemons((prevState) => {
			const newState = { ...prevState };
			newState[key] = selectModifiedPokemon;
			return newState;
		});

		handleSelectedPokemons(key, selectModifiedPokemon);
	};

	const handleStartBtnClick = () => {
		if (Object.keys(selectedPokemons).length === 5) {
			history.push("board");
		} else {
			alert("Choose five pokemons");
		}
	};

	return (
		<Layout id="game-cards" urlBg={layoutBG2}>
			<h2>Choose five of your best warriors </h2>

			<div className={s.start}>
				<button className={s.startBtn} onClick={handleStartBtnClick}>
					Start Game
				</button>
			</div>

			<div className={s.flex}>
				{Object.entries(pokemons).map(([key, value]) => (
					<PokemonCard
						key={key}
						id={value.id}
						name={value.name}
						type={value.type}
						img={value.img}
						values={value.values}
						isSelected={value.isSelected}
						className={s.card}
						onCardClick={handleCardClick}
					/>
				))}
			</div>
		</Layout>
	);
};

export default StartPage;
