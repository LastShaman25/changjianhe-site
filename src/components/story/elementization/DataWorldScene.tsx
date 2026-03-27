"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function DataWorldScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_45%)]" />
          <div className="relative h-full">
            {Array.from({ length: 14 }).map((_, index) => (
              <div
                key={index}
                data-layer={(index % 4) + 1}
                className="absolute rounded-full border border-white/16 bg-white/8"
                style={{
                  width: `${18 + ((index * 11) % 28)}px`,
                  height: `${18 + ((index * 11) % 28)}px`,
                  left: `${8 + ((index * 13) % 78)}%`,
                  top: `${10 + ((index * 17) % 72)}%`
                }}
              />
            ))}
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={`shard-${index}`}
                data-layer={(index % 3) + 1}
                className="absolute h-12 w-12 rotate-45 rounded-[0.7rem] border border-white/10 bg-white/6"
                style={{
                  left: `${14 + ((index * 15) % 70)}%`,
                  top: `${18 + ((index * 19) % 60)}%`
                }}
              />
            ))}
          </div>
        </StoryStageFrame>
      }
    />
  );
}
