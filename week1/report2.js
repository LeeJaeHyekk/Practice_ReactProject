//랜덤 숫자 생성 (30 ~ 129)
let randomNumber = parseInt(Math.random() * 100 + 30);

//HTML 요소 가져오기
const $submitButton = document.querySelector("#submitButton");
const $userInput = document.querySelector("#guessField");
const $guessSlot = document.querySelector(".guesses");
const $remainingCount = document.querySelector(".lastResult");
const $startOverGame = document.querySelector(".resultParas");
const $guessingResult = document.querySelector(".guessingResult");

const $newGameGuide = document.createElement("p");
const $circleArea = document.querySelector(".circleArea");
const $answerCircleArea = document.querySelector(".answerCircleArea");
const $guessCircleArea = document.querySelector(".guessCircleArea");

//게임 상태 변수
let numGuesses = 1;
let playGame = true;

//게임 시작 시 초기 설정
if (playGame) {
  createAnswerCircle(randomNumber);
  displayMessage("숫자를 입력해 주세요.");
  $submitButton.addEventListener("click", handleGuess);
}

// 사용자 입력 처리
function handleGuess(e) {
  e.preventDefault();
  const guess = parseInt($userInput.value);
  checkGuess(guess);
}

// 입력값 검증
function validateInput(guess) {
  if (isNaN(guess)) {
    alert("숫자를 입력해 주세요");
    return false;
  } else if (guess < 20) {
    alert("20 이상의 정수를 입력해 주세요");
    return false;
  } else if (guess > 120) {
    alert("120 이하의 정수를 입력해 주세요");
    return false;
  }
  return true;
}

// 숫자 비교 후 처리
function checkGuess(guess) {
  if (!validateInput(guess)) return;

  displayGuess(guess);
  removePreviousCircle();

  if (guess === randomNumber) {
    createGuessCircle(guess);
    displayMessage("정답입니다!");
    endGame();
  } else if (guess < randomNumber) {
    createGuessCircle(guess);
    displayMessage("너무 낮아요! 다시 도전해 주세요!");
  } else {
    createGuessCircle(guess);
    displayMessage("너무 높아요! 다시 도전해 주세요!");
  }

  // 남은 시도 횟수 확인
  if (numGuesses === 10 && guess !== randomNumber) {
    displayMessage(`패배했습니다! 정답은 ${randomNumber} 였습니다.`);
    endGame();
  }
}

// 사용자 입력 기록 업데이트
function displayGuess(guess) {
  $userInput.value = "";
  $guessSlot.innerHTML += `${guess} `;
  numGuesses++;
  $remainingCount.innerHTML = `${11 - numGuesses}`;
}

// 메시지 출력
function displayMessage(message) {
  $guessingResult.innerHTML = `<h1>${message}</h1>`;
}

// 게임 종료
function endGame() {
  $userInput.value = "";
  $userInput.setAttribute("disabled", "");
  $submitButton.setAttribute("disabled", "");

  $newGameGuide.classList.add("button");
  $startOverGame.appendChild($newGameGuide);

  playGame = false;
  setupNewGame();
}

// 새 게임 준비
function setupNewGame() {
  $newGameGuide.textContent = "새 게임 시작하기";
  $newGameGuide.addEventListener("click", () => {
    location.reload(); // 페이지 새로고침으로 초기화
  });
}

// 이전 원 삭제
function removePreviousCircle() {
  if ($guessCircleArea.childElementCount >= 1) {
    $guessCircleArea.removeChild($guessCircleArea.firstChild);
  }
}

// 정답 원 생성
function createAnswerCircle(value) {
  createCircle(value, "answer", $answerCircleArea);
}

// 사용자의 추측 원 생성
function createGuessCircle(value) {
  createCircle(value, "guess", $guessCircleArea);
}

// 원 생성 (공통 함수)
function createCircle(size, type, area) {
  const cx = size + 20;
  const cy = size + 20;
  const radius = size + 20;

  let div = document.createElement("div");
  area.appendChild(div);

  div.id = type;
  div.className = "circle";
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = `${cx}px`;
  div.style.top = `${cy}px`;

  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = `${radius * 2}px`;
      div.style.height = `${radius * 2}px`;

      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 10);
  });
}
