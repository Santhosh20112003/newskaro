import React, { useState } from 'react'
import { bannar_message } from '../../common/links';

function Bannar() {
	const [close,setClose] = useState(false);
  return (
	<div  onClick={()=>{setClose(!close)}} className={` text-center ${close ? 'hidden':'block'} break-words cursor-pointer px-5 py-2 bg-gradient-to-r from-emerald-400 text-white to-emerald-500 `}>
	  <h1 className="">{bannar_message}</h1>
	</div>
  )
}

export default Bannar
