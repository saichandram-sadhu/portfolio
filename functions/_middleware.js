// Cloudflare Pages Functions - Middleware for routing
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Handle /admin/ route
  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    return Response.redirect(new URL('/admin/login.html', request.url), 302);
  }
  
  // Continue with normal request handling
  return next();
}

