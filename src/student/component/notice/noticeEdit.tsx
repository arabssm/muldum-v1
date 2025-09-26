import { useEffect, useMemo, useRef, useState } from "react";
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
import { uploadImage } from "@_api/object/upload";

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
};

export default function NotionEditor({ value = "", onChange, readOnly }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashPos, setSlashPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [slashQuery, setSlashQuery] = useState("");
  const [slashStartPos, setSlashStartPos] = useState<number>(0);
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
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !slashOpen) {
          const currentPos = editor?.state.selection.from || 0;
          setSlashStartPos(currentPos);

          setTimeout(() => {
            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0) return;
            const rect = sel.getRangeAt(0).getBoundingClientRect();
            setSlashPos({ x: rect.left, y: rect.bottom + window.scrollY });
            setSlashQuery("");
            setSlashOpen(true);
          }, 0);
        } else if (e.key === "Escape" && slashOpen) {
          setSlashOpen(false);
          setSlashQuery("");
        } else if (slashOpen && e.key === "Backspace" && slashQuery === "") {

          const from = slashStartPos;
          const to = editor?.state.selection.from || slashStartPos;
          editor?.chain().focus().deleteRange({ from, to }).run();
          setSlashOpen(false);
          e.preventDefault();
          return true;
        } else if (slashOpen && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          setTimeout(() => {
            setSlashQuery(prev => prev + e.key);
          }, 0);
        } else if (slashOpen && e.key === "Backspace" && slashQuery.length > 0) {
          setSlashQuery(prev => prev.slice(0, -1));
          e.preventDefault();
          return true;
        }
        return false;
      },
    },
  });

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const menu = document.getElementById("slash-menu");
      if (menu && !menu.contains(e.target as Node)) setSlashOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [slashOpen]);

  const insertTable = (rows: number, cols: number) => {
    const from = slashStartPos;
    const to = editor?.state.selection.from || slashStartPos;

    if (from <= to) {
      editor?.chain().focus().deleteRange({ from, to }).insertTable({ rows, cols, withHeaderRow: true }).run();
    } else {
      editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    }

    setSlashOpen(false);
    setSlashQuery("");
  };

  const executeCommand = (action: () => void) => {
    const from = slashStartPos;
    const to = editor?.state.selection.from || slashStartPos;

    if (from <= to) {
      editor?.chain().focus().deleteRange({ from, to }).run();
    }

    setTimeout(() => {
      action();
    }, 0);

    setSlashOpen(false);
    setSlashQuery("");
  };

  const allItems = useMemo(() => [
    { label: "텍스트", keywords: ["텍스트", "text", "paragraph"], action: () => editor?.chain().focus().setParagraph().run() },
    { label: "제목 1", keywords: ["제목", "제목1", "h1", "heading"], action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "제목 2", keywords: ["제목2", "h2"], action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "글머리 목록", keywords: ["목록", "리스트", "bullet"], action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: "번호 목록", keywords: ["번호", "숫자", "ordered"], action: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: "구분선", keywords: ["구분", "선", "line", "hr"], action: () => editor?.chain().focus().setHorizontalRule().run() },
  ], [editor, insertTable]);

  const filteredItems = useMemo(() => {
    if (!slashQuery) return allItems;
    return allItems.filter(item =>
      item.keywords.some(keyword =>
        keyword.toLowerCase().includes(slashQuery.toLowerCase())
      )
    );
  }, [allItems, slashQuery]);

  if (!editor) return null;

  return (
    <Wrap>
      <EditorContent editor={editor} />
      {slashOpen && (
        <SlashMenu id="slash-menu" style={{ left: slashPos.x, top: slashPos.y }}>
          {slashQuery && (
            <QueryDisplay>/{slashQuery}</QueryDisplay>
          )}

          {filteredItems.length > 0 ? (
            <>
              <SectionTitle>블록</SectionTitle>
              {filteredItems.map(item => (
                <MenuItem key={item.label} onClick={() => executeCommand(item.action)}>
                  {item.label}
                </MenuItem>
              ))}
            </>
          ) : (
            <NoResults>검색 결과가 없습니다</NoResults>
          )}

          {!slashQuery && (
            <>
              <SectionTitle>표</SectionTitle>
              <TableRowBtns>
                <button onClick={() => insertTable(2, 2)}>2×2</button>
                <button onClick={() => insertTable(3, 3)}>3×3</button>
                <button onClick={() => insertTable(4, 4)}>4×4</button>
              </TableRowBtns>

              <SectionTitle>미디어</SectionTitle>
              <MenuItem onClick={() => {
                const from = slashStartPos;
                const to = editor?.state.selection.from || slashStartPos;
                if (from <= to) {
                  editor?.chain().focus().deleteRange({ from, to }).run();
                }
                fileInputRef.current?.click();
                setSlashOpen(false);
                setSlashQuery("");
              }} disabled={isUploading}>
                {isUploading ? '업로드 중...' : '이미지 업로드…'}
              </MenuItem>
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
            const uploadResult = await uploadImage(file);
            editor.chain().focus().setImage({ src: uploadResult.url }).run();

          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          } finally {
            setIsUploading(false);
            setSlashOpen(false);
            e.currentTarget.value = "";
          }
        }}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 80%;
  .notion-editor {
    transition: border-color .15s ease, box-shadow .15s ease;
  }
  .notion-editor:focus-within {
    border-color: #d0d7de;
    box-shadow: 0 0 0 3px rgba(3,102,214,.1);
  }
  table { width: 100%; border-collapse: collapse; margin: 6px 0 12px; }
  th, td { border: 1px solid #eaecef; padding: 8px; text-align: left; }
  th { background: #fafbfc; font-weight: 600; }
  ul { list-style: disc; padding-left: 1.5rem; }
  ol { list-style: decimal; padding-left: 1.5rem; }
  .task-list-item { list-style: none; }
`;

const SlashMenu = styled.div`
  position: absolute;
  z-index: 50;
  width: 240px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 30px rgba(0,0,0,.12);
  border-radius: 12px;
  padding: 8px;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  color: #6b7280;
  letter-spacing: .04em;
  text-transform: uppercase;
  margin: 6px 8px;
`;

const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  &:hover:not(:disabled) f8fafc; }
`;

const TableRowBtns = styled.div`
  display: flex; gap: 6px; padding: 6px 8px 10px;
  button {
    flex: 1;
    padding: 8px 0;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
    &:hover { background: #f9fafb; }
  }
`;

const QueryDisplay = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 4px;
`;

const NoResults = styled.div`
  padding: 16px 12px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`;