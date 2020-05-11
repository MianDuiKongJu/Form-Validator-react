import React,{ Component } from "react";
import './App.css';
import Input from './Components/Input/Input.jsx';

class App extends Component {

  constructor() {
    super()
    // 创建验证器
    this.validators = {
      username: [
        {
          check: (value) => {
            return value.trim() !== ""
          },
          errorMsg: 'Username is required'
        },
        {
          check: (value)=> {
            return value.length >= 3
          },
          errorMsg: 'Username should be at least 3 characters'
        },
        {
          check: (value)=> {
            return value.length <= 15
          },
          errorMsg: 'Username should be less than 15 characters'
        }
      ],
      email: [
        {
          check: (value) => {
            return value.trim() !== ""
          },
          errorMsg: 'Email is required'
        },
        {
          check: (value)=> {
            const regex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            return regex.test(value.trim())
          },
          errorMsg: 'Please enter a valid email'
        }
      ],
      password: [
        {
          check: (value) => {
            return value.trim() !==""
          },
          errorMsg: 'Password is required'
        },
        {
          check: (value)=> {
            return value.length > 3
          },
          errorMsg: 'Password should be at least 4 characters'
        },
      ],
      password2: [
        {
          check: (value) => {
            return value.trim() !==""
          },
          errorMsg: 'Please confirm your password'
        },
        {
          check: (value, passwordValue) => {
            return value === passwordValue
          },
          errorMsg: 'Password is not matched'
        }
      ]
    }
    // 调用class里state的用法，并且赋予state默认空值
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

  checkSubmit = () => {
    // object.keys 是一个原生js api ，该方法返回一个数组，数组内容是这个对象的所有键值。
    // console.log(Object.keys(this.validators))
    Object.keys(this.validators).forEach(
      id => {
        let success = true;
        const validatorList = this.validators[id]
        const value = this.state[id].value
        const newState = {...this.state}
        // validatorList.forEach(
        //   (validator) => {
        //     const {check, errorMsg} = validator
        //     if(!check(value)) {
        //       newState[id].errorMsg = errorMsg
        //       newState[id].checkResult = "error"
        //       this.setState(newState)
        //       return;
        //     }
        //   }
        // )
         
        for(let i = 0; i < validatorList.length; i ++) {
          // 因为validatorList.forEach无法被return中断，所以要用for循环来重写validator
          const {check, errorMsg} = validatorList[i]
          // this.validators[0]进入username的Array中，该Array中有两个objects分别为 [0]: check username是否为空 [1]：username是否小于3个字符
          // 用validatorList[0/1]来调取上述方法进行依次比对
          if(!check(value, this.state['password'].value)) {
            // 如果答案为是，则表示出现出错，赋予newState错误信息以更新small标签。同时更新newState的错误状态，用来赋予tag里className success或
            // error来进行红绿外框切换
            success = false;
            newState[id].errorMsg = errorMsg
            newState[id].checkResult = "error"
            this.setState(newState)
            // 如果出现错误，在更改newState值后，用return直接跳出。
            return;
          }
        }
        newState[id].checkResult = 'success'
        this.setState(newState)
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.checkSubmit();
  }

  handleInputChange = (newValue, id) => {
    // 确认handleInputChange拿到正确的输入值与id
    // console.log(newValue, id)
    const newState = {...this.state}
    newState[id].value = newValue;
    this.setState(newState);
    // 确认newState拿到this.state浅拷贝的值
    // console.log(newState[id].value, id);
  } 

  render() {
    const { username, email, password, password2 } = this.state
    return (
      <div className="App">
        <div className="container">
          <form id="form" className="form">
            <h2>Register with us</h2>
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Username" id="username" type="text" placeholder="Enter your username" checkResult={username.checkResult} errorMsg={username.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Email" id="email" type="email" placeholder="Enter your email" checkResult={email.checkResult} errorMsg={email.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="password" id="password" type="password" placeholder="Enter your password" checkResult={password.checkResult} errorMsg={password.errorMsg} />
            <Input onChange={(newValue, id) => this.handleInputChange(newValue, id)} label="Confirm Password" id="password2" type="password" placeholder="Confirm your password" checkResult={password2.checkResult} errorMsg={password2.errorMsg} />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

      
// 注：ref收集input的值，属于非受控组件（费受控组件可以减少代码量，但是不RMR，所以尽量使用受控组件【onChange】来收集
// Input的值！！！）
// ---  quote from “https://www.cnblogs.com/wonyun/p/6023363.html”  --- 
//  React的form表单组件中 deafultValue 一经传递值以后，后续改变 deafultValue 都将不起作用。
//  具体来说，这是一种react [非受控组件]， 其状态是在input的React内部控制，不收调用者控制。 可以使用[受控组件]来实现

//  [受控组件]
//  就形式来说，[受控组件]就是为某个form表单组件添加value属性；[非受控组件]就是没有添加value属性的控件；
//  添加了value属性的表单控件元素内部是不会维护自己状态state，组件的value值一旦设置了某个具体值就始终是这个值，
//  需要调用者来控制组件value的改变。
//  这种写法问题就是，render后input组件的用户交互问题：如果Value为EnterUsername，用户在input输入框
//  内输入任何值都将不起作用，input输入框的值始终为EnterUsername。

//  [非受控组件]
//  形式来说，react中没有添加value属性的表单组件元素就是非受控组件。
//  非受控组件在底层表现时是在其内部维护了自己的状态state；这样表现出用户输入任何值都能反映到元素上。

//  [总结]
//  在使用react component时，都会遇到受控组件与非受控组件； 在目前，react组件推荐使用stateless component，但是
//  使用该形式来实现reactComp时使用非受控组件倒是没有大问题，不过若是需要控制受控元素就会出现问题，
//  ！！受控组件需要主动维护一个内部state状态，statelessComp则无需维护组件state状态，二者有冲突。
//  所以受控元素不能使用statelessComp来创建。
//  鉴于受控组件与非受控组件的特点，二者应用的地方也有所不同，主要表现在：
//  ----受控元素---- 一般用在需要动态设置其初始值的情况； 例如某些form表单信息编辑时，input表单元素需要始终
//  显示服务器返回的某个值然后进行编辑。
//  ----非受控元素-- 一般用于无任何动态初始值信息的情况； 例如form表单创建信息时，input表单元素都没有初始值，
//  需要用户输入的情况。

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
//         <input type="text" ref={el=>this.input =el} placeholder="Enter Your Username" />
//         <button type="submit" onClick={this.SearchTitle.bind(this)}>submit</button>
//       </div>
//     )
//   }
// 　
// }

export default App;
