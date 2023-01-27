import { useEffect, useState } from 'react';
import './App.css';

const TILE_COLORS = ['Red', 'Green', 'Blue', 'Yellow', 'red', 'green', 'blue', 'yellow'];

export default function Memory() {
	const [colorArr, setColorArr] = useState<string[]>([]);
	const [tiles, setTiles] = useState<string[]>([]);
	const [count, setCount] = useState<number>(1);
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		setColorArr(TILE_COLORS);
		shuffle(TILE_COLORS);
	}, []);
	// Write your code here.
	function handleColor(item: any) {
		setTiles([...tiles, item]);
		setCount((count) => count + 1);
		if (count === 1) {
			if (tiles[0]?.toLowerCase() === item?.toLowerCase()) {
				setSelected([...selected, tiles[0], item]);
			}
			setTimeout(() => {
				setTiles([]);
				setCount(0);
			}, 1000);
		}
	}
	return (
		<>
			<h1>Memory</h1>
			<div className="board">
				{colorArr &&
					colorArr.map((item) => (
						<div
							key={item}
							style={{
								background: tiles.includes(item) ? item : selected.includes(item) ? item : 'white',
							}}
							className={`tile ${tiles.includes(item) ? item : selected.includes(item) ? item : ''}`}
							onClick={() => handleColor(item)}
						></div>
					))}
			</div>
			{selected.length === TILE_COLORS.length && (
				<>
					<button
						onClick={() => {
							setSelected([]);
							shuffle(colorArr);
							setColorArr(TILE_COLORS);
						}}
					>
						Restart
					</button>
				</>
			)}
		</>
	);
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array: string[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));

		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array;
}
