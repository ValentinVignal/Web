import * as React from 'react'
import {Banque} from "./commun";

interface State {input_date:Date, input_montant : number}
interface Props { banque: Banque, store:any}



export class Operations extends React.Component <Props,State> {
    private static nextTransactionId: number = 0;
    constructor(props){
        super(props);
        this.state = {input_date: new Date(), input_montant: 0};

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeMontant = this.handleChangeMontant.bind(this);
    }


    handleChangeDate(event) {
        this.setState({input_date: event.target.value});
    }

    handleChangeMontant(event) {
        this.setState({input_montant: event.target.value});
    }

    render() {
        let self = this;
        return(
            <form>
                <input type = "date" onChange={this.handleChangeDate}/>
                <input type = 'number' value = {this.state.input_montant} onChange={this.handleChangeMontant}/>
                <button onClick = {() => {
                    self.props.store.dispatch({
                        type : 'ADD_TRANSACTION',
                        id: Operations.nextTransactionId++,
                        date: self.state.input_date,
                        montant : self.state.input_montant
                    });
                    self.setState({input_date: new Date()});
                    self.setState({input_montant : 0});
                }}>
                    Add Transaction
                </button>
                <ul>
                    {this.props.banque.transactions.map(transaction =>
                        <li key={transaction.id}
                            onClick ={() =>{
                                self.props.store.dispatch ({
                                    type : 'VALIDATE_TRANSACTION',
                                    id : transaction.id
                                });
                            }}
                            style ={{
                                color : transaction.validated ?
                                    'green':
                                    'black'
                            }}
                        >
                            {transaction.date}, {transaction.montant}€
                        </li>
                    )}
                </ul>
            </form>
        );
    }
}

