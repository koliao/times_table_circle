console.log("sarasa, tarasa!")

const c = document.getElementById("drawCanvas")
const canvasContext = c.getContext("2d")

function setBackgroundColor( backgroundColor ) {
    canvasContext.fillStyle = backgroundColor
    canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
}

function fitCanvasToWindow(event) {
    const rect = c.getBoundingClientRect()
    canvasContext.canvas.width  = rect.width
    canvasContext.canvas.height = rect.height
}

function clearCanvas(backgroundColor) {
    const w = canvasContext.canvas.width
    const h = canvasContext.canvas.height
    canvasContext.beginPath()
    canvasContext.rect(0, 0, w, h)
    canvasContext.fillStyle = backgroundColor || "white"
    canvasContext.fill()
}

function drawCircle(x, y, r, color) {
    canvasContext.beginPath()
    canvasContext.arc(x, y, r, 0, Math.PI * 2, true)
    canvasContext.strokeStyle = color || "black"
    canvasContext.stroke()
}

function drawLine(sx, sy, tx, ty, color) {
    canvasContext.beginPath()
    canvasContext.moveTo(sx, sy)
    canvasContext.lineTo(tx, ty)
    canvasContext.strokeStyle = color || "black"
    canvasContext.stroke()
}

fitCanvasToWindow()
window.onresize = fitCanvasToWindow

function render() {
    let n = Number(document.getElementById("nInput").value)
    let multValue = Number(document.getElementById("multValueInput").value)
    const color = document.getElementById("linesColor").value
    const showPoints = document.getElementById("showPoints").checked
    const autoIncrease = document.getElementById("autoIncrease").checked

    if(autoIncrease) {
        multValue = (multValue + 0.01).toFixed(2)
        document.getElementById("multValueInput").value = String(multValue)
    }

    const canvasWidth = canvasContext.canvas.width
    const canvasHeight = canvasContext.canvas.height

    clearCanvas("#000000")

    const r = 200
    
    const littleRadius = 3
    for(let i = 0; i < n; i++) {
        // draw point
        const angle = i * (2*Math.PI / n)
        const x = Math.cos(angle)*r + canvasWidth / 2
        const y = Math.sin(angle)*r + canvasHeight / 2

        if(showPoints)
            drawCircle( x, y, littleRadius, color)

        // draw time table line
        const targetPoint = (i * multValue) % n
        const targetAngle = targetPoint * (2*Math.PI / n)
        const tx = Math.cos(targetAngle)*r + canvasWidth / 2
        const ty = Math.sin(targetAngle)*r + canvasHeight / 2

        drawLine( x, y, tx, ty, color )
    }
    drawCircle( canvasWidth / 2, canvasHeight / 2, r, "white")

    window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
