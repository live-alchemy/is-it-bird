"use client";
import Image from "next/image";
import { useState } from "react";
import steps from "../public/steps.json";

export default function Home() {
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(true);
  function selectAnswer(answer: boolean) {
    const correct =
      (!steps[step].isBird && !answer) || (steps[step].isBird && answer);
    if (correct) {
      setScore(score + 1);
    }
    setLastAnswerCorrect(correct);
    setStep(step + 1);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-xl lg:flex">
        <h1 className="fixed text-2xl font-semibold left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Is it bird?
        </h1>
        <div className="fixed bottom-0 left-0 flex h-16 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-2 lg:pointer-events-auto lg:p-0"
            href="/"
          >
            <Image
              src="/bird.png"
              alt="Lyre bird"
              className="dark:invert"
              width={240}
              height={150}
              priority
            />
          </a>
        </div>
      </div>
      <div className="mb-32 grid gap-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 grid-cols-2 lg:text-left">
        <p className="col-span-2 text-2xl font-semibold text-slate-900">
          {step === 0
            ? "Play the audio clip then tell us what you think."
            : step === 8
            ? "And that's all the birds we got! Thanks for stopping by 🐦‍⬛"
            : lastAnswerCorrect
            ? "Good job! You are most wise. 🦉"
            : "Woops! Sneaky Lyre bird fooled you. 🦜"}
        </p>
        <p className="col-span-2 text-2xl font-semibold text-slate-900">
          Your score: {score}/8
        </p>
        {step < 8 ? (
          <audio
            className="col-span-2 h-16"
            src={`/sounds/${steps[step].audio}`}
            controls
          />
        ) : (
          <p className="col-span-2 text-2xl">🎉</p>
        )}
        {step < 8 ? (
          <>
            <div
              onClick={() => selectAnswer(false)}
              className="cursor-pointer hover:opacity-80 group text-center rounded-lg border border-transparent px-5 py-4 transition-colors bg-gray-100 border-neutral-700 dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Nope, not a bird.
              </h2>
              <h3 className="text-2xl">❌</h3>
            </div>
            <div
              onClick={() => selectAnswer(true)}
              className="cursor-pointer hover:opacity-80 group text-center rounded-lg border border-transparent px-5 py-4 transition-colors bg-gray-100 border-neutral-700 dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>That's a bird!</h2>
              <h3 className="text-2xl">👌</h3>
            </div>
          </>
        ) : (
          <div className="col-span-2 h-24"></div>
        )}
      </div>
    </main>
  );
}
