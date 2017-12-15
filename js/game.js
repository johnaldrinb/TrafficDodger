var gameCanvas = document.querySelector("canvas");
var drawingSurface = gameCanvas.getContext("2d");

drawingSurface.font = "20pt Courier New";
drawingSurface.textAlign = "center";
drawingSurface.fillStyle = "white";

var roadImage1 = new Image();
var roadImage2 = new Image();
var carImage = new Image();

roadImage1.addEventListener("load", onRender, false);
roadImage1.src = "res/img/road/asphalt-lined.png";

roadImage2.addEventListener("load", onRender, false);
roadImage2.src = "res/img/road/asphalt-lined.png";

carImage.addEventListener("load", onRender, false);
carImage.src = "res/img/cars/Audi.png";

window.addEventListener("keydown", keydownHandler, false);

// game objects
var game = 
{
	running: false,
	start: true,
	fps: 120
};

var car = 
{
	direction: "left", 
	status: "alive",
	carType: "Audi",
	isMoving: "false",
	lane: 0,
	x: 30,
	y: 400
};

var road1 = 
{
	x: 0,
	y: -gameCanvas.height
}

var road2 = 
{
	x: 0,
	y: 0
}


//environment variables
var roadSpeed = 10;
var carSpeed = 2;
var lane = [30,110,250, 340];

function clearCanvas(){

	drawingSurface.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

}

function drawRoads(){
	
	console.log("drawing roads...");

	drawingSurface.drawImage
	(
		roadImage1,
		0, 0, 892, 892,
		road1.x, road1.y, gameCanvas.width, gameCanvas.height
	);

	drawingSurface.drawImage
	(
		roadImage2,
		0, 0, 892, 892,
		road2.x, road2.y, gameCanvas.width, gameCanvas.height
	);

}

function drawCar(){

	//car.isMoving = false;

	if(car.isMoving === true){

		drawingSurface.save();

		var angle = 0;

		if(car.direction === "left"){

			angle = 50;
			drawingSurface.translate(car.x - 5, car.y+ 20);

		} else if(car.direction === "right"){

			angle = -50;
			drawingSurface.translate(car.x + 50, car.y- 15);

		}

		drawingSurface.rotate(angle);
		drawingSurface.drawImage
		(
			carImage, 
			0, 0, 180, 250,
			0, 0, 100, 150
		);

		console.log(car.direction);

		drawingSurface.translate( -(car.x + (100 * 0.5)), -(car.y+ (150 * 0.5)));
		drawingSurface.restore();

	} else{

		drawingSurface.drawImage
		(
			carImage, 
			0, 0, 180, 250,
			car.x, car.y, 100, 150
		);

	}

}

function updateRoad(){

	road1.y = road1.y + roadSpeed;
	road2.y = road2.y + roadSpeed;

	if(road1.y >= gameCanvas.height){
		road1.y = -gameCanvas.height;

	} else if(road2.y >= gameCanvas.height){
		road2.y = -gameCanvas.height;

	}

}

function updateCarPos(){

	if(car.direction === "left"){

		car.x = car.x - carSpeed;
		car.isMoving = true;

		if(car.lane === 0){
			if(car.x < lane[0]){
				car.x = lane[0];
				car.isMoving = false;
			}

		} else if(car.lane === 1){
			if(car.x < lane[1]){
				car.x = lane[1];
				car.isMoving = false;
			}

		}  else if(car.lane === 2){
			if(car.x < lane[2]){
				car.x = lane[2];
				car.isMoving = false;
			}

		} 

	} else if(car.direction === "right"){

		car.x = car.x + carSpeed;
		car.isMoving = true;

		if(car.lane === 1){
			if(car.x > lane[1]){
				car.x = lane[1];
				car.isMoving = false;
			}

		} else if(car.lane === 2){
			if(car.x > lane[2]){
				car.x = lane[2];
				car.isMoving = false;
			}

		}  else if(car.lane === 3){
			if(car.x > lane[3]){
				car.x = lane[3];
				car.isMoving = false;
			}

		}  

	}
}

function keydownHandler(event){

	console.log(event);

	if(event.key === "ArrowRight"){

		//car.x = car.x + 10;
		car.direction = "right";
		car.lane = car.lane + 1;
		if(car.lane > 3) car.lane = 3;

		console.log(car.x + "lane: " + car.lane);

	} else if(event.key === "ArrowLeft"){

		//car.x = car.x - 10;
		car.direction = "left";
		car.lane = car.lane - 1;
		if(car.lane < 0) car.lane = 0;

		console.log(car.x + "lane: " + car.lane);

	} else if(event.key === " "){

		console.log("space pressed");

		if(game.running === false){
			game.running = true;
			console.log("running");

		} else if(game.running === true){
			game.running = false;
			console.log("not running");

		}

	}
}

function onUpdate(){

	updateRoad();
	updateCarPos();

}

function onRender(){

	clearCanvas();
	drawRoads();
	drawCar();



}

function drawMessage(message){

	drawingSurface.fillText(message, gameCanvas.width * 0.5, gameCanvas.height * 0.5);

}

function run(){

	console.log(game.running);

	if(game.running === true){

		onUpdate();
		onRender();

	} else {

		drawMessage("Press 'space' to start");

	}	

}

window.setInterval(run, 1000 / game.fps);
