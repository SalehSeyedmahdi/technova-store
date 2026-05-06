// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/cart", "/profile", "/orders", "/checkout", "/admin"];

function isProtected(path: string) {
	return PROTECTED_PATHS.some((p) => new RegExp(`^${p}(/.*)?$`).test(path));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("token")?.value;
	const refresh = request.cookies.get("refresh_token")?.value;

	const isLoggedIn = Boolean(token || refresh);

	const role = "admin"; // فرضی

	if (token && role === "admin" && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/admin", request.url));
	}

	// فقط این: اگر مسیر محافظت‌شده بود و لاگین نبود → ریدایرکت به /auth
	if (isProtected(pathname) && !isLoggedIn) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
