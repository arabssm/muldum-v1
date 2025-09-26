import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as _ from "./style";
import NavBar from "@_navbar/sidebar";
import { fetchTeamDetail, TeamDetail as TeamDetailType } from "@_api/teamspace/detail";
import { useUserStore } from "../../../../src/atom/User";
import NotionEditor from "../../component/notice/noticeEdit";
import TeacherInvite from "../../../api/teamspace/save";
import { uploadTeamIconImage,uploadTeamBannerImage } from "../../../api/teamspace/upload";
import { saveFile } from "@_api/notice/notice";

export default function TeamDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState<TeamDetailType | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUserStore();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    fetchTeamDetail(Number(id))
      .then((data) => setTeam(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!team) return <div>로딩중...</div>;

  const canEdit = user && user.teamId === team.teamId;

  const handleContentChange = (html: string) => {
    setTeam((prev) => (prev ? { ...prev, content: html } : prev));
  };

  const handleSubmit = async () => {
    if (!team?.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      await TeacherInvite(team.content);
      alert("저장되었습니다.");
      navigate(`/club/${team.teamId}`);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setIsUploading(true);
  try {
    const uploadedUrl = await saveFile(file); 
    await uploadTeamBannerImage(uploadedUrl);     

    setTeam(prev =>
      prev
        ? {
            ...prev,
            config: { ...prev.config, backgroundImageUrl: uploadedUrl },
          }
        : prev
    );

  } catch (error) {
    console.error("배너 업로드 실패:", error);
    alert("배너 업로드에 실패했습니다.");
  } finally {
    setIsUploading(false);
    event.target.value = "";
  }
};

const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setIsUploading(true);
  try {
    const uploadedUrl = await saveFile(file);
    await uploadTeamIconImage(uploadedUrl);

    setTeam(prev =>
      prev
        ? {
            ...prev,
            config: { ...prev.config, iconImageUrl: uploadedUrl },
          }
        : prev
    );


  } catch (error) {
    console.error("로고 업로드 실패:", error);
    alert("로고 업로드에 실패했습니다.");
  } finally {
    setIsUploading(false);
    event.target.value = "";
  }
};



  const handleBannerClick = () => {
    if (canEdit && !isUploading) {
      bannerInputRef.current?.click();
    }
  };

  const handleLogoClick = () => {
    if (canEdit && !isUploading) {
      logoInputRef.current?.click();
    }
  };

  return (
    <_.Container>
      <NavBar />
      <_.Content>
        <_.Banner
          style={{
            backgroundImage: `url(${team.config.backgroundImageUrl})`,
          }}
          onClick={handleBannerClick}
          className={canEdit ? "editable" : ""}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        />
        {canEdit && (
          <_.ButtonGroup>
            <_.Btn onClick={handleSubmit} disabled={isUploading}>
              {isUploading ? "업로드 중..." : "수정완료"}
            </_.Btn>
          </_.ButtonGroup>
        )}

        <_.LogoArea>
          <_.Logo
            src={team.config.iconImageUrl}
            alt={`${team.teamName} 로고`}
            onClick={handleLogoClick}
            className={canEdit ? "editable" : ""}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
          />
        </_.LogoArea>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleBannerUpload}
        />
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleLogoUpload}
        />

        <_.Header>
          <_.ClubName>{team.teamName}</_.ClubName>
        </_.Header>
        <_.Section>
          <NotionEditor
            value={team.content}
            onChange={handleContentChange}
            readOnly={!canEdit}
          />
        </_.Section>
      </_.Content>
    </_.Container>
  );
}
