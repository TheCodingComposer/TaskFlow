export default function(palette) {

    let colors;

    switch (palette) {

        case 'Random':
            colors = ['green', 'blue', 'red', 'yellow', 'orange'];
            break;
        case "Warm":
            colors = ['#F2921D', '#F2CD5C', '#A61F69', '#F55050', '#DC3535', '#FF869E', '#95CD41'];
            break;
        case "Cool":
            colors = ['#93BFCF', '#BFACE2', '#144272', '#91D8E4', '#A0E4CB', '#8EC3B0', '#5C2E7E'];
            break;
        case "Pastel":
            colors = ['#6096B4', '#A7727D', '#EAC7C7', '#B5D5C5', '#DFD3C3', '#FEBE8C', '#90A17D', '#9E7676'];
            break;
        case "Neon":
            colors = ['#A31ACB', '#FB2576', '#F0FF42', '#EA047E', '#00F5FF', '#9CFF2E', '#FF1E1E'];
            break;

        default:
            break;

    }

    // TODO - disallow consecutive repeats of color? create a useState object for each
    // palette that keeps latest color 


    const color = colors[Math.floor(Math.random() * colors.length)];

    return [color, colors];
}