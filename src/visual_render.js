/*
TODO: 
1) Get the slider functionalities working
4) Get the slider positions to be correct 
*/

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const logoHeight = this.document.getElementById('logo').offsetHeight;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight - logoHeight;
    canvas.style.top = logoHeight + "px";     
    
    //canvas settings
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    
    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.15 : canvas.height * 0.15;
    let sides = 6;
    let layers = 5;
    let scale = 0.5;
    let spread = 0.2; // 0.1 - 2.5
    let branches = 4;
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