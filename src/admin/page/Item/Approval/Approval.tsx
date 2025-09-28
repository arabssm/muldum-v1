import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import "@_styles";
import NavBar from "@_all/component/sibebar/sidebar";
import ApprovalList from "@_components/Item/List/ApprovalList";
import Clubs from "./ClubList";
import { submititem, nosubmititem } from "@_api/object/apply";
import ClubSelector from "@_components/Item/List/ClubSelector";
import RejectModal from "@_modal/Approval/Rejectmodal";
import ApprovalModal from "@_modal/Approval/ApprovalModal";
import ReasonButtons from "./Reason";

const toValidIds = (ids: unknown[]): number[] =>
  Array.from(
    new Set(
      (ids ?? [])
        .map((v) => (typeof v === "string" ? Number(v) : (v as number)))
        .filter((v) => Number.isFinite(v)) as number[]
    )
  );

const Approval = () => {
  const [filter, setFilter] = useState<"가능" | "불가능">("가능");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [allItemIds, setAllItemIds] = useState<number[]>([]);
  const [reasons, setReasons] = useState<{ [id: number]: string }>({});

  const [selectedPossibleClub, setSelectedPossibleClub] = useState<string | null>(null);
  const [selectedImpossibleClub, setSelectedImpossibleClub] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const navigate = useNavigate();

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

  } catch (err) {
    console.error("승인 실패", err);
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
      console.log("거절 성공:", res);
      setShowRejectModal(true);
    } catch (err) {
      console.error("거절 실패:", err);
      alert("거절 중 오류가 발생했습니다.");
    }
  }

  const closeModal = (isApprove: boolean) => {
    if (isApprove) setShowApproveModal(false);
    else setShowRejectModal(false);
    navigate("/object");
  };

  const renderContent = () => {
    const isPossible = filter === "가능";
    const selectedClubName = isPossible ? selectedPossibleClub : selectedImpossibleClub;
    const setSelectedClub = isPossible ? setSelectedPossibleClub : setSelectedImpossibleClub;
    const selectedClubId = useMemo(() => {
      const found = Clubs.find((c) => c.name === selectedClubName);
      const id = found?.id;
      return Number.isFinite(id as number) ? (id as number) : null;
    }, [selectedClubName]);

    return (
      <>
        {isPossible ? (
          <>
            <ClubSelector
              clubs={Clubs.map((c) => c.name)}
              selectedClub={selectedClubName}
              setSelectedClub={setSelectedClub}
            />
            <_.AddonsArea>
              <_.Addons onClick={toggleSelectAll}>
                {selectAll ? "전체해제" : "전체선택"}
              </_.Addons>
              <_.Addons>다운로드</_.Addons>
            </_.AddonsArea>

            {selectedClubId !== null ? (
              <ApprovalList
                id={selectedClubId}
                selectAll={selectAll}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setAllItemIds={setAllItemIds}
                reasons={reasons}
                setReasons={setReasons}
              />
            ) : (
              <_.Null>물품승인을 할 동아리를 선택해주세요</_.Null>
            )}
          </>
        ) : (
          <>
            <ReasonButtons />
            <_.AddonsArea>
              <_.Addons onClick={toggleSelectAll}>
                {selectAll ? "전체해제" : "전체선택"}
              </_.Addons>
            </_.AddonsArea>

            <ApprovalList
              id={1}
              selectAll={selectAll}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              setAllItemIds={setAllItemIds}
              reasons={reasons}
              setReasons={setReasons}
            />
          </>
        )}
      </>
    );
  };

  return (
    <_.Container>
      <NavBar />
      <_.Title>전공동아리 물품 승인</_.Title>
      <_.Subtitle>학생들이 신청한 물품들을 확인해요</_.Subtitle>
      <_.ButtonArea>
        <_.ApprovalButton onClick={() => setFilter("가능")} active={filter === "가능"}>
          승인 가능
        </_.ApprovalButton>
        <_.ApprovalButton onClick={() => setFilter("불가능")} active={filter === "불가능"}>
          승인 불가능
        </_.ApprovalButton>
      </_.ButtonArea>

      {renderContent()}

      <_.ButtonGroup>
        <_.ApplyButton onClick={SSubmit} disabled={selectedItems.length === 0}>
          승인하기
        </_.ApplyButton>
        <_.ApplyNobutton onClick={NSubmit} disabled={selectedItems.length === 0}>
          거절하기
        </_.ApplyNobutton>
      </_.ButtonGroup>

      {showApproveModal && <ApprovalModal onClose={() => closeModal(true)} />}
      {showRejectModal && <RejectModal onClose={() => closeModal(false)} />}
    </_.Container>
  );
};

export default Approval;