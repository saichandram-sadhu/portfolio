import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cyber Security Researcher</h4>
                <h5>Zetpeak</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Performed vulnerability assessments and contributed to proactive
              threat monitoring and analysis. Gained hands-on experience in
              identifying and reporting security weaknesses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cyber Security Intern</h4>
                <h5>Codec Technologies India</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Assisted with endpoint vulnerability assessments, network
              monitoring, and security configuration tasks across enterprise
              environments.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cyber Security & Ethical Hacking Intern</h4>
                <h5>Digisuraksha Parhari Foundation</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Conducted penetration testing and vulnerability assessments,
              supported digital forensics work, and developed an AI-based IDS
              using Python to classify network anomalies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SOC Analyst Intern</h4>
                <h5>Drona Cyber Solutions Pvt Ltd</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Integrated Wazuh SIEM with Splunk to enhance centralized log
              management and real-time threat monitoring. Configured
              VirusTotal active response for automated malware detection and
              deployed firewall rules to strengthen network perimeter
              security.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Administrator Intern</h4>
                <h5>TechMonarch</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Monitoring and managing computers, networks, and servers to
              ensure optimal performance and security. Handling user accounts,
              group policies, patch management, backup solutions, and security
              compliance as part of a structured 6-month training program
              leading to a permanent Junior System Administrator role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
