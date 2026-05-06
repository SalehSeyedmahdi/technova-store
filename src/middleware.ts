import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/orders", "/checkout", "/admin"];

function isProtected(path: string) {
	return PROTECTED_PATHS.some((p) => new RegExp(`^${p}(/.*)?$`).test(path));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("token")?.value;
	const refresh = request.cookies.get("refresh_token")?.value;
	const role = request.cookies.get("role")?.value;

	const isLoggedIn = Boolean(token || refresh);

	if (pathname.startsWith("/admin")) {
		if (!isLoggedIn) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (role !== "admin") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (pathname === "/login" && isLoggedIn) {
		if (role === "admin") {
			return NextResponse.redirect(new URL("/admin", request.url));
		}

		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (isProtected(pathname) && !isLoggedIn) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
