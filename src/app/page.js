"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
const paragraphs = require('@/utils/paragraph')

export default function Home() {
  const inputRef = useRef(null);
  const [mainParagraph, setMainParagraph] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    let paragraph = paragraphs[randomNumber];

    const mainParagraph = paragraph.split("");

    setMainParagraph(mainParagraph);

    const handleClick = () => {
      inputRef.current && inputRef.current.focus();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  const handleTypingChange = () => {
    setInputValue(inputRef.current.value)
  }



  return (
    <main className="min-h-screen w-full grid place-items-center">
      <section className="w-4/6 min-h-[66.666667%] border border-red-600 border-dashed py-10 shadow-xl rounded-xl">
        <h2 className='text-4xl text-center font-bold uppercase text-gray-800'><span className='text-blue-400'>t</span>es<span className='text-blue-400'>t</span> y<span className='text-blue-400'>o</span>ur <span className='text-blue-400'>t</span>yping Sp<span className='text-blue-400'>ee</span>d</h2>
        <input className='absolute top-0 left1/2' ref={inputRef} onChange={handleTypingChange} type="text" />

        <div className='pt-6 min-h-[16rem]'>
          <p className='text-justify text-[1.3rem] tracking-wider w-5/6 mx-auto leading-9 select-none'>{mainParagraph.map((span, i) => <span key={i}>{span}</span>)}</p>
        </div>
        <div className='flex justify-evenly items-center text-xl font-semibold tracking-wider h-16 w-full bg-white'>
          <p>Time left: <span>60s</span></p>
          <p>Mistakes: <span>0</span></p>
          <p>WPM: <span>0</span></p>
          <p>CPM: <span>0</span></p>
          <button className='px-5 py-2 text-sm text-white rounded-xl bg-cyan-500 hover:shadow-md transition-all'>Try Again</button>
        </div>
      </section>
    </main>
  )
}
