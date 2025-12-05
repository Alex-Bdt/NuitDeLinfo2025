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


const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const exp = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");


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