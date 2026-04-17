export interface Viewport {
  name: string;
  width: number;
  height: number;
}

export const VIEWPORTS: Record<string, Viewport> = {
  MOBILE_PORTRAIT: { name: 'mobile-portrait', width: 375, height: 667 },
  MOBILE_LANDSCAPE: { name: 'mobile-landscape', width: 667, height: 375 },
  TABLET_PORTRAIT: { name: 'tablet-portrait', width: 768, height: 1024 },
  TABLET_LANDSCAPE: { name: 'tablet-landscape', width: 1024, height: 768 },
  DESKTOP_HD: { name: 'desktop-hd', width: 1280, height: 720 },
  DESKTOP_FULLHD: { name: 'desktop-fullhd', width: 1920, height: 1080 },
} as const;
