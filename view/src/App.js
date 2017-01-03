import React, { Component } from 'react';
import ajax from './ajax';
class App extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
        this.usersearch();
    }

    usersearch = () => {
        ajax({
            url: 'http://localhost/api/user',
            type: 'GET',
            done: (json) => {
                let data = JSON.parse(json);
                this.setState({ data: data });
            }
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    getcolumnname = () => {
        let columnname = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                columnname.push(<th key={key.toString()}>{key}</th>);
            }
        }
        return  <tr>{columnname}</tr>;
    }

    getcolumnvalue = () => {
        let value = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                value.push(<td key={key.toString()}>{this.state.data[0][key]}</td>);
            }
        }
        return value;
    }

    userinsert = () => {
        let inputlist = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                inputlist.push(<input type="text" placeholder={key.toString()} key={key.toString()} onChange={this.handleChange}></input>);
            }
        }
        
        return <form>{inputlist}</form>;
    }


    render = () => {
        let column = this.getcolumnname();
        let value = this.getcolumnvalue();
        let inputlist = this.userinsert();
    return <div><table><tbody>{ column }<tr>{ value }</tr></tbody></table>{ inputlist }</div>
    }

}

export default App;