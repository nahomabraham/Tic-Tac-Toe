import React from "react";

export default function Square(props){
    let className;
    if (props.square.clickedBy === "O")
        className = "square-o"
    else if (props.square.clickedBy === "X")
        className = "square-x"
    else
        className = "square"
    let update = props.square.clickedBy === undefined
    return (
        <div className={className} onClick = {update ? props.updateSquare : undefined}>
            
        </div>
    )
}