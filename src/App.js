import React,{ Component } from "react";
import './App.css';
import Input from './Components/Input/Input.jsx';

class App extends Component {

  constructor() {
    super()
    this.state = {
      username: {
        value:"",
        checkResult:"",
        errorMsg:""
      },
      email: {
        value:"",
        checkResult:"",
        errorMsg:""
      },
      password: {
        value:"",
        checkResult:"",
        errorMsg:""
      },
      password2: {
        value:"",
        checkResult:"",
        errorMsg:""
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Error Message')
  }

  handleInputChange = (newValue, id) => {
    console.log(newValue, id)
  } 

  render() {
    const { username, email, password, password2 } = this.state
    return (
      <div className="App">
        <div className="container">
          <form id="form" className="form">
            <h2>Register with us</h2>
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Username" id="username" placeholder="Enter your username" checkResult={username.checkResult} errorMsg={username.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Email" id="email" placeholder="Enter your email" checkResult={email.checkResult} errorMsg={email.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="password" id="password" placeholder="Enter your password" checkResult={password.checkResult} errorMsg={password.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Confirm Password" id="password2" placeholder="Confirm your password" checkResult={password2.checkResult} errorMsg={password2.errorMsg} />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

      

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//   }

//   SearchTitle(){
//     console.log(this.input.value); 
//   }
//   render() {
//     return (
//       // return后的tag如果是如input，button这种名字，需要包在一个div中，否则:3000会显示Adjacent JSX Elements
//       // must be wrapped in an enclosing tag

//       // 这是一种用来在React中收集input值的方法，不过目前好像只用于单行input中，多行要用setState的onChange方法
//       <div>
//         <input type="text" ref={el=>this.input =el} placeholder="演出/艺人/场馆" />
//         <button type="submit" onClick={this.SearchTitle.bind(this)}>submit</button>
//       </div>
//     )
//   }
// 　
// }

export default App;
