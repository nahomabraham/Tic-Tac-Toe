import React from "react";
import Square from "./Square"
import initState from "../Model/initState.json"

export default function App(){
    const [turn, setTurn] = React.useState("O")
    const [squares, setSquares] = React.useState(initState)
    const [gameOver, setGameOver] = React.useState(false)
    const [winner, setWinner] = React.useState(undefined)

    React.useEffect(() => {
        setWinner(analyze())
        console.log(winner)
        switchTurn()
    }, [squares])

    React.useEffect(() => {
        if (!gameOver){
            setSquares(initState)
        }
    }, [gameOver])
    let squareElements = []
    for (let i = 0; i < 9; i++) {
        squareElements.push(<Square
            key={`${i}`}
            id={`${i}`}
            square={squares[i]}
            updateSquare={() => updateSquare(`${i}`)}
            gameOver={gameOver}
            setGameOver={setGameOver}
            winner={winner}/>)
    }

    function switchTurn(){
        setTurn(prevTurn => (
            prevTurn === "O" ? "X" : "O"
        ))
    }

    function updateSquare(id){
        setSquares(prevSquares => prevSquares.map(prevSquare => {
            if( prevSquare.id === id && prevSquare.clickedBy === undefined) 
                return {...prevSquare, clickedBy: turn}
            else
                return prevSquare
        }))
    }

    function analyze(){
        for (let i = 0; i < 3; i++) {
            let set = new Set([squares[3*i].clickedBy ?? "a", squares[3*i+1].clickedBy, squares[3*i+2].clickedBy])
            if (set.size === 1){
                console.log(squares[3*i].clickedBy + " won by Row")
                setGameOver(true)
                return [squares[3*i].clickedBy, 3*i, 3*i+1, 3*i+2]
            }
        }

        for (let i = 0; i < 3; i++) {
            let set = new Set([squares[i].clickedBy ?? "a", squares[i+3].clickedBy, squares[i+6].clickedBy])
            if (set.size === 1){
                console.log(squares[i].clickedBy + " won by Column")
                setGameOver(true)
                return [squares[i].clickedBy, i, i+3, i+6]
            }
        }

        let set = new Set([squares[0].clickedBy ?? "a", squares[4].clickedBy, squares[8].clickedBy])
        let set2 = new Set([squares[2].clickedBy ?? "a", squares[4].clickedBy, squares[6].clickedBy])
        if(set.size === 1){
            console.log(squares[4].clickedBy + " won by Diagonal")
            setGameOver(true)
            return [squares[4].clickedBy, 0, 4, 8]
        }
        if(set2.size === 1){
            console.log(squares[4].clickedBy + " won by Diagonal")
            setGameOver(true)
            return [squares[4].clickedBy, 2, 4, 6]
        }
    }

    return (
        <main>
            {squareElements}
        </main>
    )
}