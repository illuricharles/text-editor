import { FaBold, FaCode, FaStrikethrough, FaUnderline } from "react-icons/fa6";
import ToolBarButtons from "./ToolBarButtons";
import { FaItalic } from "react-icons/fa";
import { ChainedCommands, Editor } from "@tiptap/react";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiImageAlt, BiListOl, BiListUl,  } from "react-icons/bi";
// import { PiCodeBlockDuotone } from "react-icons/pi";

interface ToolBarProps {
    editor: Editor | null,
    onImageSelect?():void
}

const toolBarOptions = [
    {
        id: 1,
        task: "bold",
        icon: <FaBold size={20}/>
    },
    {
        id:2,
        task: "italic",
        icon: <FaItalic size={20}/>
    },
    {
        id:3,
        task: "underline",
        icon: <FaUnderline size={20}/>
    },
    {
        id:4,
        task: "strike",
        icon: <FaStrikethrough size={20}/>
    },
    // {
    //     id:5,
    //     task: "codeBlock",
    //     icon: <PiCodeBlockDuotone size={20}/>
    // },
    {
        id:6,
        task: "code",
        icon: <FaCode size={20}/>
    },
    {
        id:7,
        task: "left",
        icon: <BiAlignLeft size={20}/>
    },
    {
        id:8,
        task: "right",
        icon: <BiAlignRight size={20}/>
    },
    {
        id:9,
        task: "center",
        icon: <BiAlignMiddle size={20}/>
    },
    {
        id:10,
        task: "bulletList",
        icon: <BiListUl size={20}/>
    },
    {
        id:11,
        task: "orderedList",
        icon: <BiListOl size={20}/>
    },
    {
        id:12,
        task: "image",
        icon: <BiImageAlt size={20}/>
    }

] as const

const headingOptions = [
    {
        task:'p',
        value: "Paragraph"
    }, 
    {
        task: 'h1',
        value: "Heading 1"
    },
    {
        task: 'h2',
        value: "Heading 2"
    },
    {
        task: 'h3',
        value: "Heading 3"
    }
] as const

type TaskTypes = (typeof toolBarOptions)[number]['task']
type HeadingTypes = (typeof headingOptions)[number]['task']

function chainFunction({editor}: ToolBarProps, command: (chain: ChainedCommands) => ChainedCommands) {
    if(!editor) return
    return command(editor.chain().focus()).run()
}

function handleOnClick(task: TaskTypes, {editor, onImageSelect}: ToolBarProps) {
    switch(task){
        case 'bold':
            return chainFunction({editor}, chain => chain.toggleBold())
        case 'bulletList':
            return chainFunction({editor}, chain => chain.toggleBulletList())
        case "center":
            return chainFunction({editor}, chain => chain.setTextAlign('center'))
        case 'left':
            return chainFunction({editor}, chain => chain.setTextAlign('left'))
        case 'right':
            return chainFunction({editor}, chain => chain.setTextAlign('right'))
        case "code":
            return chainFunction({editor}, chain => chain.toggleCode())
        // case "codeBlock":
        //     return chainFunction({editor}, chain => chain.toggleCodeBlock())
        case "italic":
            return chainFunction({editor}, chain => chain.toggleItalic())
        case "orderedList":
            return chainFunction({editor}, chain => chain.toggleOrderedList())
        case "strike":
            return chainFunction({editor}, chain => chain.toggleStrike())
        case "underline":
            return chainFunction({editor}, chain => chain.toggleUnderline())
        case "image":
            return onImageSelect && onImageSelect()
    }
}


export default function ToolBar({editor, onImageSelect}: ToolBarProps) {

    function handleOnChangeHeading(e: React.ChangeEvent<HTMLSelectElement>) {
        const {value} = e.target as {value: HeadingTypes}
        console.log(value)
        switch(value) {
            case 'p': 
                 return chainFunction({editor}, chain => chain.setParagraph())
            case 'h1':
                return chainFunction({editor}, chain => chain.setHeading({level: 1}))
            case 'h2':
                return chainFunction({editor}, chain => chain.setHeading({level: 2}))
            case 'h3':
                return chainFunction({editor}, chain => chain.setHeading({level: 3}))
        }
    }

    function getSelectedHeading(): HeadingTypes {
        console.log("called")
        let result: HeadingTypes = 'p'
        if(editor?.isActive('heading', {level: 1})) result = 'h1'
        if(editor?.isActive('heading', {level: 2})) result = 'h2'
        if(editor?.isActive('heading', {level: 3})) result = 'h3'
        return result
    }
    
    return <div>
        <select value={getSelectedHeading()} onChange={handleOnChangeHeading} className="p-1 outline">
            {headingOptions.map(eachHeadingOption => {
                return <option key={eachHeadingOption.task} value={eachHeadingOption.task}>{eachHeadingOption.value}</option>
            })}
        </select>
        {toolBarOptions.map(eachOption => {
            return <ToolBarButtons
            onClick={() => handleOnClick(eachOption.task, {editor, onImageSelect})}
            key={eachOption.id} 
            active={editor?.isActive(eachOption.task) || editor?.isActive({textAlign: eachOption.task})}>
            {eachOption.icon}
            </ToolBarButtons>
        })}
    </div>
}