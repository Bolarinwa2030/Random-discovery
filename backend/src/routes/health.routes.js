import { Router } from 'express';

const router = Router();

// Cheap and dependency-free on purpose: suitable for Docker health checks,
// Kubernetes liveness/readiness probes and load balancer health checks.
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
