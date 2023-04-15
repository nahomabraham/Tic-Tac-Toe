import React from "react";
import Square from "./Square"
import initState from "../Model/initState.json"

export default function App(){
    const [turn, setTurn] = React.useState("O")
    const [squares, setSquares] = React.useState(initState)
    
    React.useEffect(() => {
        analyze()
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
                return
            }
        }

        for (let i = 0; i < 3; i++) {
            let set = new Set([squares[i].clickedBy ?? "a", squares[i+3].clickedBy, squares[i+6].clickedBy])
            if (set.size === 1){
                console.log(squares[i].clickedBy + " won by Column")
                return
            }
        }

        let set = new Set([squares[0].clickedBy ?? "a", squares[4].clickedBy, squares[8].clickedBy])
        let set2 = new Set([squares[2].clickedBy ?? "a", squares[4].clickedBy, squares[6].clickedBy])
        if(set.size === 1 || set2.size === 1){
            console.log(squares[4].clickedBy + " won by Diagonal")
        }
    }

    return (
        <main>
            {squareElements}
        </main>
    )
}