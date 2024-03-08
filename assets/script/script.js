document.addEventListener('DOMContentLoaded', function() {
    if (document.title == "Hangman") {
        var audio = new Audio("assets/audio/bg.ogg");
    } else {
        var audio = new Audio("../assets/audio/bg.ogg");
    }
    
    audio.loop = true;
    window.addEventListener('click', function() {
        var playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(function() {
            }).catch(function(error) {
                console.log('Playback failed due to', error);
            });
        }
    }, { once: true });
});

function play(btn) {
    if (btn.textContent == "Animals") {
        console.log("Animals")
        localStorage.setItem('selectedCategory', 0);
    } else if (btn.textContent == "Fruits") {
        console.log("Fruits")
        localStorage.setItem('selectedCategory', 1);
    } else if (btn.textContent == "Video Games") {
        console.log("Video Games")
        localStorage.setItem('selectedCategory', 2);
    } else if (btn.textContent == "Countries") {
        console.log("Countries")
        localStorage.setItem('selectedCategory', 3);
    } else if (btn.textContent == "Songs") {
        console.log("Songs")
        localStorage.setItem('selectedCategory', 4);
    }
    window.location.href = "html/game.html";
}

const HANGMAN_PICS = [
    `
    +---+
    |      |
    |
    |
    |
    |
    =========
    `,
    `
    +---+
    |      |
    |      O
    |
    |
    |
    =========
    `,
    `
    +---+
    |      |
    |      O
    |      |
    |
    |
    =========
    `,
    `
    +---+
    |      | 
    |      O 
    |    /|
    |
    |
    =========
    `,
    `
    +---+
    |      |
    |      O
    |    /|\\
    |
    |
    =========
    `,
    `
    +---+
    |      |
    |      O
    |    /|\\
    |     /
    |
    =========
    `,
    `
    +---+
    |      |
    |      O
    |    /|\\
    |     /\\
    |
    =========
    `
];

const animals = ["Dog", "Cat", "Lion", "Elephant", "Bear", "Penguin", "Snake", "Dolphin", "Monkey", "Tiger", "Bear", "Tortoise", "Axolotl",
    "Whale", "Shark", "Camel", "Capybara", "Bird", "Squid", "Octopus", "Seal", "Crocodile", "Deer", "Duck", "Gorilla", "Wolf", "Fox"];
const fruits = ["Apple", "Banana", "Orange", "Strawberry", "Grapes", "Mango", "Pineapple", "Kiwi", "Watermelon", "Raspberry", "Blueberry"];
const videoGames = ["Fortnite", "Minecraft", "Call of Duty", "The Sims", "Overwatch", "League of Legends", "CSGO",
    "Grand Theft Auto V", "Super Mario Bros", "The Last of Us", "Pokemon", "Valorant", "Donkey Kong", "Uncharted", "Apex Legends", "Starcraft",
    "Red Dead Redemption", " Metal Gear Solid", "Tetris", "God of War", "Portal"];
const countries = ["United States", "Canada", "United Kingdom", "Australia", "France", "Germany", "Italy", "Spain", "Japan", "China", "India", "Afghanistan",
    "Albania", "Egypt", "Iran", "Ireland", "Mexico", "North Korea", "Turkey", "Russia", "Zimbabwe", "Finland", "Iceland", "Cuba", "Cambodia", "Brazil"];
const songs = ["Hotel California", "Hey Daddy", "Love", "Glimpse of Us", "Until I Found You", "Cant help falling in love", "Yellow", "Still Into You",
    "Complicated", "One of the Girls", "Come Inside of My Heart", "Take A Chance With Me", "Unforgiven", "Perfect Night", "ETA", "ASAP", "homebdy", "Always",
    "Tek it", "Heaven Sent", "Those Eyes", "NVMD", "As It Was", "When Scars Become Art", "Heat Waves", "Fallen", "bad", "Light", "My Love Mine All Mine"]

var savedWo = localStorage.getItem('selectedCategory');;
var wo;

function randomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

if (savedWo == 0) {
    wo = randomWord(animals);
} else if (savedWo == 1) {
    wo = randomWord(fruits);
} else if (savedWo == 2) {
    wo = randomWord(videoGames);
} else if (savedWo == 3) {
    wo = randomWord(countries);
} else if (savedWo == 4) {
    wo = randomWord(songs);
}

var attempts = 0;
if (wo != undefined) {
    console.log(wo);
    var guessWord = wo.toUpperCase();
    var wordDisplay = guessWord.split('').map(char => char === ' ' ? ' ' : '_');
}

function displayWord() {
    const display = document.getElementById('word');
    if (display && wo != undefined) {
        display.textContent = wordDisplay.join(' ');
    }
}
displayWord();

function key(keyBtn) {
    var guess = keyBtn.textContent;
    var word = guessWord;
    var ex = new Audio("../assets/audio/wrongLetter.wav");
    var nice = new Audio("../assets/audio/correctLetter.wav");
    var win = new Audio("../assets/audio/win.wav");
    var loss = new Audio("../assets/audio/loss.wav");

    if (!word.includes(guess)) {
        ex.play();
        attempts++;
    } else {
        nice.play();
        var index = word.indexOf(guess);
        while (index !== -1) {
            var displayIndex = guessWord.indexOf(guess, index);
            wordDisplay[displayIndex] = guess;
            index = word.indexOf(guess, index + 1);
        }

        displayWord();

        if (!wordDisplay.includes('_')) {
            win.play();
            document.getElementById("mes").innerHTML = "Congratulations You won!"
            document.getElementById("confirmation").style.display = "flex";
        }
    }
    keyBtn.disabled = true;


    var hm = document.getElementById("hm")

    if (attempts == 1) {
        hm.textContent = HANGMAN_PICS[1];
    } else if (attempts == 2) {
        hm.textContent = HANGMAN_PICS[2];
    } else if (attempts == 3) {
        hm.textContent = HANGMAN_PICS[3];
    } else if (attempts == 4) {
        hm.textContent = HANGMAN_PICS[4];
    } else if (attempts == 5) {
        hm.textContent = HANGMAN_PICS[5];
    } else if (attempts == 6) {
        hm.textContent = HANGMAN_PICS[6];
        loss.play();
        document.getElementById("confirmation").style.display = "flex";
        document.getElementById("resWord").textContent = guessWord;
        document.getElementById("res").textContent = "";
    }

}