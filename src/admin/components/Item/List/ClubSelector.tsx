import * as _ from '@_pages/Item/Approval/style';
import { ClubSelectorProps } from '@_pages/Item/Approval/type';

export default function ClubSelector({ clubs, selectedClub, setSelectedClub }: ClubSelectorProps) {
    const handleSelect = (clubName: string) => {
        setSelectedClub(clubName === selectedClub ? null : clubName);
    };

    return (
        <_.ClubArea>
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
    );
}