import { useState, useEffect } from 'react'
import './App.css'
import ModelPredictor from './components/ModelPredictor'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'background', 'work', 'projects', 'analyzer', 'contact']
      const scrollPosition = window.scrollY + 150

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'background', label: 'Background' },
    { id: 'work', label: 'Work History' },
    { id: 'projects', label: 'Projects' },
    { id: 'analyzer', label: 'Security Analyzer' },
    { id: 'contact', label: 'Contact' }
  ]

  const workHistory = [
    {
      title: 'AI Researcher',
      organization: 'Data Engineering and Predictive Analytics Lab (CEAMLS)',
      location: 'Morgan State University',
      period: '2021 - Present',
      description: 'Leading research in AI-based medical imaging for Alzheimer\'s detection, forensic video analysis, and blockchain security. Published multiple papers with recognition including ASEE Best Paper Award.',
      achievements: [
        'Developed ensemble models for Alzheimer\'s disease detection using CNNs and Vision Transformers',
        'Created multimodal LLM frameworks for forensic video analysis',
        'Implemented smart contract vulnerability detection systems with explainable AI',
        'Published peer-reviewed papers in AI and computer vision'
      ]
    },
    {
      title: 'Founder & CEO',
      organization: 'Favored Online',
      location: 'Global (Remote)',
      period: '2018 - Present',
      description: 'Built and scaled an AI education platform that has trained over 1,000 professionals worldwide in artificial intelligence and machine learning.',
      achievements: [
        'Trained 1000+ professionals across multiple continents',
        'Developed comprehensive AI curriculum from beginner to advanced levels',
        'Created hands-on projects and real-world applications',
        'Built a global community of AI practitioners'
      ]
    },
    {
      title: 'Founder',
      organization: 'Morgan TechFest',
      location: 'Morgan State University',
      period: '2023 - Present',
      description: 'Founded and lead a student-driven technology initiative promoting innovation, career development, and technical excellence at Morgan State University.',
      achievements: [
        'Launched platform transitioning from annual conference to year-round programming',
        'Developed ProjectX for continuous career development',
        'Organized Innovation Expo connecting students with industry',
        'Built community of tech-focused students and professionals'
      ]
    },
    {
      title: 'Google Women Techmakers Ambassador',
      organization: 'Google',
      location: 'Remote',
      period: '2023 - Present',
      description: 'Advocating for women in technology, organizing community events, and mentoring aspiring technologists.',
      achievements: [
        'Led workshops on AI and machine learning',
        'Mentored women entering tech careers',
        'Organized community-building tech events',
        'Promoted diversity and inclusion in technology'
      ]
    },
    {
      title: 'Former AI Evangelist',
      organization: 'Omdena Inc.',
      location: 'Remote',
      period: '2020 - 2021',
      description: 'Promoted AI education and facilitated collaborative AI projects addressing real-world challenges.',
      achievements: [
        'Led AI project teams across multiple continents',
        'Developed educational content for AI practitioners',
        'Facilitated collaboration on social impact AI projects',
        'Built partnerships with organizations for AI solutions'
      ]
    }
  ]

  const educationBackground = [
    {
      degree: 'PhD in Computer Systems & Electrical Engineering',
      institution: 'Morgan State University',
      period: '2021 - Present',
      focus: 'AI-based Medical Imaging, Forensic Video Analysis, Blockchain Security',
      achievements: [
        'IBM Masters Fellowship recipient',
        'ASEE Best Paper Award winner',
        'Published research on multimodal LLMs for crime detection',
        'Developed novel approaches to person tracking in video footage'
      ]
    },
    {
      degree: 'Master\'s in Computer Science',
      institution: 'Morgan State University',
      period: '2019 - 2021',
      focus: 'Machine Learning, Computer Vision, AI Applications',
      achievements: [
        'Research on experiment-centric pedagogy in digital logic education',
        'Developed AI models for medical diagnostics',
        'Contributed to blockchain security research'
      ]
    }
  ]

  const technicalExpertise = [
    {
      category: 'AI & Machine Learning',
      skills: ['Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Ensemble Models', 'CNNs & Vision Transformers', 'Explainable AI (LIME, SHAP)']
    },
    {
      category: 'Research Areas',
      skills: ['Medical Image Analysis', 'Forensic Video Analysis', 'Blockchain Security', 'Smart Contract Vulnerability Detection', 'Person Tracking & Re-identification']
    },
    {
      category: 'Technical Stack',
      skills: ['Python', 'TensorFlow/PyTorch', 'React', 'Firebase', 'LaTeX', 'Git', 'Statistical Analysis', 'Data Visualization']
    },
    {
      category: 'Tools & Frameworks',
      skills: ['GPT-4o', 'Claude', 'Gemini', 'CodeBERT', 'Random Forest', 'SVM', 'Kalman Filtering', 'Hungarian Algorithm']
    }
  ]

  const featuredProjects = [
    {
      title: 'Multimodal LLM for Forensic Video Analysis',
      description: 'Comprehensive evaluation framework comparing AI prompting techniques across GPT-4o, Claude, and Gemini for crime detection using the UCF-Crime dataset.',
      tech: ['Python', 'Computer Vision', 'LLMs', 'Statistical Validation'],
      impact: 'Published research advancing the field of forensic video analysis'
    },
    {
      title: 'Smart Contract Vulnerability Detection',
      description: 'Ensemble model combining Random Forest and SVM with CodeBERT-based feature extraction and explainability frameworks for blockchain security.',
      tech: ['Machine Learning', 'Blockchain', 'Python', 'LIME', 'SHAP'],
      impact: 'Enhanced security in smart contract development'
    },
    {
      title: 'Alzheimer\'s Disease Detection System',
      description: 'AI-powered medical imaging system using ensemble frameworks combining CNNs and Vision Transformers for early Alzheimer\'s detection.',
      tech: ['Deep Learning', 'Medical Imaging', 'CNNs', 'Vision Transformers'],
      impact: 'Contributing to early diagnosis and treatment planning'
    },
    {
      title: 'Morgan TechFest Platform',
      description: 'React-based platform with Firebase integration, user authentication, and project management for year-round career development programming.',
      tech: ['React', 'Firebase', 'Web Development', 'UX Design'],
      impact: 'Empowering students with tech career resources'
    }
  ]

  const publications = [
    'AI-Driven Forensic Video Analysis: A Comparative Study of Prompting Techniques',
    'Ensemble Approaches for Smart Contract Vulnerability Detection',
    'Explainable AI in Blockchain Security: LIME and SHAP Applications',
    'Experiment-Centric Pedagogy in Digital Logic Education',
    'Vision Transformers for Alzheimer\'s Disease Detection'
  ]

  return (
    <div className="app">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-name">Opeyemi</span>
            <span className="logo-title">AI Researcher & Educator</span>
          </div>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {menuItems.map(item => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="gradient-sphere sphere-1"></div>
          <div className="gradient-sphere sphere-2"></div>
          <div className="gradient-sphere sphere-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-label">PhD Candidate | AI Researcher | Tech Educator</div>
          <h1 className="hero-title">
            <span className="title-line">Building the Future</span>
            <span className="title-line highlight">Through AI Innovation</span>
          </h1>
          <p className="hero-description">
            Pioneering research in AI-based medical imaging, forensic video analysis, and blockchain security 
            while empowering the next generation of tech leaders through education and mentorship.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Published Papers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Organizations Founded</div>
            </div>
          </div>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => scrollToSection('work')}>
              View My Work
            </button>
            <button className="cta-secondary" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-content">
            <div className="about-main">
              <div className="about-text">
                <p className="lead-text">
                  I'm a PhD candidate at Morgan State University specializing in Computer Systems and Electrical Engineering, 
                  with a passion for leveraging artificial intelligence to solve complex real-world problems.
                </p>
                <p>
                  My research focuses on three critical areas: AI-based medical imaging for early Alzheimer's disease detection, 
                  forensic video analysis using multimodal large language models, and blockchain security through smart contract 
                  vulnerability detection. Each of these domains represents an opportunity to apply cutting-edge AI techniques 
                  to challenges that directly impact human lives.
                </p>
                <p>
                  Beyond academia, I'm deeply committed to democratizing AI education. As the founder and CEO of Favored Online, 
                  I've had the privilege of training over 1,000 professionals worldwide in artificial intelligence and machine 
                  learning, helping them transition into tech careers and apply AI in their respective fields.
                </p>
                <p>
                  At Morgan State University, I founded Morgan TechFest, a student-led technology initiative that has evolved 
                  from an annual conference into a year-round career development platform. Through ProjectX and the Innovation 
                  Expo, we're creating pathways for students to engage with industry and build meaningful careers in technology.
                </p>
                <p>
                  As a Google Women Techmakers Ambassador and former AI Evangelist at Omdena Inc., I advocate for diversity 
                  in technology and work to create inclusive spaces where everyone can thrive. I'm currently authoring 
                  "Career Path in Tech: A Comprehensive Guide for the AI Age" to help the next generation navigate their 
                  journey in this rapidly evolving field.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <div className="highlight-icon">🎓</div>
                  <h3>Academic Excellence</h3>
                  <p>PhD candidate with IBM Masters Fellowship and ASEE Best Paper Award</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">💡</div>
                  <h3>Innovation Leader</h3>
                  <p>Founded multiple tech initiatives impacting thousands of learners</p>
                </div>
                <div className="highlight-card">
                  <div className="highlight-icon">🌍</div>
                  <h3>Global Impact</h3>
                  <p>Training professionals across continents in AI and machine learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="section background-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">Educational Background</h2>
          </div>
          <div className="background-content">
            {educationBackground.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="edu-header">
                  <div className="edu-degree">
                    <h3>{edu.degree}</h3>
                    <div className="edu-meta">
                      <span className="edu-institution">{edu.institution}</span>
                      <span className="edu-period">{edu.period}</span>
                    </div>
                  </div>
                </div>
                <div className="edu-focus">
                  <strong>Research Focus:</strong> {edu.focus}
                </div>
                <div className="edu-achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="expertise-section">
              <h3 className="expertise-title">Technical Expertise</h3>
              <div className="expertise-grid">
                {technicalExpertise.map((area, index) => (
                  <div key={index} className="expertise-card">
                    <h4>{area.category}</h4>
                    <div className="skills-list">
                      {area.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="publications-section">
              <h3 className="publications-title">Selected Publications</h3>
              <ul className="publications-list">
                {publications.map((pub, index) => (
                  <li key={index} className="publication-item">
                    <span className="pub-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pub-title">{pub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Work History Section */}
      <section id="work" className="section work-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2 className="section-title">Work History</h2>
          </div>
          <div className="work-timeline">
            {workHistory.map((work, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="work-header">
                    <h3 className="work-title">{work.title}</h3>
                    <span className="work-period">{work.period}</span>
                  </div>
                  <div className="work-organization">
                    <span>{work.organization}</span>
                    <span className="work-location">{work.location}</span>
                  </div>
                  <p className="work-description">{work.description}</p>
                  <div className="work-achievements">
                    <h4>Key Contributions:</h4>
                    <ul>
                      {work.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-impact">
                  <strong>Impact:</strong> {project.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Analyzer Section */}
      <section id="analyzer" className="section analyzer-section">
        <div className="container">
          <ModelPredictor />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-number">05</span>
            <h2 className="section-title">Let's Connect</h2>
          </div>
          <div className="contact-content">
            <div className="contact-intro">
              <p className="contact-text">
                I'm always interested in collaborating on research projects, speaking at events, 
                mentoring aspiring technologists, or discussing opportunities in AI research and education.
              </p>
              <p className="contact-text">
                Whether you're looking to collaborate, need consulting for your AI projects, or want to 
                bring AI education to your organization, I'd love to hear from you.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <a href="mailto:contact@example.com">contact@example.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <div className="contact-details">
                    <h4>LinkedIn</h4>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Connect with me</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📚</div>
                  <div className="contact-details">
                    <h4>Google Scholar</h4>
                    <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">View publications</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">🐙</div>
                  <div className="contact-details">
                    <h4>GitHub</h4>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">See my code</a>
                  </div>
                </div>
              </div>

              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Research Collaboration" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="6" placeholder="Tell me about your project or inquiry..." required></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                  <span className="button-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <h3>Opeyemi</h3>
              <p>AI Researcher, Educator, and Tech Advocate</p>
              <p className="footer-tagline">Building the future through innovation, education, and community</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Initiatives</h4>
                <ul>
                  <li><a href="https://favoredonline.com" target="_blank" rel="noopener noreferrer">Favored Online</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Morgan TechFest</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">ProjectX</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Research Papers</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">AI Courses</a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer">Tech Blog</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Opeyemi. All rights reserved.</p>
            <p>Designed & Developed with passion for AI and education</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
