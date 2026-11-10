import Image from "next/image";

import { css } from "../../styled-system/css";

const pageStyle = css({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: { base: "zinc.50", _dark: "black" },
  fontFamily: "sans",
});

const mainStyle = css({
  display: "flex",
  width: "full",
  maxWidth: "48rem",
  flex: "1",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  paddingY: "8rem",
  paddingX: "4rem",
  backgroundColor: { base: "white", _dark: "black" },
  sm: { alignItems: "flex-start" },
});

export default function Home() {
  return (
    <div className={pageStyle}>
      <main className={mainStyle}>
        <Image
          className={css({
            height: "1.25rem",
            width: "6.25rem",
            _dark: { filter: "invert(1)" },
          })}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
            sm: { alignItems: "flex-start", textAlign: "left" },
          })}
        >
          <h1
            className={css({
              maxWidth: "20rem",
              fontSize: "1.875rem",
              fontWeight: "semibold",
              lineHeight: "2.5rem",
              letterSpacing: "-0.025em",
              color: { base: "black", _dark: "zinc.50" },
            })}
          >
            To get started, edit the{" "}
            <code
              className={css({
                borderRadius: "md",
                backgroundColor: { base: "black/6", _dark: "white/8" },
                paddingX: "0.375rem",
                paddingY: "0.125rem",
                fontFamily: "mono",
                fontSize: "0.9em",
              })}
            >
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p
            className={css({
              maxWidth: "28rem",
              fontSize: "1.125rem",
              lineHeight: "2rem",
              color: { base: "zinc.600", _dark: "zinc.400" },
            })}
          >
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className={css({
                fontWeight: "medium",
                color: { base: "zinc.950", _dark: "zinc.50" },
              })}
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className={css({
                fontWeight: "medium",
                color: { base: "zinc.950", _dark: "zinc.50" },
              })}
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            fontSize: "base",
            fontWeight: "medium",
            sm: { flexDirection: "row" },
          })}
        >
          <a
            className={css({
              display: "flex",
              height: "3rem",
              width: "full",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              borderRadius: "full",
              backgroundColor: "var(--foreground)",
              paddingX: "1.25rem",
              color: "var(--background)",
              transitionProperty: "colors",
              _hover: { backgroundColor: "#383838" },
              _dark: { _hover: { backgroundColor: "#ccc" } },
              md: { width: "9.875rem" },
            })}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={css({
                height: "0.875rem",
                width: "1rem",
                _dark: { filter: "invert(1)" },
              })}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className={css({
              display: "flex",
              height: "3rem",
              width: "full",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "black/8",
              borderRadius: "full",
              paddingX: "1.25rem",
              transitionProperty: "colors",
              _hover: {
                borderColor: "transparent",
                backgroundColor: "black/4",
              },
              _dark: {
                borderColor: "white/14.5",
                _hover: { backgroundColor: "#1a1a1a" },
              },
              md: { width: "9.875rem" },
            })}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
