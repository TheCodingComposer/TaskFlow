import {useState} from "react"
import DropdownItem from "./DropdownItem"

export default function Dropdown({name, options, onDropdownChange, type}) {

    const [clicked, setClicked] = useState(false)
    

 


    function handleChosenOption(option) {
        onDropdownChange(option, type)      
    }

    return (
        <div className="dropdown" onClick={() => {setClicked(!clicked)}}>
            <p>{name}</p>

        {clicked && 
            <div className="dropdown-item-container">
                <ul className="dropdown-list">
                    
                 {options.map((option, index) => {
                    return (
                        <DropdownItem 
                            name={options[index]}
                            key={index}
                            onChosenOption={handleChosenOption}
                            currentOption={name}
                    />
                    ) }
             )   }
                

                </ul>
            </div> 
        }

        </div>
    )
}