import { useState } from "react";


export default function DropdownItem({name, onChosenOption, currentOption}) {

    const [hover, setHover] = useState(false)


    //TODO: Different colors for hover? i.e. warm color for 'Warm' text
    // let textColor;

    // switch (name) {
    //     case '':
    //         textColor = 'black';
    // }

    return (
        <li className="dropdown-item" 
            style={{color: hover || name === currentOption ? 'black' : 'gray'}}

        onMouseEnter={() => {
            setHover(true)
        }}
        onMouseLeave={() => {
            setHover(false)
        }}

    
        onClick={() => {
            onChosenOption(name)
        }}>
            {name}
        </li>
    )
}