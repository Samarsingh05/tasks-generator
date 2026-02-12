function generateSpec({ goal, users, constraints, template, risks }) {
  // Generate more sophisticated user stories based on context
  const stories = [
    `As a ${users}, I want to ${goal} so that I can achieve my objectives efficiently.`,
    `As a ${users}, I want to track the progress of ${goal} so that I can stay informed.`,
    `As a ${users}, I want to receive notifications about ${goal} so that I don't miss important updates.`
  ]

  // Add context-specific stories
  if (template === "mobile") {
    stories.push(`As a ${users}, I want to access ${goal} on my mobile device so that I can use it on the go.`)
  }
  
  if (template === "web") {
    stories.push(`As a ${users}, I want ${goal} to work seamlessly across different browsers so that I have a consistent experience.`)
  }
  
  if (template === "internal") {
    stories.push(`As a ${users}, I want ${goal} to integrate with existing tools so that my workflow remains streamlined.`)
  }

  // Generate comprehensive engineering tasks
  const tasks = [
    "Set up project structure and development environment",
    "Design database schema and data models",
    "Create RESTful API endpoints for core functionality",
    "Implement user authentication and authorization",
    "Build responsive frontend components",
    "Add form validation and error handling",
    "Implement real-time updates using WebSockets",
    "Set up automated testing framework",
    "Configure CI/CD pipeline",
    "Add logging and monitoring capabilities",
    "Implement caching strategies for performance",
    "Create comprehensive documentation"
  ]

  // Add template-specific tasks
  if (template === "mobile") {
    tasks.push(
      "Optimize touch interactions and gestures",
      "Implement offline functionality",
      "Design adaptive layouts for different screen sizes",
      "Handle mobile-specific permissions and features"
    )
  }
  
  if (template === "web") {
    tasks.push(
      "Ensure cross-browser compatibility",
      "Implement SEO best practices",
      "Optimize for search engine indexing",
      "Add progressive web app features"
    )
  }
  
  if (template === "internal") {
    tasks.push(
      "Implement role-based access control",
      "Set up single sign-on (SSO) integration",
      "Create admin dashboard for management",
      "Add audit logging for compliance"
    )
  }

  // Add constraint-specific tasks
  if (constraints) {
    tasks.push(`Analyze and implement solution within constraints: ${constraints}`)
    tasks.push("Create technical documentation for constraint compliance")
  }

  // Add risk mitigation tasks
  if (risks) {
    tasks.push(`Conduct risk assessment for: ${risks}`)
    tasks.push("Implement fallback mechanisms for identified risks")
    tasks.push("Create contingency plans for risk mitigation")
  }

  // Add quality assurance tasks
  tasks.push(
    "Perform load testing and performance optimization",
    "Conduct security audit and penetration testing",
    "Implement automated regression testing",
    "Set up error tracking and alerting"
  )

  // Add deployment and maintenance tasks
  tasks.push(
    "Configure production environment",
    "Set up backup and disaster recovery",
    "Create deployment runbooks",
    "Plan for scalability and future enhancements"
  )

  return { stories, tasks }
}

module.exports = generateSpec
