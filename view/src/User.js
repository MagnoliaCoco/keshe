import React, { Component } from 'react';
import ajax from './ajax';
import config from './config';

class User extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            editing: null,
        };
        this.usersearch();
    }

    usersearch = () => {
        ajax({
            url: `${config.api}/user/search`,
            type: 'GET',
            done: (json) => {
                let data = JSON.parse(json);
                this.setState({ data: data });
            }
        });
    }

    handleinsert(event) {
        let ele = document.querySelector('#userinsert');
        let domData = ele.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = `${config.api}/user/insert?` + query;
        ajax({
            url: url,
            type: 'GET',
            done: () => {
                console.log('done');
            }
        });
    }

    handledelete(event) {
        let ele = document.querySelector('#user');
        let domData = ele.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = `${config.api}/user/insert?` + query;
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
        columnname = [...columnname, <th key="userEditColumn">Edit</th>];
        return  <tr>{columnname}</tr>;
    }

    getcolumnvalue = () => {
        let valuelist = [];
        this.state.data.forEach((data, offset) => {
            let value = [];
            for (let key in data) {
                if(data.hasOwnProperty(key)){
                    if (offset === this.state.editing) {
                        value.push(<td className="mdl-data-table__cell--non-numeric" key={key.toString()}>
                            <input
                                defaultValue={data[key]}
                                name={key}
                                key={`editing-${offset}`}
                                onChange={ (e) => {
                                    // eslint-disable-next-line
                                    this.state.data[offset][key] = e.target.value;
                                }}/>
                            </td>);
                    }
                    else {
                        value.push(<td className="mdl-data-table__cell--non-numeric" key={key.toString()}>{data[key]}</td>);
                    }
                }
            }
            value = [...value, (
                <td key={`userEditColumn-${offset}`}>
                    {
                        (() => {
                            if (this.state.editing === offset) {
                                return (<button 
                                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                                    onClick={ () => { this.setState({editing: null}) } }>
                                     <i className="material-icons">done</i>
                                </button>);
                            }
                            else if (this.state.editing === null) {
                                return (<button 
                                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                                    onClick={ () => { this.setState({editing: offset}) } }>
                                    <i className="material-icons">mode_edit</i>
                                </button>)
                            }
                            else {
                                return null;
                            }
                        })()
                    }
                </td>
            )];
            valuelist.push(<tr key={`user-${offset}`}>{value}</tr>);
        });
        return valuelist;
    }

    userinsert = () => {
        // let insertinputlist = [];
        // for (let key in this.state.data[0]) {
        //     if(this.state.data[0].hasOwnProperty(key)){
        //         insertinputlist.push(
        //             <div key={key.toString()} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        //                 <input className="mdl-textfield__input" type="text" name={key.toString()} key={key.toString()}></input>
        //                 <lable className="mdl-textfield__label">{key.toString()}: </lable>
        //             </div>
        //         );
        //     }
        // }
        // insertinputlist.push(<button id="user_sub" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" key="submit" onClick={() => {this.handleinsert(); return false;}}>Submit</button>)
        // return insertinputlist;
    }

    userdelete = () => {
        let deleteinputlist = [];
        deleteinputlist.push(
            <div key="userdelete" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" name="userdelete" key="userdelete" />
                <lable className="mdl-textfield__label">delete username: </lable>
            </div>);
        deleteinputlist.push(
            <button id="user_del" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" key="submit" onClick={() => {this.handledelete(); return false;}}>Submit</button>
        );
        return deleteinputlist;
    }

    render = () => {
        let column = this.getcolumnname();
        let valuelist = this.getcolumnvalue();
        let insertinputlist = this.userinsert();
        let deleteinputlist = this.userdelete();
        return (
            <div>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <tbody>
                        { column }
                        { valuelist }
                    </tbody>
                </table>
                <div id="userinsert">
                    { insertinputlist }
                </div>
                <div>
                    { deleteinputlist }
                </div>
            </div>);
    }
}

export default User;