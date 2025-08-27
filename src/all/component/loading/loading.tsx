import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import NavBar from "@_navbar/sidebar";

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
            <NavBar />
            로딩중
            {[...Array(dots)].map((_, i) => (
                <Dot key={i}>.</Dot>
            ))}
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12%;
  height: 100vh;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Dot = styled.span`
  margin-left: 0.2rem;
`;