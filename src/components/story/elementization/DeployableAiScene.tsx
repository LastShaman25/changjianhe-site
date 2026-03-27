"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function DeployableAiScene({ id, eyebrow, title, body }: SceneProps) {
  return (
    <StoryScene
      id={id}
      eyebrow={eyebrow}
      title={title}
      body={body}
      stage={
        <StoryStageFrame className="min-h-[26rem] p-6 sm:p-8 lg:min-h-[42rem]">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px]" />
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                data-layer={(index % 3) + 1}
                className="absolute h-20 w-20 rounded-[1.4rem] border border-white/18 bg-white/8 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                style={{
                  left: `${12 + ((index * 14) % 68)}%`,
                  top: `${16 + ((index * 11) % 56)}%`
                }}
              />
            ))}
            <div data-layer="4" className="absolute left-[16%] top-[48%] h-px w-[68%] bg-gradient-to-r from-transparent via-white/52 to-transparent" />
            <div data-layer="4" className="absolute left-[34%] top-[26%] h-[48%] w-px bg-gradient-to-b from-transparent via-white/42 to-transparent" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
