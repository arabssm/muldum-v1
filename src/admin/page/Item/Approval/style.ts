import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    margin-left: 14.5%;
`;

export const ContentContainer = styled.div`
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
`;

export const Title = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 1%;
    margin-top: 2%;
`;

export const Subtitle = styled.div`
    display: flex;
    justify-content: left;
    font-size: 1.2rem;
    color: #707070;
    margin-bottom: 5%;
`;

export const ButtonArea = styled.div`
    display: flex;
    width: 100%;
    border: none;
    border-bottom: 1px solid #B2B2B2;
    gap: 2rem;
    margin-bottom: 3%;
`;

export const ApprovalButton = styled.button<{ active?: boolean }>`
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
    border: none;
    background-color: transparent;
    border-bottom: 0.2rem solid ${({ active }) => (active ? '#FF9B62' : 'none')};
    color: #1D1D1D;
    cursor: pointer;
    font-family: 'Paperlogy';
`;

export const ClubScrollContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 2.5%;
    padding: 0 3rem;
`;

export const ClubArea = styled.div`
    display: flex;
    width: 100%;
    border: none;
    gap: 1.3rem;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
`;

export const ScrollButton = styled.button<{ direction: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    ${({ direction }) => direction === 'left' ? 'left: -0.5rem;' : 'right: -0.5rem;'}
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid #FF9B62;
    background-color: white;
    color: #FF9B62;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    box-shadow: 0 2px 12px rgba(255, 155, 98, 0.3);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #FF9B62;
        color: white;
        box-shadow: 0 4px 16px rgba(255, 155, 98, 0.5);
        transform: translateY(-50%) scale(1.1);
    }

    &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
        border-color: #E0E0E0;
        color: #E0E0E0;
        box-shadow: none;
    }
`;

export const ClubWrapper = styled.div`
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    padding: 4px 4px 0 0;
    margin: 4px 0 0 0;
`;

export const ClubName = styled.div<{ selected?: boolean }>`
    padding: 0.7rem 1rem;
    border: 0.06rem solid ${({ selected }) => (selected ? '#FF9B62' : '#B2B2B2')};
    background-color: ${({ selected }) => (selected ? '#FFF5EF' : 'white')};
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
`;

export const NewBadge = styled.div`
    position: absolute;
    top: -10px;
    right: -4px;
    background-color: #FF4444;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 8px;
    transform: rotate(15deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 100000213213123213213213123210;
`;

export const DetailArea = styled.div`
    width: 86%;
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 0.3rem;
`;

export const AddonsArea = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    gap: 1.3rem;
    margin-bottom: 3%;
`;

export const Addons = styled.button`
    font-size: 1.2rem;
    color: #B2B2B2;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-family: 'Paperlogy';

    :hover {
        color: #FF9B62;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    gap: 1.3rem;
    margin-bottom: 3%;
`;

export const ApplyButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 1%;
    width: 7.5rem;
    border-radius: 2rem;
    background-color: #FF9B62;
    border: 0;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    font-family: 'Paperlogy';
    margin-top: 4%;

    :hover {
        background-color: #EB712B;
    }
`;

export const ApplyNobutton = styled.button`
    display: flex;
    justify-content: center;
    padding: 1%;
    width: 7.5rem;
    border-radius: 2rem;
    border: 0.1rem solid #FF9B62;
    color: #FF9B62;
    background-color: transparent;
    font-size: 1.2rem;
    cursor: pointer;
    font-family: 'Paperlogy';
    margin-top: 4%;

    :hover{
        background-color: #FF9B62;
        color: #fff;
    }
`;

export const Null = styled.div`
    display: flex;
    width: 100%;
    padding: 3% 4%;
    background-color: #FAFAFA;
    font-size:  1.3rem;
    color: #545454;
    box-sizing: border-box;
`;

export const RejectReasonArea = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

export const RejectButton = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? '#FF9B62' : '#B2B2B2')};
    color: ${({ active }) => (active ? '#fff' : '#fff')};
    border: none;
    border-radius: 4px;
    padding: 1% 1.2%;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Paperlogy';
`;

export const rescontainer = styled.div`
    display: flex;
    gap: 1.2rem;
    list-style: none;
    padding: 0;
`;

export const reabtn = styled.div<{ selected: boolean }>`
    padding: 1% 2%;
    border-radius: 4px;
    background-color: ${({ selected }) => (selected ? '#FF9B62' : '#B2B2B2')};
    color: white;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 400;

    ::selection {
        background-color: #ff9b62;
    }
`;
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    min-width: 400px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1D1D1D;
    margin-bottom: 0.5rem;
`;

export const ModalSubtitle = styled.p`
    font-size: 1rem;
    color: #707070;
    margin-bottom: 1.5rem;
`;

export const NthInputWrapper = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const NthInput = styled.input`
    flex: 1;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #D1D1D1;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #FF9B62;
    }
`;

export const NthButton = styled.button`
    padding: 0.8rem 1.5rem;
    background-color: #FF9B62;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-family: 'Paperlogy';

    &:hover {
        background-color: #EB712B;
    }
`;
