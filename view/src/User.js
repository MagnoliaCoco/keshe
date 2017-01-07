import React, { Component } from 'react';
import ajax from './ajax';
import config from './config';

class User extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            editing: null,
            delete: null
        };
        this.usersearch();
    }
    usersearch = () => {
        ajax({
            url: `${config.api}/user/search`,
            type: `GET`,
            done: (json) => {
                let data = JSON.parse(json);
                this.setState({ data: data });
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
        columnname = [...columnname, <th key="userEditColumn">Edit</th>, <th key="userDeleteColumn">Delete</th>];
        return  <tr id="userthead">{columnname}</tr>;
    }

    getcolumnvalue = () => {
        let valuelist = [];
        this.state.data.forEach((data, offset) => {
            let value = [];
            for (let key in data) {
                if(data.hasOwnProperty(key)){
                    if (offset === this.state.editing) {
                        value.push(<td className="mdl-data-table__cell--non-numeric" name={key} key={key}>
                            <input
                                className="mdl-textfield__input"
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
                        value.push(<td className="mdl-data-table__cell--non-numeric" name={key} key={key}>{data[key]}</td>);
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
                                    onClick={ () => {(() => {
                                        let str = JSON.stringify(this.state.data[offset]);
                                        str = str.split(`:`).join(`=`).split(`,`).join(`&`);
                                        str = str.replace(`{`,``);
                                        str = str.replace(`}`,``);
                                        str = str.replace(/\"/g,``);
                                        console.log(str);
                                        ajax({
                                            url: `${config.api}/user/update?` + str,
                                            type: `GET`,
                                            done: (json) => {
                                                console.log(json);
                                            }
                                        });


                                        this.setState({editing: null})
                                    })()
                                }}>
                                     &nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;
                                </button>);
                            }
                            else if (this.state.editing === null) {
                                return (<button 
                                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                                    onClick={ () => { this.setState({editing: offset}) } }>
                                    Modify
                                </button>)
                            }
                            else {
                                return null;
                            }
                        })()
                    }
                </td>
            )];

            value = [...value, <td key={`userDeleteColumn-${offset}`}>
                <button 
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={ () => { 
                        (() => {
                            let str = JSON.stringify(this.state.data[offset]);
                            str = str.split(`:`).join(`=`).split(`,`).join(`&`);
                            str = str.replace(`{`,``);
                            str = str.replace(`}`,``);
                            str = str.replace(/\"/g,``);
                            console.log(str);
                            ajax({
                                url: `${config.api}/user/delete?` + str,
                                type: `GET`,
                                done: (json) => {
                                    console.log(json);
                                }
                            });
                            document.querySelector(`#usertbody-${offset}`).remove();
                        })()
                }}>
                Delete</button>
            </td>
            ];

            valuelist.push(<tr id={`usertbody-${offset}`} key={`user-${offset}`}>{value}</tr>);
        });
        return valuelist;
    }

    handleinsert = () => {
                let ele = document.querySelector('#userinsert');
                let domData = ele.querySelectorAll('input');
                let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
                let url = `${config.api}/user/insert?${query}`;
                ajax({
                    url: url,
                    type: 'GET',
                    done: (json) => {
                        console.log(json);
                    }
                });
    }

    userinsert = () => {
        let inputlist = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                inputlist.push(
                    <div key={key} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input" type="text" name={key} key={key} placeholder={key}></input>
                    </div>
                );
            }
        }
        inputlist.push(<button id="user_sub" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" key="submit" onClick={()=>{this.handleinsert();}}>Submit</button>)
        return <div id="userinsert">{inputlist}</div>;
    }
    
    render = () => {
        let column = this.getcolumnname();
        let valuelist = this.getcolumnvalue();
        let inputlist = this.userinsert();
        return (
            <div><table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <tbody>
                    { column }
                    { valuelist }
                </tbody>
            </table>
            {inputlist}
            </div>);
    }
}

export default User;