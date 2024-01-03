import styled from 'styled-components';
import elements from './constants/elements'


function CharacteristicPanel(props) {

    // const selectedElement = elements[props.atomicNumber]

  return (

    <StyledCharacteristicPanel
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>
      
        <div className='characteristicBox'>
          <button className='characteristicDownButton'
            onClick={props.onCharacteristicDown}>
              {'◀︎'}
          </button>
            <button className='characteristic'
            onClick={props.onCharacteristicUp}
            >
              {props.characteristic}
            </button>
          <button className='characteristicUpButton'
             onClick={props.onCharacteristicUp}
           >
            {'▶︎'}
          </button>
        </div>
      </div>

    </StyledCharacteristicPanel>
  );
}

const StyledCharacteristicPanel = styled.div`
  position: fixed;
  top: 50px;
  right: 8px;
  background-color: white; 
  opacity: 0.7;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  width: 250px;
  height: 36px;
  padding:0px;
  text-align: center;

  .modal-content{
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width:100%;
    margin:0px;
    padding: 0px;
  }
  .modal-content::-webkit-scrollbar{
    display: none;
  }
  .characteristicBox{
    display:flex;
    justify-content:center;
    align-items:center;
    margin:4px;
  }
  .characteristicDownButton{
    background-color:transparent;
    padding:0px;
    border:none;
    font-size:20px;
    cursor: pointer;  
  }
  .characteristicUpButton{
    background-color:transparent;
    padding:0px;
    border:none;
    font-size:20px;
    cursor: pointer;  
  }
  
  .characteristic{
    width:240px;
    background-color:transparent;
    padding:0px; 
    font-size:20px;
    font-family: Arial, sans-serif;
    border:none;
    cursor: pointer;  
  }

  .symbolLabel{
    margin:20px;
    padding:0px; 
    font-size:36px;
    line-height:0;
    font-family: Arial, sans-serif;
  }

`;

export default CharacteristicPanel;