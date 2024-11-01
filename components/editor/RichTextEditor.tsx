"use client"
import {  EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import CodeBlock from "@tiptap/extension-code-block"
import Code from "@tiptap/extension-code"
import Image from "@tiptap/extension-image"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import TextAlign from "@tiptap/extension-text-align"
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Placeholder from "@tiptap/extension-placeholder"


const extensions =[
  StarterKit,
  Underline, 
  Strike, 
  CodeBlock, 
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common)
}),
  Code.configure({
    HTMLAttributes: {
      class: "bg-pink-200"
    }
  }), 
  Image, 
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc ml-3 w-fit "
    }
  }), 
OrderedList.configure({
  HTMLAttributes: {
    class: "list-decimal ml-3"
  }
}), 
ListItem, 
TextAlign.configure({
  types:['heading', 'paragraph']
}),
Placeholder.configure({
  placeholder: 'Write something …',
})

]

export default function RichTextEditor() {
  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none" 
      }
    }
  })
  return (
    <div className="min-h-screen flex flex-col gap-y-5 ">
      
      <div className="w-full text-center sticky top-0 bg-white z-50">
        <ToolBar editor={editor} />
      </div>

    <EditorContent
      editor={editor}
      className=" flex-1"
    />
</div>


  )
}
