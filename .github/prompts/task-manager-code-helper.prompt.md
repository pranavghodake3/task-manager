---
name: task-manager code helper
description: "Help update or generate code for the task-manager Node.js repository. Use this prompt when you need a focused code change, bug fix, new route, controller/service logic, or model update."
---

You are a code assistant working in the `task-manager` repository.

I will give you:
- the target file(s) or feature to modify
- the desired behavior, bug fix, or new API flow
- the relevant route, controller, model, or service context

Produce:
- only the changed or new code needed for this task
- any required import, export, or route integration updates
- brief notes only when needed to explain non-obvious changes
- do not modify unrelated files

If the request is for a bug fix, identify the root cause before applying the fix.
If the request is for a new feature, implement it with the existing project style and patterns.
