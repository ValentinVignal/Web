import * as React from 'react';
import {Banque, Transaction} from "../commun";
import  {connect} from 'react-redux';

interface State {}
interface Props {banque?:Banque, class_name:string}




const afficheTransactions_Resume = (tableau: Transaction[]) => {
    let nb:number = 0;
    let tab_retour:any = [];
    for (var k :number=0; k< tableau.length && (nb<10); k++ ){
        if (tableau[k].validated){
            tab_retour.unshift(
                <tr key={k+1}>
                    <td key={"id"} className={'nomAxeTabResume'}>
                        Transaction n°{tableau[k].id +1}
                    </td>
                    <td key={'montant'}>
                        {tableau[k].montant}€
                    </td>
                </tr>
            );
            nb ++;
        }
    }
    return tab_retour
};

const afficheHistorique = (tableau : number[]) => {
    let tab_retour:any = [];
    for (var k :number=0; k< tableau.length && (k<10); k++ ) {
        if (k==0){
            tab_retour.push(
                <td key={0} className = 'nomAxeTabResume'>
                    Historique :
                </td>
            )
        }
        tab_retour.push(
            <td key={k+1}>
                {tableau[k]}€
            </td>
        )
    }
    return tab_retour;
};


class _Resume extends React.Component <Props, State> {
    render () {
        return (
            <div className={this.props.class_name} id ='ongletResume'>
                <h1>
                    Total :
                    {this.props.banque.argent}
                    €
                </h1>
                <table id = 'historiqueResume'>
                    <tbody>
                        <tr>
                            {...afficheHistorique(this.props.banque.historique)}
                        </tr>
                    </tbody>
                </table>
                <table id = 'transactionsResume'>
                    <tbody>
                    {...afficheTransactions_Resume(this.props.banque.transactions)}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        banque : state.banque
    }
};


export const Resume = connect(
    mapStateToProps,
)(_Resume);