import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import "@_styles";
import ApprovalList from "@_components/Item/List/ApprovalList";
import { getClubs } from "./ClubList";
import { submititem, nosubmititem, Getxlsx, openNthApplication, getRejectTemplates, saveRejectTemplates, getOpenNths } from "@_api/object/apply";
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
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [nthValue, setNthValue] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [shipping, setShipping] = useState(true);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [templates, setTemplates] = useState<Array<{id: number, content: string}>>([]);
  const [newTemplate, setNewTemplate] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [availableNths, setAvailableNths] = useState<number[]>([]);
  const [selectedNth, setSelectedNth] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadClubs = async () => {
      const clubData = await getClubs();
      setClubs(clubData);
    };
    loadClubs();

    const loadNths = async () => {
      try {
        const data = await getOpenNths();
        if (data && data.openedNths) {
          setAvailableNths(data.openedNths);
        }
      } catch (err) {
        console.error('차수 목록 로드 실패:', err);
      }
    };
    loadNths();
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
      await submititem(payload);
      setShowApproveModal(true);
      setRefreshKey(prev => prev + 1); // 리렌더링 트리거
      setSelectedItems([]); // 선택 초기화
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

      await nosubmititem(payload);
      setShowRejectModal(true);
      setRefreshKey(prev => prev + 1); // 리렌더링 트리거
      setSelectedItems([]); // 선택 초기화
      setReasons({}); // 거절 사유 초기화
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
      const blob = await Getxlsx(selectedNth || undefined);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const nthSuffix = selectedNth ? `_${selectedNth}차` : '';
      link.download = `승인된물품목록${nthSuffix}_${new Date().toISOString().split('T')[0]}.xlsx`;
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
    if (!deadlineDate) {
      alert('마감일을 입력해주세요.');
      return;
    }
    if (!minPrice || parseInt(minPrice) < 0) {
      alert('유효한 최소 금액을 입력해주세요.');
      return;
    }
    
    try {
      const payload = {
        projectType: "NETWORK",
        guide: [{
          minPrice: parseInt(minPrice),
          shipping
        }],
        deadlineDate
      };
      await openNthApplication(nth, payload);
      alert(`${nth}차 물품 신청 기간이 열렸습니다.`);
      setShowNthModal(false);
      setNthValue('');
      setMinPrice('');
      setShipping(true);
      setDeadlineDate('');
    } catch (err) {
      alert('신청 기간 열기에 실패했습니다.');
    }
  };

  const loadTemplates = async () => {
    try {
      const res = await getRejectTemplates();
      if (Array.isArray(res)) {
        // 배열 형태: [{id, content, createdAt}, ...]
        setTemplates(res);
      } else if (res && res.templates) {
        // 객체 형태: {templates: [...]}
        setTemplates(res.templates);
      }
    } catch (err) {
      console.error('템플릿 로드 실패:', err);
    }
  };

  const handleOpenTemplateModal = () => {
    loadTemplates();
    setShowTemplateModal(true);
  };

  const handleAddTemplate = () => {
    if (!newTemplate.trim()) {
      alert('템플릿 내용을 입력해주세요.');
      return;
    }
    // 새 템플릿은 임시 ID로 추가 (저장 시 서버에서 실제 ID 부여)
    const tempId = Date.now();
    setTemplates([...templates, { id: tempId, content: newTemplate.trim() }]);
    setNewTemplate('');
  };

  const handleRemoveTemplate = async (templateId: number) => {
    try {
      // 임시 ID가 아닌 경우에만 서버에 삭제 요청
      if (templateId < 1000000000000) {
        const { deleteRejectTemplate } = await import('@_api/object/apply');
        await deleteRejectTemplate(templateId);
      }
      setTemplates(templates.filter((t) => t.id !== templateId));
    } catch (err) {
      alert('템플릿 삭제에 실패했습니다.');
    }
  };

  const handleSaveTemplates = async () => {
    try {
      const templateContents = templates.map(t => t.content);
      await saveRejectTemplates(templateContents);
      alert('거절 사유 템플릿이 저장되었습니다.');
      setShowTemplateModal(false);
      loadTemplates(); // 저장 후 다시 로드해서 실제 ID 받아오기
    } catch (err) {
      alert('템플릿 저장에 실패했습니다.');
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
        <>
          <_.AddonsArea>
            {availableNths.length > 0 && (
              <_.NthSelect value={selectedNth || ''} onChange={(e) => setSelectedNth(e.target.value ? Number(e.target.value) : null)}>
                <option value="">전체 차수</option>
                {availableNths.map(nth => (
                  <option key={nth} value={nth}>{nth}차</option>
                ))}
              </_.NthSelect>
            )}
          </_.AddonsArea>
          <ApprovalList
            key={`${refreshKey}-${selectedNth}`}
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
            nth={selectedNth}
          />
        </>
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
              <_.Addons onClick={handleOpenTemplateModal}>
                거절 사유 관리
              </_.Addons>
              {availableNths.length > 0 && (
                <_.NthSelect value={selectedNth || ''} onChange={(e) => setSelectedNth(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">전체 차수</option>
                  {availableNths.map(nth => (
                    <option key={nth} value={nth}>{nth}차</option>
                  ))}
                </_.NthSelect>
              )}
            </_.AddonsArea>

            {selectedClubName ? (
              <ApprovalList
                key={`${refreshKey}-${selectedNth}`}
                id={selectedClubId}
                selectAll={selectAll}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                setAllItemIds={setAllItemIds}
                reasons={reasons}
                setReasons={setReasons}
                isAllClubs={isAllClubs}
                clubs={clubs}
                nth={selectedNth}
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
            <_.AddonsArea>
              {isAllClubs && (
                <_.Addons onClick={handleDownload}>다운로드</_.Addons>
              )}
              {availableNths.length > 0 && (
                <_.NthSelect value={selectedNth || ''} onChange={(e) => setSelectedNth(e.target.value ? Number(e.target.value) : null)}>
                  <option value="">전체 차수</option>
                  {availableNths.map(nth => (
                    <option key={nth} value={nth}>{nth}차</option>
                  ))}
                </_.NthSelect>
              )}
            </_.AddonsArea>
            {selectedClubName ? (
              <ApprovalList
                key={`${refreshKey}-${selectedNth}`}
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
                nth={selectedNth}
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
                placeholder="차수 입력"
                value={nthValue}
                onChange={(e) => setNthValue(e.target.value)}
              />
            </_.NthInputWrapper>
            
            <_.NthInputWrapper>
              <_.NthInput
                type="number"
                min="0"
                placeholder="최소 금액 (원)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </_.NthInputWrapper>
            
            <div style={{ marginBottom: '1rem' }}>
              <_.InputLabel>n차 물품신청 마감일</_.InputLabel>
              <_.NthInput
                type="date"
                placeholder="마감일"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
              />
            </div>
            
            <_.NthInputWrapper>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={shipping}
                  onChange={(e) => setShipping(e.target.checked)}
                />
                <span>배송비 포함 필수</span>
              </label>
            </_.NthInputWrapper>
            
            <_.NthInputWrapper>
              <_.NthButton onClick={handleOpenNth}>열기</_.NthButton>
            </_.NthInputWrapper>
          </_.ModalContent>
        </_.ModalOverlay>
      )}
      
      {showTemplateModal && (
        <_.ModalOverlay onClick={() => setShowTemplateModal(false)}>
          <_.ModalContent onClick={(e) => e.stopPropagation()} style={{ minWidth: '500px' }}>
            <_.ModalTitle>거절 사유 템플릿 관리</_.ModalTitle>
            <_.ModalSubtitle>자주 사용하는 거절 사유를 등록하고 관리하세요</_.ModalSubtitle>
            
            <_.TemplateList>
              {templates.map((template) => (
                <_.TemplateItem key={template.id}>
                  <_.TemplateText>{template.content}</_.TemplateText>
                  <_.RemoveButton onClick={() => handleRemoveTemplate(template.id)}>삭제</_.RemoveButton>
                </_.TemplateItem>
              ))}
            </_.TemplateList>
            
            <_.NthInputWrapper>
              <_.NthInput
                type="text"
                placeholder="새 템플릿 입력"
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTemplate()}
              />
              <_.NthButton onClick={handleAddTemplate}>추가</_.NthButton>
            </_.NthInputWrapper>
            
            <_.NthInputWrapper>
              <_.NthButton onClick={handleSaveTemplates} style={{ width: '100%' }}>저장</_.NthButton>
            </_.NthInputWrapper>
          </_.ModalContent>
        </_.ModalOverlay>
      )}
    </>
  );
};

export default Approval;
