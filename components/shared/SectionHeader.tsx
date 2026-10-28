/** Section title on the left, a one-paragraph intro on the right. The count
 *  is for sections that are lists of discrete things (projects, roles). */
export function SectionHeader({
  id,
  title,
  count,
  intro,
}: {
  id: string;
  title: string;
  count?: number;
  intro: string;
}) {
  return (
    <div className="grid items-end gap-6 pb-12 lg:grid-cols-12">
      <h2 id={id} className="display-l lg:col-span-7">
        {title}
        {count ? <span className="count">{count}</span> : null}
      </h2>
      <p className="intro lg:col-span-5">{intro}</p>
    </div>
  );
}
