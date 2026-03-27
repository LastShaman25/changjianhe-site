type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  className,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="section-label">{eyebrow}</p>
      <h2
        className={`headline-xl mt-6 ${align === "center" ? "max-w-4xl text-center" : "max-w-4xl"}`}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={`body-lg mt-6 ${
            align === "center" ? "mx-auto max-w-3xl text-center" : "reading-measure-wide"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
