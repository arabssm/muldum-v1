import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Image } from "@tiptap/extension-image";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import styled from "@emotion/styled";
import { saveFile } from "@_api/notice/notice";

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
};

interface SlashMenuItem {
  label: string;
  keywords: string[];
  action: () => void;
  icon?: string;
}

export default function NotionEditor({ value = "", onChange, readOnly }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashPos, setSlashPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [slashQuery, setSlashQuery] = useState("");
  const [slashStartPos, setSlashStartPos] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "여기에 내용을 입력하세요.  / 를 입력하면 블록 메뉴가 열립니다.",
      }),
      Image.configure({ inline: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "notion-editor prose prose-sm max-w-none focus:outline-none",
        style: "min-height:220px; line-height:1.7; font-size:16px; padding:14px 16px; border-radius:12px; background:#fff; border:1px solid #eaecef;",
      },
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            alert('이미지는 업로드 버튼을 사용해주세요.');
            return true;
          }
        }
        return false;
      },
      handleDrop(view, event, _slice, _moved) {
        const files = Array.from(event.dataTransfer?.files ?? []);
        const image = files.find(f => f.type.startsWith("image/"));
        if (image) {
          event.preventDefault();
          alert('이미지는 업로드 버튼을 사용해주세요.');
          return true;
        }
        return false;
      },
      handleKeyDown: (_view, e) => {
        // 슬래시 메뉴가 열려있을 때의 키보드 처리
        if (slashOpen) {
          if (e.key === "Escape") {
            closeSlashMenu();
            return true;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            const items = getFilteredItems();
            setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
            return true;
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
            return true;
          }

          if (e.key === "Enter") {
            e.preventDefault();
            const items = getFilteredItems();
            if (items[selectedIndex]) {
              executeSlashCommand(items[selectedIndex].action);
            }
            return true;
          }

          if (e.key === "Backspace" && slashQuery === "") {
            const from = slashStartPos;
            const to = editor?.state.selection.from || slashStartPos;
            editor?.chain().focus().deleteRange({ from, to }).run();
            closeSlashMenu();
            e.preventDefault();
            return true;
          }

          if (e.key === "Backspace" && slashQuery.length > 0) {
            setSlashQuery(prev => {
              const newQuery = prev.slice(0, -1);
              setSelectedIndex(0);
              return newQuery;
            });
            e.preventDefault();
            return true;
          }

          if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
            setSlashQuery(prev => {
              const newQuery = prev + e.key;
              setSelectedIndex(0);
              return newQuery;
            });
            e.preventDefault();
            return true;
          }
        }

        // 슬래시 입력 감지
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !slashOpen) {
          const currentPos = editor?.state.selection.from || 0;
          setSlashStartPos(currentPos);

          // 슬래시 입력 후 약간의 지연을 두고 메뉴 열기
          setTimeout(() => {
            openSlashMenu();
          }, 50);
        }

        return false;
      },
    },
  });

  // 슬래시 메뉴 열기
  const openSlashMenu = useCallback(() => {
    if (!editor) return;

    try {
      // TipTap 에디터에서 직접 커서 위치 가져오기
      const { view } = editor;
      const { selection } = view.state;

      // 커서 위치를 DOM 좌표로 변환
      const coords = view.coordsAtPos(selection.from);



      // 메뉴 위치 계산
      const menuWidth = 320;
      const menuHeight = 280;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;

      // x 위치: 커서 위치에서 시작
      let x = coords.left;

      // 화면 오른쪽 경계를 넘으면 조정
      if (x + menuWidth > viewportWidth - padding) {
        x = viewportWidth - menuWidth - padding;
      }

      // 왼쪽 경계 체크
      if (x < padding) {
        x = padding;
      }

      // y 위치: 커서 바로 아래에 표시
      let y = coords.bottom + 6;

      if (y + menuHeight > viewportHeight - padding) {
        y = coords.top - menuHeight - 6;
      }


      setSlashPos({ x, y });
      setSlashQuery("");
      setSelectedIndex(0);
      setSlashOpen(true);

    } catch (error) {

      const editorElement = document.querySelector('.notion-editor');
      if (editorElement) {
        const rect = editorElement.getBoundingClientRect();
        setSlashPos({
          x: rect.left + 20,
          y: rect.top + 50
        });
        setSlashQuery("");
        setSelectedIndex(0);
        setSlashOpen(true);
      }
    }
  }, [editor]);

  // 슬래시 메뉴 닫기
  const closeSlashMenu = useCallback(() => {
    setSlashOpen(false);
    setSlashQuery("");
    setSelectedIndex(0);
  }, []);

  // 슬래시 명령 실행
  const executeSlashCommand = useCallback((action: () => void) => {
    const from = slashStartPos;
    const to = editor?.state.selection.from || slashStartPos;

    if (from <= to) {
      editor?.chain().focus().deleteRange({ from, to }).run();
    }

    setTimeout(() => {
      action();
    }, 0);

    closeSlashMenu();
  }, [editor, slashStartPos, closeSlashMenu]);

  // 테이블 삽입
  const insertTable = useCallback((rows: number, cols: number) => {
    const from = slashStartPos;
    const to = editor?.state.selection.from || slashStartPos;

    if (from <= to) {
      editor?.chain().focus().deleteRange({ from, to }).insertTable({ rows, cols, withHeaderRow: true }).run();
    } else {
      editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    }

    closeSlashMenu();
  }, [editor, slashStartPos, closeSlashMenu]);

  // 이미지 업로드
  const handleImageUpload = useCallback(() => {
    const from = slashStartPos;
    const to = editor?.state.selection.from || slashStartPos;
    if (from <= to) {
      editor?.chain().focus().deleteRange({ from, to }).run();
    }
    fileInputRef.current?.click();
    closeSlashMenu();
  }, [editor, slashStartPos, closeSlashMenu]);

  // 메뉴 아이템 정의
  const allItems = useMemo<SlashMenuItem[]>(() => [
    {
      label: "텍스트",
      keywords: ["텍스트", "text", "paragraph", "p"],
      action: () => editor?.chain().focus().setParagraph().run()
    },
    {
      label: "제목 1",
      keywords: ["제목", "제목1", "h1", "heading", "header"],
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      label: "제목 2",
      keywords: ["제목2", "h2", "소제목"],
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      label: "글머리 목록",
      keywords: ["목록", "리스트", "bullet", "ul", "불릿"],
      action: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: "번호 목록",
      keywords: ["번호", "숫자", "ordered", "ol", "넘버링"],
      action: () => editor?.chain().focus().toggleOrderedList().run()
    },
    {
      label: "할 일 목록",
      keywords: ["할일", "체크", "todo", "task", "checkbox"],
      action: () => editor?.chain().focus().toggleTaskList().run()
    },
    {
      label: "구분선",
      keywords: ["구분", "선", "line", "hr", "구분선"],
      action: () => editor?.chain().focus().setHorizontalRule().run()
    },
  ], [editor]);

  // 필터된 아이템 가져오기
  const getFilteredItems = useCallback(() => {
    if (!slashQuery) return allItems;
    return allItems.filter(item =>
      item.keywords.some(keyword =>
        keyword.toLowerCase().includes(slashQuery.toLowerCase())
      )
    );
  }, [allItems, slashQuery]);

  // 외부 클릭시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeSlashMenu();
      }
    };

    if (slashOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [slashOpen, closeSlashMenu]);

  if (!editor) return null;

  const filteredItems = getFilteredItems();

  return (
    <Wrap>
      <EditorContent editor={editor} />

      {slashOpen && (
        <SlashMenu
          ref={menuRef}
          style={{ left: slashPos.x, top: slashPos.y }}
        >
          {slashQuery && (
            <QueryDisplay>/{slashQuery}</QueryDisplay>
          )}

          <MenuSection>
            <SectionTitle>기본 블록</SectionTitle>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <MenuItem
                  key={item.label}
                  $selected={index === selectedIndex}
                  onClick={() => executeSlashCommand(item.action)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <ItemLabel>{item.label}</ItemLabel>
                </MenuItem>
              ))
            ) : (
              <NoResults>검색 결과가 없습니다</NoResults>
            )}
          </MenuSection>

          {!slashQuery && (
            <>
              <MenuSection>
                <SectionTitle>표</SectionTitle>
                <TableGrid>
                  <TableButton onClick={() => insertTable(2, 2)}>
                    <TableIcon>⊞</TableIcon>
                    <span>2×2 표</span>
                  </TableButton>
                  <TableButton onClick={() => insertTable(3, 3)}>
                    <TableIcon>⊞</TableIcon>
                    <span>3×3 표</span>
                  </TableButton>
                  <TableButton onClick={() => insertTable(4, 4)}>
                    <TableIcon>⊞</TableIcon>
                    <span>4×4 표</span>
                  </TableButton>
                </TableGrid>
              </MenuSection>

              <MenuSection>
                <SectionTitle>미디어</SectionTitle>
                <MenuItem
                  onClick={handleImageUpload}
                  disabled={isUploading}
                >
                  <ItemLabel>
                    {isUploading ? '업로드 중...' : '이미지 업로드'}
                  </ItemLabel>
                </MenuItem>
              </MenuSection>
            </>
          )}
        </SlashMenu>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setIsUploading(true);
          try {
            const uploadedUrl = await saveFile(file);
            editor.chain().focus().setImage({ src: uploadedUrl }).run();
          } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
          } finally {
            setIsUploading(false);
            e.currentTarget.value = "";
          }
        }}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 80%;
  overflow-x: hidden;
  overflow-y: visible;
  
  .notion-editor {
    transition: border-color .15s ease, box-shadow .15s ease;
    min-width: 600px;
  }
  .notion-editor:focus-within {
    border-color: #d0d7de;
    box-shadow: 0 0 0 3px rgba(3,102,214,.1);
  }
  
  .notion-editor img {  
    max-width: 100%;
    max-height: 400px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
  
  table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 6px 0 12px; 
    min-width: 500px;
  }
  th, td { border: 1px solid #eaecef; padding: 8px; text-align: left; }
  th { background: #fafbfc; font-weight: 600; }
  ul { list-style: disc; padding-left: 1.5rem; }
  ol { list-style: decimal; padding-left: 1.5rem; }
  .task-list-item { list-style: none; }
`;

const SlashMenu = styled.div`
  position: fixed;
  z-index: 1000;
  width: 320px;
  max-height: 280px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e1e5e9;
  box-shadow: 0 8px 32px rgba(0,0,0,.12);
  border-radius: 8px;
  padding: 8px 0;
`;

const QueryDisplay = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #6b7280;
  border-bottom: 1px solid #f1f3f4;
  margin-bottom: 4px;
  font-family: 'SF Mono', Monaco, monospace;
`;

const MenuSection = styled.div`
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  font-size: 11px;
  color: #9ca3af;
  letter-spacing: .5px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 8px 16px 4px;
`;

const MenuItem = styled.button<{ $selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  background: ${props => props.$selected ? '#f8f9fa' : 'transparent'};
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.1s ease;
  
  &:hover:not(:disabled) {
    background: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;



const ItemLabel = styled.span`
  color: #374151;
  font-weight: 400;
`;

const TableGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
`;

const TableButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.1s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const TableIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;