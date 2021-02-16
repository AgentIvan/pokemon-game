import cn from "classnames";

import s from "./ArrowChoice.module.css";

const ArrowChoice = ({ side }) => {
	if (!side) {
		return null;
	}

	return (
		<div
			className={cn(s.arrow, {
				[s.rightSide]: side === "Two",
				[s.leftSide]: side === "One",
			})}
		/>
	);
};

ArrowChoice.defaultProps = {
	side: null,
};

export default ArrowChoice;
