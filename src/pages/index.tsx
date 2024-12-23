import EmojiQuestion from "components/EmojiQuestion";
import type { NextPage } from "next";
import { shuffle } from "lodash";
import { useList, useStateList, useToggle } from "react-use";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
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
    <div className="flex flex-col items-center mx-auto pt-36 gap-7">
      <h1 className="mb-8 text-6xl text-[#8FBCBB]">
        Question #{currentIndex + 1}
      </h1>
      <EmojiQuestion>{currentEmoji?.emoji}</EmojiQuestion>
      <div className="flex justify-between w-full max-w-lg mt-7 gap-7">
        <button
          className="text-5xl text-[#8FBCBB]"
          onClick={prev}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <div>
          {currentEmoji?.answerRevealed ? (
            <EmojiAnswer>{currentEmoji.answer}</EmojiAnswer>
          ) : (
            <button
              className="p-3 text-black rounded-md bg-[#88C0D0] hover:bg-[#81A1C1] transition-colors"
              onClick={revealAnswer}
            >
              Reveal Answer
            </button>
          )}
        </div>
        <button className="text-5xl text-[#8FBCBB]" onClick={next}>
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
