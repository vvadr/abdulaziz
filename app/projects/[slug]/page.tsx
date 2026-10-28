import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectPage } from "@/components/sections/projects/route/ProjectPage";
import { getProject, portfolioProjects, projectsInDisplayOrder } from "@/data/projects";
import { siteUrl } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Abdulaziz Yusupaliev`,
      description: project.summary,
      url: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectRoute({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const projectIndex = projectsInDisplayOrder.findIndex((item) => item.slug === project.slug);

  return (
    <>
      <Navbar />
      <ProjectPage
        project={project}
        previous={projectsInDisplayOrder[projectIndex - 1] ?? null}
        next={projectsInDisplayOrder[projectIndex + 1] ?? null}
      />
      <Footer subpage />
    </>
  );
}
