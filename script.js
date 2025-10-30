// document.addEventListener("DOMContentLoaded", () => {
//   const boxes = document.querySelectorAll(".multi_q");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         } else {
//           // Optional: remove when scrolled out if you want it to replay
//           entry.target.classList.remove("show");
//         }
//       });
//     },
//     {
//       threshold: 0.1, // trigger when 30% of the element is visible
//     }
//   );

//   boxes.forEach((box) => observer.observe(box));
// });

let nexBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");
let restartBtn = document.getElementById("restart");
let isReview = true;
let questions = [
  {
    question:
      "What software company is headquartered in Redmond, Washington&quest;",
    options: ["Apple", "Google", "Microsoft", "IBM"],
    answer: "Microsoft",
  },
  {
    question:
      "What is a word, phrase, number, or other sequence of characters that reads the same backward as forward&quest;",
    options: ["Acronym", "Oxymoron", "Palindrome", "Synonym"],
    answer: "Palindrome",
  },
  {
    question: "What is the world's largest retailer as of 2025&quest;",
    options: ["Amazon", "Costco", "Walmart", "Alibaba"],
    answer: "Walmart",
  },
  {
    question: "Which day of the week does the Jewish Sabbath begin&quest;",
    options: ["Saturday", "Friday", "Sunday", "Thursday"],
    answer: "Friday",
  },
  {
    question: "What phone company produced the 3310&quest;",
    options: ["Samsung", "Motorola", "Nokia", "Sony"],
    answer: "Nokia",
  },
  {
    question: `What company was initially known as 'Blue Ribbon Sports'&quest;`,
    options: ["Nike", "Adidas", "Puma", "Reebok"],
    answer: "Nike",
  },
  {
    question: "Which country has the highest life expectancy as of 2025&quest;",
    options: ["Japan", "Switzerland", "Singapore", "Monaco"],
    answer: "Monaco",
  },
  {
    question: "What is the most common surname in the United States&quest;",
    options: ["Johnson", "Smith", "Williams", "Brown"],
    answer: "Smith",
  },
  {
    question:
      "What art form is described as 'decorative handwriting or handwritten lettering'&quest;",
    options: ["Graffiti", "Calligraphy", "Typography", "Illustration"],
    answer: "Calligraphy",
  },
  {
    question: "What is the acrophobia a fear of&quest;",
    options: ["Heights", "Spiders", "Darkness", "Flying"],
    answer: "Heights",
  },
];
let form_container = document.getElementById("form_que");
let container = document.getElementById("container");
let header = document.getElementById("header_t");
let buttons = document.getElementById("buttons");
let index = 0;
let score = 0;
let idNo = document.getElementById("questionNo");
idNo.innerHTML = 1;

let selectedInpt = [];
for (let i = 0; i < questions.length; i++) {
  selectedInpt[i] = "undefined";
}
console.log(selectedInpt);

function loadQuestion() {
  let theDis = document.getElementById("questions");
  theDis.innerHTML = `${questions[0 + index].question}`;
  let t = questions[0 + index].options.filter((t) => t);
  if (isReview) {
    form_container.innerHTML = `

        <form name="answer" id="multi_q" class="multi_q flex mt-4 m-auto gap-4 max-w-[250px] flex-col z-[1000]">
          ${t
            .map(
              (t) => `
            <label class="show option flex text-white justify-between items-center text-[18px] border-[1px] border-solid border-white p-2 rounded-full">
                <span>${t}</span>
                <input type="radio" name="answer" onclick="selectedInpt[${0 + index}]='${t}'"  value="${t}" ${
                selectedInpt[0 + index] === t ? "checked" : ""
              }/>
            </label>
            `
            )
            .join("")}
            
        </form>`;
  } else {
    let theDis = document.getElementById("questions");
    theDis.innerHTML = `${questions[0 + index].question}`;
    let t = questions[0 + index].options.filter((t) => t);
    form_container.innerHTML = `
           <form name="answer" id="multi_q" class="multi_q flex mt-4 m-auto gap-4 max-w-[250px] flex-col z-[1000]">
          ${t
            .map(
              (t) => `
            <label class="option flex text-white justify-between items-center text-[18px] border-[1px] border-solid border-white p-2 rounded-full ${
              questions[0 + index].answer == t
                ? "bg-green-700 border-green-400"
                : ""
            } ${
                t == selectedInpt[0 + index] && t != questions[0 + index].answer
                  ? "bg-red-600 border-red-400"
                  : ""
              }">
                <span>${t}</span>
                <input type="radio" name="answer" class="" onclick="selectedInpt[${0 + index}]='${t}'"  value="${t}" ${
                selectedInpt[0 + index] === t ? "checked" : ""
              } disabled />
            </label>
            `
            )
            .join("")}
            
        </form>`;
  }
}

function prevQuestion() {
  if (index == 0) {
    index;
  } else {
    idNo.innerHTML--;
    index--;
  }
  if (index == 8) {
    nexBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    restartBtn.classList.add("hidden");
  }
  loadingComp();
  loadQuestion();
}

function nextQuestion() {
  if (isReview) {
    if (index < questions.length - 1) {
      index++;
      idNo.innerHTML++;
    } else {
      index;
    }

    if (index == 9) {
      nexBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    } else {
      nexBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
  } else {
    if (index < questions.length - 1) {
      index++;
      idNo.innerHTML++;
    } else {
      index;
    }

    if (index == 9) {
      restartBtn.classList.remove("hidden");
      nexBtn.classList.add("hidden");
    } else {
      nexBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
    }
  }
  loadingComp();
  loadQuestion();
}

function checkAnswers() {
  for (let i = 0; i < questions.length; i++) {
    questions[i].answer == selectedInpt[i] ? score++ : "";
  }
  console.log(score);
}

function loadingComp() {
  let loading = document.getElementById("loading");
  let current = idNo.innerHTML;
  let control = ((current * 10) / 100) * 100;
  loading.style.setProperty("--progress-width", control + "%");
}

function submitAndDis() {
  checkAnswers();

  header.classList.add("hidden");
  buttons.classList.add("hidden");
  form_container.innerHTML = `
          <div id="result_dis" class = "text-white max-w-[300px] m-auto w-full flex flex-col justify-between gap-10 items-center p-2">
          <img src="3d-rendering-new-year-icon.png" class = "w-[100%]" alt="congrats">
          <div class=" text-4xl flex flex-col gap-3 text-center items-center justify-center"><h1 class="text-2xl">Your Score:</h1><div><span>${score}</span> / <span>${questions.length}</span></div></div>
          <button class ="bg-[#2B2730] py-1 px-2 rounded-[5px] cursor-pointer text-white mt-6" onclick = "reviewQuest()">Review Question</button>
          </div>
    `;
  index = 0;
  idNo.innerHTML = 1;
  loadingComp();
}

loadQuestion();
loadingComp();

function reviewQuest() {
  let result_dis = document.getElementById("result_dis");
  header.classList.remove("hidden");
  buttons.classList.remove("hidden");
  result_dis.classList.remove("flex");
  result_dis.classList.add("hidden");
  nexBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");

  isReview = false;
  loadQuestion();
}

function restartQuiz() {
  nexBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  isReview = "true";
  index = 0;
  idNo.innerHTML = 1;
  selectedInpt = [];
  for (let i = 0; i < questions.length; i++) {
    selectedInpt[i] = "undefined";
  }
  loadQuestion();
  loadingComp();
}
