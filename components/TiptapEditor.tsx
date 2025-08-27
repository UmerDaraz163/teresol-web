// components/TiptapEditor.tsx

'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

// Define the props for the toolbar component
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const buttonClasses = "p-2 rounded hover:bg-gray-200";
  const activeClasses = "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-t-md bg-gray-50">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${buttonClasses} ${editor.isActive('bold') ? activeClasses : ''}`}>
        <i className="ri-bold"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${buttonClasses} ${editor.isActive('italic') ? activeClasses : ''}`}>
        <i className="ri-italic"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${buttonClasses} ${editor.isActive('underline') ? activeClasses : ''}`}>
        <i className="ri-underline"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`${buttonClasses} ${editor.isActive('strike') ? activeClasses : ''}`}>
        <i className="ri-strikethrough"></i>
      </button>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={`${buttonClasses} ${editor.isActive('paragraph') ? activeClasses : ''}`}>
        <i className="ri-paragraph"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${buttonClasses} ${editor.isActive('heading', { level: 1 }) ? activeClasses : ''}`}>
        H1
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${buttonClasses} ${editor.isActive('heading', { level: 2 }) ? activeClasses : ''}`}>
        H2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${buttonClasses} ${editor.isActive('heading', { level: 3 }) ? activeClasses : ''}`}>
        H3
      </button>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${buttonClasses} ${editor.isActive('bulletList') ? activeClasses : ''}`}>
        <i className="ri-list-unordered"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${buttonClasses} ${editor.isActive('orderedList') ? activeClasses : ''}`}>
        <i className="ri-list-ordered"></i>
      </button>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`${buttonClasses} ${editor.isActive({ textAlign: 'left' }) ? activeClasses : ''}`}>
        <i className="ri-align-left"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`${buttonClasses} ${editor.isActive({ textAlign: 'center' }) ? activeClasses : ''}`}>
        <i className="ri-align-center"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`${buttonClasses} ${editor.isActive({ textAlign: 'right' }) ? activeClasses : ''}`}>
        <i className="ri-align-right"></i>
      </button>
      
      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${buttonClasses} ${editor.isActive('blockquote') ? activeClasses : ''}`}>
        <i className="ri-double-quotes-l"></i>
      </button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonClasses}>
        <i className="ri-separator"></i>
      </button>
    </div>
  );
};

// Define the props for the main editor component
type TiptapEditorProps = {
  content: string;
  onChange: (richText: string) => void;
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // ✅ Add Tailwind's 'prose' classes for beautiful typography
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] p-4 border-x border-b border-gray-300 rounded-b-md',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
