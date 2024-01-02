import styled from 'styled-components';
import elements from './constants/elements'


function SymbolPanel(props) {

    const selectedElement = elements[props.atomicNumber]

  return (

    <StyledSymbolPanel
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>
        <div className='atomicNumberBox'>
          <button className='atomicNumberDownButton'
            onClick={props.onAtomicNumberDown}>
              {'◀︎'}
          </button>
            <span className='atomicNumber' style={{display:'inline-block',width:'50px'}}>
              {props.atomicNumber}
            </span>
          <button className='atomicNumberUpButton' onClick={props.onAtomicNumberUp}>
            {'▶︎'}
          </button>
        </div>
        <div className='symbolLabel'>
          {selectedElement.symbol}
        </div>
      </div>

    </StyledSymbolPanel>
  );
}

const StyledSymbolPanel = styled.div`
  position: fixed;
  top: 8px;
  left: 8px;
  background-color: white; 
  opacity: 0.7;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  width: 80px;
  height: 70px;
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
  .atomicNumberBox{
    display:flex;
    justify-content:center;
    align-items:center;
    margin:8px;
  }
  .atomicNumberDownButton{
    padding:0px;
    border:none;
  }
  .atomicNumberUpButton{
    padding:0px;
    border:none;
  }
  
  .atomicNumber{
    padding:0px; 
    font-size:16px;
    font-family: Arial, sans-serif;
  }

  .symbolLabel{
    margin:20px;
    padding:0px; 
    font-size:36px;
    line-height:0;
    font-family: Arial, sans-serif;
  }

`;

export default SymbolPanel;