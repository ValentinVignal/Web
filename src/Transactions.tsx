import * as React from 'react';
import {Banque, Transaction} from "./commun";

interface State {id_transactions:  number[]}
interface Props {banque:Banque, store: any}



const afficheTransactions_Transactions = (tableau: Transaction[]) => {
    let nb:number = 0;
    let tab_retour:any = [];
    for (let k :number=0; k< tableau.length && (nb<10); k++ ){
        if (!tableau[k].validated){
            tab_retour.push(
                <tr>
                    <td>
                        Transaction n°{tableau[k].id}
                    </td>
                    <td>
                        {tableau[k].montant}€
                    </td>
                </tr>
            )
        }
    }
    return tab_retour
};

const idNonValidees = (tableau :Transaction[]) =>{
    let nb:number = 0;
    let tab_retour:number[] = [];
    for (let k :number=0; k< tableau.length && (nb<10); k++ ){
        if (!tableau[k].validated){
            tab_retour.push(tableau[k].id)
        }
    }
    return tab_retour
};


export class Transactions extends React.Component <Props, State> {
    constructor(props){
        super(props);
        this.state ={id_transactions: idNonValidees(this.props.banque.transactions)};
    };

    render () {
        let self = this;
        return (
            <div>
                <button onClick = {() => {
                    self.props.store.dispatch({
                        type: 'VALIDATE_TRANSACTION',
                        id: self.state.id_transactions[0]
                    });
                }}>
                    Valider la derniere transaction
                </button>
                <table>
                    <thead>
                        <tr>
                            <td> Numero de la transaction </td>
                            <td> Montant de la transaction </td>
                        </tr>
                    </thead>
                    <tbody>
                        {...afficheTransactions_Transactions(self.props.banque.transactions)}
                    </tbody>
                </table>
            </div>
        )
    }

}