import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "EvoqPulse",
    category: "HR & Attendance Platform",
    description: "Developed RESTful APIs for employee, attendance, and leave management. Built QR-based attendance system with geolocation verification and implemented JWT authentication with RBAC. Designed MongoDB schemas and integrated email notifications for HR workflows. Assisted in AWS deployment.",
    tools: "Node.js, Express.js, MongoDB, AWS, JWT"
  },
  {
    name: "Logistics Management System",
    category: "Backend System",
    description: "Developed REST APIs for driver, company, and route management. Implemented JWT authentication and role-based authorization. Designed highly optimized MongoDB schemas with indexing. Successfully deployed the system on AWS (EC2, S3, CloudFront) using CI/CD pipelines with GitHub Actions.",
    tools: "Node.js, Express.js, MongoDB, AWS, GitHub Actions"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = boxes[0].getBoundingClientRect();
      const parentWidth = boxes[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(boxes[0]).padding) / 2;
      translateX = rect.width * boxes.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    // Only hook up animation if there's enough content to scroll
    if (translateX > 0) {
      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    }

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Project Highlights</h4>
                <p style={{ marginTop: "10px", lineHeight: "1.5" }}>{project.description}</p>
                <h4 style={{ marginTop: "20px" }}>Tools & Features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
