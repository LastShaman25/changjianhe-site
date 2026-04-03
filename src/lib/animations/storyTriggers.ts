import type { gsap } from "gsap";

type StrokeTarget =
  | SVGPathElement
  | SVGLineElement
  | SVGPolylineElement
  | SVGPolygonElement
  | SVGCircleElement
  | SVGRectElement
  | SVGElement;

type StrokeTargetInput = StrokeTarget | StrokeTarget[] | NodeListOf<StrokeTarget>;

type DrawSvgStrokeOptions = {
  duration?: number;
  ease?: string;
  stagger?: number;
  at?: gsap.Position;
};

function getStrokeLength(target: StrokeTarget) {
  if ("getTotalLength" in target && typeof target.getTotalLength === "function") {
    return target.getTotalLength();
  }

  return 0;
}

export function setSvgStrokeHidden(targets: StrokeTargetInput, gsapInstance: typeof gsap) {
  const elements = gsapInstance.utils.toArray<StrokeTarget>(targets);

  elements.forEach((element) => {
    const length = getStrokeLength(element);

    if (!length) {
      return;
    }

    gsapInstance.set(element, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
  });
}

export function addSvgStrokeDraw(
  targets: StrokeTargetInput,
  timeline: gsap.core.Timeline,
  gsapInstance: typeof gsap,
  { duration = 0.4, ease = "power2.out", stagger = 0, at }: DrawSvgStrokeOptions = {}
) {
  const elements = gsapInstance.utils
    .toArray<StrokeTarget>(targets)
    .filter((element) => getStrokeLength(element) > 0);

  if (!elements.length) {
    return timeline;
  }

  setSvgStrokeHidden(elements, gsapInstance);

  timeline.to(
    elements,
    {
      strokeDashoffset: 0,
      duration,
      ease,
      stagger
    },
    at
  );

  return timeline;
}
