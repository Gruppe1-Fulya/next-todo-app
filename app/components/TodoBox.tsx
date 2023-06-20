'use client'
//
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export default function TodoBox() {
  const [content, setContent] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const { mutate } = useMutation(
    async () => await axios.post('/api/controller/todo', { content }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(error)
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        console.log(data)
        setContent('')
        setIsDisabled(false)
      },
    }
  )

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(content)
  }

  return (
    <form
      onSubmit={submitPost}
      className="bg-white my-8 p-8 rounded-md text-black "
    >
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="content"
          placeholder="Start adding things to do!"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        />
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            content.length > 300 ? 'text-red-700' : 'text-gray-700'
          } `}
        >{`${content.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create Todo
        </button>
      </div>
    </form>
  )
}
