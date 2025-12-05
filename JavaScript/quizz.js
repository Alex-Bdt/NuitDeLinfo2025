const questions = [
    {
        text: "Prolonger la durée de vie d’un ordinateur permet",
        answers: ["D’augmenter automatiquement sa vitesse de traitement", "De réduire l’empreinte environnementale liée à sa fabrication et son recyclage"],
        correct: 1,
        exp: "De réduire l’empreinte environnementale liée à sa fabrication et son recyclage"
    },
    {
        text: "Les GAFAM ont un impact indirect important sur l’environnement car :",
        answers: ["Ils concentrent énormément de données dans leurs datacenters", "Ils produisent uniquement des logiciels open-source"],
        correct: 0,
        exp: "Ils concentrent énormément de données dans leurs datacenters."
    },
    {
        text: "Pour réduire l’impact énergétique du numérique à petite échelle, il est conseillé de :",
        answers: ["Supprimer les fichiers inutiles et limiter le stockage en ligne", "Acheter systématiquement le dernier ordinateur disponible"],
        correct: 0,
        exp: "Supprimer les fichiers inutiles et limiter le stockage en ligne"
    },
    {
        text: "Le composant le plus problématique à recycler dans un ordinateur est :",
        answers: ["La souris et le clavier", "L’écran LCD et les batteries"],
        correct: 1,
        exp: "L’écran LCD et les batteries"
    },
    {
        text: "Environ quel pourcentage de la consommation énergétique mondiale est liée au numérique ?",
        answers: ["4 %", "20 %"],
        correct: 0,
        exp: "4 %"
    },
    {
        text: "Quelle action quotidienne contribue le plus à réduire l’impact numérique individuel ?",
        answers: ["Limiter la diffusion et le stockage de vidéos en haute définition", "Ne rien faire"],
        correct: 0,
        exp: "Limiter la diffusion et le stockage de vidéos en haute définition"
    },
    {
        text: "Un ordinateur bien entretenu consomme :",
        answers: ["Moins d’énergie et fonctionne plus longtemps", "Toujours la même énergie, quelle que soit son entretien"],
        correct: 0,
        exp: "Moins d’énergie et fonctionne plus longtemps"
    },
    {
        text: "Le streaming vidéo en haute définition :",
        answers: ["Consomme pas plus que le steaming en basse définition", "Consomme beaucoup d’énergie dans les datacenters et réseaux"],
        correct: 1,
        exp: "Consomme beaucoup d’énergie dans les datacenters et réseaux"
    },
    {
        text: "Former les utilisateurs au numérique responsable :",
        answers: ["Aide à réduire l’impact environnemental du numérique", "A peu d'effet car le matériel informatique reste la principale source d’impact"],
        correct: 0,
        exp: "Aide à réduire l’impact environnemental du numérique"
    },
    {
        text: "Choisir des appareils modulables et réparables permet :",
        answers: ["De réduire uniquement les coûts de réparation, sans impact sur les déchets électroniques", "De réduire les déchets et prolonger la durée de vie"],
        correct: 1,
        exp: "De réduire les déchets et prolonger la durée de vie"
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