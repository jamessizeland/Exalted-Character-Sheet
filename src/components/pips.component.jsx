import React, {useState} from 'react';
import {Badge} from 'react-bootstrap'
import "./components.style.scss"

export function Pips({total, checked}) {
    const rand = () => {
        return Math.floor(Math.random()*100000)
    }

    const pipsArray = (total=5, checked=1) => {
        const checkedPips = new Array(checked).fill(true)
        const rest = new Array(total-checked).fill(false)
        const pips = checkedPips.concat(rest)

        return pips.map((pip) => (
            <Badge key={rand()} variant= {pip ? "danger" : "success"} style= {{margin: "5px"}}>{(" ")}</Badge>
        ))
    }

    return (
        <div>
            {pipsArray(total, checked)}
        </div>
    )
}