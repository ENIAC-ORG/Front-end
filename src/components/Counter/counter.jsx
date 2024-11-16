import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import "./styles.css";

function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n
    .toString()
    .split("")
    .map((x) => farsiDigits[x])
    .join("");
}

const CounterUp = ({ EndNum, label }) => {
  const [CounterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div
        className="CounterUpContainer"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#710bbe";
          e.currentTarget.style.transform = "translateY(-10px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = " #8b42f7";
          e.currentTarget.style.transform = "translateY(0px)";
        }}
      >
        <p
          style={{
            textAlign: "center",
            verticalAlign: "center",
            // fontSize: "44px",
            fontWeight: "bolder",
            textShadow: "2px 2px 2px 4px rgb(0, 0, 0, 0.5)",
            transition:
              "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            fontFamily: "Ios15Medium",
            color: "white",
            fontSize: "42px"
          }}
        >
          {label}
        </p>
        <h1
          style={{
            textAlign: "center",
            fontSize: "55px",
            textShadow: "2px 2px 2px 4px rgb(0, 0, 0, 0.5)",
            transition:
              "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {CounterOn && (
            <CountUp
              start={1}
              end={EndNum}
              duration={2}
              delay={0}
              formattingFn={(value) => toFarsiNumber(value)}
            />
          )}
          +
        </h1>
      </div>
    </ScrollTrigger>
  );
};

export default CounterUp;