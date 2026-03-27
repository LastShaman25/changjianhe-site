import type { ComponentType } from "react";

type MdxContentProps = {
  component: ComponentType;
};

export default function MdxContent({ component: Component }: MdxContentProps) {
  return <Component />;
}
