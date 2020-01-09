import React,{Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  // ------ 컴포넌트 최적화
  shouldComponentUpdate(nextProps, nextState){
    return this.props.checked !== nextProps.checked;
  }
  render(){
    const { text, checked, id, onToggle, onRemove } = this.props;
    console.log(id); // component 효율 체크
    return (
      <div className="todo-item" onClick={()=>onToggle(id)}>
        <div className="remove" onClick={(e)=>{
          e.stopPropagation(); //onToggle이 실행되지 않도록 한다. 이벤트의 확산을 멈춤
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${checked && 'checked'}`}>
          <div>{text}</div>
        </div>
        {
          checked && (<div className="check-mark">✓</div>)
        }
      </div>
    )
  }
}

export default TodoItem;