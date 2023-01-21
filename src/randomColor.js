export default function() {

    const colors = ['green', 'blue', 'red', 'yellow']

    const color = colors[Math.floor(Math.random() * colors.length)];

    return color;
}