import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import * as _ from './style';
import sliderSettings from './Setting';
import '@_styles';
import { getNotice } from "@_api/notice/notice";
import { useNavigate } from "react-router-dom";
interface NoticeItem {
    id: number;
    title: string;
    deadlineDate: string;
    updatedAt: string;
    teacher: string;
}

export default function SliderComponent() {
    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getNotice(1);
                if (response && Array.isArray(response.content)) {
                    setNotices(response.content);
                } else {
                    setNotices([]);
                }
            } catch (error) {
                console.error('공지사항을 불러오는데 실패했습니다:', error);
                setNotices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const calculateDDay = (deadlineDate: string) => {
        const today = new Date();
        const deadline = new Date(deadlineDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return `D-${diffDays}`;
        } else if (diffDays === 0) {
            return 'D-Day';
        } else if (diffDays < 0) {
            return '마감';
        }
        else {
            return ' ';
        }
    };

    const truncateTitle = (title: string) => {
        return title.length > 15 ? title.substring(0, 15) + '...' : title;
    };

    if (loading) {
        return (
            <_.High>
                <_.StyledSlider {...{ ...sliderSettings, infinite: notices.length > 1 }}>
                    <_.SlideWrapper>
                        <_.SlideContent>
                            <_.Overlay />
                            <_.Title>공지사항을 불러오는 중...</_.Title>
                        </_.SlideContent>
                    </_.SlideWrapper>
                </_.StyledSlider>
            </_.High>
        );
    }

    if (notices.length === 0) {
        return (
            <_.High>
                <_.StyledSlider {...{ ...sliderSettings, infinite: notices.length > 1 }}>
                    <_.SlideWrapper>
                        <_.SlideContent>
                            <_.Overlay />
                            <_.Title>새로운 공지사항이 없습니다</_.Title>
                            <_.SubTitle>곧 새로운 소식을 전해드릴게요!</_.SubTitle>
                        </_.SlideContent>
                    </_.SlideWrapper>
                </_.StyledSlider>
            </_.High>
        );
    }

    const handleSlideClick = (noticeId: number) => {
        if (!isDragging) {
            nav(`/notice/${noticeId}`);
        }
    };

    return (
        <_.High>
            <_.StyledSlider {...{ ...sliderSettings, infinite: notices.length > 1 }}>
                {notices.map((notice, index) => (
                    <_.SlideWrapper
                        key={notice.id}
                        onMouseDown={() => setIsDragging(false)}
                        onMouseMove={() => setIsDragging(true)}
                        onMouseUp={() => setTimeout(() => setIsDragging(false), 100)}
                        onClick={() => handleSlideClick(notice.id)}
                    >
                        <_.SlideContent>
                            <_.Overlay />
                            <_.Title>{truncateTitle(notice.title)}</_.Title>
                            <_.Date>{formatDate(notice.updatedAt)}</_.Date>
                            <_.SubTitle>{notice.teacher}</_.SubTitle>
                            <_.Ddate>{calculateDDay(notice.deadlineDate)}</_.Ddate>
                            <_.Index>{index + 1}/{notices.length}</_.Index>
                        </_.SlideContent>
                    </_.SlideWrapper>
                ))}
            </_.StyledSlider>
        </_.High>
    );
}
