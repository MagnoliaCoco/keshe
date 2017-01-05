import React, { Component } from 'react';
import ajax from './ajax';
import config from './config';

class Retribution extends Component {
    constructor(){
        super();
        this.state = {
            data: []
        };
        this.research();
    }

    research = () => {
        ajax({
            url: `${config.api}/retribution/search`,
            type: 'GET',
            done: (json) => {
                let data = JSON.parse(json);
                this.setState({ data: data });
            }
        });
    }

    handleinsert(event) {
        let ele = document.querySelector('#retributioninsert');
        let domData = ele.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = `${config.api}/retribution/insert?${query}`;
        ajax({
            url: url,
            type: 'GET',
            done: () => {
                console.log('done');
            }
        });
    }

    handledelete(event) {
        let ele = document.querySelector('#retributiondelete');
        let domData = ele.querySelectorAll('input');
        let query = Array.from(domData).map(domElem => `${domElem.name}=${domElem.value}`).join('&');
        let url = `${config.api}/retribution/delete?${query}`;
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
        this.state.data.forEach((data, offset) => {
            let value = [];
            for (let key in data) {
                if(data.hasOwnProperty(key)){
                    value.push(<td className="mdl-data-table__cell--non-numeric" key={key.toString()}>{data[key]}</td>);
                }
            }
            valuelist.push(<tr key={`retri-${offset}`}>{value}</tr>);
        });
        return valuelist;
    }

    reinsert = () => {
        let inputlist = [];
        for (let key in this.state.data[0]) {
            if(this.state.data[0].hasOwnProperty(key)){
                inputlist.push(
                    <div key={key.toString()} className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ">
                        <input className="mdl-textfield__input" type="text" name={key.toString()} key={key.toString()}></input>
                        <lable className="mdl-textfield__label">{key.toString()}: </lable>
                    </div>
                );
            }
        }
        inputlist.push(<button id="retribution_sub" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" key="submit" onClick={() => {this.handleinsert(); return false;}}>Submit</button>)
        return inputlist;
    }

    redelete = () => {
        let deleteinputlist = [];
        deleteinputlist.push(
            <div key="userdelete" className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" name="userdelete" key="userdelete"></input>
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
        let inputlist = this.reinsert();
    return <div><table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp"><tbody>{ column }{ valuelist }</tbody></table>{ inputlist }</div>
    }
}

export default Retribution;