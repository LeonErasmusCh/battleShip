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
	const [playerScore, setPlayerScore] = useState(4);

	const [computerHit, setComputerHit] = useState([]);
	const [computerScore, setComputerScore] = useState(4);

	useEffect(() => {
		randomComputerShip();
		randomComputerShip();
		randomComputerShip();
		randomComputerShipFire();
		randomComputerShipFire();
		randomComputerShipFire();

	}, []);


	//player places his ships
	function playerShip(e) {
		// Set ship variable to pisition in array ;
		let ship = e.target.getAttribute("data-index");
		player[ship] = "Ship";
		
		
		//Set maximum amount of ships allowed
		let sum = 0;
		for(let i = 0; i < player.length; i++){
			if(player[i] === "Ship" ){
				sum += 1
			}
		}
		if(sum < 2){
			alert("YOU CAN PLACE 3 MORE BATTLESHIPS");
			setPlayer([...player], player[ship]);
		} else if (sum < 3 ){
			alert("YOU CAN PLACE 2 MORE BATTLESHIPS");
			setPlayer([...player], player[ship]);
		} else if(sum < 4){
			alert("YOU CAN PLACE 1 MORE BATTLESHIPS");
			setPlayer([...player], player[ship]);
		} else {
			alert ("YOU HAVE COMPLETED YOUR FLEET")
		}
		console.log(player);
	}


	//player picks firing position
	function playerFirePosition(e) {
		// Set ship variable to pisition in array ;
		let fire = e.target.getAttribute("data-index");
		playerFire[fire] = "X";
		setPlayerFire([...playerFire], playerFire[fire]);
		console.log("player fire -->", playerFire);
	}

	//Computer random Fire Position
	function randomComputerShip() {
		// Set ship variable to pisition in array ;
		let randomShip = Math.floor(Math.random() * 25);
		computerPlayer[randomShip] = "X";
		setComputerPlayerFire([...computerPlayer], computerPlayer[randomShip]);
		console.log(computerPlayer);
	}
	//Computer random placement of ships
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

	// Check if player is hit
	function fireToPlayer() {
		for (let i = 0; i < player.length; i++) {
			for (let j = 0; j < computerPlayerFire.length; j++) {
				if (
					player[i] === "Ship" &&
					computerPlayerFire[j] === "X" &&
					player[i] !== computerPlayerFire[j] &&
					i === j
				) {
					console.log(
						"we have a hit ",
						"player ",
						i,
						"computerFire ",
						j
					);
					setPlayerHit([...playerHit, j]);
					console.log("playerHit ", playerHit)
					
					//reset to Bang when hit!
					function playerBang() {
						player[i] = "BANG!"
						setPlayer([...player], player[i]);
						console.log("BAAANG! -->", player);
						
					}
					playerBang();
					

					//Set Player Score
					function calculatePlayerScore(){
						for(let i = 0; i < player.length; i++){
							if(player[i] === "BANG!"){
								setPlayerScore((playerScore -1 ) - 1)
							}
						}
					}
					calculatePlayerScore();

					//Set Computer Score
					function calculateComputerScore(){
						for(let i = 0; i < computerPlayer.length; i++){
							if(computerPlayer[i] === "BANG!"){
								setComputerScore((computerScore) -1)
							}
						}
					}
					calculateComputerScore();

				}
			}
		}
	}

	// Check if Ship is hit
	function fireToComputer() {
		for (let i = 0; i < playerFire.length; i++) {
			for (let j = 0; j < computerPlayer.length; j++) {
				if (
					playerFire[i] ==="X" &&
					computerPlayer[j] === "Ship" &&
					playerFire[i] !== computerPlayer[j] &&
					i === j
				) {
					console.log(
						"we have a hit ",
						"playerFire ",
						i,
						"computerPlayer ",
						j
					);
					setComputerHit([...computerHit, j]);
					console.log("computerHit ", computerHit)
					//reset to Bang when hit!
					function playerBang() {
						computerPlayer[j] = "BANG!"
						setComputerPlayer([...computerPlayer], computerPlayer[j]);
						console.log("BAAANG! -->", computerPlayer);
					}
					playerBang();

				}
			}
		}
	}




	return (
		<>
			<h1 className="text-center text-white mt-5">Battleship</h1>
			<div className="container mt-5">
				<div className="row">
					{/* ___ Player ___ */}
					<div className="battle_square">
						<h5 className="text-center text-white">Player Ships <span className="mx-3 text-info text-sm">Player Ships in fleet: {playerScore} </span></h5>
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
									{key === "Ship" || key === "X" || key === 0 ? <span className="invisible">{key}</span> : <span className="">{key}</span> }

								</button>
							);
						})}
					</div>
					{/* ___ Computer Player Ships ___ */}
					<div className="battle_square">
					<h5 className="text-center text-white">Computer Ships: <span className="mx-3 text-info text-sm">Computer Ships in fleet: {computerScore} </span></h5>

						
						{computerPlayer.map((key, index) => {
							return (
								<button
									type="button"
									className="btn btn-danger m-2"
									key={{ key }}
									style={{ width: "15%" }}
									data-index={index}
								>
									{key === "Ship" || key === "X" || key === 0 ? <span className="invisible">{key}</span> : <span className="">{key}</span> }
								 	
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
									{key}
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
							onClick={fireToComputer}
						>
							player Fire
						</button>
						<button
							type="button"
							className="btn btn-danger mx-auto mt-2"
							style={{ width: "200px" }}
							onClick={fireToPlayer}
						>
							Fire
						</button>

					</div>
				</div>
			</div>
		</>
	);
}

export default App;
