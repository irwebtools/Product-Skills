# Security Rules

- Never commit secrets.
- Never expose privileged/service-role credentials in browser code.
- Treat authentication and authorization as separate concerns.
- Use RLS for real user/role-sensitive Supabase access when appropriate.
- Demo-role simulation must be explicitly documented as non-production authorization.
- Destructive database operations require explicit review before developer-ready/production use.
