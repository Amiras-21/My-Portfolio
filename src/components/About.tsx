import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {/* I am a passionate Software Developer with a strong foundation in Information Technology.  */}
          {/* Specializing in Full Stack Development, I excel at building scalable REST APIs, responsive  */}
          {/* frontend interfaces, and robust cloud deployments using AWS. Currently working at EvoqTech,  */}
          {/* I focus on optimizing performance, database latency, and CI/CD automation to deliver seamless user experiences. */}
          Passionate Software Developer specializing in Full Stack Development. 
          Skilled in building scalable APIs, responsive UIs, and cloud solutions using AWS. 
          Currently at EvoqTech, focused on performance optimization and CI/CD automation.
        </p>
      </div>
    </div>
  );
};

export default About;
