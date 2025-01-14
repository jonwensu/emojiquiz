import EmojiQuestion from "components/EmojiQuestion";
import type { NextPage } from "next";
import { shuffle } from "lodash";
import { useList, useStateList, useToggle } from "react-use";
import { FaChevronRight, FaChevronLeft, FaEye } from "react-icons/fa";
import data from "data.json";
import EmojiAnswer from "components/EmojiAnswer";
import { GameStartButton } from "components/StartButton";

const questions = shuffle(data);

type TEmojiQuestion = {
  emoji: string;
  answer: string;
};

const useEmojiCycler = (pool: TEmojiQuestion[] = []) => {
  const [list, { updateAt }] = useList(
    pool.map((p) => ({ ...p, answerRevealed: false })),
  );
  const { state: currentEmoji, prev, next, currentIndex } = useStateList(list);

  const revealAnswer = () => {
    updateAt(currentIndex, { ...currentEmoji, answerRevealed: true });
  };

  return {
    currentEmoji,
    currentIndex,
    prev,
    next,
    revealAnswer,
  };
};

const Game = () => {
  const { currentEmoji, currentIndex, prev, next, revealAnswer } =
    useEmojiCycler(questions);

  return (
    <div className="flex flex-col items-center mx-auto pt-36 gap-7 w-full max-w-2xl">
      <h1 className="mb-8 text-6xl text-[#8FBCBB]">
        Question #{currentIndex + 1}
      </h1>
      <EmojiQuestion>{currentEmoji?.emoji}</EmojiQuestion>
      <div className="flex justify-between w-full mt-7 gap-8 items-center h-24">
        <button
          className="p-6 text-lg w-16 h-16 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          onClick={prev}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <div className="flex justify-between items-center">
          {currentEmoji?.answerRevealed ? (
            <EmojiAnswer>{currentEmoji.answer}</EmojiAnswer>
          ) : (
            <button
              className="px-4 text-xl py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center"
              onClick={revealAnswer}
            >
              <FaEye className="mr-2" />
              Reveal Answer
            </button>
          )}
        </div>
        <button
          className="p-6 text-lg w-16 h-16 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          onClick={next}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [started, toggleStarted] = useToggle(false);
  return (
    <div className="flex w-screen h-screen bg-[#2E3440]">
      {started ? (
        <Game />
      ) : (
        <div className="m-auto">
          <GameStartButton onClick={toggleStarted} />
        </div>
      )}
    </div>
  );
};

export default Home;
