const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

// const networkCanvas = document.getElementById("networkCanvas");
// networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const N = 25;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.1);
    }
  }
}

const traffic = [];
const numCars = 2100;
const startY = -50000;
const yInterval = 170;

for (let i = 0; i < numCars; i++) {
  traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * 3)), startY + i * yInterval, 30, 50, "DUMMY", 2));
}

// const traffic = [
//   new Car(road.getLaneCenter(2), -250, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -400, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -600, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -1000, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -1200, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -1300, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -1400, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -1560, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -1800, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -2100, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -2300, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -2300, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -2455, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -2455, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -2655, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(0), -2855, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -3555, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -3755, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(2), -3785, 30, 50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1), -3850, 30, 50, "DUMMY", 2)
// ];


animate();

function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

// function discard() {
//   localStorage.removeItem("bestBrain");
// }

function generateCars(N) {
  const cars = [];
  for (let i = 1; i < N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
  }
  return cars;
}

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "green");
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "blue");
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, "blue", true);

  carCtx.restore();

  //Visualizer.drawNetwork(networkCtx, bestCar.brain);
  requestAnimationFrame(animate);
}
