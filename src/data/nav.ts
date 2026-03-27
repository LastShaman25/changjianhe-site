export type NavItem = {
  labelKey:
    | "home"
    | "about"
    | "projects"
    | "research"
    | "accomplishments"
    | "contact";
  href: string;
};

export const navItems: NavItem[] = [
  {
    labelKey: "home",
    href: "/"
  },
  {
    labelKey: "about",
    href: "/about"
  },
  {
    labelKey: "projects",
    href: "/projects"
  },
  {
    labelKey: "research",
    href: "/research"
  },
  {
    labelKey: "accomplishments",
    href: "/accomplishments"
  },
  {
    labelKey: "contact",
    href: "/contact"
  }
];
