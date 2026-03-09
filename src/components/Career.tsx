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
              <h3>NOW</h3>
            </div>
            <p>
              Real-time alert monitoring, security incident investigation, log
              analysis, and threat hunting for network anomalies in a
              production SOC environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
