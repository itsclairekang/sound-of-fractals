/*
TODO: 
1) Get the slider functionalities working
2) Have canvas width and height be just the center section of the page
3) have the canvas position be centered window minus image header space
4) Get the slider positions to be correct 

*/

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //canvas settings
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    
    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.15 : canvas.height * 0.15;
    let sides = 4;
    let layers = 8;
    let scale = 0.5;
    let spread = 0.6; // 0.1 - 2.5
    let branches = 2;
    let color = 'hsl(180, 80%, 70%)';

    //controls
    const sidesRange = document.getElementById('numberOfSides');
    sidesRange.addEventListener('change', function(f) {
        sides = f.target.value;
        drawFractal();
    });

    const depthRange = document.getElementById('depth');
    depthRange.addEventListener('change', function(f) {
        layers = f.target.value;
        drawFractal();
    });

    function drawBranch(layers) {
        if(layers == 0) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        for(let i = 0; i < branches; i++) {
            ctx.save();
            ctx.translate(size - (size/branches) * i, 0);
            ctx.rotate(spread);
            ctx.scale(scale, scale);
            drawBranch(layers - 1);
            ctx.restore();

            ctx.save();
            ctx.translate(size - (size/branches) * i, 0);
            ctx.rotate(-spread);
            ctx.scale(scale, scale);            
            drawBranch(layers - 1);
            ctx.restore();
        }
    }

    function drawFractal() {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2, canvas.height/2);
        for(let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(layers);
        }
        ctx.restore();
    }

    drawFractal();

});