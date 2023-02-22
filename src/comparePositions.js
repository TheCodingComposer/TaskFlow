//after click and drag of card, compare current position of card with other cards in position array

export default function comparePositions(id, x, y, positionArray) {



    let foundId = null
   
    positionArray.forEach((task) => {
        
        if (task.id !== id) {
            if (x >= task.x - 280  && x <= task.x + 280 && y >= task.y -380 && y <= task.y + 380) {
                foundId = task.id
            }
        }
    })

    if (foundId) {
        return [id, foundId]
    } else {
        return null
    }
}