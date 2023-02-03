import { useState } from "react";


export default function DropdownItem({name, onChosenPalette, currentPalette}) {

    const [hover, setHover] = useState(false)


    //TODO: Different colors for hover? i.e. warm color for 'Warm' text
    // let textColor;

    // switch (name) {
    //     case '':
    //         textColor = 'black';
    // }

    return (
        <li className="dropdown-item" 
            style={{height: '30px', 
            color: hover || name === currentPalette ? 'black' : 'gray'}}

        onMouseEnter={() => {
            setHover(true)
        }}
        onMouseLeave={() => {
            setHover(false)
        }}

    
        onClick={() => {
            onChosenPalette(name)
        }}>
            {name}
        </li>
    )
}