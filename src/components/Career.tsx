import "./styles/Career.css";

const careerItems = [
  {
    role: "Software Developer",
    company: "EvoqTech",
    date: "2025 - NOW",
    desc: "Developed scalable REST APIs supporting 10k+ monthly requests. Built responsive React/Redux frontends. Designed optimized MongoDB schemas cutting query latency by 40%. Deployed to AWS EC2 using Nginx, PM2, S3, and CloudFront."
  },
  {
    role: "Bachelor of Engineering (IT)",
    company: "Shantilal Shah Engineering College",
    date: "2022 - 2025",
    desc: "Completed BE in Information Technology and graduated with a CGPA of 8.17."
  },
  {
    role: "Diploma in Engineering (IT)",
    company: "Sir Bhavsinhji Polytechnic Institute",
    date: "2019 - 2022",
    desc: "Completed Diploma in Information Technology and graduated with a CGPA of 9.05."
  },
  {
    role: "Secondary School Certificate",
    company: "Shree Vidhyavihar Secondary School",
    date: "2019",
    desc: "Completed GSEB Secondary School Certificate with 82.5%."
  }
];

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
          {careerItems.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.date}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
