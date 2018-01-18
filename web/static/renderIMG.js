function convertImageToCanvas(res) {
    var color = res['color'];
    var width = res['header'][1];
    var height = res['header'][0];
	var canvas = document.getElementById("myCanvas");
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	buffer = new Uint8ClampedArray(width*height*4);
	for(var j = width-1; j >=0; j--) {
         for(var i = height-1; i >=0; i--){
            var pos = (i * width + j) * 4; // position in buffer based on x and y
            buffer[pos  ] = color[i][j][0];           // some R value [0, 255]
            buffer[pos+1] = color[i][j][1];           // some G value
            buffer[pos+2] = color[i][j][2];           // some B value
            buffer[pos+3] = 255;           // set alpha channel
        }
    }
    var idata = ctx.createImageData(width, height);
    // set our buffer as source
    idata.data.set(buffer);
    // update canvas with new data
    //ctx.scale(0.1,0.1);
    ctx.putImageData(idata, 0, 0);
    image = new Image();
    image.onload = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //ctx.rotate(Math.PI);
        canvas.width = 0.3*width;
	    canvas.height = 0.3*height;
        ctx.scale(0.3,0.3);
        ctx.drawImage(image,0,0);
    }
    image.src = canvas.toDataURL();
    
	//ctx.drawImage(image, 0, 0,width/10,height/10);
    /*
    var newCanvas = document.getElementById("newCanvas");
    newCanvas.width = width/10;
    newCanvas.height = height/10;
    var newctx = newCanvas.getContext("2d");
    
    newctx.drawImage(image,0,0,width/10,height/10);
    */
    //document.getElementById("container").appendChild(newCanv);

	//return canvas;
}


function rotateImg(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var rotateImage = document.createElement("button");
    rotateImage.innerHTML = "Rotate the image 180 degree";
    var container = document.getElementById("container");
    container.appendChild(rotateImage);
    
    rotateImage.onclick = function(){
        var img = new Image();
        img.src = canvas.toDataURL();
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(img,0,0);
    }
}





















/*
	var r,g,b;
	for(var i=0;i<height/10;i++){
	    for(var j=0;j<width/10;j++){
	        r = color[i][j][0];
	        g = color[i][j][1];
	        b = color[i][j][2];
	        ctx.fillStyle = "rgba("+r+","+g+","+b+",1)";
	        ctx.fillRect(j,i,1,1)
	    }
	}
	*/
