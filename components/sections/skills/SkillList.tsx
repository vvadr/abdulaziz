import { SkillIcon } from "./SkillIcon";

/** A group's tools as icon + name rows, two to a line. */
export function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
      {skills.map((skill) => (
        <li key={skill} className="flex min-w-0 items-center gap-2.5 text-[0.9875rem] font-medium leading-tight">
          <SkillIcon name={skill} />
          <span className="min-w-0">{skill}</span>
        </li>
      ))}
    </ul>
  );
}
