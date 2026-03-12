import { db } from '../utils/db'
import { posts } from '../database/schema'

export default defineEventHandler(async () => {
  const samplePosts = [
    {
      id: crypto.randomUUID(),
      title: 'The Future of Web Design: Minimalism Meets Functionality',
      description: 'Exploring how modern web design is embracing clean aesthetics while maintaining powerful functionality and user experience.',
      content: 'The landscape of web design is evolving rapidly. As we move into 2026, we are seeing a beautiful marriage between minimalist aesthetics and robust functionality.\n\nGone are the days of cluttered interfaces and overwhelming visual noise. Today users demand clarity, speed, and purpose in every interaction.\n\n## The Rise of Minimalism\n\nMinimalist design is not about removing features—it is about removing distractions. Every element serves a purpose, every pixel has meaning.\n\n## Key Principles\n\n1. White Space is Your Friend - Let your content breathe\n2. Typography Matters - Choose fonts that speak to your brand\n3. Color with Purpose - Use color to guide, not distract\n4. Performance First - Fast sites win users\n\nThe future belongs to designers who can balance beauty with utility, creating experiences that are both delightful and efficient.',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200',
      date: 'Mar 10, 2026',
      readTime: '6 min',
      metaTitle: 'The Future of Web Design - Minimalism & Functionality',
      metaDescription: 'Discover how modern web design balances minimalist aesthetics with powerful functionality for better user experiences.',
      keywords: 'web design, minimalism, UX, UI design, modern design',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Building Scalable Applications with Nuxt 3',
      description: 'A comprehensive guide to architecting production-ready applications using Nuxt 3, covering best practices and performance optimization.',
      content: 'Nuxt 3 has revolutionized the way we build Vue applications. With its powerful features and excellent developer experience, it has become the go-to framework for modern web development.\n\n## Why Nuxt 3?\n\nThe framework offers server-side rendering, static site generation, and a hybrid approach—all in one package. This flexibility is crucial for building scalable applications.\n\n## Architecture Best Practices\n\nComponent Structure: Keep components small and focused. Each component should do one thing well.\n\nState Management: Use Pinia for complex state, composables for shared logic, and props for component communication.\n\nAPI Layer: Organize your API routes logically. Use middleware for authentication and validation.\n\n## Performance Optimization\n\n1. Lazy load components and routes\n2. Optimize images with Nuxt Image\n3. Use server-side caching strategically\n4. Minimize bundle size with tree-shaking\n\nThe key to scalability is planning ahead while keeping your code maintainable and your architecture flexible.',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
      date: 'Mar 09, 2026',
      readTime: '8 min',
      metaTitle: 'Building Scalable Apps with Nuxt 3 - Complete Guide',
      metaDescription: 'Learn how to build production-ready, scalable applications with Nuxt 3 using best practices and optimization techniques.',
      keywords: 'nuxt 3, vue, web development, scalability, performance',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'The Art of Technical Writing: Making Complex Simple',
      description: 'Master the craft of technical writing by learning how to explain complex concepts in clear, accessible language that resonates with your audience.',
      content: 'Technical writing is an art form that bridges the gap between complexity and understanding. The best technical writers make difficult concepts feel effortless.\n\n## Understanding Your Audience\n\nBefore writing a single word, know who you are writing for. Are they beginners? Experts? What is their context?\n\n## The Golden Rules\n\nClarity Over Cleverness: Your goal is understanding, not impressing. Use simple words when possible.\n\nStructure Matters: Break content into digestible chunks. Use headings, lists, and visual hierarchy.\n\nShow, Do not Just Tell: Code examples, diagrams, and real-world scenarios make concepts stick.\n\n## Writing Process\n\n1. Research thoroughly\n2. Outline your structure\n3. Write the first draft quickly\n4. Edit ruthlessly\n5. Get feedback\n6. Iterate\n\nRemember: great technical writing feels like a conversation with a knowledgeable friend, not a lecture from a professor.',
      category: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200',
      date: 'Mar 08, 2026',
      readTime: '5 min',
      metaTitle: 'The Art of Technical Writing - Making Complex Simple',
      metaDescription: 'Learn the craft of technical writing and how to explain complex concepts clearly and effectively.',
      keywords: 'technical writing, documentation, communication, writing tips',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Dark Mode Design: Beyond Just Inverting Colors',
      description: 'Dive deep into the principles of effective dark mode design, exploring color theory, accessibility, and user preferences.',
      content: 'Dark mode is not just a trend—it is a fundamental shift in how we think about digital interfaces. But implementing it well requires more than flipping a switch.\n\n## The Psychology of Dark Mode\n\nUsers love dark mode for various reasons: reduced eye strain, better battery life on OLED screens, and aesthetic preference. Understanding these motivations helps us design better.\n\n## Color Theory for Dark Themes\n\nAvoid Pure Black: Use dark grays instead of pure black. Pure black creates too much contrast.\n\nDesaturate Colors: Bright, saturated colors hurt in dark mode. Reduce saturation by 20-30%.\n\nElevation Through Lightness: In dark mode, lighter surfaces appear elevated. Use this for depth.\n\n## Accessibility Considerations\n\n- Maintain WCAG contrast ratios\n- Test with actual users\n- Provide manual toggle option\n- Remember color-blind users\n\n## Implementation Tips\n\nUse CSS custom properties for easy theme switching. Store user preference in localStorage. Consider system preferences with prefers-color-scheme.\n\nDark mode done right enhances user experience. Done wrong, it is just harder to read.',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      date: 'Mar 07, 2026',
      readTime: '7 min',
      metaTitle: 'Dark Mode Design - Beyond Inverting Colors',
      metaDescription: 'Master dark mode design with proper color theory, accessibility guidelines, and implementation best practices.',
      keywords: 'dark mode, UI design, color theory, accessibility, UX',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Database Design Patterns for Modern Applications',
      description: 'Explore essential database design patterns that help build efficient, scalable, and maintainable data architectures.',
      content: 'Good database design is the foundation of any successful application. Poor design leads to performance issues, data inconsistencies, and maintenance nightmares.\n\n## Fundamental Principles\n\nNormalization: Organize data to reduce redundancy. But do not over-normalize—sometimes denormalization improves performance.\n\nIndexing Strategy: Index columns used in WHERE, JOIN, and ORDER BY clauses. But remember: indexes speed up reads and slow down writes.\n\n## Common Patterns\n\nSingle Table Inheritance: Store different entity types in one table with a type discriminator. Great for similar entities.\n\nPolymorphic Associations: One entity relates to multiple entity types. Use carefully—can complicate queries.\n\nSoft Deletes: Mark records as deleted instead of removing them. Essential for audit trails and data recovery.\n\n## Performance Optimization\n\n1. Use appropriate data types\n2. Avoid SELECT star\n3. Implement connection pooling\n4. Cache frequently accessed data\n5. Monitor slow queries\n\n## Modern Considerations\n\nWith edge databases like Turso, consider data locality. Place data close to users for better performance.\n\nRemember: premature optimization is the root of all evil, but thoughtful design prevents future pain.',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200',
      date: 'Mar 06, 2026',
      readTime: '9 min',
      metaTitle: 'Database Design Patterns for Modern Apps',
      metaDescription: 'Learn essential database design patterns for building efficient and scalable modern applications.',
      keywords: 'database design, SQL, data architecture, performance, optimization',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'The Rise of Edge Computing: Bringing Code Closer to Users',
      description: 'Understanding edge computing and how it transforms web performance by processing data closer to end users.',
      content: 'Edge computing is revolutionizing how we think about web infrastructure. By moving computation closer to users, we are achieving unprecedented performance gains.\n\n## What is Edge Computing?\n\nInstead of routing all requests to a central server, edge computing processes data at network edges—closer to where users actually are.\n\n## Benefits\n\nReduced Latency: Shorter distance equals faster response times. Users in Tokyo do not wait for servers in Virginia.\n\nBetter Reliability: Distributed architecture means no single point of failure. If one edge node fails, others continue serving.\n\nCost Efficiency: Serve static content from edge, dynamic from origin. Reduce bandwidth costs significantly.\n\n## Use Cases\n\n- CDN Enhancement: Cache and serve assets globally\n- API Gateways: Route and transform requests at the edge\n- Personalization: Customize content based on location\n- Security: Block threats before they reach origin\n\n## Implementation with Vercel\n\nVercel Edge Network automatically deploys your code globally. Functions run in the region closest to users.\n\n## Best Practices\n\n1. Keep edge functions lightweight\n2. Use edge for read-heavy operations\n3. Cache aggressively\n4. Monitor edge performance\n\nThe future of web performance is distributed. Edge computing is not just faster—it is fundamentally better architecture.',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
      date: 'Mar 05, 2026',
      readTime: '6 min',
      metaTitle: 'Edge Computing - Bringing Code Closer to Users',
      metaDescription: 'Discover how edge computing transforms web performance by processing data closer to end users.',
      keywords: 'edge computing, CDN, performance, web infrastructure, Vercel',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Mastering CSS Grid: The Layout System We Deserve',
      description: 'A deep dive into CSS Grid, exploring advanced techniques and real-world patterns for creating sophisticated layouts.',
      content: 'CSS Grid has fundamentally changed how we approach layout on the web. It is not just another tool—it is the tool we have been waiting for.\n\n## Why Grid Changed Everything\n\nBefore Grid, complex layouts required hacks, frameworks, or JavaScript. Grid makes sophisticated layouts trivial with pure CSS.\n\n## Core Concepts\n\nGrid Container: The parent element with display grid. Defines the grid structure.\n\nGrid Items: Direct children of the container. Placed automatically or explicitly.\n\nGrid Lines: The dividing lines that create the grid structure. Numbered from 1.\n\n## Powerful Patterns\n\nHoly Grail Layout: Header, footer, sidebar, and main content—all responsive without media queries.\n\nCard Grids: Auto-fit and minmax create responsive card layouts that adapt to any screen.\n\nOverlapping Elements: Place items on the same grid cells for creative designs.\n\n## Advanced Techniques\n\nUse CSS Grid with auto-fit and minmax for responsive layouts that automatically adjust columns based on available space.\n\n## Grid vs Flexbox\n\nUse Grid for two-dimensional layouts. Use Flexbox for one-dimensional layouts. Often, you will use both together.\n\n## Browser Support\n\nGrid has excellent support across all modern browsers.\n\nCSS Grid is not the future—it is the present. Master it, and you will wonder how you ever lived without it.',
      category: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200',
      date: 'Mar 04, 2026',
      readTime: '7 min',
      metaTitle: 'Mastering CSS Grid - Advanced Layout Techniques',
      metaDescription: 'Learn CSS Grid with advanced techniques and real-world patterns for creating sophisticated web layouts.',
      keywords: 'CSS Grid, web layout, CSS, responsive design, frontend',
      isPublished: 1
    },
    {
      id: crypto.randomUUID(),
      title: 'Building a Personal Brand as a Developer',
      description: 'Strategic insights on establishing and growing your personal brand in the tech industry through content, networking, and authentic engagement.',
      content: 'Your personal brand is your reputation, amplified. In tech, a strong personal brand opens doors to opportunities you did not know existed.\n\n## Why Personal Branding Matters\n\nCompanies hire people they know and trust. A strong brand makes you known and trusted before the interview even starts.\n\n## Building Blocks\n\nContent Creation: Write blog posts, create tutorials, share insights. Teach what you learn.\n\nSocial Presence: Be active on Twitter, LinkedIn, or GitHub. Engage authentically, not just for likes.\n\nOpen Source: Contribute to projects you use. Start your own. Show your code to the world.\n\n## Content Strategy\n\nDo not try to be everywhere. Pick 1-2 platforms and be consistent there. Quality over quantity, always.\n\nWhat to Share:\n- Things you learned recently\n- Problems you solved\n- Tools you discovered\n- Opinions on industry trends\n\n## Networking\n\nAttend conferences, join communities, participate in discussions. But remember: networking is about giving, not taking.\n\n## Authenticity Wins\n\nDo not pretend to know everything. Share your learning journey. People connect with humans, not perfect robots.\n\n## Long-term Thinking\n\nBuilding a brand takes years, not months. Be patient. Be consistent. Be yourself.\n\nYour brand is what people say about you when you are not in the room. Make sure they are saying good things.',
      category: 'Opinion',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',
      date: 'Mar 03, 2026',
      readTime: '5 min',
      metaTitle: 'Building a Personal Brand as a Developer',
      metaDescription: 'Learn how to establish and grow your personal brand in tech through content, networking, and authentic engagement.',
      keywords: 'personal branding, career development, tech career, networking, content creation',
      isPublished: 1
    }
  ]

  try {
    await db.delete(posts)
    
    for (const post of samplePosts) {
      await db.insert(posts).values(post)
    }

    return { 
      success: true, 
      message: `Successfully seeded ${samplePosts.length} professional blog posts!`,
      count: samplePosts.length 
    }
  } catch (error) {
    console.error('Seed error:', error)
    throw createError({ 
      statusCode: 500, 
      message: 'Failed to seed database' 
    })
  }
})
