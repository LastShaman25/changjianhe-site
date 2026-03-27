"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function TransposedLayerScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative grid h-full grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                data-layer={(index % 3) + 1}
                className="rounded-[1.4rem] border border-white/16 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-4"
              >
                <div className="h-full rounded-[1rem] border border-white/10 bg-white/4">
                  <div className="mx-auto mt-4 h-2 w-14 rounded-full bg-white/12" />
                  <div className="mx-auto mt-6 h-14 w-14 rounded-[1.1rem] border border-white/12 bg-white/8" />
                  <div className="mx-auto mt-6 h-2 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </StoryStageFrame>
      }
    />
  );
}
