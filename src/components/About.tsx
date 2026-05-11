import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          DevOps Engineer specializing in cloud infrastructure automation, CI/CD
          pipeline design, and container orchestration. Pursuing M.Sc. IT in
          Cyber Security at Gujarat University. Skilled in AWS (ECS Fargate, ECR,
          RDS), Terraform for Infrastructure as Code, Docker containerization,
          GitHub Actions workflows, and monitoring with Prometheus & Grafana.
          Passionate about building production-grade, scalable infrastructure and
          automating everything from deployment to security.
        </p>
      </div>
    </div>
  );
};

export default About;
