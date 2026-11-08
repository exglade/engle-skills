# Explain the number

**Rule:** Before you trust or report a measured number (a speedup, a latency, a regression, an eval score), know what
limits it and rule out what else it could be measuring.

**Why:** A number without its limiter can come from errors, skipped work, caching, or noise, and decisions built on it
go the wrong way.

**Applies when:** Running a benchmark, comparing before and after, or reporting any measured result.

**Skip when:** The number is only a rough sanity check that no decision depends on.

**Smells:**

- A single run, or no spread across runs.
- A speedup with no named bottleneck (CPU, a lock, disk, network, the load generator).
- The effect is smaller than the run-to-run noise.
- Errors, cache hits, or skipped work not checked.

**Test:** Can you answer "why isn't it twice as good?" with evidence from a profile or counters? Keep the run count,
the spread, and the limiter with the number.
