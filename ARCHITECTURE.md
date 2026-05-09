# Architecture

## System Diagram
```mermaid
flowchart TD
    A[Landing + Input Form] --> B[LocalStorage]
    B --> C[Run Audit]
    C --> D[Audit Engine lib/auditEngine.ts]
    D --> E[Results Page]
    E --> F[Lead Capture Modal]
    F --> G[Supabase Backend - Future]
    E --> H[Shareable URL]