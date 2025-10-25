import { useState, useEffect } from "react";
import styled from "@emotion/styled";

export default function Loading() {
    const [dots, setDots] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(d => (d === 1 ? 3 : d - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            로딩중
            {[...Array(dots)].map((_, i) => (
                <Dot key={i}>.</Dot>
            ))}
        </Container>
    );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  background-color: white;
  z-index: 9999;
`;

const Dot = styled.span`
  margin-left: 0.2rem;
`;