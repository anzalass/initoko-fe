import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import Toolbar from ".";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import { ClassNames } from "@emotion/react";
const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 pl-4 italic border-gray-500 font-[600]",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "heading-style",
          },
        },
        code: {
          HTMLAttributes: {
            class: "bg-black text-white px-2 py-1 rounded",
          },
        },
      }),

      Underline,

      Bold.configure({
        HTMLAttributes: {
          class: "font-[700] ",
        },
      }),
      BulletList.configure({
        keepMarks: true,
        HTMLAttributes: {
          class: "list-disc",
        },
        itemTypeName: "listItem",
        keepAttributes: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r  border-l border-gray-700 px-5 items-start w-full gap-3  pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
