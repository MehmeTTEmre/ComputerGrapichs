var gl;
var theta; 
var otelemeLoc;

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	
	// Only continue if WebGL is available and working
	if (!gl) {
		alert("Unable to initialize WebGL. Your browser or machine may not support it.");
		return;
	}
	var program = initShaders(gl, "vertex-shader" , "fragment-shader" );  
	gl.useProgram( program );
	
	delay = 100;
	var hiz = document.getElementById("slide").onchange = function() {delay = this.value;};

	var startButton = document.getElementById("start");
	direction = false;
	startButton.addEventListener("click", function(){
		if(event.button == 0){
			direction = !direction;}
	});

	buyutFonk = gl.getUniformLocation(program,"SizeB");
	buyuk = 1;
	var button = document.getElementById("büyüt"); 
	button.addEventListener("click",function() {
		gl.uniform1f(buyutFonk,buyuk=buyuk*1.2);
	});
	
	kucultFonk = gl.getUniformLocation(program,"SizeK");
	kucuk = 1;
	var button = document.getElementById("küçült"); 
	button.addEventListener("click",function() {
		gl.uniform1f(kucultFonk,kucuk=kucuk*0.80);
	});

	otelemeX=0.1,otelemeY=0.1;
	window.addEventListener("keydown", function (event) {
        switch (event.key) {
          case "ArrowDown":
            otelemeY -= 0.1;
            break;
          case "ArrowUp":
            otelemeY += 0.1;
            break;
          case "ArrowLeft":
              otelemeX -= 0.1;
            break;
          case "ArrowRight":
            otelemeX += 0.1;
            break;
          default:
            return;
        };
    })

	document.getElementById("kirmizi").onchange = function(){
		kirmizi = this.value;
		kirmiziLoc = gl.getUniformLocation(program, "Red");
		gl.uniform1f(kirmiziLoc, kirmizi);
	};

	document.getElementById("yesil").onchange = function(){
		yesil = this.value;
		yesilLoc = gl.getUniformLocation(program, "Green");
		gl.uniform1f(yesilLoc, yesil);
	};

	document.getElementById("mavi").onchange = function(){
		mavi = this.value;
		maviLoc = gl.getUniformLocation(program, "Blue");
		gl.uniform1f(maviLoc, mavi);
	};

	//initial square vertex coordinates
	var vertices = [vec2(-0.8, 0.5),vec2(-0.8, -0.7),vec2(-0.7, -0.7),
					vec2(-0.8, 0.5),vec2(-0.7, 0.5),vec2(-0.7, -0.7),
					vec2(-0.7, 0.5),vec2(-0.7, 0.0),vec2(-0.5, 0.0),
					vec2(-0.7, 0.0),vec2(-0.5, -0.4),vec2(-0.5, 0.0),
					vec2(-0.5, 0.0),vec2(-0.3, 0.5),vec2(-0.3, 0.0),
					vec2(-0.5, 0.0),vec2(-0.3, 0.0),vec2(-0.5, -0.4),
					vec2(-0.2, 0.5),vec2(-0.3, 0.5),vec2(-0.2, -0.7),
					vec2(-0.3, 0.5),vec2(-0.3, -0.7),vec2(-0.2, -0.7),

					vec2(0.0, 0.5),vec2(0.0, -0.7),vec2(0.1, -0.7),
					vec2(0.0, 0.5),vec2(0.1, 0.5),vec2(0.1, -0.7),
					vec2(0.1, 0.5),vec2(0.3, -0.2),vec2(0.1, 0.0),
					vec2(0.1, 0.0),vec2(0.3, -0.7),vec2(0.3, -0.2),
					vec2(0.3, -0.7),vec2(0.3, 0.5),vec2(0.4, -0.7),
					vec2(0.3, 0.5),vec2(0.4, 0.5),vec2(0.4, -0.7)];					
	
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	theta = 0;
	gl.uniform1f(thetaLoc, theta);

	//öteleme
	otelemeLoc = gl.getUniformLocation(program,"oteleme");
	gl.uniform4f(otelemeLoc, otelemeX, otelemeY, 0.0, 0.0);

	// Set clear color to black, fully opaque
	gl.clearColor( 0.9 , 0.9 , 0.9 , 1.0 );
	requestAnimFrame(render);
};

function render(){
	// Clear the color buffer with specified clear color
	setTimeout(function() {
	gl.uniform4f(otelemeLoc, otelemeX, otelemeY, 0.0, 0.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	theta += (direction ? 0.1 : 0.0);
	gl.uniform1f(buyutFonk,buyuk);
	gl.uniform1f(kucultFonk,kucuk);
	gl.uniform1f(thetaLoc, theta);
	gl.drawArrays(gl.TRIANGLES, 0, 42);
	requestAnimFrame(render);
	}, delay);
}