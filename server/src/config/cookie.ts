const isProd = process.env.NODE_ENV === 'production'

export default () => ({
  COOKIE_CONFIG: {
    httpOnly: true,
    secure: isProd,
    domain: isProd ? `.${process.env.FRONTEND_URL}` : '',
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  },
})
