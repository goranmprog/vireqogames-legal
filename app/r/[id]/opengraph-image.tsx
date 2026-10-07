import { ImageResponse } from "next/og";

import { getCategoryIconKey } from "@/lib/putalert/categoryBadge";
import { getPutalertShareFallbackOgImageUrl } from "@/lib/putalert/config";
import { fetchReportShareSnapshot } from "@/lib/putalert/fetchReportShareSnapshot";
import { buildShareOgCardContent } from "@/lib/putalert/sharePresentation";
import { normalizeReportId } from "@/lib/putalert/validateReportId";

export const runtime = "edge";
export const alt = "PUTALERT share preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const revalidate = 300;

async function loadFont(weight: 600 | 700 | 800) {
  const response = await fetch(
    `https://cdn.jsdelivr.net/fontsource/fonts/inter@5.0.16/latin-${weight}-normal.woff`,
  );

  if (!response.ok) {
    return null;
  }

  return response.arrayBuffer();
}

function CategoryOgIcon({
  categoryKey,
  color,
}: {
  categoryKey: string;
  color: string;
}) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
  };

  switch (categoryKey) {
    case "radar":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5M12 9a3 3 0 0 1 3 3" />
        </svg>
      );
    case "traffic_control":
      return (
        <svg {...common}>
          <path d="M12 3.5 18.5 6v5.8c0 4.1-2.8 7.2-6.5 8.7-3.7-1.5-6.5-4.6-6.5-8.7V6L12 3.5Z" />
        </svg>
      );
    case "accident":
      return (
        <svg {...common}>
          <path d="M12 5 19 19H5L12 5Z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
      );
    case "road_work":
      return (
        <svg {...common}>
          <path d="m14.5 6.5 3 3-8 8-3.5 1 1-3.5 7.5-7.5Z" />
        </svg>
      );
    case "traffic":
      return (
        <svg {...common}>
          <path d="M8 17.5V11l2.5-4h3L16 11v6.5" />
          <circle cx="9.5" cy="17.5" r="1.2" />
          <circle cx="14.5" cy="17.5" r="1.2" />
        </svg>
      );
    case "road_hazard":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8.5v4.5M12 16h.01" />
        </svg>
      );
    case "weather":
      return (
        <svg {...common}>
          <path d="M8.5 17.5h8a3 3 0 0 0 .4-5.98A4.5 4.5 0 0 0 8.7 8.5 3.5 3.5 0 0 0 5 12a3 3 0 0 0 .5 5.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="1.4" fill={color} stroke="none" />
          <circle cx="12" cy="12" r="1.4" fill={color} stroke="none" />
          <circle cx="18" cy="12" r="1.4" fill={color} stroke="none" />
        </svg>
      );
  }
}

interface OpenGraphImageProps {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: OpenGraphImageProps) {
  const { id } = await params;
  const reportId = normalizeReportId(id);
  const snapshot = reportId
    ? await fetchReportShareSnapshot(reportId)
    : { status: "invalid_id" as const };
  const content = buildShareOgCardContent(snapshot);
  const backgroundUrl = getPutalertShareFallbackOgImageUrl();
  const categoryKey =
    snapshot.status === "active"
      ? getCategoryIconKey(snapshot.report.categorySlug)
      : "other";

  const [fontSemiBold, fontBold, fontExtraBold] = await Promise.all([
    loadFont(600),
    loadFont(700),
    loadFont(800),
  ]);

  const fonts = [
    fontSemiBold
      ? {
          name: "Inter",
          data: fontSemiBold,
          weight: 600 as const,
          style: "normal" as const,
        }
      : null,
    fontBold
      ? {
          name: "Inter",
          data: fontBold,
          weight: 700 as const,
          style: "normal" as const,
        }
      : null,
    fontExtraBold
      ? {
          name: "Inter",
          data: fontExtraBold,
          weight: 800 as const,
          style: "normal" as const,
        }
      : null,
  ].filter((font): font is NonNullable<typeof font> => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0b1f3a",
          fontFamily: fonts.length > 0 ? "Inter" : "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a native img element */}
        <img
          alt=""
          src={backgroundUrl}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 58%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 34%, rgba(11,31,58,0.18) 62%, rgba(11,31,58,0.62) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "40px 48px 44px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.78)",
                boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 42,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: "#0b1f3a",
                }}
              >
                <span>PUT</span>
                <span style={{ color: "#2563eb" }}>ALERT</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.82)",
                border: `1px solid ${content.categoryAccent}55`,
                color: content.categoryAccent,
                fontSize: 22,
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(15,23,42,0.1)",
              }}
            >
              <CategoryOgIcon categoryKey={categoryKey} color={content.categoryAccent} />
              <span>{content.categoryLabel}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-start",
              gap: 10,
              maxWidth: 900,
              padding: "24px 28px",
              borderRadius: 20,
              background: "rgba(11,31,58,0.72)",
              boxShadow: "0 12px 32px rgba(15,23,42,0.24)",
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.08,
                color: "#ffffff",
              }}
            >
              {content.headline}
            </div>
            {content.locationLine && content.locationLine !== content.headline ? (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "rgba(226,232,240,0.92)",
                }}
              >
                {content.locationLine}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
