import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Arrow({back, onArrowClick, id}) {



    return (
        <div className="arrow-container">

            {back 
            ?
                //true = move task back in array, otherwise move forward
                <p className="arrow left-arrow" onClick={() => onArrowClick(id, true)}><FontAwesomeIcon className='left-arrow' icon={faArrowLeft}/></p>
            :
                <p className="arrow right-arrow" onClick={() => onArrowClick(id, false)}><FontAwesomeIcon className='right-arrow' icon={faArrowRight}/> </p>
            }


        </div>
    )

 }