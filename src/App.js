import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [player, setPlayer] = useState([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);
	const [playerFire, setPlayerFire] = useState([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);

	const [computerPlayer, setComputerPlayer] = useState([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);
	const [computerPlayerFire, setComputerPlayerFire] = useState([
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0
	]);

	const [playerHit, setPlayerHit] = useState([]);
	const [computerHit, setComputerHit] = useState([]);

	//player places his ships
	function playerShip(e) {
		// Set ship variable to pisition in array ;
		let ship = e.target.getAttribute("data-index");
		player[ship] = "Ship";
		setPlayer([...player], player[ship]);
		console.log(player);
	}
	//player picks firing position
	function playerFirePosition(e) {
		// Set ship variable to pisition in array ;
		let fire = e.target.getAttribute("data-index");
		playerFire[fire] = "Fire";
		setPlayerFire([...playerFire], playerFire[fire]);
		console.log(playerFire);
	}

	//Computer random placement of ships
	function randomComputerShip() {
		// Set ship variable to pisition in array ;
		let randomShip = Math.floor(Math.random() * 25);
		computerPlayer[randomShip] = "Ship";
		setComputerPlayerFire([...computerPlayer], computerPlayer[randomShip]);
		console.log(computerPlayer);
	}
	//Computer random Fire Position
	function randomComputerShipFire() {
		// Set ship variable to pisition in array ;
		let randomShipFire = Math.floor(Math.random() * 25);
		computerPlayerFire[randomShipFire] = "Ship";
		setComputerPlayer(
			[...computerPlayerFire],
			computerPlayer[randomShipFire]
		);
		console.log("computerPlayerFire ", computerPlayerFire);
	}

	useEffect(() => {
		randomComputerShip();
		randomComputerShip();
		randomComputerShip();
		randomComputerShipFire();
		randomComputerShipFire();
		randomComputerShipFire();
	}, []);

	// Check if player is hit
	function fireToPlayer() {
		for (let i = 0; i < player.length; i++) {
			for (let j = 0; j < computerPlayerFire.length; j++) {
				if (
					player[i] != 0 &&
					computerPlayerFire[j] != 0 &&
					player[i] === computerPlayerFire[j] &&
					i === j
				) {
					console.log(
						"we have a hit ",
						"player ",
						i,
						"computerFire ",
						j
					);
					setPlayerHit([...playerHit, "hit at position ", j]);
				}
			}
		}
	}
  
	// Check if Ship is hit
	function fireToComputer() {
		for (let i = 0; i < playerFire.length; i++) {
			for (let j = 0; j < computerPlayer.length; j++) {
				if (
					playerFire[i] != 0 &&
					computerPlayer[j] != 0 &&
					playerFire[i] === computerPlayer[j] &&
					i === j
				) {
					console.log(
						"we have a hit ",
						"playerFire ",
						i,
						"computerPlayer ",
						j
					);
					setComputerHit([...computerHit, "Computer hit at position ", j]);
				}
			}
		}
	}

	return (
		<>
			<h1 className="text-center text-white mt-5">Battleship</h1>
			<h4 className="text-white text-center"> Hit: {playerHit}</h4>
			<div className="container mt-5">
				<div className="row">
					{/* ___ Player ___ */}
					<div className="battle_square">
						<h5 className="text-center text-white">Your ships</h5>
						{player.map((key, index) => {
							return (
								<button
									type="button"
									className="btn btn-info m-2"
									key={{ key }}
									style={{
										width: "15%"
									}}
									data-index={index}
									onClick={playerShip}>
									{key}
								</button>
							);
						})}
					</div>
					{/* ___ Computer Player Ships ___ */}
					<div className="battle_square">
						<h5 className="text-center text-white">
							Computer Ships
						</h5>
						{computerPlayer.map((key, index) => {
							return (
								<button
									type="button"
									className="btn btn-danger m-2"
									key={{ key }}
									style={{ width: "15%" }}
									data-index={index}
									>
									0
								</button>
							);
						})}
					</div>

					{/* ___ Player Fire ___ */}
					<div className="battle_square">
						<h5 className="text-center text-white mt-2">
							Choose Firing Position
						</h5>
						{playerFire.map((key, index) => {
							return (
								<button
									type="button"
									className="btn btn-info m-2"
									key={{ key }}
									style={{
										width: "15%"
									}}
									data-index={index}
									onClick={playerFirePosition}>
									{key}
								</button>
							);
						})}
					</div>
					{/* ___ Computer Player Fire Position ___ */}
					<div className="battle_square">
						<h5 className="text-center text-white mt-2">
							Computer Fire Position
						</h5>
						{computerPlayerFire.map((key, index) => {
							return (
								<button
									type="button"
									className="btn btn-danger m-2"
									key={{ key }}
									style={{ width: "15%" }}
									data-index={index}
									>
									0
								</button>
							);
						})}
					</div>
				</div>
				{/* The FIRE button */}
				<div className="container">
					<div className="row">
						<button
							type="button"
							className="btn btn-danger mx-auto mt-2"
							style={{ width: "200px" }}
							onClick={fireToPlayer, fireToComputer}>
							Fire
						</button>
					</div>
				</div>
			</div>
		</>
  );
}

export default App;