import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import "@_styles";
import ApprovalList from "@_components/Item/List/ApprovalList";
import { getClubs } from "./ClubList";
import { submititem, nosubmititem, Getxlsx, openNthApplication } from "@_api/object/apply";
import ClubSelector from "@_components/Item/List/ClubSelector";
import RejectModal from "@_modal/Approval/Rejectmodal";
import ApprovalModal from "@_modal/Approval/ApprovalModal";
import GuidelinesModal from "../../../../student/component/object/GuidelinesModal";


const toValidIds = (ids: unknown[]): number[] =>
  Array.from(
    new Set(
      (ids ?? [])
        .map((v) => (typeof v === "string" ? Number(v) : (v as number)))
        .filter((v) => Number.isFinite(v)) as number[]
    )
  );

const Approval = () => {
  const [filter, setFilter] = useState<"승인하기" | "승인된 물품 조회" | "거절된 물품 조회">("승인하기");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [allItemIds, setAllItemIds] = useState<number[]>([]);
  const [reasons, setReasons] = useState<{ [id: number]: string }>({});
  const [clubs, setClubs] = useState<{ id: number; name: string; hasNewItems: boolean }[]>([]);

  const [selectedPossibleClub, setSelectedPossibleClub] = useState<string | null>("전체");
  const [selectedImpossibleClub, setSelectedImpossibleClub] = useState<string | null>("전체");
  const [selectAll, setSelectAll] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showNthModal, setShowNthModal] = useState(false);
  const [nthValue, setNthValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadClubs = async () => {
      const clubData = await getClubs();
      setClubs(clubData);
    };
    loadClubs();
  }, []);

  useEffect(() => {
    setSelectedItems([]);
    setSelectAll(false);
  }, [filter, selectedPossibleClub, selectedImpossibleClub]);



  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const safeIds = toValidIds(allItemIds);
      setSelectedItems(safeIds);
    }
    setSelectAll((v) => !v);
  };

  async function SSubmit() {
    try {
      const payload = selectedItems.map((id) => ({ item_id: id }));
      const res = await submititem(payload);
      setShowApproveModal(true);
    } catch (err) {
      alert("승인 중 오류 발생");
    }
  }

  async function NSubmit() {
    const validIds = toValidIds(selectedItems);
    if (validIds.length === 0) {
      alert("선택된 유효한 항목이 없습니다.");
      return;
    }

    try {
      const payload = validIds.map((id) => ({
        item_id: id,
        reason: reasons[id] || "",
      }));

      const res = await nosubmititem(payload);
      setShowRejectModal(true);
    } catch (err) {
      alert("거절 실패");
      alert("거절 중 오류가 발생했습니다.");
    }
  }

  const closeModal = (isApprove: boolean) => {
    if (isApprove) setShowApproveModal(false);
    else setShowRejectModal(false);
    navigate("/project-approval");
  };

  const handleDownload = async () => {
    try {
      const blob = await Getxlsx();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `승인된물품목록_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("다운로드 중 오류가 발생했습니다.");
    }
  };

  const handleOpenNth = async () => {
    const nth = parseInt(nthValue);
    if (!nth || nth < 1) {
      alert('유효한 차수를 입력해주세요.');
      return;
    }
    try {
      await openNthApplication(nth);
      alert(`${nth}차 물품 신청 기간이 열렸습니다.`);
      setShowNthModal(false);
      setNthValue('');
    } catch (err) {
      alert('신청 기간 열기에 실패했습니다.');
    }
  };

  const isPossible = filter === "승인하기";
  const isApproved = filter === "승인된 물품 조회";
  const isRejected = filter === "거절된 물품 조회";
  const selectedClubName = isPossible ? selectedPossibleClub : selectedImpossibleClub;
  const setSelectedClub = isPossible ? setSelectedPossibleClub : setSelectedImpossibleClub;
  const isAllClubs = selectedClubName === "전체";
  
  const selectedClubId = useMemo(() => {
    if (isAllClubs) return null;
    const found = clubs.find((c) => c.name === selectedClubName);
    const id = found?.id;
    return Number.isFinite(id as number) ? (id as number) : null;
  }, [selectedClubName, clubs, isAllClubs]);

  const renderContent = () => {
    if (isRejected) {
      return (
        <ApprovalList
          id={null}
          selectAll={selectAll}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setAllItemIds={setAllItemIds}
          reasons={reasons}
          setReasons={setReasons}
          isRejected={true}
          isAllClubs={true}
          clubs={clubs}
        />
      );
    }

    return (
      <>
        {isPossible ? (
          <>
            <ClubSelector
              clubs={clubs}
              selectedClub={selectedClubName}
              setSelectedClub={setSelectedClub}
            />
            <_.AddonsArea>
              <_.Addons onClick={toggleSelectAll}>
                {selectAll ? "전체해제" : "전체선택"}
              </_.Addons>
              <_.Addons onClick={() => setShowGuidelinesModal(true)}>
                물품 신청 안내
              </_.Addons>
              <_.Addons onClick={() => setShowNthModal(true)}>
                n차 신청 열기
              </_.Addons>
            </_.AddonsArea>

            {selectedClubName ? (
              <ApprovalList
                id={selectedClubId}
                selectAll={selectAll}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setAllItemIds={setAllItemIds}
                reasons={reasons}
                setReasons={setReasons}
                isAllClubs={isAllClubs}
                clubs={clubs}
              />
            ) : (
              <_.Null>물품승인을 할 동아리를 선택해주세요</_.Null>
            )}
          </>
        ) : (
          <>
            <ClubSelector
              clubs={clubs}
              selectedClub={selectedClubName}
              setSelectedClub={setSelectedClub}
            />
            {isAllClubs && (
              <_.AddonsArea>
                <_.Addons onClick={handleDownload}>다운로드</_.Addons>
              </_.AddonsArea>
            )}
            {selectedClubName ? (
              <ApprovalList
                id={selectedClubId}
                selectAll={selectAll}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setAllItemIds={setAllItemIds}
                reasons={reasons}
                setReasons={setReasons}
                isApproved={true}
                isAllClubs={isAllClubs}
                clubs={clubs}
              />
            ) : (
              <_.Null>승인된 물품을 조회할 동아리를 선택해주세요</_.Null>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <_.Title>네트워크 물품 승인</_.Title>
      <_.Subtitle>학생들이 신청한 물품들을 확인해요</_.Subtitle>
      <_.ButtonArea>
        <_.ApprovalButton onClick={() => setFilter("승인하기")} active={filter === "승인하기"}>
          승인 가능
        </_.ApprovalButton>
        <_.ApprovalButton onClick={() => setFilter("승인된 물품 조회")} active={filter === "승인된 물품 조회"}>
          승인된 물품 조회
        </_.ApprovalButton>
        <_.ApprovalButton onClick={() => setFilter("거절된 물품 조회")} active={filter === "거절된 물품 조회"}>
          거절된 물품 조회
        </_.ApprovalButton>
      </_.ButtonArea>

      <_.ContentContainer>
        {renderContent()}
        {filter === "승인하기" && (
          <_.ButtonGroup>
            <_.ApplyButton onClick={SSubmit} disabled={selectedItems.length === 0}>
              승인하기
            </_.ApplyButton>
            <_.ApplyNobutton onClick={NSubmit} disabled={selectedItems.length === 0}>
              거절하기
            </_.ApplyNobutton>
          </_.ButtonGroup>
        )}
      </_.ContentContainer>
      {showApproveModal && <ApprovalModal onClose={() => closeModal(true)} />}
      {showRejectModal && <RejectModal onClose={() => closeModal(false)} />}
      <GuidelinesModal 
        isOpen={showGuidelinesModal} 
        onClose={() => setShowGuidelinesModal(false)} 
      />
      {showNthModal && (
        <_.ModalOverlay onClick={() => setShowNthModal(false)}>
          <_.ModalContent onClick={(e) => e.stopPropagation()}>
            <_.ModalTitle>n차 물품 신청 기간 열기</_.ModalTitle>
            <_.ModalSubtitle>차수를 입력하면 학생들이 해당 차수로 신청할 수 있습니다</_.ModalSubtitle>
            <_.NthInputWrapper>
              <_.NthInput
                type="number"
                min="1"
                placeholder="차수 입력 (예: 1, 2, 3...)"
                value={nthValue}
                onChange={(e) => setNthValue(e.target.value)}
              />
              <_.NthButton onClick={handleOpenNth}>열기</_.NthButton>
            </_.NthInputWrapper>
          </_.ModalContent>
        </_.ModalOverlay>
      )}
    </>
  );
};

export default Approval;
