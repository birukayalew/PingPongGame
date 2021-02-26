// fetching from the document
const canvas = document.querySelector("#canva");
// // getting the context of the canvas
const ctx = canvas.getContext("2d");

localStorage.setItem('result',JSON.stringify(0));
let paused = false;
const board = document.querySelector('.board');







document.addEventListener('keyup',function(e){
    if(e.which === 32){
        if(paused){
            resume();
        }
        else{
            pauseGame("Game Paused");
        }
    }
});
function resume(){
    paused = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    canvas.style.opacity = 1;
    interval = setInterval(game,1000/frame)

}
function pauseGame(text){
    clearInterval(interval);
    paused = true;
    canvas.style.opacity = 1;
    ctx.font = "90px tahoma";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0"," magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.fillText(text,300,200)
    
}






// welcome page
const welcome = document.querySelector('.splash');
const sayHello = function hello() {
    return function(){
        document.addEventListener('DOMContentLoaded',(e) => {
            setTimeout(() => {
                welcome.classList.add('display-none');
            },4000);
            pauseGame("Kick Off");
        })
    }
    
}
const myFunc = sayHello();
myFunc();








class Rectangle{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    drawRectangle(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
class DividerNet extends Rectangle{
    constructor(x,y,width,height,color){
        super(x,y,width,height,color);
    }
    drawNet(){
        for(let i = 0; i <= canvas.height; i += 15){
            let rect = new Rectangle(this.x,this.y+i,this.width,this.height,this.color);
            rect.drawRectangle();
        }
    }
}
class Ball{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.color = color;
        
    }
    drawBall(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);  
        // x position, y position,radius,start_angle,end_angle
        ctx.closePath();
        ctx.fill();
    }
}
class Text{
    constructor(x,y,text,color,){
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
    }
    drawScore(){
        ctx.fillStyle = this.color;
        ctx.font = "20px Arial";
        ctx.fillText("score:"+this.text,this.x,this.y)
    }
    drawLives(){
        ctx.fillStyle = this.color;
        ctx.font = "20px Arial";
        ctx.fillText("Lives:"+this.text,this.x,this.y)
    }
}
class Over{
    constructor(x,y,text,color,){
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.font = "20px Arial";
        ctx.fillText(this.text,this.x,this.y)
    }
}

const User = {
    x: 0,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0, 
    lives: 3
}
const AI = {
    x: canvas.width - 10,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0 
}
const ball ={
    x: canvas.width/2,
    y: canvas.height/2,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    radius: 10,
    color: "WHITE"
}



class Main{
    display(){

        let rect = new Rectangle(0, 0, canvas.width, canvas.height, "#000");
        let Utexts = new Text(canvas.width/8,canvas.height/5,User.score,"WHITE");
        let Utextl = new Text(canvas.width/4,canvas.height/5,User.lives,"WHITE")
        let Atext = new Text((3*canvas.width)/4,canvas.height/5,AI.score,"WHITE");
        let Upaddle = new Rectangle(User.x,User.y,User.width,User.height,User.color)
        let Apaddle = new Rectangle(AI.x,AI.y,AI.width,AI.height,AI.color);
        let b = new Ball(ball.x,ball.y,ball.radius,ball.color);
        let net = new DividerNet((canvas.width/2)-1,0,2,10,"WHITE")
        
        
        
        rect.drawRectangle();
        Utexts.drawScore();
        Utextl.drawLives();
        Atext.drawScore();
        net.drawNet();
        Upaddle.drawRectangle();
        Apaddle.drawRectangle();
        b.drawBall();
        // U.draw();

    }

    // // listening to the mouse
    getMousePosition(evt){
        let rect = canvas.getBoundingClientRect();
        User.y = evt.clientY - rect.top - User.height/2;
    }

    // reseting position of the ball
    resetPosition(){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.velocityX = -ball.velocityX;
        ball.speed = 7;
    }

    // collision detection
    collision(ball,player){
        player.top = player.y;
        player.bottom = player.y + player.height;
        player.left = player.x;
        player.right = player.x + player.width;

        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;
        return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
    }
    myTag(strings,score) {
        let str0 = strings[0];
        return `${str0}${score};`
    }
    Onupdate(){
            let result = Number(localStorage.getItem('result'));
            localStorage.setItem('result',JSON.stringify(Math.max(result,User.score)));
            let output = this.myTag`High Score: ${localStorage.getItem('result')}`;
            board.innerHTML = `<div style="font-family:georgia,garamond,serif;font-size:32px;font-style:italic;color: white;">${output}</div>`
            ball.x += ball.velocityX;
            ball.y += ball.velocityY;
        
            if( ball.x - ball.radius < 0 ){
                
                AI.score++;
                User.lives--;
                if(!User.lives) {
                    alert("GAME OVER");
                    
                    User.score = 0;
                    AI.score = 0;
                    User.lives = 3;
                   
                    
                    
                   
                }
                this.resetPosition();
            }
            else if( ball.x + ball.radius > canvas.width){
                User.score++;
                this.resetPosition();
            }

             // to beat the computer
            AI.y += ((ball.y - (AI.y + AI.height/2)))*0.1;
            // collision down and up
            if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
                ball.velocityY = - ball.velocityY;
            }
            
            let player = (ball.x < canvas.width/2)? User : AI;

            if(this.collision(ball,player)){
                let Cpoint = (ball.y - (player.y + player.height/2));
                
                Cpoint = Cpoint / (player.height/2);
                let angle = (Math.PI/4) * Cpoint;
                // change the X and Y velocity direction
                let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
                ball.velocityX = direction * ball.speed * Math.cos(angle);
                ball.velocityY = ball.speed * Math.sin(angle);
                
                // speed up the ball everytime a paddle hits it.

                ball.speed += 0.1;
            }
        }
}
function game(){
    const pong = new Main();
    canvas.addEventListener("mousemove", pong.getMousePosition);
    pong.display();
    pong.Onupdate();
    
}
const frame = 52;
let interval = setInterval(game,1000/frame); // call the game 52 times every 1 sec 

