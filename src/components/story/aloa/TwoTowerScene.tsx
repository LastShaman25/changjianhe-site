"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function TwoTowerScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative h-full">
            <div data-layer="1" className="absolute left-[18%] top-[14%] h-[72%] w-20 rounded-[1.8rem] border border-white/18 bg-white/8" />
            <div data-layer="1" className="absolute right-[18%] top-[14%] h-[72%] w-20 rounded-[1.8rem] border border-white/18 bg-white/8" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`left-${index}`}
                data-layer={(index % 3) + 1}
                className="absolute left-[21%] h-5 w-5 rounded-full border border-white/20 bg-white/12"
                style={{ top: `${24 + index * 14}%` }}
              />
            ))}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`right-${index}`}
                data-layer={(index % 3) + 1}
                className="absolute right-[21%] h-5 w-5 rounded-full border border-white/20 bg-white/12"
                style={{ top: `${24 + index * 14}%` }}
              />
            ))}
            <div data-layer="4" className="absolute left-[34%] top-[34%] h-px w-[32%] bg-gradient-to-r from-transparent via-white/46 to-transparent" />
            <div data-layer="4" className="absolute left-[34%] top-[52%] h-px w-[32%] bg-gradient-to-r from-transparent via-white/46 to-transparent" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
