// import useSound from "use-sound"
import defaultAlarm from "./alarm-sounds/defaultAlarm_Toulouser.mp3"
import harshAlarm from "./alarm-sounds/harshAlarm_Toulouser.mp3"
import gentleAlarm from "./alarm-sounds/gentleAlarm_veens705.mp3"

//TO DO: make enum for quality
// Would like to use useSound hook if possible

//ringing = true or false.  quality = default, harsh, gentle.   id = for clearInterval
export default function AlarmSound(ringing, quality = null, intervalId = 0) {

    let sound;

    switch (quality) {
        case 'default':
             sound = new Audio(defaultAlarm);
            break;
        case 'harsh':
            sound = new Audio(harshAlarm);
            break;
        case 'gentle':
            sound = new Audio(gentleAlarm);
            break;
        default:
            break;
    }
   
    
    
    if (ringing) {
        const alarmIntervalId = setInterval(() => {
            sound.play()
        }, 1000)
        return alarmIntervalId
    } else {
        clearInterval(intervalId)
    }

   }