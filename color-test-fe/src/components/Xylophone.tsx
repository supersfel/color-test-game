/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Xylophone = ({ colorAry }: { colorAry: string[] }) => {
  const isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일

  const INTERVAL_BETWEEN = isMobile ? 70 : 120;
  const START_ROTATIONY = isMobile ? 120 : 77;
  const MOVE_ROTATIONY = isMobile ? 100 : 70;

  const containerRef = useRef(null);
  const boxRef = useRef<HTMLElement[] | null[]>([]);

  //초기 container perspective 설정
  useLayoutEffect(() => {
    gsap.timeline().set(containerRef.current, { perspective: 1000 });
  }, [colorAry]);

  // 각 Box에 애니메이션 설정
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      boxRef.current.forEach((b, i) => {
        gsap.set(b, {
          left: "50%",
          top: "50%",
          x: -100,
          y: -300,
          z: 600,
          width: 100,
          height: 300,
          borderRadius: 20,
          background: colorAry[i],
        });

        gsap.fromTo(
          b,
          {
            scaleY: 0,
            zIndex: -i,
            rotationY:
              START_ROTATIONY + (i / colorAry.length) * INTERVAL_BETWEEN,
            transformOrigin: String("50% 50% -900%"),
          },
          {
            scaleY: 1,
            duration: 1,
            delay: 1 - 0.5 * (i / colorAry.length),
            ease: "elastic",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [colorAry]);

  const handleMouseMoveWrapper = (e: React.MouseEvent) => {
    let ctx = gsap.context(() => {
      boxRef.current.forEach((b, i) => {
        gsap.to(b, {
          duration: 0.6,
          rotationY:
            START_ROTATIONY +
            (i / colorAry.length) * INTERVAL_BETWEEN +
            90 * (e.clientX / window.innerWidth),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  };

  const handleMouseEnterBox = (idx: number) => {
    gsap.to(boxRef.current[idx], {
      duration: 0.3,
      scaleY: 1.2,
      ease: "back.out(5)",
    });
  };

  const handleMouseLeaveBox = (idx: number) => {
    gsap.to(boxRef.current[idx], { duration: 0.4, scaleY: 1 });
  };

  const moveBoxCenter = (selectIdx: number) => {
    let ctx = gsap.context(() => {
      boxRef.current.forEach((b, i) => {
        gsap.to(b, {
          duration: 0.6,
          rotationY:
            MOVE_ROTATIONY +
            (i / colorAry.length) * INTERVAL_BETWEEN +
            (colorAry.length - selectIdx) * 8,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  };

  return (
    <Wrapper onMouseMove={handleMouseMoveWrapper}>
      <Animations ref={containerRef}>
        {colorAry.map((color, i) => {
          return (
            <Box
              key={i}
              ref={(el) => (boxRef.current[i] = el)}
              color={color}
              onMouseEnter={() => handleMouseEnterBox(i)}
              onMouseLeave={() => handleMouseLeaveBox(i)}
              onClick={() => moveBoxCenter(i)}
            ></Box>
          );
        })}
      </Animations>
    </Wrapper>
  );
};

/* STYLE */
const Wrapper = styled.div`
  margin-top: 10rem;
  overflow: hidden;
`;

const Animations = styled.div`
  position: absolute;
`;

const Box = styled.div`
  position: absolute;
  overflow: hidden;
  cursor: pointer;
`;

export default Xylophone;
