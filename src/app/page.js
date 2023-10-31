"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
const paragraphs = require('@/utils/paragraph')

export default function Home() {
  
  const inputRef = useRef(null);
  let [mainParagraph, setMainParagraph] = useState([])
  const [inputValue, setInputValue] = useState('')
  let [typedChar, setTypedChar] = useState(-1);
  let [situation, setSituation] = useState('');
  const [cpm, setCpm] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const test = ['a', 'b', 'c', ' ', 'd', 'e'];
  
  if(inputValue.length === 0){
    typedChar = -1;
  }
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    let paragraph = paragraphs[randomNumber];

    const mainParagraph = paragraph.split("").map(span => `<span>${span}</span>`).join("");

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

  const handleTypingChange = (event) => {
  
    setInputValue(inputRef.current.value)

    if(inputValue.length < typedChar){
      setTypedChar( typedChar - 1)
    }else{
      setTypedChar(typedChar + 1);
    }
  }

  useEffect(() => {

    if ((inputValue && mainParagraph) && (inputValue[typedChar] === mainParagraph[typedChar])) {
      // console.log("correct");
      if(inputValue[typedChar] === undefined || inputValue === ''){
        setSituation('neutral')
      }else{
        // const spanTag = mainParagraph.split("").map(span => `<span>${span}</span>`).join("");
        // mainParagraph[typedChar] = `<span className="correct" >${}</span>`

        setSituation("correct")
      }
      setCpm(cpm + 1)
    } else {
      
    
      if(inputValue === '' || incorrect === 0){
        setIncorrect(0)

      }
     
    else if(inputValue[typedChar] === undefined){
        setSituation('neutral')
        setIncorrect(incorrect - 1)
      }else{

        setSituation("incorrect")
        setIncorrect(incorrect + 1)
      }
    }
  }, [inputValue, mainParagraph, typedChar]);

  function audioPlaying(){
    var audio = new Audio("./keyboard.wav");
    audio.play();
  }

// console.log(typedChar, inputValue, inputValue[typedChar], mainParagraph[typedChar], situation);

console.log(mainParagraph);
  return (
    <main className="min-h-screen w-full grid place-items-center">
      <section className="w-4/6 min-h-[66.666667%] border border-red-600 border-dashed py-10 shadow-xl rounded-xl">
        <h2 className='text-4xl text-center font-bold uppercase text-gray-800'><span className='text-blue-400'>t</span>es<span className='text-blue-400'>t</span> y<span className='text-blue-400'>o</span>ur <span className='text-blue-400'>t</span>yping Sp<span className='text-blue-400'>ee</span>d</h2>
        <input className='absolute top-1/2 left1/2' ref={inputRef} onChange={(event)=>handleTypingChange(event)} type="text" />

        <div className='pt-6 min-h-[16rem]'>
          <p className='text-justify text-[1.3rem] tracking-wider w-5/6 mx-auto leading-9 select-none'><div dangerouslySetInnerHTML={{ __html: mainParagraph }} /></p>
        </div>
        <div className='flex justify-evenly items-center text-xl font-semibold tracking-wider h-16 w-full bg-white'>
          <p>Time left: <span>60s</span></p>
          <p>Mistakes: <span>{incorrect}</span></p>
          <p>WPM: <span>0</span></p>
          <p>CPM: <span>{cpm}</span></p>
          <button className='px-5 py-2 text-sm text-white rounded-xl bg-cyan-500 hover:shadow-md transition-all' onClick={audioPlaying}>Try Again</button>
        </div>
      </section>
    </main>
  )
}
