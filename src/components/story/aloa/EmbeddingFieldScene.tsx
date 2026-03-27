"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function EmbeddingFieldScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      align="left"
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative h-full">
            {Array.from({ length: 22 }).map((_, index) => (
              <div
                key={index}
                data-layer={(index % 4) + 1}
                className="absolute h-3.5 w-3.5 rounded-full border border-white/14 bg-white/12"
                style={{
                  left: `${12 + ((index * 11) % 72)}%`,
                  top: `${14 + ((index * 17) % 68)}%`
                }}
              />
            ))}
            <div data-layer="4" className="absolute left-[24%] top-[34%] h-px w-[26%] rotate-[14deg] bg-gradient-to-r from-transparent via-white/44 to-transparent" />
            <div data-layer="4" className="absolute left-[50%] top-[54%] h-px w-[22%] -rotate-[16deg] bg-gradient-to-r from-transparent via-white/44 to-transparent" />
            <div data-layer="5" className="absolute left-[46%] top-[40%] h-28 w-28 rounded-full border border-white/16 bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)]" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
