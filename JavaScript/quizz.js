const questions = [
    {
        text: "Quel est le geste numérique le plus efficace pour réduire sa consommation énergétique ?",
        answers: ["Baisser la luminosité", "Éteindre complètement les appareils"],
        correct: 1,
        exp: "Éteindre complètement est le geste le plus efficace."
    },
    {
        text: "Quel service numérique consomme le plus ?",
        answers: ["Streaming vidéo", "Recherche Google"],
        correct: 0,
        exp: "Le streaming vidéo est très énergivore."
    }
];


let current = 0;
let isPressed = false;
let btnAPressed = false;
let btnBPressed = false;
let angle;
let progress;


const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnAFill = btnA.querySelector(".fill");
const btnBFill = btnB.querySelector(".fill");
const exp = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const arcade_sound = new Audio("ressourses/arcade_sound.mp3");


//LES EVENTS LISTENERS:

document.addEventListener("keydown", function(event){
   if(isPressed==false){
        progress = 0;
    	 switch(event.key){
       	 case "ArrowLeft":
       	     btnA.style.transform = "scale(1.03)";
             
       	     arcade_sound.cloneNode().play();
       	     break;
       	 case "ArrowRight":
      	      btnB.style.transform = "scale(1.03)";
      	      arcade_sound.cloneNode().play();
   	         break;

	    }
        isPressed=true;
    }
    if(progress < 1){
        progress += 0.04;
    }
    switch(event.key){
       	case "ArrowLeft":
            angle = Math.random()* 4 - 2;
            btnAFill.style.transform = `scaleX(${progress})`;
            btnA.style.rotate = `${angle}deg`;
            if(progress>=1){
                selectAnswer(0);
            }
            break;
        case "ArrowRight":
            angle = Math.random()* 4 - 2;
            btnBFill.style.transform = `scaleX(${progress})`;
            btnB.style.rotate = `${angle}deg`;
            if(progress>=1){
                selectAnswer(1);
            }
            break;
    }
    

});

document.addEventListener("keyup", function(event){
    isPressed = false;
    switch(event.key){
        case "ArrowLeft":
            btnA.style.transform = "scale(1.0)";
            btnA.style.rotate = "0deg";
            break;
        case "ArrowRight":
            btnB.style.transform = "scale(1.0)";
            btnB.style.rotate = "0deg";
    }

});

function loadQuestion() {
    document.getElementById("question-number").textContent = current + 1;
    document.getElementById("question-text").textContent = questions[current].text;


    btnA.textContent = questions[current].answers[0];
    btnB.textContent = questions[current].answers[1];


    exp.textContent = "";
    exp.classList.add("hidden");
    nextBtn.classList.add("hidden");
}


function selectAnswer(index) {
    const correct = index === questions[current].correct;


    exp.textContent = questions[current].exp;
    exp.classList.remove("hidden");
    exp.style.borderColor = correct ? "#2fa88d" : "#c0392b";


    nextBtn.classList.remove("hidden");
}


btnA.addEventListener("click", () => selectAnswer(0));
btnB.addEventListener("click", () => selectAnswer(1));


nextBtn.addEventListener("click", () => {
    current++;
    if (current >= questions.length) {
        window.location.href = "questions.html";
    } else loadQuestion();
});


loadQuestion();