# shadcn-dashboard AI Agent Guide

**Repository:** Simple Next.js App Router project with TypeScript, Tailwind CSS v4, and shadcn/ui setup

## Project Snapshot

- **Type:** Single Next.js 16 application (App Router)
- **Stack:** TypeScript 5 (strict), React 19, Tailwind CSS v4, pnpm
- **Purpose:** Dashboard application scaffolding with shadcn/ui components
- **Note:** Sub-folders (app/, components/ui/, hooks/, lib/) will have their own agents.md files when populated

## Root Setup Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build production bundle
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Universal Conventions

**Code Style:**
- TypeScript strict mode enabled - all code must be properly typed
- ESLint configured with Next.js core-web-vitals and TypeScript rules
- Use absolute imports with `@/` alias (maps to root directory)
- Format: ESLint will enforce code style (Prettier not configured)

**Component Rules:**
- Server components by default (no `"use client"` directive)
- Client components must explicitly use `"use client"` at file top
- Place UI components in `components/ui/` (shadcn/ui pattern)
- Place page components in `app/` with file-based routing

**Styling:**
- Use Tailwind CSS v4 utility classes
- Dark mode support via CSS variables and media query
- Use CSS variables for theme colors: `--background`, `--foreground`
- See `app/globals.css` for theme configuration

**Commit Format:**
- No formal convention enforced (consider: Conventional Commits)
- Recommended: `type(scope): description`
- Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`

## Security & Secrets

- **Never commit**: `.env.local`, `.env.*.local`, API keys, tokens
- **Secrets location**: Use `.env.local` for development (already in `.gitignore`)
- **PII handling**: This is a frontend-only project; avoid storing user data client-side

## JIT Index - Directory Map

### Package Structure

| Directory | Purpose | agents.md |
|-----------|---------|-----------|
| `app/` | Next.js App Router pages and layouts | [see app/agents.md](app/agents.md) *(add when routes are added)* |
| `components/ui/` | shadcn/ui components | [see components/ui/agents.md](components/ui/agents.md) *(add when components are added)* |
| `hooks/` | Custom React hooks | [see hooks/agents.md](hooks/agents.md) *(add when hooks are added)* |
| `lib/` | Utility libraries | [see lib/agents.md](lib/agents.md) *(add when utilities are added)* |
| `data/` | Static JSON data | No agents.md needed |
| `public/` | Static assets (images, SVGs) | No agents.md needed |

### Quick Find Commands

```bash
# Find a React component export
rg -n "export (default )?(function|const)" components/ app/

# Find a client component
rg -n '"use client"' components/ app/

# Find a server component (files without use client)
rg -L '"use client"' components/ app/

# Find TypeScript type definitions
rg -n "(export (type|interface|type ))" lib/ app/

# Find API routes (App Router route handlers)
rg -n "export (async )?function (GET|POST|PUT|DELETE)" app/

# Find data imports
rg -n "from ['\"](\\.?/?data/)" app/ components/
```

### Key File Reference

| Purpose | File |
|---------|------|
| Root layout (fonts, global styles) | `app/layout.tsx` |
| Home page | `app/page.tsx` |
| Global CSS (Tailwind v4, theme) | `app/globals.css` |
| TypeScript configuration | `tsconfig.json` |
| ESLint configuration | `eslint.config.mjs` |
| Next.js configuration | `next.config.ts` |
| Package scripts | `package.json` |
| Product data | `data/proiducts.json` |
| Feedback links | `data/screenshot-feedback-links.txt` |

## Definition of Done

Before considering work complete:
- [ ] Code passes ESLint: `pnpm lint`
- [ ] TypeScript compiles without errors
- [ ] Application builds successfully: `pnpm build`
- [ ] Development server runs without errors: `pnpm dev`
- [ ] Dark mode works (test in system dark/light mode)

## Testing Notes

**Current State:** No testing framework configured.

**Recommendations:**
- Unit tests: Add Vitest with `@vitest/ui`
- E2E tests: Add Playwright
- Component tests: Add Testing Library + Vitest
- Add test scripts to `package.json` when framework is selected

## Next.js Documentation Reference

This project uses Next.js 16 App Router. Always verify API usage with local docs:
- <!-- NEXT-AGENTS-MD-START -->[Next.js Docs 
     Index]|root: ./.next-docs|STOP. What you remember 
     about Next.js is WRONG for this project. Always 
     search docs and read before any task.|If docs 
     missing, run this command first: npx @next/codemod
     agents-md --output 
     AGENTS.md|01-app:{04-glossary.mdx}|01-app/01-getti
     ng-started:{01-installation.mdx,02-project-structu
     re.mdx,03-layouts-and-pages.mdx,04-linking-and-nav
     igating.mdx,05-server-and-client-components.mdx,06
     -cache-components.mdx,07-fetching-data.mdx,08-upda
     ting-data.mdx,09-caching-and-revalidating.mdx,10-e
     rror-handling.mdx,11-css.mdx,12-images.mdx,13-font
     s.mdx,14-metadata-and-og-images.mdx,15-route-handl
     ers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading
     .mdx}|01-app/02-guides:{analytics.mdx,authenticati
     on.mdx,backend-for-frontend.mdx,caching.mdx,ci-bui
     ld-caching.mdx,content-security-policy.mdx,css-in-
     js.mdx,custom-server.mdx,data-security.mdx,debuggi
     ng.mdx,draft-mode.mdx,environment-variables.mdx,fo
     rms.mdx,incremental-static-regeneration.mdx,instru
     mentation.mdx,internationalization.mdx,json-ld.mdx
     ,lazy-loading.mdx,local-development.mdx,mcp.mdx,md
     x.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zone
     s.mdx,open-telemetry.mdx,package-bundling.mdx,pref
     etching.mdx,production-checklist.mdx,progressive-w
     eb-apps.mdx,public-static-pages.mdx,redirecting.md
     x,sass.mdx,scripts.mdx,self-hosting.mdx,single-pag
     e-applications.mdx,static-exports.mdx,tailwind-v3-
     css.mdx,third-party-libraries.mdx,videos.mdx}|01-a
     pp/02-guides/migrating:{app-router-migration.mdx,f
     rom-create-react-app.mdx,from-vite.mdx}|01-app/02-
     guides/testing:{cypress.mdx,jest.mdx,playwright.md
     x,vitest.mdx}|01-app/02-guides/upgrading:{codemods
     .mdx,version-14.mdx,version-15.mdx,version-16.mdx}
     |01-app/03-api-reference:{07-edge.mdx,08-turbopack
     .mdx}|01-app/03-api-reference/01-directives:{use-c
     ache-private.mdx,use-cache-remote.mdx,use-cache.md
     x,use-client.mdx,use-server.mdx}|01-app/03-api-ref
     erence/02-components:{font.mdx,form.mdx,image.mdx,
     link.mdx,script.mdx}|01-app/03-api-reference/03-fi
     le-conventions/01-metadata:{app-icons.mdx,manifest
     .mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|0
     1-app/03-api-reference/03-file-conventions:{defaul
     t.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,i
     nstrumentation-client.mdx,instrumentation.mdx,inte
     rcepting-routes.mdx,layout.mdx,loading.mdx,mdx-com
     ponents.mdx,not-found.mdx,page.mdx,parallel-routes
     .mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,
     route-segment-config.mdx,route.mdx,src-folder.mdx,
     template.mdx,unauthorized.mdx}|01-app/03-api-refer
     ence/04-functions:{after.mdx,cacheLife.mdx,cacheTa
     g.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fe
     tch.mdx,forbidden.mdx,generate-image-metadata.mdx,
     generate-metadata.mdx,generate-sitemaps.mdx,genera
     te-static-params.mdx,generate-viewport.mdx,headers
     .mdx,image-response.mdx,next-request.mdx,next-resp
     onse.mdx,not-found.mdx,permanentRedirect.mdx,redir
     ect.mdx,refresh.mdx,revalidatePath.mdx,revalidateT
     ag.mdx,unauthorized.mdx,unstable
     _cache.mdx,unstable_noStore.mdx,unstable
     _rethrow.mdx,updateTag.mdx,use-link-status.mdx,use
     -params.mdx,use-pathname.mdx,use-report-web-vitals
     .mdx,use-router.mdx,use-search-params.mdx,use-sele
     cted-layout-segment.mdx,use-selected-layout-segmen
     ts.mdx,userAgent.mdx}|01-app/03-api-reference/05-c
     onfig/01-next-config-js:{adapterPath.mdx,allowedDe
     vOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterr
     upts.mdx,basePath.mdx,browserDebugInfoInTerminal.m
     dx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife
     .mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,
     devIndicators.mdx,distDir.mdx,env.mdx,expireTime.m
     dx,exportPathMap.mdx,generateBuildId.mdx,generateE
     tags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgent
     Options.mdx,images.mdx,incrementalCacheHandlerPath
     .mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.md
     x,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImp
     orts.mdx,output.mdx,pageExtensions.mdx,poweredByHe
     ader.mdx,productionBrowserSourceMaps.mdx,proxyClie
     ntMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeader
     sLength.mdx,reactStrictMode.mdx,redirects.mdx,rewr
     ites.mdx,sassOptions.mdx,serverActions.mdx,serverC
     omponentsHmrCache.mdx,serverExternalPackages.mdx,s
     taleTimes.mdx,staticGeneration.mdx,taint.mdx,trail
     ingSlash.mdx,transpilePackages.mdx,turbopack.mdx,t
     urbopackFileSystemCache.mdx,typedRoutes.mdx,typesc
     ript.mdx,urlImports.mdx,useLightningcss.mdx,viewTr
     ansition.mdx,webVitalsAttribution.mdx,webpack.mdx}
     |01-app/03-api-reference/05-config:{02-typescript.
     mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:
     {create-next-app.mdx,next.mdx}|02-pages/01-getting
     -started:{01-installation.mdx,02-project-structure
     .mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-depl
     oying.mdx}|02-pages/02-guides:{analytics.mdx,authe
     ntication.mdx,babel.mdx,ci-build-caching.mdx,conte
     nt-security-policy.mdx,css-in-js.mdx,custom-server
     .mdx,debugging.mdx,draft-mode.mdx,environment-vari
     ables.mdx,forms.mdx,incremental-static-regeneratio
     n.mdx,instrumentation.mdx,internationalization.mdx
     ,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-tel
     emetry.mdx,package-bundling.mdx,post-css.mdx,previ
     ew-mode.mdx,production-checklist.mdx,redirecting.m
     dx,sass.mdx,scripts.mdx,self-hosting.mdx,static-ex
     ports.mdx,tailwind-v3-css.mdx,third-party-librarie
     s.mdx}|02-pages/02-guides/migrating:{app-router-mi
     gration.mdx,from-create-react-app.mdx,from-vite.md
     x}|02-pages/02-guides/testing:{cypress.mdx,jest.md
     x,playwright.mdx,vitest.mdx}|02-pages/02-guides/up
     grading:{codemods.mdx,version-10.mdx,version-11.md
     x,version-12.mdx,version-13.mdx,version-14.mdx,ver
     sion-9.mdx}|02-pages/03-building-your-application/
     01-routing:{01-pages-and-layouts.mdx,02-dynamic-ro
     utes.mdx,03-linking-and-navigating.mdx,05-custom-a
     pp.mdx,06-custom-document.mdx,07-api-routes.mdx,08
     -custom-error.mdx}|02-pages/03-building-your-appli
     cation/02-rendering:{01-server-side-rendering.mdx,
     02-static-site-generation.mdx,04-automatic-static-
     optimization.mdx,05-client-side-rendering.mdx}|02-
     pages/03-building-your-application/03-data-fetchin
     g:{01-get-static-props.mdx,02-get-static-paths.mdx
     ,03-forms-and-mutations.mdx,03-get-server-side-pro
     ps.mdx,05-client-side.mdx}|02-pages/03-building-yo
     ur-application/06-configuring:{12-error-handling.m
     dx}|02-pages/04-api-reference:{06-edge.mdx,08-turb
     opack.mdx}|02-pages/04-api-reference/01-components
     :{font.mdx,form.mdx,head.mdx,image-legacy.mdx,imag
     e.mdx,link.mdx,script.mdx}|02-pages/04-api-referen
     ce/02-file-conventions:{instrumentation.mdx,proxy.
     mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-
     api-reference/03-functions:{get-initial-props.mdx,
     get-server-side-props.mdx,get-static-paths.mdx,get
     -static-props.mdx,next-request.mdx,next-response.m
     dx,use-params.mdx,use-report-web-vitals.mdx,use-ro
     uter.mdx,use-search-params.mdx,userAgent.mdx}|02-p
     ages/04-api-reference/04-config/01-next-config-js:
     {adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix
     .mdx,basePath.mdx,bundlePagesRouterDependencies.md
     x,compress.mdx,crossOrigin.mdx,devIndicators.mdx,d
     istDir.mdx,env.mdx,exportPathMap.mdx,generateBuild
     Id.mdx,generateEtags.mdx,headers.mdx,httpAgentOpti
     ons.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEn
     tries.mdx,optimizePackageImports.mdx,output.mdx,pa
     geExtensions.mdx,poweredByHeader.mdx,productionBro
     wserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reac
     tStrictMode.mdx,redirects.mdx,rewrites.mdx,serverE
     xternalPackages.mdx,trailingSlash.mdx,transpilePac
     kages.mdx,turbopack.mdx,typescript.mdx,urlImports.
     mdx,useLightningcss.mdx,webVitalsAttribution.mdx,w
     ebpack.mdx}|02-pages/04-api-reference/04-config:{0
     1-typescript.mdx,02-eslint.mdx}|02-pages/04-api-re
     ference/05-cli:{create-next-app.mdx,next.mdx}|03-a
     rchitecture:{accessibility.mdx,fast-refresh.mdx,ne
     xtjs-compiler.mdx,supported-browsers.mdx}|04-commu
     nity:{01-contribution-guide.mdx,02-rspack.mdx}<!--
     NEXT-AGENTS-MD-END -->

```bash
# View Next.js docs locally (.next-docs)
```

**Common Next.js Gotchas:**
- Client components need `"use client"` directive
- Server actions need `"use server"` directive
- Use `next/image` for images (optimized)
- Use `next/link` for navigation (prefetching)
- Layouts wrap pages; nested layouts for nested routes