export default function(palette) {

    let colors;

    switch (palette) {

        case 'Random':
            colors = ['green', 'blue', 'red', 'yellow'];
            break;
        case "Warm":
            colors = ['green', 'blue', 'red', 'yellow'];
            break;
        case "Cool":
            colors = ['green', 'blue', 'red', 'yellow'];
            break;
        case "Pastel":
            colors = ['green', 'blue', 'red', 'yellow'];
            break;
        case "Neon":
            colors = ['green', 'blue', 'red', 'yellow'];
            break;

        default:
            break;

    }

    const color = colors[Math.floor(Math.random() * colors.length)];

    return color;
}