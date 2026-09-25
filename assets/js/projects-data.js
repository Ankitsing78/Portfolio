/**
 * Portfolio Data Source: Projects & Insights
 * Senior Full Stack Developer & Distributed Systems Architect
 */

const portfolioData = {
  projects: [
    {
      id: "cloudscale-saas",
      title: "CloudScale: Multi-Tenant Enterprise Microservices SaaS",
      category: "fullstack",
      subtitle: "Enterprise cloud telemetry, automated SLA tracking, and multi-tenant resource orchestration.",
      image: "assets/images/project-saas.jpg",
      tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "Kafka"],
      metrics: [
        { label: "SLA Uptime", value: "99.98%" },
        { label: "Global Latency", value: "32ms" },
        { label: "Daily Active Users", value: "145K+" }
      ],
      description: "CloudScale is a flagship enterprise cloud observability and resource management platform. Designed for high availability and distributed microservice clusters, it delivers sub-second metrics streaming, automated role-based access control (RBAC), and dynamic tenant isolation.",
      challenge: "Processing over 250,000 real-time telemetry events per minute across heterogeneous cloud providers without causing database write bottlenecks or UI lag.",
      solution: "Architected an event-driven ingestion pipeline with Apache Kafka and Redis streams, paired with TimescaleDB for hypertable time-series rollups. The frontend was built with Next.js App Router and WebSockets for low-latency visual telemetry.",
      features: [
        "Real-time interactive dashboard with customizable drag-and-drop telemetry widgets",
        "Automated SLA tracking & incident escalation pipelines with PagerDuty integration",
        "Zero-downtime rolling updates supported by Docker & Kubernetes orchestration",
        "Granular RBAC with cryptographic JWT session validation & audit logs"
      ],
      liveUrl: "https://cloudscale-demo.example.com",
      githubUrl: "https://github.com/Ankitsing78/cloudscale-enterprise-saas"
    },
    {
      id: "fintrack-engine",
      title: "FinTrack: Real-Time High-Frequency Trading & Market Engine",
      category: "backend",
      subtitle: "Sub-millisecond latency orderbook matching, algorithmic execution, and live analytics.",
      image: "assets/images/project-fintech.jpg",
      tags: ["Python", "FastAPI", "Redis", "TimescaleDB", "TypeScript", "WebSockets", "Go"],
      metrics: [
        { label: "Order Latency", value: "< 1.2ms" },
        { label: "Monthly Volume", value: "$4.2M" },
        { label: "Throughput", value: "85K req/s" }
      ],
      description: "FinTrack is a high-performance quantitative trading and market telemetry engine. It bridges low-latency backend execution with an ultra-responsive client interface featuring real-time Depth of Market (DOM) charts and automated order matching.",
      challenge: "Eliminating thread contention and garbage collection spikes during high market volatility while broadcasting live orderbook diffs to tens of thousands of subscribed clients.",
      solution: "Built a lock-free memory orderbook in Go and Python FastAPI asynchronous workers. Leveraged Redis Pub/Sub combined with binary protocol buffers over WebSockets to minimize payload serialization overhead.",
      features: [
        "Interactive TradingView-grade financial candlestick and depth chart visualizers",
        "Live memory orderbook with sub-millisecond algorithmic limit/market matching",
        "Risk mitigation engine with dynamic margin calculations and stop-loss triggers",
        "Complete historical backtesting simulator with tick-level market data"
      ],
      liveUrl: "https://fintrack-demo.example.com",
      githubUrl: "https://github.com/Ankitsing78/fintrack-trading-engine"
    },
    {
      id: "devflow-ai",
      title: "DevFlow: Collaborative AI-Assisted Developer Workspace",
      category: "frontend",
      subtitle: "Multiplayer cloud visual canvas, AST code transformation, and real-time AI copilot.",
      image: "assets/images/project-devflow.jpg",
      tags: ["React", "TypeScript", "WebAssembly", "WebRTC", "LangChain", "Node.js", "Docker"],
      metrics: [
        { label: "Code Velocity", value: "+38%" },
        { label: "Sync Latency", value: "< 18ms" },
        { label: "Active Teams", value: "3,200+" }
      ],
      description: "DevFlow is a next-generation collaborative workspace that visualizes distributed microservice topologies and generates validated boilerplate code in real time using specialized LLMs and AST manipulation.",
      challenge: "Guaranteeing conflict-free distributed state synchronization (CRDT) for concurrent code canvas edits while running lightweight client-side AST linters.",
      solution: "Implemented Yjs CRDT over peer-to-peer WebRTC with centralized WebSocket fallbacks. Compiled Tree-sitter parsers to WebAssembly to perform instantaneous syntax validation in background Web Workers.",
      features: [
        "Infinite node canvas mapping microservice APIs, message queues, and databases",
        "Multiplayer cursor presence with team voice channels and live diff previews",
        "Integrated AI terminal running automated security audits and unit test generators",
        "Direct export to production Docker Compose and Helm Kubernetes charts"
      ],
      liveUrl: "https://devflow-demo.example.com",
      githubUrl: "https://github.com/Ankitsing78/devflow-collaborative-ai"
    },
    {
      id: "omnistore-platform",
      title: "OmniConnect: High-Throughput Vendor & E-Commerce Platform",
      category: "fullstack",
      subtitle: "Distributed multi-vendor marketplace with automated payouts, order telemetry, and inventory sync.",
      image: "assets/images/project-ecommerce.jpg",
      tags: ["Next.js", "Node.js", "GraphQL", "PostgreSQL", "Stripe API", "Kubernetes", "AWS"],
      metrics: [
        { label: "Peak TPS", value: "50,000+" },
        { label: "GMV Handled", value: "$4.2M/mo" },
        { label: "Inventory Sync", value: "99.99%" }
      ],
      description: "OmniConnect empowers global vendors to manage catalog lifecycles, automated multi-currency payouts, and high-concurrency flash sales with zero inventory overselling.",
      challenge: "Preventing race conditions during flash sales with hundreds of simultaneous checkout attempts per item SKU across geo-distributed regions.",
      solution: "Engineered distributed Redis locks with optimistic concurrency in PostgreSQL isolation transactions. Deployed global CDN edge edge-caching for product listings and headless GraphQL gateways.",
      features: [
        "Dynamic multi-vendor dashboard with real-time sales telemetry and settlement tracking",
        "Distributed inventory reservation system resilient to network partitions",
        "Automated Stripe Connect split payments with automated tax calculation",
        "Comprehensive vendor analytics and conversion funnel visualization"
      ],
      liveUrl: "https://omniconnect-demo.example.com",
      githubUrl: "https://github.com/Ankitsing78/omniconnect-vendor-platform"
    }
  ],

  articles: [
    {
      id: "k8s-zero-downtime",
      title: "Architecting Zero-Downtime Deployments with Kubernetes and Canary Releases",
      category: "DevOps & Cloud",
      date: "Sep 15, 2026",
      readTime: "7 min read",
      image: "assets/images/blog-k8s.jpg",
      summary: "A practical guide to implementing robust progressive delivery, automated rollback heuristics, and traffic shifting using Argo Rollouts and Istio Service Mesh.",
      content: `
        <h3>Introduction</h3>
        <p>In modern cloud engineering, deploying to production cannot be a nail-biting event. As systems scale to handle millions of transactions, zero-downtime deployments become a core requirement of business continuity. This article breaks down how we architected automated canary pipelines to guarantee seamless updates without dropping a single active HTTP connection.</p>
        
        <h3>The Anatomy of Progressive Delivery</h3>
        <p>Traditional blue-green deployments swap 100% of traffic instantaneously. While superior to in-place updates, this still exposes all users to potential unseen edge-case bugs. Canary deployments solve this by introducing new replicas incrementally:</p>
        <ul>
          <li><strong>Step 1 (5% Traffic):</strong> Shift a minimal slice of real user requests to the canary pod. Monitor Prometheus metrics for error rate spikes (HTTP 5xx > 0.05%) and p99 latency regressions.</li>
          <li><strong>Step 2 (20% Traffic):</strong> Validate cache hit rates and database connection pool saturation.</li>
          <li><strong>Step 3 (50% & 100%):</strong> Promote to full deployment once health checks satisfy automated SLI/SLO criteria.</li>
        </ul>

        <h3>Automated Rollbacks & Analysis</h3>
        <p>Human observation during deployments does not scale. By configuring Prometheus metric queries directly in our Kubernetes CRDs, any deviation beyond standard deviations immediately triggers automated traffic diversion back to the stable replica set, alerting the team on Slack with automated stacktraces.</p>
      `
    },
    {
      id: "react-core-web-vitals",
      title: "Optimizing Next.js & React Core Web Vitals to a Perfect 100 Lighthouse Score",
      category: "Frontend Architecture",
      date: "Aug 10, 2026",
      readTime: "6 min read",
      image: "assets/images/blog-performance.jpg",
      summary: "Deep dive into sub-second Largest Contentful Paint (LCP), Interaction to Next Paint (INP) elimination, and layout shift prevention using modern CSS and React 19.",
      content: `
        <h3>The Imperative of Web Performance</h3>
        <p>A fast web application directly translates to conversion rates and user retention. With Google's Core Web Vitals focusing heavily on real user experience metrics—specifically INP (Interaction to Next Paint), LCP, and CLS—our engineering team set out to achieve consistent 99-100 scores across all devices.</p>

        <h3>Key Optimization Strategies</h3>
        <ol>
          <li><strong>Fetch Priority & Critical Image Inlining:</strong> Giving critical hero assets <code>fetchpriority="high"</code> and sizing with explicit dimensions eliminates LCP delays and CLS jitter.</li>
          <li><strong>Streaming SSR with Selective Hydration:</strong> Deferring non-critical widgets using React Server Components and Suspense boundaries prevents main-thread blocking.</li>
          <li><strong>CSS Containment & View Transitions:</strong> Leveraging <code>content-visibility: auto</code> for below-the-fold content prevents expensive initial browser layout calculations.</li>
        </ol>

        <h3>Results</h3>
        <p>Implementing these patterns dropped our First Contentful Paint from 1.8s down to 0.45s, and reduced Total Blocking Time to 0ms across both mobile and desktop profiles.</p>
      `
    },
    {
      id: "event-driven-microservices",
      title: "From Monolith to Event-Driven Microservices: Real-World Lessons & Pitfalls",
      category: "System Design",
      date: "Jul 25, 2026",
      readTime: "9 min read",
      image: "assets/images/blog-microservices.jpg",
      summary: "Hard-won architectural lessons on asynchronous domain events, distributed transactions via the Saga pattern, and idempotency in high-scale systems.",
      content: `
        <h3>Why Synchronous HTTP Calls Break at Scale</h3>
        <p>When decomposing a monolithic architecture into microservices, the most common trap is chaining synchronous REST calls. A single slow downstream service cascades latency across your entire system, eventually depleting connection pools.</p>

        <h3>Embracing the Outbox Pattern & Idempotency</h3>
        <p>To ensure atomic state changes and reliable message dispatching, we implemented the Transactional Outbox Pattern with Debezium CDC and Apache Kafka. Every consumer is designed to be strictly idempotent using unique deduplication keys stored in Redis with TTLs.</p>

        <h3>Managing Distributed State with Sagas</h3>
        <p>Instead of relying on fragile two-phase commits (2PC), orchestrator-based Sagas provide graceful compensating transactions if any stage of a multi-step checkout or provisioning pipeline fails.</p>
      `
    }
  ]
};
