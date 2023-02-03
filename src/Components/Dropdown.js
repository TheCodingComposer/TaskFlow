import {useState} from "react"
import DropdownItem from "./DropdownItem"

export default function Dropdown({palette, onPaletteChange}) {

    const [clicked, setClicked] = useState(false)
    

    const paletteOptions = ['Random', 'Warm', 'Cool', 'Pastel', 'Neon']


    function handleChosenPalette(color) {
        onPaletteChange(color)      
    }

    return (
        <div className="dropdown" onClick={() => {setClicked(!clicked)}}>
            <p>{palette}</p>

        {clicked && 
            <div className="dropdown-item-container">
                <ul className="dropdown-list">
                    
                 {paletteOptions.map((color, index) => {
                    return (
                        <DropdownItem 
                    name={paletteOptions[index]}
                    key={index}
                    onChosenPalette={handleChosenPalette}
                    currentPalette={palette}
                    />
                    ) }
             )   }
                

                </ul>
            </div> 
        }

        </div>
    )
}