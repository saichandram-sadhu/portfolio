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
              Performed vulnerability assessments, threat monitoring, and
              security analysis. Gained hands-on experience with SIEM tools,
              log analysis, and proactive threat detection methodologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps & Cloud Intern</h4>
                <h5>Codec Technologies India</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built CI/CD pipelines using GitHub Actions, containerized
              applications with Docker, and deployed infrastructure on AWS using
              Terraform. Implemented monitoring with Prometheus and Grafana.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Infrastructure & DevSecOps Intern</h4>
                <h5>Digisuraksha Parhari Foundation</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Automated infrastructure provisioning with Terraform, configured
              ECS Fargate deployments on AWS, and integrated security scanning
              into CI/CD pipelines for DevSecOps best practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer Intern</h4>
                <h5>Drona Cyber Solutions Pvt Ltd</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Managing cloud infrastructure on AWS, automating deployments with
              GitHub Actions & Docker, monitoring production systems with ELK &
              Grafana, and implementing Infrastructure as Code with Terraform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
