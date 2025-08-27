import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    github: "",
  });

  // Load data from localStorage or fallback to portfolioData
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects"));
    if (stored && stored.length > 0) {
      setProjects(stored);
    } else if (portfolioData?.projects) {
      setProjects(portfolioData.projects);
    }
  }, []);

  const handleAddProject = () => {
    if (
      newProject.name.trim() &&
      newProject.description.trim() &&
      newProject.github.trim()
    ) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      setNewProject({ name: "", description: "", github: "" });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };

  const handleRemoveProject = (indexToRemove) => {
    const updatedProjects = projects.filter((_, index) => index !== indexToRemove);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSaveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
    setIsEditing(false);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 p-1 rounded"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
        )}
      </div>

      {/* Show message if no projects */}
      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects available yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg bg-gray-50 flex flex-col gap-1 relative"
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      handleProjectChange(index, "name", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full font-bold"
                    placeholder="Project Name"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Project Description"
                  />
                  <input
                    type="text"
                    value={project.github || ""}
                    onChange={(e) =>
                      handleProjectChange(index, "github", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="GitHub Link"
                  />
                  <button
                    onClick={() => handleRemoveProject(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                    title="Remove Project"
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-bold">{project.name}</h3>
                  <p>{project.description}</p>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View on GitHub
                    </a>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
            placeholder="New Project Name"
          />
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
            placeholder="New Project Description"
          />
          <input
            type="text"
            value={newProject.github}
            onChange={(e) =>
              setNewProject({ ...newProject, github: e.target.value })
            }
            className="border px-2 py-1 rounded w-full"
            placeholder="GitHub Link"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddProject}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add Project
            </button>
            <button
              onClick={handleSaveProjects}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
