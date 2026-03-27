"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function InferenceScene({ id, eyebrow, title, body }: SceneProps) {
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
            <div data-layer="1" className="absolute left-[16%] top-[22%] h-[52%] w-[50%] rounded-[2rem] border border-white/16 bg-white/5" />
            <div data-layer="2" className="absolute right-[14%] top-[28%] h-[36%] w-[20%] rounded-[1.5rem] border border-white/18 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16),rgba(255,255,255,0.04))]" />
            <div data-layer="3" className="absolute left-[24%] top-[34%] h-px w-[40%] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div data-layer="4" className="absolute left-[58%] top-[44%] h-14 w-14 rounded-full border border-white/20 bg-[radial-gradient(circle,rgba(255,255,255,0.2),transparent_72%)]" />
            <div data-layer="5" className="absolute right-[18%] top-[40%] h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.26),transparent_68%)]" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
