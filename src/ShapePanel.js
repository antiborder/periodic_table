import styled from 'styled-components';


function ShapePanel(props) {

  // const selectedElement = elements[props.atomicNumber]

  return (

    <StyledShapePanel
      onClick={(event) => { event.stopPropagation() }}
    >
      <div className='modal-content'>

        <div className='shapeBox'>
          <button className='shapeDownButton'
            onClick={props.onShapeDown}>
            {'◀︎'}
          </button>
          <button
            className='shape'
            onClick={props.onShapeUp}
          >
            {props.shape}
          </button>
          <button className='shapeUpButton'
            onClick={props.onShapeUp}>
            {'▶︎'}
          </button>
        </div>
      </div>

    </StyledShapePanel>
  );
}

const StyledShapePanel = styled.div`
  position: fixed;
  top: 8px;
  right: 8px;
  background-color: white; 
  opacity: 0.7;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size:12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 800;
  width: 120px;
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
  .shapeBox{
    display:flex;
    justify-content:center;
    align-items:center;
    margin:4px;
  }
  .shapeDownButton{
    background-color:white;
    padding:0px;
    border:none;
    font-size:20px;
    cursor: pointer;  
  }
  .shapeUpButton{
    background-color:white;
    padding:0px;
    border:none;
    font-size:20px;
    cursor: pointer;  
  }
  
  .shape{
    width:200px;
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

export default ShapePanel;