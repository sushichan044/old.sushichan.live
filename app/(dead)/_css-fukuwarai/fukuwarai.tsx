// 'use client'

// import { Editor } from '@monaco-editor/react'
// import { useState } from 'react'

// import { styled } from 'styled-components'
// import styles from '@/app/css-fukuwarai/fukuwarai.module.scss'
// import Section from '@/components/section'

// const defaultCSS = `.face {
//   display: grid;
//   grid-template:
//     "a b c" 1fr
//     "d e f" 1fr
//     "g h i" 1fr / 1fr 1fr 1fr;
//   align-items: center;
//   height: 100%;
//   font-size: 4rem;
//   text-align: center;
// }

// .right-eye {
//   grid-area: a;
// }

// .left-eye {
//   grid-area: c;
// }

// .nose {
//   grid-area: e;
// }

// .mouth {
//   grid-area: h;
// }
// `

// const FaceRootDiv = styled.div<{ css: string }>`
//   ${(props) => props.css}
// `

// export default function Fukuwarai() {
//   const [fukuCSS, setFukuCSS] = useState('')

//   let applyCssTimer: NodeJS.Timeout | null = null
//   const applyCss = (css: string) => {
//     if (applyCssTimer) clearTimeout(applyCssTimer)
//     applyCssTimer = setTimeout(() => {
//       setFukuCSS(css)
//     }, 500)
//   }
//   const handleChange = (value: string | undefined) => {
//     applyCss(value || '')
//   }

//   return (
//     <div className={styles.container}>
//       <div
//         className={styles.loading}
//         style={fukuCSS !== '' ? { display: 'none' } : {}}
//       >
//         <span>Loading...</span>
//       </div>
//       <div
//         className={styles.editor}
//         style={fukuCSS === '' ? { display: 'none' } : {}}
//       >
//         <Editor
//           defaultLanguage="css"
//           defaultValue={defaultCSS}
//           height="100%"
//           loading={<Section>Loading...</Section>}
//           onChange={handleChange}
//           onMount={() => setFukuCSS(defaultCSS)}
//           options={{
//             fontSize: 16,
//           }}
//           theme="vs-dark"
//         />
//         <FaceRootDiv className={styles['fuku-root']} css={fukuCSS}>
//           <div className="face">
//             <div className="right-eye">右目</div>
//             <div className="left-eye">左目</div>
//             <div className="nose">鼻</div>
//             <div className="mouth">口</div>
//           </div>
//         </FaceRootDiv>
//       </div>
//     </div>
//   )
// }
