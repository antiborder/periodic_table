// import logo from './logo.svg';
import React, { useState } from 'react';

import './App.css';
import Structure from './Structure';
import ElementDetailModal from './ElementDetailModal'
import SymbolPanel from './SymbolPanel'
import ShapePanel from './ShapePanel'
import CharacteristicPanel from './CharacteristicPanel'


//イオン化傾向・融点・沸点などデータ見直し(根拠文献記載)
//shapeとcharacteristicの位置を調整
//京都大学に問い合わせ
//La系列などの入る空白にフレーム
//circleのshapeになるときに回りすぎてる。
//起動の三次元表でフレームを表示
//左上のパネルの文字は青系。クリックできるところは浮かせる。
//ボタンを押したままでカーソルが移動。
//モーダルに電子配置の絵を追加
//モーダルに殻を追加
//カードの角を丸める
//円形状のカードを倒す
//固体/気体と金属/非金属
//shape変換と同時にカメラワーク
//結晶構造

//各指標の見方を説明。
//各shapeの見方を説明。

function App() {
  const numberOfShapes = 4
  const numberOfCharacteristics = 5
  const numberOfElements = 118
  const [count, setCount] = useState(1000)
  const [characteristicCount, setCharacteristicCount] = useState(0)
  const [atomicNumber, setAtomicNumber] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(0)

  const shape =
    count % 4 === 0 ? 'TABLE' :
    count % 4 === 1 ? 'SPIRAL' : 
    count % 4 === 2 ? 'ORBIT' : 'CIRCLE'
  const characteristic =
    characteristicCount % numberOfCharacteristics === 0 ? 'ORBIT' :
    characteristicCount % numberOfCharacteristics === 1 ? 'IONIZATION_ENERGY' :
    characteristicCount % numberOfCharacteristics === 2 ? 'ELECTRON_AFFINITY':
    characteristicCount % numberOfCharacteristics === 3 ? 'BOILING_POINT': 'MELTING_POINT'

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
