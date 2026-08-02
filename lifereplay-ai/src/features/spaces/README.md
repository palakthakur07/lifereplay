# Spaces

**Status:** not yet implemented (planned for a future phase).

Creating, renaming, archiving, and browsing Intelligent Spaces — the top-level container for every other feature.

## Convention

When this feature is built, it should follow the pattern established by the foundation:

```
features/spaces/
  components/   # feature-specific UI, composed from components/ui primitives
  hooks/        # feature-specific hooks
  api/          # data fetching / mutations for this feature
  types.ts      # feature-specific types
  utils.ts      # feature-specific helpers
```

Only put code here that is genuinely specific to "spaces". Anything reusable belongs in components/ui, hooks, or lib instead.
