import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db, connectDB } from "@/lib/prisma";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

// Cache connection status
let isConnected = false;

export default clerkMiddleware(async (auth, req) => {
  try {
    // Only check connection for protected routes
    if (isProtectedRoute(req) && !isConnected) {
      isConnected = await connectDB();
      if (!isConnected) {
        return new NextResponse(
          JSON.stringify({ 
            error: "Database connection error. Please try again later." 
          }),
          { 
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    const { userId } = await auth();

    if (!userId && isProtectedRoute(req)) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    
    // Reset connection status on error
    if (error.code === 'P1001') {
      isConnected = false;
      return new NextResponse(
        JSON.stringify({ 
          error: "Database connection error. Please try again later." 
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
