import React from "react";

export default function Square(props){
    let className;

    if (props.gameOver && (props.winner[1] == props.id || props.winner[2] == props.id || props.winner[3] == props.id))
        className = `square-${props.winner[0].toLowerCase()}-wins`
    else if (props.square.clickedBy === "O")
        className = "square-o"
    else if (props.square.clickedBy === "X")
        className = "square-x"
    else {
        className = "square"
    }
    let shouldUpdate = !props.gameOver && props.square.clickedBy === undefined

    function restartGame(){
        props.setGameOver(false)
    }
    return (
        <div className={className} onClick = {shouldUpdate ? props.updateSquare : restartGame}>
            
        </div>
    )
}