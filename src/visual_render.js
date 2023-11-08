import music from './music.js';

function sizeScale(width, height) {
    return Math.ceil((height/width) * 100) + "%";
}

['load', 'resize'].forEach(function(e) {
    window.addEventListener(e, function() {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');

        let backgroundSize = window.innerWidth < window.innerHeight ? sizeScale(window.innerWidth, window.innerHeight) : "cover";
        document.body.style.backgroundSize = backgroundSize;

        const logoHeight = this.document.getElementById('logo').offsetHeight;
        canvas.width = window.innerWidth * 0.8;
        canvas.height = (window.innerHeight - logoHeight) * 0.7;
        canvas.style.top = logoHeight + "px";     
        
        //canvas settings
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';

        //effect settings
        let size = canvas.width < canvas.height ? canvas.width * 0.25 : canvas.height * 0.25;
        let sides = 5;
        let layers = 3;
        let scale = 0.5;
        let spread = 0.5; // 0.1 - 2.5
        let branches = 3;
        let color = 345;
        let hslColor = 'hsl(' + color + ', 80%, 70%)';

        const playButton = document.getElementById('listen');
        console.log(Tone.context.state);
        playButton.addEventListener('click', () => {
            if (Tone.context.state != "running") {
                Tone.start();
            }
            music().playNote();
        });
        
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

        const spreadRange = document.getElementById('spread');
        spreadRange.addEventListener('change', function(f) {
            spread = f.target.value;
            drawFractal();
        });

        const branchesRange = document.getElementById('branches');
        branchesRange.addEventListener('change', function(f) {
            branches = f.target.value;
            drawFractal();
        });

        const colorRange = document.getElementById('color');
        colorRange.addEventListener('change', function(f) {
            color = f.target.value;
            hslColor = 'hsl(' + color + ', 80%, 70%)';
            drawFractal();
        });

        function drawSide(layers) {
            if(layers == 0) return;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(size, 0);
            ctx.stroke();
            for(let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(size - (size/branches) * i, 0);
                ctx.scale(scale, scale);

                ctx.save();
                ctx.rotate(spread);
                drawSide(layers - 1);
                ctx.restore();
    
                ctx.save();
                ctx.rotate(-spread);
                drawSide(layers - 1);
                ctx.restore();
                
                ctx.restore();
            }
        }
    
        function drawFractal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.strokeStyle = hslColor;
            ctx.translate(canvas.width/2, canvas.height/2);
            for(let i = 0; i < sides; i++) {
                ctx.rotate((Math.PI * 2)/sides);
                drawSide(layers);
            }
            ctx.restore();
        }
    
        drawFractal();
    
    });
});
