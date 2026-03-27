import { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type LocaleLinkProps = ComponentProps<typeof Link>;

export default function LocaleLink(props: LocaleLinkProps) {
  return <Link {...props} />;
}