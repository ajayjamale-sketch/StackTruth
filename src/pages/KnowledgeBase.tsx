import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, FileText, Code2, Link as LinkIcon, X, Clock, Eye, Calendar } from 'lucide-react';

const categories = [
  { name: 'Getting Started', count: 42, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: BookOpen },
  { name: 'TypeScript', count: 128, color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20', icon: Code2 },
  { name: 'React', count: 94, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20', icon: Code2 },
  { name: 'Database', count: 87, color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', icon: FileText },
  { name: 'DevOps', count: 63, color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', icon: Code2 },
  { name: 'Security', count: 51, color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', icon: FileText },
  { name: 'Architecture', count: 76, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', icon: FileText },
  { name: 'APIs', count: 89, color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', icon: LinkIcon },
];

// Full article content (real, written content)
const articlesContent: Record<string, string> = {
  'ts-generics': `# Complete Guide to TypeScript Generics

## Introduction

Generics are one of TypeScript's most powerful features. They allow you to write reusable, type‑safe components that work with a variety of types without sacrificing type checking. Think of generics as **type variables** – placeholders that capture the type passed by the user.

## Why Use Generics?

Without generics, you might use \`any\` or overloads – both have drawbacks. Generics maintain the original type information throughout your code.

**Example – a simple identity function:**

\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);   // type: number
const str = identity<string>("hi");  // type: string
\`\`\`

TypeScript can often infer the type, so you can omit the explicit type parameter:

\`\`\`typescript
const inferred = identity("inferred"); // type: string
\`\`\`

## Generic Constraints

Sometimes you need to restrict the types that can be used. Use the \`extends\` keyword:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");      // OK: string has length
logLength([1, 2, 3]);    // OK: array has length
logLength(42);           // Error: number has no length
\`\`\`

## Using Generics with Interfaces and Classes

Generics are not limited to functions. You can create generic interfaces and classes:

\`\`\`typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = { key: "age", value: 30 };

class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2
\`\`\`

## Generic Constraints with keyof

The \`keyof\` operator combined with generics allows you to enforce that a property name exists on an object:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
getProperty(user, "name"); // OK
getProperty(user, "email"); // Error: 'email' does not exist
\`\`\`

## Default Generic Parameters

You can provide default types for generics:

\`\`\`typescript
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

const response: ApiResponse = { data: "OK", status: 200 }; // T is any
const typedResponse: ApiResponse<{ id: number }> = { data: { id: 1 }, status: 200 };
\`\`\`

## Best Practices

1. **Use meaningful names** – \`T\` for general types, \`TData\`, \`TResult\` for more specific ones.
2. **Apply constraints only when needed** – avoid over‑constraining.
3. **Prefer inference** – let TypeScript infer the generic type when possible.
4. **Document complex generics** – use comments to explain what the type variable represents.

## Conclusion

Generics are essential for building reusable, type‑safe libraries and applications. Master them to write more flexible and robust TypeScript code.`,
  
  'postgres-tuning': `# PostgreSQL Performance Tuning Handbook

## Overview

PostgreSQL is a powerful open‑source database, but achieving optimal performance requires understanding its configuration and query patterns. This handbook covers the most impactful tuning areas.

## Key Configuration Parameters

### 1. shared_buffers

Determines how much memory PostgreSQL dedicates to caching data. Set to **25% of total RAM** on a dedicated server.

\`\`\`ini
shared_buffers = 4GB      # for 16GB RAM
\`\`\`

### 2. effective_cache_size

An estimate of the OS file system cache size. Set to **50‑75% of total RAM**.

\`\`\`ini
effective_cache_size = 8GB
\`\`\`

### 3. work_mem

Memory used for sort operations and hash tables. Higher values speed up queries but increase risk of swap. Start low and adjust.

\`\`\`ini
work_mem = 16MB
\`\`\`

### 4. maintenance_work_mem

Memory for VACUUM, CREATE INDEX, etc. Can be higher than work_mem.

\`\`\`ini
maintenance_work_mem = 256MB
\`\`\`

## Query Optimization

### Use EXPLAIN ANALYZE

Understand the query plan:

\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE customer_id = 123;
\`\`\`

Look for **Seq Scan** – consider adding an index.

### Index Strategies

- **B‑tree** for equality and range queries.
- **GIN** for full‑text search and JSONB.
- **BRIN** for very large, naturally ordered tables.

\`\`\`sql
-- Example: composite index
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
\`\`\`

### Avoid SELECT *

Fetch only required columns to reduce I/O.

### Connection Pooling

Use **PgBouncer** to manage many short‑lived connections. Reduce overhead of backend processes.

## Monitoring Tools

- **pg_stat_statements** – tracks query performance.
- **pg_stat_activity** – shows current queries.
- **pg_stat_user_tables** – index usage, sequential scans.

Enable pg_stat_statements:

\`\`\`ini
shared_preload_libraries = 'pg_stat_statements'
\`\`\`

## Vacuum and Autovacuum

Regular vacuum prevents transaction ID wraparound and reclaims dead rows.

\`\`\`sql
VACUUM ANALYZE your_table;
\`\`\`

Tune autovacuum to be aggressive on write‑heavy tables.

## Real‑World Example

Slow query:

\`\`\`sql
SELECT * FROM logs WHERE created_at > now() - interval '7 days' AND user_id = 42;
\`\`\`

Add a composite index:

\`\`\`sql
CREATE INDEX idx_logs_user_created ON logs(user_id, created_at);
\`\`\`

After index, the query uses an **Index Scan**, reducing execution time from seconds to milliseconds.

## Conclusion

Tune incrementally, measure with real workloads, and always test changes in a staging environment.`,
  
  'react-patterns': `# React Patterns for Large Applications

## Why Patterns Matter

As React applications grow, unmanaged complexity leads to bugs, slow performance, and maintenance nightmares. Proven patterns keep your codebase scalable and predictable.

## 1. Component Composition

Avoid prop drilling with **component composition**:

\`\`\`jsx
// Instead of passing user deep down
<Page user={user} />

// Compose components that use user directly
<Page>
  <Header />
  <UserProfile />
</Page>
\`\`\`

Use **children** and **slots**:

\`\`\`jsx
function Layout({ sidebar, content }) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  );
}
\`\`\`

## 2. State Management

- **Local state** – useState, useReducer for component‑specific state.
- **Context** – for global state that doesn't change often (theme, auth).
- **Zustand / Redux Toolkit** – for complex global state with many updates.

### Example with Zustand:

\`\`\`typescript
import { create } from 'zustand';

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
}

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
\`\`\`

## 3. Custom Hooks

Extract reusable logic into custom hooks:

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = (value: T) => {
    setStored(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [stored, setValue] as const;
}
\`\`\`

## 4. Performance Optimization

- **React.memo** – prevent re‑renders of pure components.
- **useCallback** – memoize functions passed to memoized children.
- **useMemo** – memoize expensive calculations.
- **Virtualization** – for long lists (react‑window).

\`\`\`jsx
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} data={item} />);
});
\`\`\`

## 5. Code Splitting

Use dynamic imports and React.lazy:

\`\`\`jsx
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

## 6. Error Boundaries

Catch rendering errors to avoid blank screens:

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
\`\`\`

## Conclusion

Master these patterns to keep your React applications maintainable, performant, and scalable.`,
  
  'k8s-nodejs': `# Kubernetes for Node.js Developers

## Introduction

Kubernetes has become the standard for container orchestration. This guide walks you through deploying a Node.js application to a Kubernetes cluster.

## Prerequisites

- Docker installed locally.
- A Kubernetes cluster (Minikube for local testing, or a cloud provider like GKE/EKS).
- kubectl configured.

## Step 1: Containerize Your Node.js App

Create a \`Dockerfile\`:

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

Build and push to a registry:

\`\`\`bash
docker build -t myapp:v1 .
docker tag myapp:v1 myregistry/myapp:v1
docker push myregistry/myapp:v1
\`\`\`

## Step 2: Create Kubernetes Manifests

### Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs-app
  template:
    metadata:
      labels:
        app: nodejs-app
    spec:
      containers:
      - name: app
        image: myregistry/myapp:v1
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db_host
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
\`\`\`

### ConfigMap

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  db_host: "postgres-service.default.svc.cluster.local"
\`\`\`

### Service (ClusterIP)

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  selector:
    app: nodejs-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
\`\`\`

### Ingress

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nodejs-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: api.myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nodejs-service
            port:
              number: 80
\`\`\`

## Step 3: Deploy to Kubernetes

\`\`\`bash
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
\`\`\`

## Step 4: Health Checks

Add liveness and readiness probes to your deployment:

\`\`\`yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

## Step 5: Monitoring and Logs

- Use **kubectl logs** for debugging.
- Set up **Prometheus + Grafana** for metrics.
- Forward logs to a central system (ELK, Loki).

## Conclusion

Kubernetes simplifies scaling and managing Node.js applications. Start with these basics and explore advanced features like HPA, Service Mesh, and GitOps.`,
  
  'rest-security': `# REST API Security Best Practices

## Why API Security Matters

APIs are a primary attack vector. Following best practices protects your data and users.

## 1. Authentication

Never rely on custom auth. Use proven standards:

- **JWT** (JSON Web Tokens) for stateless auth.
- **OAuth 2.0 / OpenID Connect** for delegated access.

**JWT example (Node.js):**

\`\`\`typescript
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, {
  expiresIn: '1h'
});

// Verify
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
  // invalid token
}
\`\`\`

Store tokens securely: **HttpOnly, Secure, SameSite=Strict** cookies (preferred) or memory (avoid localStorage).

## 2. Authorization

Implement **role‑based access control (RBAC)** or attribute‑based (ABAC). Never trust client‑side checks.

\`\`\`typescript
function checkRole(user: User, requiredRole: string) {
  if (user.role !== requiredRole) {
    throw new Error('Forbidden');
  }
}
\`\`\`

## 3. Input Validation

Validate all input on the server side. Use libraries like **Zod** or **Joi**.

\`\`\`typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});
\`\`\`

Prevent injection: always use parameterized queries for SQL, and sanitize data for NoSQL.

## 4. Rate Limiting

Protect against brute force and DDoS:

\`\`\`typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});
app.use('/api', limiter);
\`\`\`

## 5. HTTPS and Secure Headers

Enforce HTTPS (HTTP Strict Transport Security). Set security headers:

\`\`\`typescript
import helmet from 'helmet';
app.use(helmet());
\`\`\`

Helmet sets headers like X‑Frame‑Options, X‑Content‑Type‑Options, etc.

## 6. CORS Configuration

Restrict allowed origins:

\`\`\`typescript
import cors from 'cors';

const allowedOrigins = ['https://myapp.com'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
\`\`\`

## 7. Logging & Monitoring

Log authentication attempts, errors, and suspicious activities. Avoid logging sensitive data (passwords, tokens). Use a logging library like **Winston** and integrate with monitoring tools.

## 8. API Versioning

Include version in URL (\`/v1/users\`) to avoid breaking changes and allow secure deprecation of old endpoints.

## 9. Regular Security Audits

- Run **npm audit** frequently.
- Use SAST tools (SonarQube, Snyk).
- Perform penetration testing.

## Conclusion

API security is a continuous process. Apply these practices from day one and keep evolving with new threats.`,
  
  'microservices': `# Microservices Architecture Patterns

## When to Use Microservices

Microservices are not a silver bullet. They shine for large, complex applications with multiple teams, independent scalability needs, and diverse technology stacks.

## Core Patterns

### 1. Decomposition by Business Capability

Define services around business domains (e.g., Orders, Inventory, Shipping) rather than technical layers.

### 2. API Gateway Pattern

A single entry point for clients, handling routing, authentication, rate limiting, and aggregation.

**Example (Express Gateway):**

\`\`\`typescript
const gateway = express();
gateway.use('/orders', proxy({ target: 'http://orders-service' }));
gateway.use('/inventory', proxy({ target: 'http://inventory-service' }));
\`\`\`

### 3. Database per Service

Each service owns its database. Never share databases across services – this ensures loose coupling.

### 4. Interservice Communication

- **Synchronous:** REST or gRPC for request‑response.
- **Asynchronous:** Message brokers (RabbitMQ, Kafka) for events.

**Event‑driven example (Node.js with Kafka):**

\`\`\`typescript
await producer.send({
  topic: 'order-created',
  messages: [{ value: JSON.stringify(order) }]
});
\`\`\`

### 5. Saga Pattern

Manage distributed transactions across services. Use orchestration (central orchestrator) or choreography (event‑based).

**Choreography example:** Order service emits "OrderCreated" event → Payment service listens and processes → emits "PaymentApproved" → Inventory service updates stock.

### 6. Circuit Breaker

Prevent cascading failures when a dependency is slow or unavailable.

\`\`\`typescript
import circuitBreaker from 'opossum';

const breaker = new circuitBreaker(callExternalService, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
});
\`\`\`

### 7. Service Discovery

Client‑side discovery (Eureka, Consul) or server‑side (Kubernetes Services). In Kubernetes, services are automatically discovered via DNS.

### 8. Distributed Tracing

Track requests across services using tools like **Jaeger** or **Zipkin**.

\`\`\`typescript
// Instrument with OpenTelemetry
const tracer = opentelemetry.trace.getTracer('my-service');
\`\`\`

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Data consistency | Saga pattern, event sourcing |
| Network latency | Use asynchronous communication where possible |
| Debugging | Centralized logging + distributed tracing |
| Testing | Contract testing (Pact) |

## Deployment and Orchestration

- **Containers + Kubernetes** is the standard.
- Use **Helm charts** for packaging.
- Implement **CI/CD pipelines** (GitHub Actions, GitLab CI).

## Conclusion

Microservices offer agility and scalability at the cost of operational complexity. Start with a monolith, extract services only when needed. Use these patterns to navigate the transition.`,
};

const articles = [
  { id: 'ts-generics', title: 'Complete Guide to TypeScript Generics', category: 'TypeScript', readTime: 15, type: 'Guide', views: 24100, publishDate: '2024-01-15' },
  { id: 'postgres-tuning', title: 'PostgreSQL Performance Tuning Handbook', category: 'Database', readTime: 22, type: 'Reference', views: 18400, publishDate: '2024-01-10' },
  { id: 'react-patterns', title: 'React Patterns for Large Applications', category: 'React', readTime: 18, type: 'Guide', views: 32100, publishDate: '2024-01-05' },
  { id: 'k8s-nodejs', title: 'Kubernetes for Node.js Developers', category: 'DevOps', readTime: 25, type: 'Tutorial', views: 14200, publishDate: '2024-01-03' },
  { id: 'rest-security', title: 'REST API Security Best Practices', category: 'Security', readTime: 12, type: 'Reference', views: 21800, publishDate: '2024-01-08' },
  { id: 'microservices', title: 'Microservices Architecture Patterns', category: 'Architecture', readTime: 20, type: 'Guide', views: 28900, publishDate: '2024-01-12' },
];

// Helper to render markdown-like content
const renderContent = (content: string) => {
  const paragraphs = content.split('\n\n').map((para, idx) => {
    if (para.trim().startsWith('```')) {
      const lines = para.split('\n');
      const language = lines[0].slice(3).trim();
      const code = lines.slice(1, -1).join('\n');
      return (
        <pre key={idx} className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
          <code>{code}</code>
        </pre>
      );
    }
    // Handle headings (start with #)
    if (para.trim().startsWith('# ')) {
      const text = para.replace('# ', '');
      return <h1 key={idx} className="text-2xl font-bold mt-6 mb-3">{text}</h1>;
    }
    if (para.trim().startsWith('## ')) {
      const text = para.replace('## ', '');
      return <h2 key={idx} className="text-xl font-semibold mt-5 mb-2">{text}</h2>;
    }
    if (para.trim().startsWith('### ')) {
      const text = para.replace('### ', '');
      return <h3 key={idx} className="text-lg font-medium mt-4 mb-2">{text}</h3>;
    }
    // Regular paragraph
    return (
      <p key={idx} className="mb-4 leading-relaxed">
        {para.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < para.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
  return <>{paragraphs}</>;
};

export default function KnowledgeBase() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const filtered = articles.filter(article =>
    (!search || article.title.toLowerCase().includes(search.toLowerCase())) &&
    (!activeCategory || article.category === activeCategory)
  );

  const clearFilters = () => {
    setSearch('');
    setActiveCategory(null);
  };

  const isFilterActive = search !== '' || activeCategory !== null;
  const selectedContent = selectedArticle ? articlesContent[selectedArticle.id] : '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero Section */}
      <div className="pt-20 pb-10 border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Knowledge Base
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technical Reference & Guides
          </h1>
          <p className="text-muted-foreground mb-6">
            2.4M+ curated resources for modern software engineers
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tutorials, API docs, guides..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 h-12 text-base bg-card"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: Categories + Articles List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Categories</h2>
                {isFilterActive && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                    <X className="w-3 h-3 mr-1" /> Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(isActive ? null : cat.name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isActive
                          ? cat.color
                          : 'bg-card border-border hover:border-primary/30 hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1 text-left">
                        <span className="text-sm font-medium">{cat.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">({cat.count})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Articles List */}
            <div>
              <h2 className="font-semibold mb-4">Articles</h2>
              {filtered.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-30" />
                  <p className="text-sm text-muted-foreground">No articles found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map(article => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedArticle?.id === article.id
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-card border-border hover:border-primary/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{article.title}</span>
                        <Badge variant="secondary" className="text-xs ml-2">{article.category}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{article.readTime} min</span>
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column: Article Detail */}
          <div className="lg:col-span-2">
            {selectedArticle ? (
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{selectedArticle.category}</Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">{selectedArticle.type}</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                    className="text-xs"
                  >
                    <X className="w-3 h-3 mr-1" /> Close
                  </Button>
                </div>
                <h2 className="text-2xl font-bold mb-3">{selectedArticle.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selectedArticle.readTime} min read</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{selectedArticle.views.toLocaleString()} views</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(selectedArticle.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {renderContent(selectedContent)}
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border border-border rounded-xl p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                <h3 className="font-semibold mb-2">Select an article</h3>
                <p className="text-sm text-muted-foreground">
                  Choose an article from the left to read its full content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}