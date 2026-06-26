# Complete System Design Roadmap for FAANG Interviews
## From Zero to Interview Ready

---

## Table of Contents
1. [What is System Design?](#what-is-system-design)
2. [Why System Design Matters](#why-system-design-matters)
3. [Prerequisites & Foundational Knowledge](#prerequisites--foundational-knowledge)
4. [Learning Roadmap (4 Phases)](#learning-roadmap-4-phases)
5. [Core Concepts (Deep Dive)](#core-concepts-deep-dive)
6. [Practice Projects & Applications](#practice-projects--applications)
7. [Common FAANG Interview Questions](#common-faang-interview-questions)
8. [Real-World Examples](#real-world-examples)
9. [Interview Strategies & Tips](#interview-strategies--tips)
10. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
11. [Resources](#resources)
12. [Study Timeline & Schedule](#study-timeline--schedule)

---

## What is System Design?

**System Design** is the process of defining the architecture and specifications of a system that fulfills specific requirements. In technical interviews, you're expected to design large-scale distributed systems.

### Key Aspects:
- **Scale**: Handling millions of requests, terabytes of data
- **Availability**: System remains operational continuously
- **Reliability**: System performs correctly even with failures
- **Maintainability**: Easy to update and improve
- **Trade-offs**: Choosing between consistency, availability, and partition tolerance

### Real-World Context:
When you use Netflix, Gmail, Twitter, or Instagram:
- Multiple servers handling requests
- Databases storing petabytes of data
- Caches reducing database load
- Load balancers distributing traffic
- Message queues for async processing

System Design is about building these complex architectures.

---

## Why System Design Matters

1. **FAANG Hiring**: Top companies always ask SD in senior rounds
2. **Real-World Impact**: You'll actually build these systems in production
3. **Problem-Solving**: Teaches architectural thinking
4. **Communication**: Learn to explain complex ideas simply
5. **Trade-offs**: Understand pros/cons of different approaches

---

## Prerequisites & Foundational Knowledge

### Must-Have (Learn First):
1. **Basics of Databases**
   - SQL vs NoSQL
   - ACID vs BASE
   - Indexing
   - Query optimization
   - Time complexity: O(log n), O(n), O(n²), etc.

2. **Networking Fundamentals**
   - HTTP/HTTPS protocol
   - TCP vs UDP
   - DNS resolution
   - Request-response model
   - Latency and bandwidth

3. **Programming Concepts**
   - Data structures (arrays, linked lists, trees, hash maps)
   - Algorithms (sorting, searching)
   - Object-oriented programming
   - Event-driven architecture

4. **Operating Systems Basics**
   - Processes and threads
   - Memory management
   - I/O operations
   - Concurrency

### Nice-to-Have (Optional but Helpful):
- Basic knowledge of your backend programming language
- Understanding of APIs (RESTful, GraphQL)
- Git basics
- Cloud platforms (AWS/GCP/Azure concepts)

### Time Investment: 2-3 weeks

---

## Learning Roadmap (4 Phases)

### **Phase 1: Foundations (Weeks 1-3)**
**Goal**: Understand fundamental concepts

**Topics to Cover**:
- Scalability concepts
- Load balancing
- Caching basics
- Database concepts
- APIs and communication protocols

**Practice**:
- Read articles on Medium/Dev.to
- Watch foundational YouTube videos
- No design problems yet

**Output**: Understand what each component does

---

### **Phase 2: Core Concepts (Weeks 4-8)**
**Goal**: Master key distributed systems concepts

**Topics to Cover**:
1. **Scalability Concepts**
   - Vertical vs Horizontal scaling
   - Stateless vs Stateful systems
   - Database partitioning/sharding

2. **Consistency & Availability**
   - CAP theorem
   - Eventual consistency
   - Strong consistency

3. **Caching**
   - Cache invalidation strategies
   - Redis, Memcached
   - Cache-aside pattern

4. **Data Storage**
   - SQL databases
   - NoSQL (MongoDB, Cassandra)
   - Key-value stores

5. **Architecture Patterns**
   - Monolithic vs Microservices
   - Event-driven architecture
   - Message queues

**Practice**:
- Read system design blogs
- Understand case studies
- Draw diagrams
- Time investment: 4-5 weeks

**Output**: Can explain concepts clearly with diagrams

---

### **Phase 3: Design Simple Systems (Weeks 9-14)**
**Goal**: Design real-world systems from scratch

**Systems to Design** (in order):
1. **URL Shortener** (easiest)
   - Start here
   - Teaches: APIs, databases, scaling

2. **Twitter Feed**
   - Teaches: Caching, databases, ranking

3. **Design YouTube**
   - Teaches: Video processing, storage

4. **Design Uber**
   - Teaches: Real-time systems, geolocation

5. **Design Instagram**
   - Teaches: Image storage, caching, feed generation

**For Each Design**:
- Understand requirements clearly
- Create high-level architecture diagram
- Discuss trade-offs
- Handle scale and failures
- Time per system: 1-2 weeks

**Output**: Can design systems end-to-end

---

### **Phase 4: Advanced & Refinement (Weeks 15-20)**
**Goal**: Polish skills and handle difficult questions

**Topics to Cover**:
- System scaling under extreme load
- Multi-region systems
- Disaster recovery
- Advanced networking
- Security considerations

**Practice**:
- Design complex systems
- Mock interviews
- Speed improvements
- Handle unexpected questions

**Output**: Interview-ready confidence

---

## Core Concepts (Deep Dive)

### 1. **Load Balancing**
**What**: Distributes incoming requests across multiple servers

**Key Points**:
- Algorithms: Round-robin, Least connections, IP hash
- Types: Hardware (expensive) vs Software (cheaper)
- Sticky sessions for stateful applications

**Real Example**: Netflix uses load balancers to distribute requests across data centers

---

### 2. **Caching**
**What**: Store frequently accessed data in fast memory

**Types**:
- **Client-side**: Browser cache
- **Server-side**: Redis, Memcached
- **CDN**: Content delivery networks

**Invalidation Strategies**:
- **TTL** (Time-to-live): Cache expires after time
- **LRU** (Least Recently Used): Remove oldest accessed item
- **Write-through**: Update cache and DB together

**Real Example**: Netflix caches user recommendations, movie metadata

---

### 3. **Databases**
**SQL Databases**:
- ACID compliance
- Great for structured data
- Examples: PostgreSQL, MySQL

**NoSQL Databases**:
- High write throughput
- Horizontal scalability
- Examples: MongoDB, Cassandra

**Decision**:
- SQL: Banking, complex relationships
- NoSQL: High-volume writes, unstructured data

**Real Example**: Twitter uses PostgreSQL for some data, Cassandra for time-series data

---

### 4. **Database Replication**
**What**: Keep copies of data on multiple servers

**Types**:
- **Master-Slave**: One master (writes), multiple slaves (reads)
- **Master-Master**: Multiple masters (reads/writes)

**Benefits**:
- Fault tolerance
- Read scalability
- Geographic distribution

**Real Example**: Facebook replicates user data across multiple regions

---

### 5. **Sharding/Partitioning**
**What**: Split data across multiple databases

**Types**:
- **Range-based**: Data split by ranges
- **Hash-based**: Hash on key determines shard
- **Directory-based**: Lookup table maintains mapping

**Challenges**:
- Uneven distribution
- Resharding when adding new shards
- Cross-shard queries

**Real Example**: Instagram shards data by user_id across 1000s of servers

---

### 6. **Message Queues**
**What**: Asynchronous communication between services

**Why Needed**:
- Decouple services
- Handle spikes in traffic
- Retry failed operations

**Examples**: RabbitMQ, Kafka, AWS SQS

**Real Example**: Uber uses message queues for ride requests, notifications

---

### 7. **CAP Theorem**
**Consistency**: All nodes see same data
**Availability**: System always responds
**Partition Tolerance**: System works despite network failures

**Key Insight**: Can only guarantee 2 out of 3

- **CP** (Consistency + Partition): Traditional databases
- **AP** (Availability + Partition): NoSQL databases
- **CA** (Consistency + Availability): Single server (impractical)

**Real Example**: Google Bigtable chooses CP; Cassandra chooses AP

---

### 8. **Rate Limiting**
**What**: Control request rate to prevent overload

**Algorithms**:
- **Token Bucket**: Tokens refill at rate
- **Sliding Window**: Count requests in time window
- **Leaky Bucket**: Requests leak out at fixed rate

**Real Example**: Twitter API rate limits users to prevent abuse

---

### 9. **CDN (Content Delivery Network)**
**What**: Geographically distributed servers serving content

**Benefits**:
- Reduced latency
- Less bandwidth on origin server
- Better user experience

**Real Example**: Netflix uses CloudFront (AWS CDN) to deliver videos

---

### 10. **Search and Indexing**
**What**: Quickly find data from massive datasets

**Technologies**:
- Elasticsearch
- Apache Solr
- Database indexes

**Real Example**: Google indexes billions of web pages for instant search

---

## Practice Projects & Applications

### **Level 1: Beginner**
1. **URL Shortener** (bit.ly)
   - Learn: Databases, APIs, scaling
   - Time: 5-7 days
   - Difficulty: ⭐

2. **Pastebin** (pastebin.com)
   - Learn: File storage, cleanup
   - Time: 5-7 days
   - Difficulty: ⭐

3. **Leaderboard System** (gaming scores)
   - Learn: Caching, sorting, real-time updates
   - Time: 3-5 days
   - Difficulty: ⭐⭐

### **Level 2: Intermediate**
1. **Twitter Feed**
   - Learn: Database design, caching, ranking
   - Time: 1-2 weeks
   - Difficulty: ⭐⭐

2. **Design YouTube**
   - Learn: Video processing, storage, streaming
   - Time: 2 weeks
   - Difficulty: ⭐⭐

3. **Design Messaging App** (WhatsApp)
   - Learn: Real-time, message queues, notifications
   - Time: 2 weeks
   - Difficulty: ⭐⭐⭐

### **Level 3: Advanced**
1. **Design Uber**
   - Learn: Real-time systems, location-based services
   - Time: 2-3 weeks
   - Difficulty: ⭐⭐⭐

2. **Design Instagram**
   - Learn: Image storage, CDN, feed algorithms
   - Time: 2-3 weeks
   - Difficulty: ⭐⭐⭐

3. **Design Netflix**
   - Learn: Streaming, recommendation systems, global scale
   - Time: 3 weeks
   - Difficulty: ⭐⭐⭐⭐

### **Level 4: Expert**
1. **Design Google Search**
   - Learn: Crawling, indexing, ranking
   - Time: 3-4 weeks
   - Difficulty: ⭐⭐⭐⭐

2. **Design Facebook**
   - Learn: Social graph, notifications, real-time
   - Time: 4 weeks
   - Difficulty: ⭐⭐⭐⭐⭐

---

## Common FAANG Interview Questions

### **Google**
1. Design YouTube
2. Design Google Search
3. Design Google Maps
4. Design Gmail
5. Design Google Drive

### **Facebook/Meta**
1. Design Instagram
2. Design Facebook Feed
3. Design Facebook Messaging
4. Design TikTok
5. Design WhatsApp

### **Amazon**
1. Design Amazon S3
2. Design Amazon Shopping System
3. Design product recommendations
4. Design warehouse management system
5. Design AWS SQS

### **Apple**
1. Design Apple Maps
2. Design Apple Music
3. Design iCloud
4. Design Siri architecture
5. Design App Store

### **Netflix**
1. Design Netflix
2. Design video recommendation system
3. Design video streaming architecture
4. Design Netflix subscription system
5. Design content distribution system

### **Microsoft**
1. Design Windows Update
2. Design Azure services
3. Design Outlook
4. Design Teams
5. Design Skype

---

## Real-World Examples

### **Example 1: URL Shortener (bit.ly)**

**Requirements**:
- Convert long URL to short code
- Redirect short URL to long URL
- 1M requests/day
- URLs don't expire

**Architecture**:

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  Load Balancer   │
└──────┬───────────┘
       │
   ┌───┴────┬───────────┐
   ▼        ▼           ▼
┌──────┐┌──────┐    ┌──────┐
│ Web1 ││ Web2 │... │ WebN │
└──┬───┘└───┬──┘    └──┬───┘
   │        │          │
   └────┬───┴──────┬───┘
        ▼          ▼
   ┌─────────┐ ┌───────────────┐
   │ Redis   │ │ Primary (SQL) │
   │ Cache   │ │ + Replicas    │
   └─────────┘ └───────────────┘
```

**Key Decisions**:
- Redis for cache (fast read/write)
- SQL database for persistence
- Zookeeper for distributed ID generation
- CDN for global distribution

---

### **Example 2: Twitter Feed**

**Requirements**:
- Post tweets (write)
- View feed (read-heavy)
- 100M users, 500K posts/sec
- Feed should show latest tweets from followed accounts

**Architecture**:

```
┌──────────────┐
│  User Client │
└──────┬───────┘
       │
       ▼
┌────────────────────┐
│ API Gateway + LB   │
└─┬──────────┬───────┘
  │          │
  ▼          ▼
┌─────────┐ ┌──────────────┐
│ Post    │ │ Feed Service │
│ Service │ │              │
└────┬────┘ └──────┬───────┘
     │             │
     ├─────────────┤
     ▼             ▼
┌─────────────────────────────┐
│   Message Queue (Kafka)     │
│   (Event: New Tweet Posted) │
└─────────────────────────────┘
     │
     ▼
┌──────────────────────────────┐
│ Feed Generation Service      │
│ (Pushes to followers' feeds) │
└─────────┬────────────────────┘
          │
     ┌────┴──────────┬────────┐
     ▼               ▼        ▼
┌─────────┐    ┌──────────┐ ┌────────┐
│ Redis   │    │ MongoDB  │ │Search  │
│(Cache)  │    │(Tweets)  │ │(Full-  │
└─────────┘    └──────────┘ │text)   │
               └────────┘
```

**Key Decisions**:
- Event-driven: Use Kafka for async feed generation
- Redis for user feed caching
- Fanout pattern: Push tweets to followers
- Separate write and read databases

---

### **Example 3: Uber (Real-Time Location)**

**Requirements**:
- Real-time driver location tracking
- Find nearby drivers instantly
- 1M active drivers
- Update location every 5-10 seconds

**Architecture**:

```
┌──────────────────┐
│  Driver App      │
│  (Location Data) │
└────────┬─────────┘
         │ (Every 5 sec)
         ▼
┌──────────────────────┐
│ WebSocket Gateway    │
│ (Real-time update)   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│ Location Service         │
│ (Process location data)  │
└──────┬─────────┬─────────┘
       │         │
       ▼         ▼
┌──────────────────┐  ┌──────────────────┐
│ Redis GeoHash    │  │ HBase/Cassandra  │
│ (Spatial index)  │  │ (Historical data)│
└──────────────────┘  └──────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Rider Matching Service   │
│ (Find nearby drivers)    │
└──────────────────────────┘
```

**Key Decisions**:
- WebSocket for real-time communication
- Redis GeoHash for spatial indexing
- Quadtree for efficient location search
- Eventual consistency (location updates acceptable with slight delay)

---

## Interview Strategies & Tips

### **Before the Interview**
1. **Research the Company**
   - Understand their scale
   - Know their tech stack
   - Understand their challenges

2. **Practice Systems**
   - Design 5-10 systems thoroughly
   - Time yourself (45 mins)
   - Record yourself explaining
   - Get feedback

3. **Mock Interviews**
   - Practice with friends
   - Use platforms: Pramp, Interviewing.io
   - Record and review

### **During the Interview**

**Step 1: Clarify Requirements (5 mins)**
- Ask about scale (users, requests/sec, data volume)
- Ask about features
- Ask about constraints (latency, availability)
- Clarify edge cases

**Example**:
> "Before I start, let me clarify:
> - How many users do we expect?
> - What's the expected traffic (requests per second)?
> - What region(s) should we support?
> - What are the latency requirements?
> - How much data will we store?"

**Step 2: High-Level Architecture (10 mins)**
- Draw box diagram
- Identify key components
- Discuss major trade-offs
- Get feedback before diving deep

**Example**:
```
[Client] → [LB] → [Web Servers] → [Cache] → [Database]
```

**Step 3: Deep Dive (20 mins)**
- Start with most important component
- Explain choices and alternatives
- Discuss trade-offs
- Handle scale progressively

**Step 4: Detailed Design (10 mins)**
- API contracts
- Database schema
- Message formats

### **Communication Tips**

1. **Think Out Loud**
   - Explain your reasoning
   - Say "I'm thinking..."
   - Ask for feedback

2. **Use Diagrams**
   - Draw as you explain
   - Update diagrams as you refine
   - Make clear connections

3. **Discuss Trade-offs**
   - Every choice has pros/cons
   - Explain what you're optimizing for
   - Mention alternatives

4. **Use Real Numbers**
   - 1M users = 1M requests/sec is wrong!
   - Calculate QPS from requirements
   - Be realistic

### **When Stuck**

1. **Ask Clarifying Questions**
   - "Should we optimize for read or write?"
   - "Is global distribution important?"

2. **State Your Assumptions**
   - "Assuming we have 1M concurrent users..."
   - "I'll optimize for availability first..."

3. **Discuss Trade-offs**
   - "We could use X but Y is better because..."

4. **Pivot to What You Know**
   - If stuck on one part, move to another
   - Show breadth of knowledge

### **Time Management**

- **0-5 mins**: Clarify requirements
- **5-15 mins**: High-level design (diagram)
- **15-35 mins**: Deep dive (1-2 components)
- **35-45 mins**: Q&A and follow-ups

**Don't spend 20 mins on requirements!**

### **Red Flags to Avoid**

❌ Jumping to implementation details without high-level plan
❌ Not discussing trade-offs
❌ Making unrealistic assumptions
❌ Only discussing happy path, ignoring failures
❌ Not mentioning caching, queues, or other key components
❌ Poor communication / not explaining reasoning
❌ Overthinking; sometimes simpler is better

### **Green Flags (What Interviewers Like)**

✅ Clear clarifying questions at start
✅ Simple, clean architecture diagrams
✅ Discussing trade-offs explicitly
✅ Thinking about failure scenarios
✅ Mentioning real systems/technologies
✅ Asking for feedback mid-interview
✅ Iterating on design based on feedback
✅ Covering broad topics (don't go too deep in one area)

---

## Common Mistakes to Avoid

### **1. Not Clarifying Requirements**
❌ **Wrong**: "So, you want me to design Twitter?"
✅ **Right**: "Let me clarify: Are we designing for 1M users or 1B? Should we focus on read scalability? What regions?"

### **2. Overcomplicating Early**
❌ **Wrong**: Start with sharding, replication, and multi-region from the beginning
✅ **Right**: Start simple, add complexity as you scale

### **3. Not Discussing Trade-offs**
❌ **Wrong**: "I'll use NoSQL for everything"
✅ **Right**: "I'll use SQL for user data (needs ACID) and NoSQL for posts (high write throughput)"

### **4. Ignoring Failures**
❌ **Wrong**: Assume all servers are always up
✅ **Right**: "What if a server goes down? How do we recover?"

### **5. Using Made-Up Numbers**
❌ **Wrong**: "1M users = 1M requests per second"
✅ **Right**: "1M users, assuming 50% active daily, with average 10 requests/user/day = ~6K QPS"

### **6. Not Mentioning Key Technologies**
❌ **Wrong**: "I'll use a database"
✅ **Right**: "I'll use Redis for caching user sessions, PostgreSQL for user data, Elasticsearch for search"

### **7. Spending Too Much Time on One Component**
❌ **Wrong**: Spend 30 mins on database schema
✅ **Right**: Spend 5 mins, mention key tables, move on

### **8. Poor Diagrams**
❌ **Wrong**: Messy, hard to understand boxes
✅ **Right**: Clean, labeled, shows data flow clearly

### **9. Not Thinking About Ops**
❌ **Wrong**: No mention of monitoring, logging, alerting
✅ **Right**: "We'll use ELK stack for logging, Prometheus for monitoring"

### **10. Not Being Honest About Knowledge**
❌ **Wrong**: Pretend to know something you don't
✅ **Right**: "I'm not familiar with that, but I think we could..."

---

## Resources

### **Books (Highly Recommended)**

1. **Designing Data-Intensive Applications** by Martin Kleppmann
   - Best book overall
   - Covers concepts deeply
   - Read cover-to-cover
   - Time: 4-6 weeks

2. **System Design Interview** by Alex Xu & Shuyi Liao
   - FAANG-focused
   - Solutions to common questions
   - Practice during Phase 2-3
   - Time: 2-3 weeks (focused reading)

3. **The Art of Scalability** by Martin Abbott & Michael Fisher
   - Advanced concepts
   - Real-world case studies
   - For Phase 4
   - Time: 2-3 weeks

4. **Building Microservices** by Sam Newman
   - Understand microservices deeply
   - Design patterns
   - Practical advice
   - Time: 2 weeks

### **Online Courses**

1. **Grokking the System Design Interview** (Educative)
   - Best structured course
   - Covers common problems
   - Interactive problems
   - Cost: $49-99
   - Time: 4-6 weeks

2. **System Design Interview Course** (Exponent)
   - Founder was ex-Google
   - Real interview experience
   - Video-based
   - Cost: $99
   - Time: 4-6 weeks

3. **Udemy - System Design Masterclass** (Various instructors)
   - Affordable
   - Good for beginners
   - Cost: $10-15 (on sale)
   - Time: 6-8 weeks

### **YouTube Channels (Free!)**

1. **Gaurav Sen** (System Design)
   - Explains concepts clearly
   - Great diagrams
   - Focus on FAANG questions
   - Recommend: Watch all videos

2. **TechDummies Simplified** (System Design)
   - Very beginner-friendly
   - Good for Phase 1
   - Clear English

3. **Clement Mihailescu** (AlgoExpert)
   - Very comprehensive
   - Realistic interview scenarios
   - Advanced topics

4. **Success in Tech**
   - Interview experiences
   - FAANG-specific
   - Strategy and tips

5. **ByteByteGo** (Alex Xu)
   - Animations explaining concepts
   - Modern and clear
   - Highly recommended

### **Websites & Blogs**

1. **ByteByteGo.com**
   - Excellent articles
   - Regular updates
   - Free resources section

2. **Medium** - Search "System Design"
   - Many good articles
   - Varies in quality
   - Free

3. **Dev.to** - Search "System Design"
   - Community posts
   - Often high quality
   - Free

4. **GitHub** - Search "System Design Interview"
   - Many repositories with solutions
   - Community-maintained
   - Free

5. **System Design Primer** (GitHub repo)
   - Comprehensive reference
   - Well-organized
   - Free

### **Interview Platforms (Practice)**

1. **Pramp.com**
   - Free mock interviews
   - Real people as interviewers
   - Peer-to-peer
   - Cost: Free

2. **Interviewing.io**
   - Anonymous interviews with real engineers
   - Feedback from experienced interviewers
   - Cost: Free + Premium
   - Highly recommended

3. **LeetCode**
   - System Design questions section
   - Some free, some paid
   - Cost: $159/year
   - Limited system design content

### **Study Materials (Curated)**

**Phase 1 (Foundations)**:
- YouTube: Gaurav Sen playlist on fundamentals
- Article: "Scalability for Dummies" on slideshare
- Time: 1-2 weeks

**Phase 2 (Core Concepts)**:
- Book: System Design Interview (chapters 1-5)
- Course: Grokking (lessons 1-10)
- YouTube: ByteByteGo videos
- Time: 2-3 weeks

**Phase 3 (Practice)**:
- Book: System Design Interview (design chapters)
- Course: Grokking (design problems)
- GitHub: Study solutions
- Mock interviews: Pramp.com
- Time: 4-5 weeks

**Phase 4 (Advanced)**:
- Designing Data-Intensive Applications
- Advanced topics: ByteByteGo
- Mock interviews: Interviewing.io
- Time: 2-3 weeks

---

## Study Timeline & Schedule

### **Total Duration: 20-24 weeks (~5-6 months)**

### **Month 1: Foundations (Weeks 1-4)**

**Week 1-2: Basics**
- Day 1-3: Understand networking (TCP/IP, HTTP, DNS)
- Day 4-5: Database concepts (SQL vs NoSQL)
- Day 6-7: Review and consolidate
- **Resources**: YouTube, articles
- **Time per day**: 2-3 hours

**Week 3-4: Key Concepts**
- Day 1-2: Scalability concepts
- Day 3-4: Load balancing, caching
- Day 5-6: Replication, sharding basics
- Day 7: Review
- **Resources**: Grokking course + YouTube
- **Time per day**: 2-3 hours

**Goals at End of Month 1**:
- ✅ Understand basic concepts
- ✅ Can explain caching, load balancing
- ✅ Know SQL vs NoSQL trade-offs

---

### **Month 2: Core Concepts (Weeks 5-8)**

**Week 5-6: Deep Dive**
- Day 1-2: CAP theorem, consistency models
- Day 3-4: Database replication and sharding
- Day 5-6: Message queues and async processing
- Day 7: Review
- **Resources**: System Design Interview book + Grokking
- **Time per day**: 3-4 hours

**Week 7-8: Architecture Patterns**
- Day 1-2: Monolithic vs Microservices
- Day 3-4: API design, rate limiting
- Day 5-6: Search and indexing
- Day 7: Review and summarize
- **Resources**: Book chapters + design patterns articles
- **Time per day**: 3-4 hours

**Goals at End of Month 2**:
- ✅ Understand all core concepts deeply
- ✅ Can explain trade-offs
- ✅ Know common patterns

---

### **Month 3: Simple System Design (Weeks 9-12)**

**Week 9: Design 1 - URL Shortener**
- Day 1-2: Understand requirements and constraints
- Day 3-4: Design high-level architecture
- Day 5-6: Detailed design and trade-offs
- Day 7: Review solution, understand alternatives
- **Time**: 5-7 hours
- **Practice**: Design yourself first, then review solutions

**Week 10: Design 2 - Pastebin / Design 3 - Leaderboard**
- Similar approach as week 9
- **Time per system**: 4-5 hours
- **Note**: Getting faster as concepts repeat

**Week 11-12: Design 4 & 5 - Choose 2 Intermediate Systems**
- **Pick from**: Twitter Feed, YouTube, Messaging App
- **Time per system**: 8-12 hours
- **Note**: More complex, deeper dives needed

**Goals at End of Month 3**:
- ✅ Can design 4-5 systems from scratch
- ✅ Starting to see patterns
- ✅ Can defend design choices
- ✅ Time: 45-60 mins per system

---

### **Month 4: Advanced Design & Mock Interviews (Weeks 13-16)**

**Week 13-14: Design 6 & 7 - Advanced Systems**
- **Pick from**: Uber, Instagram, Netflix
- **Time per system**: 15-20 hours
- **Research**: Real-world architecture blogs
- **Note**: Spend time understanding real systems

**Week 15-16: Mock Interviews & Refinement**
- Day 1-2: Mock interview #1 (Pramp or Interviewing.io)
- Day 3-4: Analyze recording, identify weaknesses
- Day 5-6: Mock interview #2
- Day 7: Mock interview #3
- **Time per week**: 10-15 hours
- **Goal**: Get comfortable with interview format

**Goals at End of Month 4**:
- ✅ Can design complex systems
- ✅ Comfortable in interview setting
- ✅ Getting interviewer feedback
- ✅ Time: 30-45 mins per system

---

### **Month 5-6: Polish & Final Preparation (Weeks 17-24)**

**Week 17-18: Gap Filling**
- Day 1-2: Identify weak areas from mock interviews
- Day 3-4: Deep dive on weak topics
- Day 5-7: Extra mock interviews on weak systems
- **Resources**: Focus materials on weak areas
- **Time per week**: 10-15 hours

**Week 19-20: Company-Specific Prep**
- Day 1-2: Research specific company systems
- Day 3-4: Design systems from that company
- Day 5-7: Practice company-specific patterns
- **Time per week**: 10-15 hours
- **Note**: If interviewing at Google, focus on Google systems

**Week 21-22: Speed & Confidence Building**
- Day 1-7: Rapid design of 7-8 systems
- **Target**: 30-40 mins per system
- **Focus**: Speed while maintaining quality
- **Mock interviews**: 2-3 more
- **Time per week**: 15-20 hours

**Week 23-24: Final Review**
- Day 1-3: Review all concepts one more time
- Day 4-5: Final mock interview #1
- Day 6-7: Final mock interview #2
- **Time per week**: 8-12 hours
- **Note**: Rest before interviews, don't overdo it

**Goals at End**:
- ✅ Can design any system asked
- ✅ Time: 30-40 mins per system
- ✅ Clear communication
- ✅ Confident in interviews

---

### **Daily Study Schedule (Example)**

**Weekday (Work + Study)**
```
6:00-6:30    - Wake up, breakfast
6:30-7:00    - Watch 1 YouTube video (30 mins)
7:00-8:00    - Commute + listening to podcasts
8:00-17:00   - Work (can think about concepts during breaks)
17:00-18:00  - Gym / break
18:00-20:00  - Study (2 hours)
20:00-21:00  - Dinner + relaxation
21:00-22:00  - Optional: Review or practice (1 hour)
22:00+       - Sleep
```

**Total Study Time on Weekday**: 2-3 hours

**Weekend (Focused Study)**
```
9:00-11:00   - Study (2 hours)
11:00-12:00  - Break
12:00-15:00  - Study or mock interview (2-3 hours)
15:00-16:00  - Break
16:00-19:00  - Study (3 hours)
19:00+       - Relaxation
```

**Total Study Time on Weekend**: 7-8 hours

**Weekly Total**: 20-25 hours

### **Milestones & Checkpoints**

- **End of Week 2**: Can explain caching, load balancing, basic scaling
- **End of Week 4**: Can explain CAP theorem, replication, sharding
- **End of Week 8**: Can draw architecture diagrams for any system
- **End of Week 12**: Can design simple systems (URL shortener, etc.)
- **End of Week 16**: Can design complex systems (Uber, Instagram, etc.)
- **End of Week 20**: Can handle mock interviews confidently
- **End of Week 24**: Interview-ready!

---

## Interview Day Checklist

**Before Interview**:
- [ ] Get 8 hours sleep
- [ ] Eat a good breakfast
- [ ] Test your mic/camera (if remote)
- [ ] Have pen and paper ready
- [ ] Close unnecessary tabs/applications
- [ ] Have water nearby
- [ ] Arrive 10 mins early
- [ ] Do a 5-min quick review of one system

**During Interview**:
- [ ] Take a deep breath
- [ ] Smile (even if virtual, it shows in your voice!)
- [ ] Speak clearly and slowly
- [ ] Ask clarifying questions
- [ ] Draw diagrams
- [ ] Discuss trade-offs
- [ ] Ask for feedback
- [ ] Think out loud

**After Interview**:
- [ ] Don't stress about performance
- [ ] Record feedback mentally
- [ ] Send thank you email if appropriate
- [ ] Reflect on what went well/wrong

---

## Final Tips & Mindset

### **Consistency Over Intensity**
- Study 2-3 hours daily is better than 10 hours once a week
- Building habits is key
- Don't burn out

### **Active Learning**
- Don't just read/watch
- Design systems yourself
- Make mistakes
- Learn from them

### **Quality Over Quantity**
- Design 5 systems deeply better than 20 superficially
- Understand trade-offs, not just memorize
- Focus on reasoning

### **Feedback Loop**
- Get feedback from others
- Review recorded mock interviews
- Identify patterns in feedback
- Improve iteratively

### **Real-World Learning**
- Read tech blogs about real systems
- Follow engineering leaders on Twitter
- Understand how real companies solve problems
- Brings authenticity to interviews

### **Stay Confident**
- You have 5-6 months
- Most people take this long to master it
- Every practice session makes you better
- You'll get multiple chances

### **Remember**
- Interviewers want you to succeed
- They're looking for reasoning, not perfection
- It's okay to say "I don't know, but here's how I'd figure it out"
- You're being hired to solve problems, not answer trivia

---

## Summary: Your Action Plan

1. **Weeks 1-4**: Learn foundations and core concepts
2. **Weeks 5-8**: Master advanced concepts
3. **Weeks 9-12**: Design simple systems
4. **Weeks 13-16**: Design complex systems and do mock interviews
5. **Weeks 17-24**: Polish, refine, and build confidence

**Start with**: ["Designing Data-Intensive Applications" book](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321) + Gaurav Sen YouTube channel

**Do**: One system design per week, starting with URL Shortener

**Practice**: Mock interviews on Pramp.com (free)

**Track**: Your progress and weak areas

**Stay**: Consistent and patient

---

## Additional Resources

### **Reddit Communities**
- r/systemdesign - Ask questions
- r/cscareerquestions - General advice
- Company-specific subreddits

### **Twitter Accounts to Follow**
- @alex_xu_li (ByteByteGo)
- @gaurav_sen (System Design Expert)
- Various company engineering blogs

### **Podcasts** (Listen during commute)
- "Software Engineering Daily" - System design episodes
- "The Interview" - System design stories
- Company engineering podcasts

---

**Good luck! You've got this. 🚀**

---

*Last Updated: May 2026*
*Version: 1.0 - Comprehensive FAANG System Design Roadmap*
