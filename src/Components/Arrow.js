
export default function Arrow({back, onArrowClick, id}) {



    return (
        <div className="arrow-container">

            {back 
            ?
                //true = move task back in array, otherwise move forward
                <p className="arrow left-arrow" onClick={() => onArrowClick(id, true)}>&lt;</p>
            :
                <p className="arrow right-arrow" onClick={() => onArrowClick(id, false)}>&gt;</p>
            }


        </div>
    )

 }