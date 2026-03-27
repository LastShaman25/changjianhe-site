"use client";

import StoryScene from "@/components/story/StoryScene";
import StoryStageFrame from "@/components/story/StoryStageFrame";

type SceneProps = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
};

export default function TrustBoundaryScene({ id, eyebrow, title, body }: SceneProps) {
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
            <div data-layer="1" className="absolute inset-x-[10%] top-[20%] h-px bg-gradient-to-r from-transparent via-white/32 to-transparent" />
            <div data-layer="1" className="absolute inset-x-[10%] bottom-[20%] h-px bg-gradient-to-r from-transparent via-white/32 to-transparent" />
            <div data-layer="2" className="absolute inset-y-[24%] left-[18%] w-px bg-white/18" />
            <div data-layer="2" className="absolute inset-y-[24%] right-[18%] w-px bg-white/18" />
            <div data-layer="3" className="absolute left-1/2 top-[22%] h-[56%] w-[42%] -translate-x-1/2 rounded-[2rem] border border-white/20 bg-white/5" />
            <div data-layer="4" className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/24 bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_70%)]" />
            <div data-layer="5" className="absolute left-1/2 top-1/2 h-10 w-14 -translate-x-1/2 -translate-y-1/2 rounded-[0.9rem] border border-white/20 bg-white/10" />
            <div data-layer="5" className="absolute left-1/2 top-[calc(50%-2.5rem)] h-8 w-8 -translate-x-1/2 rounded-t-full border border-white/18 border-b-0" />
          </div>
        </StoryStageFrame>
      }
    />
  );
}
