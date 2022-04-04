import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { cwEasy, cwMedium, cwHard } from "../constants/constants";
import Modal from "../components/Modal/Modal";
interface Props {}
const GameHome: React.FC<Props> = (props: Props) => {
  const LEVEL_ANSWERS = {
    EASY: ["AIR", "CARD", "INK", "PARK"],
    MEDIUM: ["REACT", "JAVA", "CODING", "ANGULAR", "PYTHON", "VUE", "KOTLIN"],
    HARD: [
      "BRAZIL",
      "RUSSIA",
      "QATAR",
      "CZECH",
      "EGYPT",
      "AUSTRALIA",
      "DENMARK",
      "PORTUGAL",
      "INDIA",
      "PERU",
    ],
  };
  const LEVELS = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
  };
  const LEVEL_SCORES = {
    EASY: 4,
    MEDIUM: 11,
    HARD: 21,
  };
  const [currentLevel, setCurrentLevel] = useState<string>(LEVELS.EASY);
  const [crossWord, setCrossWord] = useState<any>(cwEasy);
  const [answersGuessed, setAnswersGuessed] = useState<any>([]);
  const [currentChosenWord, setCurrentChosenWord] = useState<any>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const renderGuessedAnswers = useCallback(() => {
    return answersGuessed.map((answer: any[]) => (
      <div className="ch-guessed-answers ch-display-flex ch-mb-4">{answer}</div>
    ));
  }, [answersGuessed]);

  useEffect(() => {
    if (userScore === LEVEL_SCORES.EASY) {
      setIsModalVisible(true);
    }
    if (userScore === LEVEL_SCORES.MEDIUM) {
      setIsModalVisible(true);
    }
    if (userScore === LEVEL_SCORES.HARD) {
      setIsModalVisible(true);
    }
  }, [userScore]);

  const clearAll = () => {
    for (var i = 0; i < crossWord.length; i++) {
      for (var j = 0; j < crossWord[0].length; j++) {
        const Elm = document.getElementById(`ch-${i},${j}`);
        if (Elm) {
          Elm.style.backgroundColor = "#0e1317";
        }
      }
    }
  };

  const row = () => {
    return crossWord.map((word: any[], indexRow: number) => (
      <div className="ch-display-flex ch-mb-4">
        {word.map((letter, indexColumn) => (
          <div
            className="letter-box ch-mr-4"
            id={`ch-${indexRow},${indexColumn}`}
            onClick={() => {
              changeColor(indexRow, indexColumn, currentChosenWord);
            }}
          >
            {letter}
          </div>
        ))}
      </div>
    ));
  };
  const colorGreen = useCallback(() => {
    for (var i = 0; i < crossWord.length; i++) {
      for (var j = 0; j < crossWord[0].length; j++) {
        const Elm = document.getElementById(`ch-${i},${j}`);
        if (Elm && Elm.style.backgroundColor === "gray") {
          Elm.style.backgroundColor = "green";
        }
      }
    }
  }, [crossWord]);
  const checkAns = useCallback(
    (answersGuessed: any, score: number) => {
      let ans = "";
      for (var i = 0; i < crossWord.length; i++) {
        for (var j = 0; j < crossWord[0].length; j++) {
          const Elm = document.getElementById(`ch-${i},${j}`);
          if (Elm && Elm.style.backgroundColor === "gray") {
            ans = ans + crossWord[i][j];
          }
        }
      }
      let checkArray = [];
      switch (currentLevel) {
        case "EASY":
          checkArray = LEVEL_ANSWERS.EASY;
          break;
        case "MEDIUM":
          checkArray = LEVEL_ANSWERS.MEDIUM;
          break;
        default:
          checkArray = LEVEL_ANSWERS.HARD;
          break;
      }
      checkArray.forEach((answer) => {
        if (ans === answer) {
          setAnswersGuessed([...answersGuessed, ans]);
          setUserScore(score + 1);
          colorGreen();
        }
      });
    },
    [colorGreen, crossWord]
  );
  const isValidClick = useCallback(
    (indexRow: number, indexColumn: number, currChosenWord: any) => {
      if (currChosenWord.length === 0) {
        return true;
      }
      if (currChosenWord[0].row === indexRow) {
        if (
          indexColumn - currChosenWord[0].column ===
          currChosenWord.length - 1
        ) {
          return true;
        }
        return false;
      }
      if (currChosenWord[0].column === indexColumn) {
        if (indexRow - currChosenWord[0].row === currChosenWord.length - 1) {
          return true;
        }
        return false;
      }
    },
    []
  );
  const removeGrayColorOfSelectedElements = useCallback(
    (indexRow: number, indexColumn: number) => {
      for (var i = 0; i < crossWord.length; i++) {
        for (var j = 0; j < crossWord[0].length; j++) {
          const Elm = document.getElementById(`ch-${i},${j}`);
          if (Elm && Elm.style.backgroundColor === "gray") {
            Elm.style.backgroundColor = "#0e1317";
          }
        }
      }
      const Elm = document.getElementById(`ch-${indexRow},${indexColumn}`);
      if (Elm) {
        Elm.style.backgroundColor = "gray";
      }
    },
    [crossWord]
  );
  const changeColor = useCallback(
    (indexRow: number, indexColumn: number, currChosenWord: any) => {
      const Elm = document.getElementById(`ch-${indexRow},${indexColumn}`);
      if (Elm && Elm.style.backgroundColor === "green") {
        return;
      }
      if (Elm && Elm.style.backgroundColor !== "gray") {
        const newFormedWord = [
          ...currChosenWord,
          { row: indexRow, column: indexColumn },
        ];
        if (isValidClick(indexRow, indexColumn, newFormedWord)) {
          setCurrentChosenWord([
            ...currChosenWord,
            { row: indexRow, column: indexColumn },
          ]);
          Elm.style.backgroundColor = "gray";
          checkAns(answersGuessed, userScore);
        } else {
          setCurrentChosenWord([{ row: indexRow, column: indexColumn }]);
          removeGrayColorOfSelectedElements(indexRow, indexColumn);
        }
      } else if (Elm && Elm.style.backgroundColor === "gray") {
        Elm.style.backgroundColor = "#0e1317";
      }
    },
    [
      answersGuessed,
      checkAns,
      isValidClick,
      removeGrayColorOfSelectedElements,
      userScore,
    ]
  );
  const onContinueClick = useCallback(() => {
    setIsModalVisible(false);
    if (currentLevel === LEVELS.EASY) {
      setCurrentLevel(LEVELS.MEDIUM);
      setCrossWord(cwMedium);
    } else if (currentLevel === LEVELS.MEDIUM) {
      setCurrentLevel(LEVELS.HARD);
      setCrossWord(cwHard);
    } else {
      setCurrentLevel(LEVELS.EASY);
      setCrossWord(cwEasy);
      setUserScore(0);
    }
    setCurrentChosenWord([]);
    setAnswersGuessed([]);
    clearAll();
  }, [currentLevel]);
  return (
    <div className="header">
      <div className="ch-ml-32 ch-level-label">
        LEVEL: <span className="ch-level ch-ml-4">{currentLevel}</span>
      </div>
      <div className="gameContainer ch-ml-32 ch-mr-32">
        <div className="">
          <div className="ch-game-heading ch-mb-4">Game Area</div>
          {row()}
        </div>
        <div className="ch-game-heading ch-mr-32">
          Your Score :
          <div className="ch-score">
            {userScore}/
            {currentLevel !== LEVELS.EASY
              ? currentLevel === LEVELS.MEDIUM
                ? LEVEL_SCORES.MEDIUM
                : LEVEL_SCORES.HARD
              : LEVEL_SCORES.EASY}
          </div>
        </div>
        <div className="ch-game-heading">
          Words Guessed
          {renderGuessedAnswers()}
        </div>
      </div>
      {isModalVisible ? (
        <Modal
          heading={`You have passed level ${currentLevel}.`}
          onContinue={() => {
            onContinueClick();
          }}
        />
      ) : null}
    </div>
  );
};

export default GameHome;
