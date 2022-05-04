class Dino{
    constructor(dinoElement, dinoJumpStepSpeed = 20, jumpStepHeigh = 20, jumpMaxHeigh = 200){
        this.dinoElement = dinoElement;
        this.dinoJumpStepSpeed = dinoJumpStepSpeed;
        this.jumpStepHeigh = jumpStepHeigh;
        this.jumpMaxHeigh = jumpMaxHeigh;
        this.isJumping = false;
    }

    updateDinoPostion(position){
        this.dinoElement.style.bottom = position + 'px';
    }

    jump(){
        this.isJumping = true;
        let position = 0;
        let movePositionUp = setInterval(() => {
            if(position < this.jumpMaxHeigh){
                position += this.jumpStepHeigh;
                this.updateDinoPostion(position);
            } else {
                clearInterval(movePositionUp);
                this.land(position);
            }
        }, this.dinoJumpStepSpeed)
    }
    
    land(position){
        let movePositionDown = setInterval(() => {
            if(position - this.jumpStepHeigh >= 0){
                position -= this.jumpStepHeigh;
                this.updateDinoPostion(position);
            } else {
                clearInterval(movePositionDown);
                this.isJumping = false;
            }
        }, this.dinoJumpStepSpeed)
    }  
}

class Cactus{
    constructor(backgroundElement, callbackCollisionHandler, cactusShiftSpeed = 20, leftShift = 20){
        this.backgroundElement = backgroundElement;
        this.callbackCollisionHandler = callbackCollisionHandler;
        this.cactusShiftSpeed = cactusShiftSpeed;
        this.leftShift = leftShift;
        this.createCactus();
        this.startMovingLeft();
    }

    createCactus(){
        this.cactusElement = document.createElement('div');
        this.cactusElement.classList.add('cactus');
        this.backgroundElement.appendChild(this.cactusElement);
    }

    startMovingLeft(){
        let position = this.cactusElement.offsetLeft;
        let moveLeft = setInterval(() => {
            position -= this.leftShift;
            this.cactusElement.style.left = position + 'px';

            if(position < 200 && position > 100){ //mudar valores para %
                this.callbackCollisionHandler();
            }

            if(position < this.cactusElement.clientWidth * -1){
                clearInterval(moveLeft);
                this.backgroundElement.removeChild(this.cactusElement);
            }
        }, this.cactusShiftSpeed)
    }
}

const KEY_CODES_JUMP = [32, 38, 87];

const backgroundElement = document.querySelector('.background');
const dinoElement = document.querySelector('.dino');
const dino = new Dino(dinoElement);

document.addEventListener('keyup', keyUpHandler);

function keyUpHandler(event){
    if(!dino.isJumping && KEY_CODES_JUMP.includes(event.keyCode)){
        dino.jump();
    }
}

function collisionHandler(){
    if(!dino.isJumping){
        document.body.innerHTML = '<h1 class="gameOver">Game Over</h1>'
    }
}

(function loop(){
    const cactus = new Cactus(backgroundElement, collisionHandler);
    setTimeout(loop, 500 + (Math.random() * 1500));
})();















