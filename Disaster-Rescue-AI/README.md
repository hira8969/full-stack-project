# Relay One - Disaster Rescue Operations MVP

This repository contains a runnable, browser-based operations dashboard for a Disaster Rescue AI Network MVP.

## Architecture documentation

The enterprise architecture and SRS-style documentation requested for the production platform is available at `docs/enterprise-architecture.md`.

## Included MVP workflows

- Live-style situational dashboard with flood zones, active SOS markers, teams, shelters, and route overlay
- SOS priority queue and incident detail workflow
- Incident logging with dynamic metrics
- Dispatch team and shelter capacity tracking
- Client-side route and risk intelligence display
- Responsive desktop and mobile layout

## Run

Open `index.html` in a modern browser. No installation or build step is required.

## Production roadmap

The dashboard is intentionally a frontend MVP. Real deployments should add a Spring Boot API, PostgreSQL, JWT/RBAC, WebSocket delivery, a mobile offline-relay client, map provider, and separately deployed ML services before operational use.
