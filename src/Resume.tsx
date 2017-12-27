import * as React from 'react';
import {Banque, Transaction} from "./commun";

interface State {}
interface Props {banque:Banque}




const afficheTransactions_Resume = (tableau: Transaction[]) => {
    let nb:number = 0;
    let tab_retour:any = [];
    for (var k :number=0; k< tableau.length && (nb<10); k++ ){
        if (tableau[k].validated){
            tab_retour.push(
                <tr key={k}>
                    <td key={"id"}>
                        Transaction n°{tableau[k].id}
                    </td>
                    <td key={'montant'}>
                        {tableau[k].montant}€
                    </td>
                </tr>
            )
        }
    }
    return tab_retour
};


export class Resume extends React.Component <Props, State> {
    render () {
        return (
            <div>
                <h1>
                    Total :
                    {this.props.banque.argent}
                    €
                </h1>
                <table>
                    <tbody>
                    {...afficheTransactions_Resume(this.props.banque.transactions)}
                    </tbody>
                </table>
            </div>
        )
    }
};