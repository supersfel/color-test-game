/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { colorStickType } from "types/game";
import { toast } from "react-toastify";
import { changeRGBToHex, makeCorrectBoom, makeWrongBoom } from "utils/game";

interface Props {
  colorAry: string[];
  doChekcAnswer: boolean;
  answer: string;
  level: number;
  goNextLevel: () => void;
  gameEnd?: () => void;
}

const Xylophone = memo(
  ({ colorAry, doChekcAnswer, answer, level, goNextLevel, gameEnd }: Props) => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
    //간격 설정 (10개 기준)으로만 현재 개발
    const INTERVAL_BETWEEN = isMobile ? 70 : 100;
    const START_ROTATIONY = isMobile ? 120 : 80;
    const MOVE_ROTATIONY = 100;
    const TOUCH_SENS = 1.4; // 터치 감도

    const containerRef = useRef(null);
    const boxRef = useRef<HTMLElement[] | null[]>([]);

    const [selected, setSelected] = useState<colorStickType | null>(null);
    const [touchStartX, setTouchStartX] = useState<number>(0);

    //정답체크 후 애니메이션 발생 시작일땐 level이 0
    const checkAnswer = (color: string | undefined, answer: string) => {
      if (!color) return;

      color = changeRGBToHex(color);

      //맞춘경우
      if (color === answer) {
        makeCorrectBoom();
        goNextLevel();
        if (level) toast.success(`잘하셨어요! ${level} 클리어!!`);
        else toast.success(`잘하셨어요! 시작해 볼까요?`);
        return;
      }

      //틀린경우
      makeWrongBoom();
      if (level) {
        toast.warning(`틀렸어요 ㅠㅠ`);
        if (gameEnd) gameEnd();
      } else {
        toast.success(`틀리긴 했지만 시작해 볼까요?`);
      }
      setSelected(null);
    };

    useEffect(() => {
      if (doChekcAnswer) {
        if (!selected && level) {
          toast.warning("색을 선택해주세요!");
          return;
        }
        checkAnswer(selected?.color, answer);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doChekcAnswer, answer, selected?.color]);

    useEffect(() => {
      if (colorAry.length && colorAry.length !== 10) {
        alert("현재  조작이 이상할 수 있습니다. F5키를 눌러주세요");
      }
    }, [colorAry]);

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
    }, [INTERVAL_BETWEEN, START_ROTATIONY, colorAry]);

    //컴퓨터 화면에서 마우스 이동으로 막대 를 볼 수 있음
    const handleMouseMoveWrapper = (e: React.MouseEvent) => {
      if (isMobile) return;
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

    const handleTouchStartWrapper = (e: React.TouchEvent) => {
      setTouchStartX(e.changedTouches[0].clientX);
    };

    const hadleTouchMoveWrapper = (e: React.TouchEvent) => {
      const target = e.changedTouches[0].target as HTMLDivElement;
      const touchedIdx = target.getAttribute("data-key");
      if (!touchedIdx) return;

      let moveDist = touchStartX - e.changedTouches[0].clientX;

      let ctx = gsap.context(() => {
        boxRef.current.forEach((b, i) => {
          gsap.to(b, {
            duration: 0.6,
            rotationY:
              MOVE_ROTATIONY +
              (i / colorAry.length) * INTERVAL_BETWEEN +
              (colorAry.length - +touchedIdx) * 8 +
              (moveDist * TOUCH_SENS + window.innerWidth / 2 - touchStartX) / 8,
          });
          // 시작좌표 + 블럭별 간격두기 + 선택한 블럭을 중앙으로 + 상대변화값 + 첫 시작값 좌표계산
          // 8을 나눠주는 이유는 감도조절
        });
      }, containerRef);

      return () => ctx.revert();
    };

    //박스에 마우스를 가져다 대면 커짐
    const handleMouseEnterBox = (idx: number) => {
      gsap.to(boxRef.current[idx], {
        duration: 0.3,
        scaleY: 1.2,
        ease: "back.out(5)",
      });
    };

    //마우스를 빼면 작아짐
    const handleMouseLeaveBox = (idx: number) => {
      if (isMobile) return;
      if (idx === selected?.idx) return;
      gsap.to(boxRef.current[idx], {
        duration: 0.4,
        scaleY: 1,
      });
    };

    //박스 클릭
    const clickBox = (selectIdx: number) => {
      //클릭된 박스가 중앙에 올 수 있도록
      let ctx = gsap.context(() => {
        boxRef.current.forEach((b, i) => {
          //모바일인 경우에만 이동
          if (isMobile) {
            gsap.to(b, {
              duration: 0.6,
              rotationY:
                MOVE_ROTATIONY +
                (i / colorAry.length) * INTERVAL_BETWEEN +
                (colorAry.length - selectIdx) * 8,
            });
          }

          //선택되어있던 박스 집어넣기
          if (selected && selected.idx !== selectIdx)
            gsap.to(boxRef.current[selected.idx], {
              duration: 0.4,
              scaleY: 1,
            });
        });
      }, containerRef);

      //선택 박스 저장
      setSelected({
        idx: selectIdx,
        color: boxRef.current[selectIdx]?.style.background,
      });

      return () => ctx.revert();
    };

    return (
      <Wrapper
        onMouseMove={handleMouseMoveWrapper}
        onTouchMove={hadleTouchMoveWrapper}
        onTouchStart={handleTouchStartWrapper}
      >
        <Animations ref={containerRef}>
          {colorAry.map((color, i) => {
            return (
              <Box
                key={i}
                data-key={i}
                ref={(el) => (boxRef.current[i] = el)}
                color={color}
                onMouseEnter={() => handleMouseEnterBox(i)}
                onMouseLeave={() => handleMouseLeaveBox(i)}
                onMouseDown={() => clickBox(i)}
              ></Box>
            );
          })}
        </Animations>
      </Wrapper>
    );
  }
);

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
