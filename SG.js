// Constants and Variables
var lastRender = 0;
var fps = 0; //Changes wrt user difficulty selection in difficulty()
var gameContainer = document.querySelector('.gameContainer');

// Array to store all snake elements
var snakeArr = [
    { x: 8, y: 8 }

]

// Food particle position( dynamically genertaed)
var food = { x: Math.floor(Math.random() * (16 - 1 + 1)) + 1, y: Math.floor(Math.random() * (16 - 1 + 1)) + 1 }


// Direction object
direction = { x: 0, y: 0 }






// Game loop
function loop(currentTime) {

    // Function to make user select dufficulty
    difficulty()


    window.requestAnimationFrame(loop)

    if ((currentTime - lastRender) / 1000 < 1 / fps) return;

    lastRender = currentTime;


    update() //Update any changes
    display() //Display those changes


}

function display() {

    // Clearing all previous divs
    gameContainer.innerHTML = '';

    // displaying the snake 
    snakeArr.forEach(
        (e, idx) => {
            // Creating snake div/s
            const snakeElem = document.createElement('div');

            // Seperating the head and body through diff. colors
            if (idx === 0) {

                snakeElem.classList.add('snake');
                snakeElem.style.borderRadius = '5px';
            } else {
                snakeElem.classList.add('sBody')
                snakeElem.style.borderRadius = '5px';
            }


            // Positioning the div/s
            snakeElem.style.gridColumnStart = e.x;

            snakeElem.style.gridRowStart = e.y;


            // Append the div/s to gameContainer
            gameContainer.appendChild(snakeElem)
        }
    )

    // Displaying the food particle



    // Creating the food div
    const foodElem = document.createElement('div');
    foodElem.classList.add('food');
    foodElem.style.borderRadius = '5px';

    // Positioning the food particle
    foodElem.style.gridColumnStart = food.x;
    foodElem.style.gridRowStart = food.y;

    // Appending the food to gameContainer
    gameContainer.appendChild(foodElem)


    
    
    // MOVING THE SNAKE
    // Make the other body elements follow the previous one

    for (var i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    // Make the snake head move(w.r.t direction object)
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Display Score
    let topScore = document.getElementById('SCORE');
    topScore.innerText = score;

    // Game Over on leaving play area
    gameOverPlayArea()

    // Game Over on eating its own body
    gameOverOwnBody()


    window.stopAnimationFrame(loop);

}

function update() {



    // Adding to the snake body upon eating food
    addSnake()

    // update score
    score = snakeArr.length - 1;







}


window.requestAnimationFrame(loop) //Start the game loop





// Game Functions
function addSnake() {
    // Snake head and Food should be on the same div
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x, y: snakeArr[0].y })


        // Relocate food particle

        food = { x: Math.floor(Math.random() * (16 - 1 + 1)) + 1, y: Math.floor(Math.random() * (16 - 1 + 1)) + 1 }
    }

}

// EVENT LISTENERS
// keyboard key event listeners
window.addEventListener('keydown', updateDirections)

// Update Directions
function updateDirections(e) {
    switch (e.key) {
        case 'ArrowUp':
            up()
            break;

        case 'ArrowDown':
            down()
            break;
        case 'ArrowLeft':
            left()
            break;
        case 'ArrowRight':
            right()
            break;


    }
}

// Screen keys event listeners
document.querySelector('.left').addEventListener('click', left)
document.querySelector('.right').addEventListener('click', right)
document.querySelector('.down').addEventListener('click', down)
document.querySelector('.up').addEventListener('click', up)

// Defining movement functions
function up() {
    if(direction.y === 1) return //Prevent 180 deg turn
    direction = { x: 0, y: -1 }
}
function down() {
    if(direction.y === -1) return //Prevent 180 deg turn
    direction = { x: 0, y: 1 }
}
function right() {
    if(direction.x === -1) return  //Prevent 180 deg turn
    direction = { x: 1, y: 0 }
}
function left() {
    if(direction.x === 1) return //Prevent 180 deg turn
    direction = { x: -1, y: 0 }
}

// Function for game over(going outside play area)
function gameOverPlayArea() {

    if (snakeArr[0].x > 17 || snakeArr[0].x <= -1 || snakeArr[0].y > 17 || snakeArr[0].y <= -1) {

        gameOver()
    }
}


// Function for game over(eating its own body)
function gameOverOwnBody() {

    //Only run when there is more than just the head element in snakeArr
    if (snakeArr.length >= 2) {
        let newArr = snakeArr.slice(); // Create a replica if snakeArr
        const head = newArr.shift();     // Remove the head element

        newArr.forEach(bodyPart => {
            if (head.x === bodyPart.x && head.y === bodyPart.y) {
                gameOver()
            }
        })

    }

}

function gameOver() {

    // Display score on game over popup
    let popupScore = document.getElementById('score');
    popupScore.innerText = score;
    // location.reload()

     // Make popup container visible
    let popup = document.querySelector('.popup');
    popup.style.display = 'flex';


    // Cancel popup and reload page

    let x = document.getElementById('replay');
    x.addEventListener('click', ()=>{
        location.reload();
    })





    


}

// Difficulty selector function
function difficulty(){
    const begin = document.getElementById('beginner');
    const inter = document.getElementById('inter');
    const pro = document.getElementById('pro');
    const difficultyPopup = document.getElementById('difficultySelector');

    begin.addEventListener('click', ()=>{
        fps = 3;

        difficultyPopup.style.display = 'none';

    });

    inter.addEventListener('click', ()=>{
        fps = 5;

        difficultyPopup.style.display = 'none';

    });

    pro.addEventListener('click', ()=>{
        fps = 8;

        difficultyPopup.style.display = 'none';

    })
}