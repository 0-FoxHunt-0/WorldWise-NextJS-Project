import { NextRequest, NextResponse } from "next/server";

// the list of all allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "worldwise-git-master-nates-projects-4a12ab74.vercel.app",
  "worldwise-6omy3kg73-nates-projects-4a12ab74.vercel.app",
  "worldwise-lemon.vercel.app",
];

export function middleware(req: NextRequest) {
  // retrieve the current response
  const res = NextResponse.next();

  // retrieve the HTTP "Origin" header
  // from the incoming request
  const origin = req.headers.get("origin");

  // if the origin is an allowed one,
  // add it to the 'Access-Control-Allow-Origin' header
  if (allowedOrigins.includes(origin)) {
    res.headers.append("Access-Control-Allow-Origin", origin);
  }

  // add the remaining CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: "/api/:path*",
};
