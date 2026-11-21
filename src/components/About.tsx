import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Junior System Administrator at TechMonarch with hands-on SOC
          experience — I keep servers, networks, and users running smoothly
          and securely. Skilled in Windows/Linux administration, Active
          Directory, group policies, patch management, and backups — with a
          security toolkit built on Wazuh SIEM, Splunk, and VirusTotal. I
          automate everything with Python, Bash, and Docker, and ship cloud
          infrastructure on AWS with Terraform and GitHub Actions, monitored
          with Prometheus & Grafana. M.Sc. IT (Cyber Security) from Gujarat
          University — because every system should run fast AND stay secure.
        </p>
      </div>
    </div>
  );
};

export default About;
