"use client"
import {  EditorContent, mergeAttributes, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Paragraph from '@tiptap/extension-paragraph'
import ToolBar from "./ToolBar"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import Code from "@tiptap/extension-code"
import Image from "@tiptap/extension-image"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import TextAlign from "@tiptap/extension-text-align"
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Placeholder from "@tiptap/extension-placeholder"
import ImageGallery from "./ImageGallery"
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'


import { useState } from "react"

interface UploadedImagesProps {
  url: string,
  appUrl: string,
  key: string
}


const extensions =[
  StarterKit.configure({
    heading: false,
    paragraph:false,
    strike: false,
    code: false,
    codeBlock:false,
    bulletList:false,
    orderedList: false,
    listItem: false
  }),
  Underline, 
  Strike, 
  Paragraph.configure({
    HTMLAttributes: {
      class: 'text-lg'
    }
  }),
  Link.configure({
    openOnClick: false,
    autolink: false,
    linkOnPaste: true,
    HTMLAttributes: {
      target: "_blank",
      class: "text-blue-500 underline cursor-pointer"
    }
  }),
  Heading.configure({ levels: [1, 2,3] }).extend({
    levels: [1, 2,3],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level) 
        ? node.attrs.level 
        : this.options.levels[0]
      const classes: {1: string, 2: string, 3: string} = {
        1: 'text-3xl ',
        2: 'text-2xl ',
        3: 'text-xl '
      }
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level as 1 | 2 | 3]}`,
        }),
        0,
      ]
    },
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common)
}),
  Code.configure({
    HTMLAttributes: {
      class: "bg-pink-200"
    }
  }), 
  Image.configure({
    inline: false,
    HTMLAttributes: {
      class: "w-60 aspect-square rounded m-auto mt-2"
    }
  }), 
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
  const [showImageGallery, setShowImageGallery] = useState(false)
  const editor = useEditor({
    extensions,
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none" 
      }
    },
    immediatelyRender: false
  })

  function onClickSelect(item: UploadedImagesProps) {
    console.log(item)
    editor?.chain().focus().setImage({src: item.url, alt: ""}).run()
  }

  return (
    <>
    
      <div className="min-h-screen flex flex-col gap-y-5 ">
        
        <div className="w-full text-center sticky top-0 bg-white z-50">
          <ToolBar editor={editor} onImageSelect={() => setShowImageGallery(true)}/>
        </div>

      <EditorContent
        editor={editor}
        className=" flex-1"
      />
      </div>

      <div className="p-2 text-right mb-2">
        <button onClick={() => {
          console.log(editor?.getHTML())
        }}
         className="text-white bg-black p-2 rounded">
          Create New Post</button>
      </div>

      <ImageGallery onClickSelect={onClickSelect} visible={showImageGallery} onClickClose={setShowImageGallery}/>
    </>
  )
}


