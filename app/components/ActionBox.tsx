'use client'
import React, { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoMdDoneAll } from 'react-icons/io'
import axios from 'axios'

type ActionTypeProps = {
  id: string
  content: string
  status: string
}

const ActionBox = ({ id, content, status }: ActionTypeProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [resolution, setResolution] = useState('Uncompleted')

  const flag = status === 'Completed' ? 'bg-green-600' : 'bg-red-600'

  const deletePost = async (id: string) => {
    console.log(id)
    const res = axios.delete(`/api/controller/todo?id=${id}`, {
      data: {
        todoId: id,
      },
    })
    console.log(res)
  }
  const updatePost = async (postId: string, editedContent: string) => {
    try {
      await axios.patch(`/api/controller/todo`, {
        id: postId,
        content: editedContent,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const updateStatus = async (postId: string) => {
    setResolution('Completed')
    try {
      await axios.patch(`/api/controller/todo`, {
        id: postId,
        status: 'Completed',
        content: content,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  return (
    <div className="text-black text-xl flex flex-col gap-4">
      <div className="flex">
        <button onClick={() => setIsEditing(!isEditing)} className="mr-4">
          <AiOutlineEdit className="cursor-pointer" />
        </button>
        <button onClick={() => deletePost(id)}>
          <RiDeleteBin2Line className="cursor-pointer" />
        </button>
        <button onClick={() => updateStatus(id)} className="ml-2">
          <IoMdDoneAll />
        </button>

        <span className={`ml-2 px-1 py-2 text-xs rounded text-white ${flag}`}>
          {status}
        </span>
      </div>
      {isEditing && (
        <div>
          <input
            type="text"
            placeholder={content}
            className="border w-full p-2 rounded text-black text-sm"
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button
            onClick={() => updatePost(id, editedContent)}
            className="bg-black text-white mt-2 px-4 py-2 text-sm rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default ActionBox

// export default function ActionBox({ id, content }: ActionTypeProps) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedContent, setEditedContent] = useState(content)

//   const deletePost = async (id: string) => {
//     console.log(id)
//     const res = axios.delete(`/api/controller/todo?id=${id}`, {
//       data: {
//         todoId: id,
//       },
//     })
//     console.log(res)
//   }

//   return (
//     <div className="text-black text-xl flex flex-col gap-4">
//       <div>
//         <button onClick={() => setIsEditing(!isEditing)} className="mr-4">
//           <AiOutlineEdit className="cursor-pointer" />
//         </button>
//         <button onClick={() => deletePost(id)}>
//           <RiDeleteBin2Line className="cursor-pointer" />
//         </button>
//       </div>
//       {isEditing && (
//         <div>
//           <input
//             type="text"
//             placeholder={content}
//             className="border w-full p-4 text-black text-base"
//           />
//           <button className="bg-black text-white mt-2 px-2 py-4 rounded">
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
