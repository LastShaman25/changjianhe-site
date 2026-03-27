"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function PerturbationScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative h-full">
            <div data-layer="1" className="absolute inset-[16%] rounded-[2rem] border border-white/14 bg-white/4" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                data-layer={(index % 3) + 2}
                className="absolute h-px bg-gradient-to-r from-transparent via-white/48 to-transparent"
                style={{
                  width: `${24 + index * 8}%`,
                  left: `${12 + index * 7}%`,
                  top: `${24 + index * 12}%`,
                  transform: `rotate(${index % 2 === 0 ? 12 : -10}deg)`
                }}
              />
            ))}
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`probe-${index}`}
                data-layer={(index % 3) + 1}
                className="absolute h-4 w-4 rounded-full border border-white/18 bg-white/14"
                style={{
                  left: `${20 + index * 10}%`,
                  top: `${28 + ((index * 9) % 36)}%`
                }}
              />
            ))}
          </div>
        </StoryStageFrame>
      }
    />
  );
}
