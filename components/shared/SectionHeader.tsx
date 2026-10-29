/** Section title on the left, a one-paragraph intro on the right. The count
 *  is for sections that are lists of discrete things (projects, roles).
 *  On a section's own page the title is the page's h1. */
export function SectionHeader({
  id,
  title,
  count,
  intro,
  as: Heading = "h2",
}: {
  id: string;
  title: string;
  count?: number;
  intro: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="grid items-end gap-6 pb-12 lg:grid-cols-12">
      <Heading id={id} className="display-l lg:col-span-7">
        {title}
        {count ? <span className="count" aria-hidden="true">{count}</span> : null}
      </Heading>
      <p className="intro lg:col-span-5">{intro}</p>
    </div>
  );
}
