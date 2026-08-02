# Tags

**Status:** not yet implemented (planned for a future phase).

AI-generated and user-defined tags for organizing items within a Space.

## Convention

When this feature is built, it should follow the pattern established by the foundation:

```
features/tags/
  components/   # feature-specific UI, composed from components/ui primitives
  hooks/        # feature-specific hooks
  api/          # data fetching / mutations for this feature
  types.ts      # feature-specific types
  utils.ts      # feature-specific helpers
```

Only put code here that is genuinely specific to "tags". Anything reusable belongs in components/ui, hooks, or lib instead.
