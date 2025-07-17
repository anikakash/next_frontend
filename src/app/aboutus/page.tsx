import React from "react";

const AboutUs = () => (
  <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
    <h1>About Me</h1>
    <section>
      <h2>Anik Akash</h2>
      <p>
        Hi, I am <strong>Anik Akash</strong>. I am passionate about technology, software development, and continuous learning.
      </p>
    </section>
    <section>
      <h3>Education</h3>
      <ul>
        <li>
          <strong>Bachelor of Science in Computer Science</strong><br />
          University of XYZ, 2018 - 2022
        </li>
      </ul>
    </section>
    <section>
      <h3>Work Experience</h3>
      <ul>
        <li>
          <strong>Software Engineer</strong> at ABC Tech<br />
          July 2022 - Present
        </li>
        <li>
          <strong>Intern</strong> at DEF Solutions<br />
          Jan 2022 - June 2022
        </li>
      </ul>
    </section>
    <section>
      <h3>Skills</h3>
      <ul>
        <li>JavaScript, TypeScript, React, Node.js</li>
        <li>REST APIs, GraphQL</li>
        <li>SQL, MongoDB</li>
        <li>Git, CI/CD</li>
      </ul>
    </section>
  </main>
);

export default AboutUs;