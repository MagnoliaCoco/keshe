import React, { Component } from 'react';
import ajax from './ajax';
class User extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
        this.usersearch();
    }

    usersearch = () => {
        ajax({
            url: 'http://localhost/api/user/search',
            type: 'GET',
            done: (json) => {
                let data = JSON.parse(json);
                this.setState({ data: data });
            }
        });
    }

    handleClick(event) {
        let domData = document.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = 'http://localhost/api/user/insert?' + query;
        ajax({
            url: url,
            type: 'GET',
            done: () => {
                console.log('done');
            }
        });
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
        let valuelist = [];
        this.state.data.forEach((data) => {
            let value = [];
            for (let key in data) {
                if(data.hasOwnProperty(key)){
                    value.push(<td key={key.toString()}>{data[key]}</td>);
                }
            }
            valuelist.push(<tr>{value}</tr>);
        });
        return valuelist;
    }

    userinsert = () => {
        let inputlist = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                inputlist.push(
                    <div  key={key.toString()}>
                        <lable>{key.toString()}: </lable>
                        <input type="text" placeholder={key.toString()} name={key.toString()} key={key.toString()}></input>
                    </div>
                );
            }
        }
        inputlist.push(<button key="submit" onClick={() => {this.handleClick(); return false;}}>Submit</button>)
        return inputlist;
    }


    render = () => {
        let column = this.getcolumnname();
        let valuelist = this.getcolumnvalue();
        let inputlist = this.userinsert();
    return <div><table><tbody>{ column }{ valuelist }</tbody></table>{ inputlist }</div>
    }

}

export default User;