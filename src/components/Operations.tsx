import * as React from 'react'
import {Banque} from "../commun";
import {connect} from 'react-redux';

interface State {input_date:Date, input_montant : number}
interface Props { banque?: Banque, class_name:string, addTransaction?:{(id: number , date: Date, montant : number):void;}, validateTransaction?:{(id: number):void;}}


class _Operations extends React.Component <Props,State> {
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
        this.setState({input_montant: Number(event.target.value)});
    }

    render() {
        let self = this;
        return(
            <div className = {this.props.class_name}>
                <input type = "date" onChange={this.handleChangeDate}/>
                <input type = 'number' value = {this.state.input_montant} onChange={this.handleChangeMontant}/>
                <button onClick = {() =>
                    this.props.addTransaction(Operations.nextTransactionId++, self.state.input_date, self.state.input_montant)}
                >
                    Add Transaction
                </button>
                <ul>
                    {this.props.banque.transactions.map(transaction =>
                        <li key={transaction.id}
                            onClick ={ () =>
                                this.props.validateTransaction(transaction.id)
                            }
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
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        banque : state.banque
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addTransaction : (id: number , date: Date, montant : number) => dispatch ({
            type : 'ADD_TRANSACTION',
            id: id,
            date: date,
            montant : montant
        }),
        validateTransaction : (id : number) => dispatch ({
            type : 'VALIDATE_TRANSACTION',
            id : id
        })
    }
};

export const Operations = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Operations);