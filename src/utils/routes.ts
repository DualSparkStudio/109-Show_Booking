export const ROUTES = {
  home: '/',
  show: (slug: string) => `/show/${slug}`,
  checkout: (slug: string) => `/show/${slug}/checkout`,
  influencerProfile: (username: string) => `/u/${username}`,
  dashboard: '/dashboard',
};
