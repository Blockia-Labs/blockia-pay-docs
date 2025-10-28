---
sidebar_position: 2
slug: /api/health
title: Health API
---

# Health Endpoints

Blockia Pay exposes health check endpoints for monitoring service status,
readiness, and liveness. These endpoints are designed for use by load balancers,
orchestration systems, and uptime monitoring tools.

## Endpoints

### 1. Service Health

**GET /health**

Returns a detailed health report including database, network, smart contract,
and relayer status.

**Response Example:**

```json
{
  "status": "healthy",
  "timestamp": "2025-10-24T12:00:00.000Z",
  "service": "blockia-pay-api",
  "version": "0.1.0",
  "checks": {
    "database": { "status": "healthy" },
    "network-base": { "status": "healthy" },
    "smart-contract-base": { "status": "healthy" },
    "x402-relayer": { "status": "healthy" }
  }
}
```

- `status`: "healthy" or "unhealthy"
- `checks`: Per-component health status (may include `error` or `details` fields
  if unhealthy)

### 2. Readiness Probe

**GET /health/ready**

Checks if the service is ready to accept traffic (all critical dependencies are
healthy).

**Response (ready):**

```json
{
  "status": "ready",
  "timestamp": "2025-10-24T12:00:00.000Z"
}
```

**Response (not ready):**

- Returns HTTP 500 with error message if not ready.

### 3. Liveness Probe

**GET /health/live**

Checks if the service process is running.

**Response:**

```json
{
  "status": "alive",
  "timestamp": "2025-10-24T12:00:00.000Z",
  "uptime": 12345.67
}
```

- `uptime`: Seconds since process start

## Usage

- Use `/health` for full diagnostics and monitoring dashboards.
- Use `/health/ready` for load balancer readiness checks.
- Use `/health/live` for container/process liveness checks.

## Error Handling

- If any critical check fails, `/health` and `/health/ready` will report
  `unhealthy` or return HTTP 500.
- All endpoints return machine-readable JSON.
