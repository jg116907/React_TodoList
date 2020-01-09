import React,{Component} from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {
  id = 3 // 데이터가 추가 될 때 마다 id 1 추가
  state = {
    input: '',
    todos: [
      {id: 0, text: ' 내일 해야 할 일', checked: false},
      {id: 1, text: ' 이미 한 일', checked: true},
      {id: 2, text: ' 모레 해야 할 일', checked: false}
    ]
  }
  // ------ todolist 추가 함수 
  handleChange=(e)=> {
    this.setState({
      input: e.target.value // input의 다음 바뀔 값
    });
  }
  handleCreate=()=> {
    const { input, todos } = this.state;
    this.setState({
      input: '', // input을 비워준다
      todos: todos.concat({ // concat을 이용해 배열에 추가해준다 // push 사용시 최적화 불가능
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }
  handleKeyPress=(e)=> {
    // 눌려진 키가 Enter 면 handleCreate를 호출
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }
  
  // ------ check 상태 변경 함수
  handleToggle=(id)=> {
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id === id) // 파라미터로 받은 id가 몇 번째 아이템인지 찾음
    const selected = todos[index]; // 선택 객체
    const nextTodos = [...todos]; // 배열 복사 // shallow copy
    // 역시 배열 직접 수정을 하면 안됨
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  }
  
  // ------ 다른 버전의 handleToggle
  // handleToggle = (id) => {
  //   const { todos } = this.state;
  //   const index = todos.findIndex(todo => todo.id === id);

  //   const selected = todos[index];

  //   this.setState({
  //     todos: [
  //       ...todos.slice(0, index),
  //       {
  //         ...selected,
  //         checked: !selected.checked
  //       },
  //       ...todos.slice(index + 1, todos.length)
  //     ]
  //   });
  // }

  // ------ 아이템 제거
  handleRemove=(id)=>{
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    }); // 파라미터로 받은 id를 가지고 있지 않는 배열을 새롭게 생성 
  }
  render() {
    const { input, todos } = this.state; // this.state를 붙여줘야 하는 작업을 생략
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this; // this를 붙여줘야하는 작업을 생략
    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
