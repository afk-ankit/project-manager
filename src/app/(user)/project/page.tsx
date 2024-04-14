import ProjectCreateForm from "@/components/ProjectCreate";

function Project() {
  return (
    <main className="min-h-screen container py-8 ">
      <h1 className="text-2xl text-center">Create a new project</h1>
      <ProjectCreateForm />
    </main>
  );
}

export default Project;
