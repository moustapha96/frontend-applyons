import { cn } from "@/utils";
import { LuAlignJustify, LuCalendar, LuMessageSquare } from "react-icons/lu";

const ProjectCard = ({ project }) => {
  const {
    comment,
    date,
    description,
    images,
    progress,
    progressClassName,
    status,
    subTitle,
    task,
    title,
    text,
  } = project;
  return (
    <div className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50">
      <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
        <h5 className="text-lg text-default-900">{title}</h5>
        <div
          className={cn(
            "rounded-md px-1.5 py-1 text-xs font-medium text-white",
            status === "Pending"
              ? "bg-amber-500"
              : status === "In Progress"
                ? "bg-primary"
                : "bg-teal-500"
          )}
          role="alert"
        >
          <span>{status}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-6 py-3">
          <h5 className="my-2">
            <p role="button" className="text-default-900">
              {subTitle}
            </p>
          </h5>
          <p className="mb-9 text-sm text-default-500">{description}</p>
          <div className="flex -space-x-2">
            {images.map((image, idx) => (
              <span role="button" key={idx}>
                <img
                  className="inline-block size-12 rounded-full border-2 border-default-50"
                  src={image}
                  alt="Apply Ons"
                />
              </span>
            ))}
            {text && (
              <span>
                <div className="relative inline-flex">
                  <button className="inline-flex size-12 items-center justify-center rounded-full border-2 border-white bg-default-200 align-middle text-sm font-medium text-default-700 shadow-sm transition-all hover:bg-default-300 dark:border-default-50">
                    <span className="font-medium leading-none">{text}</span>
                  </button>
                </div>
              </span>
            )}
          </div>
        </div>
        <div className="border-t border-default-200 p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm flex items-center">
                <LuCalendar className="me-2 text-lg" />
                <span className="align-text-bottom">{date}</span>
              </span>
              <span className="text-sm flex items-center">
                <LuAlignJustify className="me-2 text-lg" />
                <span className="align-text-bottom">{task}</span>
              </span>
              <span className="text-sm flex items-center">
                <LuMessageSquare className="me-2 text-lg" />
                <span className="align-text-bottom">{comment}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-full rounded-full bg-default-200">
                <div className={cn(progressClassName, "h-1.5 rounded-full")} />
              </div>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
