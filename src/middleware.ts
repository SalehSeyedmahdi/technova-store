// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/profile-user", "/checkout", "/cart", "/payment"];

function isProtected(path: string) {
	return PROTECTED_PATHS.some((p) => new RegExp(`^${p}(/.*)?$`).test(path));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get("token")?.value;
	const refresh = request.cookies.get("refresh_token")?.value;

	const isLoggedIn = Boolean(token || refresh);

	// فقط این: اگر مسیر محافظت‌شده بود و لاگین نبود → ریدایرکت به /auth
	if (isProtected(pathname) && !isLoggedIn) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
