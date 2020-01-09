import React,{Component} from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component{
  // ------ 컴포넌트 최적화 함수
  shouldComponentUpdate(nextProps, nextState) { // 컴포넌트 라이프 사이클 메소드중 컴포넌트가 리렌더링을 할 지 말지 정해줌
    return this.props.todos !== nextProps.todos; // todos 값이 바뀔 때만 리렌더링
  }
  render() {
    const {todos, onToggle, onRemove } = this.props;
    // todos : todo 객체들이 들어있는 배열
    // onToggle : 체크박스를 키고 끄는 함수
    // onRemove : 아이템을 삭제시키는 함수
    const todoList = todos.map(
      // (todo) => (
      //   <TodoItem
      //     {...todo}
      //     onToggle={onToggle}
      //     onRemove={onRemove}
      //     key={todo.id}
      //   />
      // ) // 자동으로 props 설정
      ({id, text, checked})=>(
        <TodoItem
          id={id}
          text={text}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          key={id}
        />
      )
    );
    return (
      <div>
        {todoList}
      </div>
    );
  }
}

export default TodoItemList;