import { useEffect, useState } from "react";
import "./styles/GitHubProjects.css";
import { FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Shell: "#89E051",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Java: "#B07219",
  C: "#555555",
  "C++": "#F34B7D",
  Go: "#00ADD8",
};

const GitHubProjects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/saichandram-sadhu/repos?sort=updated&per_page=6"
    )
      .then((res) => {
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="github-section" id="github">
      <div className="github-container section-container">
      <div className="github-header">
        <h2>
          GitHub <span>Projects</span>
        </h2>
        <a
          href="https://github.com/saichandram-sadhu"
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-link"
          data-cursor="disable"
        >
          @saichandram-sadhu ↗
        </a>
      </div>

      {loading && (
        <div className="github-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="github-card-skeleton" />
          ))}
        </div>
      )}

      {error && (
        <p className="github-error">Could not load GitHub repositories.</p>
      )}

      {!loading && !error && (
        <div className="github-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-card"
              data-cursor="disable"
            >
              <div className="github-card-top">
                <span className="github-repo-name">{repo.name}</span>
                <FiExternalLink className="github-ext-icon" />
              </div>
              <p className="github-repo-desc">
                {repo.description || "No description provided."}
              </p>
              <div className="github-card-bottom">
                {repo.language && (
                  <span className="github-lang">
                    <span
                      className="github-lang-dot"
                      style={{
                        backgroundColor:
                          LANG_COLORS[repo.language] || "#8b949e",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="github-stat">
                  <FiStar /> {repo.stargazers_count}
                </span>
                <span className="github-stat">
                  <FiGitBranch /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default GitHubProjects;
