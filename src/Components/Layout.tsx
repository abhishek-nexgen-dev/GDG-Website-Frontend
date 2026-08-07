import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
  id?: string;
}

/** Every section must use this — never roll your own max-w / px */
export function Container({ children, className, as: Tag = "div", id }: ContainerProps) {
  return (
    <Tag id={id} className={clsx("page-container", className)}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx("page-section", className)}>
      {children}
    </section>
  );
}
