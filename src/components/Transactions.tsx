import * as React from 'react';
import {Banque, Transaction} from "../commun";
import  {connect} from 'react-redux';

interface State {}
interface Props {banque?:Banque, class_name: string, validateTransaction?:{(id: number):void;}}



const afficheTransactions_Transactions = (tableau: Transaction[]) => {
    let nb:number = 0;
    let tab_retour:any = [];
    for (let k :number=0; k< tableau.length && (nb<10); k++ ){
        if (!tableau[k].validated){
            tab_retour.push(
                <tr key={k}>
                    <td>
                        Transaction n°{tableau[k].id +1}
                    </td>
                    <td>
                        {tableau[k].montant}€
                    </td>
                </tr>
            );
            nb++;
        }
    }
    return tab_retour
};

const idNonValidees = (tableau :Transaction[]) =>{
    // Renvoie les id des 10 plus anciennes transactions non validées
    let nb:number = 0;
    let tab_retour:number[] = [];
    for (let k :number=0; k< tableau.length && (nb<10); k++ ){
        if (!tableau[k].validated){
            tab_retour.push(tableau[k].id);
            nb++;
        }
    }
    return tab_retour
};


class _Transactions extends React.Component <Props, State> {

    render () {
        let self = this;
        let id_transactions = idNonValidees(this.props.banque.transactions);
        return (
            <div className={this.props.class_name}>
                <button onClick = { () => self.props.validateTransaction(id_transactions[0])}>
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

const mapStateToProps = state =>{
    return {
        banque : state.banque
    }
};
const mapDispatchToProps = dispatch => {
    return {
        validateTransaction : (id : number) => dispatch ({
            type : 'VALIDATE_TRANSACTION',
            id : id
        })
    }
};

export const Transactions =  connect(
    mapStateToProps,
    mapDispatchToProps
)(_Transactions);