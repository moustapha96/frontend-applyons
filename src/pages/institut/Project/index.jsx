import { AdminBreadcrumb } from "@/components";
import { projects } from "./data";
import ProjectCard from "./components/ProjectCard";

const Project = () => {
  return (
    <>
      <AdminBreadcrumb title="Project" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, idx) => (
                <ProjectCard project={project} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
