import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith('/dashboard')) {
        return !!token;
      }
      if (pathname.startsWith('/instructor')) {
        return token?.role === 'INSTRUCTOR' || token?.role === 'ADMIN';
      }
      if (pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/instructor/:path*', '/admin/:path*'],
};


