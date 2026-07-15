import "./styles/Career.css";

const skills = [
  "REACT.JS", "NODE.JS", "EXPRESS.JS", "MONGODB",
  "HTML5", "CSS3", "JAVASCRIPT", "C++",
  "TAILWIND CSS", "GIT/GITHUB", "PROMPT ENGINEERING"
];

const processes = [
  { step: "01", title: "DISCOVER", text: "Understanding goals, audience, and project requirements." },
  { step: "02", title: "IDEATE", text: "Planning, wireframing, and creating the right concept." },
  { step: "03", title: "DESIGN", text: "Crafting visual design with a focus on user experience." },
  { step: "04", title: "DEVELOP", text: "Building fast, responsive, and high-performing websites." },
  { step: "05", title: "DELIVER", text: "Testing, optimizing, and launching with perfection." }
];

const Career = () => {
  return (
    <div className="career-section section-container" id="about">
      <div className="career-grid">
        {/* Left Column: Education & Skills */}
        <div className="career-left">
          <h3 className="section-title">EDUCATION & SKILLS</h3>
          
          <div className="education-block">
            <h4 className="sub-title">EDUCATION</h4>
            <div className="edu-item">
              <div className="edu-top">
                <h5>B.Tech in IT</h5>
                <span className="edu-year">2022 - 2026</span>
              </div>
              <p>SKIT College, Jaipur</p>
            </div>
          </div>

          <div className="skills-block">
            <h4 className="sub-title">SKILLS</h4>
            <div className="skills-tags">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Work Process */}
        <div className="career-right">
          <h3 className="section-title">WORK PROCESS</h3>
          
          <div className="process-list">
            {processes.map((proc, index) => (
              <div className="process-item" key={index}>
                <div className="process-number">{proc.step}</div>
                <div className="process-icon">
                  <div className="icon-circle"></div>
                </div>
                <div className="process-text">
                  <h4>{proc.title}</h4>
                  <p>{proc.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
