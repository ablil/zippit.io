export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export function trackShortenUrl(url: string) {
  console.log("tracking ....");
  event({
    action: "shorten_url",
    category: "https://zippit.io",
    label: "url",
    value: url,
  });
}
