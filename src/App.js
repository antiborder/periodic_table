import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Structure from './Structure';
import ElementDetailModal from './ElementDetailModal'
import SymbolPanel from './SymbolPanel'
import ShapePanel from './ShapePanel'
import CharacteristicPanel from './CharacteristicPanel'



//日野に公開

//固体/気体と金属/非金属で色分け
//色見本を表示
//各指標の見方を説明。
//各shapeの見方を説明。

//La系列などの入る空白にフレーム
//軌道の三次元表でフレームを表示
//Discの計上で弧を表示。
//ボタンを押したままでカーソルが移動。
//カードの角を丸める
//shape変換と同時にカメラワーク
//結晶構造
//命名の由来の説明と画像
//多言語対応

//イオン化傾向・融点・沸点のデータは見直した。(Wikipedia)誤差範囲や根拠文献は後回し。

function App() {
  const numberOfShapes = 5
  const numberOfCharacteristics = 5
  const numberOfElements = 118

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [count, setCount] = useState(windowSize.width>800 ? 1000 : 1003)
  const [characteristicCount, setCharacteristicCount] = useState(0)
  const [atomicNumber, setAtomicNumber] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(0)

  const shape =
    count % numberOfShapes === 0 ? 'Standard' :
    count % numberOfShapes === 1 ? 'Spiral' : 
    count % numberOfShapes === 2 ? 'Disc' : 
    count % numberOfShapes === 3 ? 'Elementouch' : 'Block'

  const characteristic =
    characteristicCount % numberOfCharacteristics === 0 ? 'Block' :
    characteristicCount % numberOfCharacteristics === 1 ? '沸点' ://IONIZATION_ENERGY
    characteristicCount % numberOfCharacteristics === 2 ? '融点':
    characteristicCount % numberOfCharacteristics === 3 ? 'イオン化エネルギー': '電子親和力'

    function modulo(a, n) {
      return ((a % n) + n) % n;
    }
    
  const handleShapeNumberUp = () => {
    setCount(count + 1)
  }
  const handleShapeNumberDown = () => {
    setCount(count - 1)
  }
  const handleCharacteristicUp = () => {
    setCharacteristicCount(modulo(characteristicCount,numberOfCharacteristics)+1)
    }
  const handleCharacteristicDown = () => {
    setCharacteristicCount(modulo(characteristicCount-2,numberOfCharacteristics)+1)
  }

  const handleAtomicNumberUp = () => {
    setAtomicNumber(modulo(atomicNumber,numberOfElements)+1)
  }

  const handleAtomicNumberDown = () => {
    setAtomicNumber(modulo(atomicNumber-2,numberOfElements)+1
      )
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    
  }, []);


  return (

    <>
          {isModalVisible===1 && 
          <ElementDetailModal
            setIsModalVisible={setIsModalVisible}
            atomicNumber={atomicNumber}
            />
            
          }
          <SymbolPanel
            atomicNumber={atomicNumber}
            onAtomicNumberUp={handleAtomicNumberUp}
            onAtomicNumberDown={handleAtomicNumberDown}
          />
          <ShapePanel
            shape={shape}
            onShapeUp={handleShapeNumberUp}
            onShapeDown={handleShapeNumberDown}
          />
          <CharacteristicPanel
            characteristic={characteristic}
            onCharacteristicUp={handleCharacteristicUp}
            onCharacteristicDown={handleCharacteristicDown}
          />
      
      <Structure
        count={count}
        characteristicCount={characteristicCount}
        numberOfCharacteristics={numberOfCharacteristics}
        selectedAtomicNumber={atomicNumber}
        numberOfShapes={numberOfShapes}
        atmicNumber = {atomicNumber}
        setAtomicNumber = {setAtomicNumber}
        setIsModalVisible = {setIsModalVisible}
        modulo = {modulo}
      />



    </>
  );
}

export default App;
