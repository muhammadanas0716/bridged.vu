type Params = { params: Promise<{ projectSlug: string }> };

export default async function ProjectPage({ params }: Params) {
  const { projectSlug } = await params;
  return <div>Project Page: {projectSlug}</div>;
}
