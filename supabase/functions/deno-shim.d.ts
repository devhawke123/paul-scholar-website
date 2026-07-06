/** Minimal Deno globals for Supabase Edge Functions (IDE typecheck only). */
declare const Deno: {
  serve: (handler: (request: Request) => Response | Promise<Response>) => void
  env: {
    get: (key: string) => string | undefined
  }
}
