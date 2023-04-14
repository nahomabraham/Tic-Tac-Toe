import React from "react";
import Square from "./Square"

export default function App(){
    let squaresState = []
    React.useEffect(() => {
        
    },[])
    for (let i = 0; i < 9; i++) {
        squaresState.push({
            clickedBy: undefined,
            id: `${i}`
        })
    }
    const [turn, setTurn] = React.useState("O")
    const [squares, setSquares] = React.useState(squaresState)
    React.useEffect(() => {
        switchTurn()
    }, [squares])

    let squareElements = []
    for (let i = 0; i < 9; i++) {
        squareElements.push(<Square
            key={`${i}`}
            square={squares[i]}
            updateSquare={() => updateSquare(`${i}`)}/>)
    }

    function switchTurn(){
        setTurn(prevTurn => (
            prevTurn === "O" ? "X" : "O"
        ))
    }

    function updateSquare(id){
        console.log("Square " + id + " is clicked")
        setSquares(prevSquares => prevSquares.map(prevSquare => {
            if( prevSquare.id === id && prevSquare.clickedBy === undefined) 
                return {...prevSquare, clickedBy: turn}
            else
                return prevSquare
        }))
    }

    return (
        <main>
            {squareElements}
        </main>
    )
}