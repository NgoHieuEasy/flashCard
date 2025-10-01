export const paths = {
  root: "/",
  session: (id: string) => `/session/${id}`,
  flashCard: (id: string) => `/flashCard/${id}`,
  writingCard: (id: string) => `/writingCard/${id}`,
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  page403: "/error/403",
  page404: "/error/404",
  page500: "/error/500",
};
