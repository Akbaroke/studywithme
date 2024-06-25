import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import { useEffect } from 'react';
import { Input } from '@mantine/core';
import '@mantine/tiptap/styles.css';

type Props = {
  label?: string;
  error?: string;
  value: any;
  onChange?: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  bordered?: boolean;
};

export default function TextEditor({
  label,
  error,
  value,
  onChange,
  required,
  readOnly = false,
  className,
  bordered = true,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,

    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (!readOnly) {
        const html = editor.getHTML();
        onChange!(html);
      }
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className={className}>
      {label && <Input.Label required={required}>{label}</Input.Label>}
      <RichTextEditor
        editor={editor}
        styles={
          !bordered
            ? {
                root: {
                  border: 'none',
                },
              }
            : {}
        }>
        <RichTextEditor.Toolbar
          sticky
          stickyOffset={60}
          display={readOnly ? 'none' : ''}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content
          styles={{
            root: {
              padding: 0,
            },
          }}
        />
      </RichTextEditor>
      <Input.Error>{error}</Input.Error>
    </div>
  );
}
