import { useRef, useState, useEffect } from 'react';
import * as _ from '@_pages/Item/Approval/style';
import { ClubSelectorProps } from '@_pages/Item/Approval/type';

export default function ClubSelector({ clubs, selectedClub, setSelectedClub }: ClubSelectorProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const handleSelect = (clubName: string) => {
        setSelectedClub(clubName === selectedClub ? null : clubName);
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        const handleResize = () => checkScroll();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [clubs]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <_.ClubScrollContainer>
            <_.ScrollButton 
                direction="left" 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
            >
                &lt;
            </_.ScrollButton>
            
            <_.ClubArea ref={scrollRef} onScroll={checkScroll}>
                <_.ClubWrapper>
                    <_.ClubName
                        onClick={() => handleSelect("전체")}
                        selected={selectedClub === "전체"}
                    >
                        전체
                    </_.ClubName>
                </_.ClubWrapper>

                {clubs.map((club, i) => (
                    <_.ClubWrapper key={i}>
                        <_.ClubName
                            onClick={() => handleSelect(club.name)}
                            selected={selectedClub === club.name}
                        >
                            {club.name}
                        </_.ClubName>
                        {club.hasNewItems && <_.NewBadge>N</_.NewBadge>}
                    </_.ClubWrapper>
                ))}
            </_.ClubArea>

            <_.ScrollButton 
                direction="right" 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
            >
                &gt;
            </_.ScrollButton>
        </_.ClubScrollContainer>
    );
}