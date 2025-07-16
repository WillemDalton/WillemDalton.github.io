let balls = document.querySelector(".balls")
let canvas = document.querySelector(".ballCanvas")
let body = document.querySelector("body");
const NPOINTS = 25;
const MAXBALLS = 175;
let ballCount = 0;

// start the simulation.
let start = () => {
    while(ballCount < MAXBALLS)
    {
        let x = Math.ceil(Math.random() * screen.width);
        let y = Math.ceil(Math.random() * screen.height);
        let r = Math.ceil(Math.random() * 100) + 50;
        generateNewBall(x, y ,r, 10, NPOINTS);
        ballCount++;
    }
}

// generate a new ball at coordinates (x,y) with radius r and n number vertices. Let's have v variation (in pixels) of how much we want points to deviate from a circle.
let generateNewBall = (x, y, r, v, npoints) => {
    let ball = document.createElementNS("http://www.w3.org/2000/svg", "path")
    ball.setAttribute("id", "ball");
    let points = [];
    
    // lets first generate the vertices for the outline of the circle, with some variation.
    let i = 0; 
    let theta = 0; 
    while(i < npoints)
    {
        let variation = Math.ceil(Math.random(0,1) * v) * (Math.round(Math.random()) * 2 - 1)  

        // our relative points (x2, y2). we need to translate to absolute points so we add x and y.
        let x2 = Math.round(Math.cos(theta) * (r + variation));
        let y2 = Math.round(Math.sin(theta) * (r + variation));

        theta += Math.PI * 2 / npoints;
        points.push([x + x2, y + y2]);
        i++; 
    }
    
    // start the line.
    let path = "M" + points[0][0] + " " + points[0][1];
    
    // now use bezier quadratic curves at midpoints between two points for smoothing
    for(let j = 1; j <= points.length; j++)
    {
        let p1 = points[j % points.length];
        let p0 = points[j -1];

        // midpoint (mx, my)
        let mx = (p1[0] + p0[0])/2
        let my = (p1[1] + p0[1])/2

        path += " Q " + p0[0] + " " + p0[1] + " " + mx + " " + my;
    }
 
    // end path and set attributes
    path += " Z";
    ball.setAttribute("d", path);
    balls.appendChild(ball);

    let animation = createTranslate(x, y, 20);
    ball.appendChild(animation);
}

// lets have our balls follow a path. 
let createTranslate = (x, y, npoints) => {
    const RADIUS = 250;
    const VARIATION = 100;
    let direction = (Math.round(Math.random()) * 2 - 1) ;

    let animationElement = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");

    animationElement.setAttribute("begin", "0s");
    animationElement.setAttribute("dur", "600s");
    animationElement.setAttribute("repeatCount", "indefinite");

    let path = "M" + x + " " + y;
    let i = 0; 
    let theta = Math.random() * 360; 
    while(i < npoints)
    {
        let variation = Math.ceil(Math.random(0,1) * VARIATION) * (Math.round(Math.random()) * 2 - 1)  

        // our relative points (x2, y2). we need to translate to absolute points so we add x and y.
        let x2 = Math.round(Math.cos(theta) * (RADIUS + variation));
        let y2 = Math.round(Math.sin(theta) * (RADIUS + variation));
        theta += Math.PI * 2 / npoints * direction;

        path += "L " + (x + x2) + " " + (y + y2);
        i++;
    }

    path += " Z";
    animationElement.setAttribute("path", path);

    return animationElement;
}

start();