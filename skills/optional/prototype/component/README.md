# Components

Prefer FSD ownership over dump folders.

| Need | Location |
| --- | --- |
| Single-screen UI | `pages/<slice>/` |
| Reused interaction | `features/<slice>/` when reuse exists |
| Reused domain model | `entities/<slice>/` when reuse exists |
| UI primitive without business meaning | `shared/ui/` |

Do not create `src/components/` for product/business screens.
