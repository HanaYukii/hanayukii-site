import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "花雪 HanaYukii — Personal site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXTS = {
  cjk: "花雪",
  latin:
    "HanaYukii Starmine, still becoming. / PERSONAL SITE Algorithms C++ · ML Web3",
};

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (
    await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    })
  ).text();
  const match = css.match(/src: url\((.+?)\) format/);
  if (!match) throw new Error(`Font fetch failed for ${family}`);
  return await (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const [notoSerifTC, inter] = await Promise.all([
    loadGoogleFont("Noto Serif TC", 700, TEXTS.cjk),
    loadGoogleFont("Inter", 400, TEXTS.latin),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0c0e14",
          backgroundImage:
            "linear-gradient(140deg, rgba(244,132,95,0.18) 0%, rgba(244,132,95,0.05) 24%, transparent 52%), linear-gradient(220deg, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.04) 26%, transparent 54%)",
          padding: "80px 90px",
          color: "#e4e7ef",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#2ec4b6",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          / PERSONAL SITE
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 220,
              fontFamily: "Noto Serif TC",
              color: "#e4e7ef",
              lineHeight: 1,
            }}
          >
            花雪
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              color: "rgba(228,231,239,0.5)",
              marginTop: 12,
            }}
          >
            HanaYukii
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#f4845f",
              marginTop: 32,
            }}
          >
            Starmine, still becoming.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            color: "rgba(228,231,239,0.7)",
          }}
        >
          <span>Algorithms</span>
          <span style={{ color: "rgba(155,161,184,0.4)" }}>·</span>
          <span>C++</span>
          <span style={{ color: "rgba(155,161,184,0.4)" }}>·</span>
          <span>ML</span>
          <span style={{ color: "rgba(155,161,184,0.4)" }}>·</span>
          <span>Web3</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 28,
          }}
        >
          <div style={{ width: 100, height: 6, backgroundColor: "#2ec4b6" }} />
          <div style={{ width: 60, height: 6, backgroundColor: "#f4845f" }} />
          <div style={{ width: 36, height: 6, backgroundColor: "#38bdf8" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif TC",
          data: notoSerifTC,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
