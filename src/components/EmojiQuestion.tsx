import { PropsWithChildren } from "types";

const EmojiQuestion: PropsWithChildren = ({ children }) => {
  return <div className="text-8xl text-center tracking-widest">{children}</div>;
};
export default EmojiQuestion;
