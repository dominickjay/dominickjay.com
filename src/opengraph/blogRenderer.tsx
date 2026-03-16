import * as React from "react";
import * as fs from "node:fs";
import path from "node:path";
import type { RenderFunctionInput } from "astro-opengraph-images";

const bgPath = path.join(process.cwd(), "public", "social-bg.png");
const bgImageBase64 = `data:image/png;base64,${fs
  .readFileSync(bgPath)
  .toString("base64")}`;

const logoPath = path.join(process.cwd(), "public", "logo.png");
const logoImageBase64 = `data:image/png;base64,${fs
  .readFileSync(logoPath)
  .toString("base64")}`;

export async function blogRenderer({
  title,
  description,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "#0e1116",
        color: "rgb(251, 248, 239)",
        fontFamily: "Gentle",
      }}
    >
      <img
        src={bgImageBase64}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "1000px",
          padding: "50px",
        }}
      >
        <img
          src={logoImageBase64}
          alt="Dom Jay"
          style={{
            width: "65px",
            height: "65px",
            objectFit: "contain",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: "64px",
            lineHeight: 1.2,
            fontWeight: 400,
            fontFamily: "Gentle",
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: "25px",
              lineHeight: 1.6,
              fontFamily: "Tiempos",
              fontWeight: 600,
              color: "rgba(251, 248, 239, 0.75)",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
