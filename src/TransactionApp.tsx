import { createStore } from 'redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {Provider, connect} from 'react-redux';

import transactionApp from './Reducer'
import {Banque, ReduxState} from "./commun";
import {Operations} from "./components/Operations";
import {Resume}from './components/Resume';
import {Transactions}from './components/Transactions'
import {FilterLink} from './components/FilterLink'

// On crée le store avec la méthode redux createStore
const store = createStore(transactionApp);


const getVisibleTransactions = (banque: Banque, filter: string) => {
    switch (filter) {
        case 'SHOW_RESUME':
            return (
                <Resume
                    class_name = 'onglet'
                />
            );
        case 'SHOW_TRANSACTIONS':
            return (
                <Transactions
                    class_name = 'onglet'
                />
            );
        case 'SHOW_OPERATIONS':
            return(
                <Operations
                    class_name = 'onglet'
                />
            );
    }
};

interface Props {banque?: Banque, visibilityFilter?:string}
interface State {}

class _TransactionApp extends React.Component <Props, State> {
    render () {
        const{
            banque,
            visibilityFilter
        } = this.props;
        const visibleTransactions = getVisibleTransactions(
            banque,
            visibilityFilter
        );
        return (
            <div className = 'all' id = 'conteneurPrincipal'>
                <header>
                    <img src="images/logo_cognimap.png" alt="Logo du site" id="logo"/>
                    <p id = 'petiteIntroduction'>
                        <em> Coucou !</em> <br/>
                        Bienvenue dans la super appli de votre banque <br/>
                        En plus elle est trop bien réalisée
                    </p>
                </header>
                <nav>
                    <FilterLink
                        filter = 'SHOW_RESUME'
                        currentFilter = {visibilityFilter}
                    >
                        Resume
                    </FilterLink>
                    <FilterLink
                        filter = 'SHOW_TRANSACTIONS'
                        currentFilter = {visibilityFilter}
                    >
                        Transactions
                    </FilterLink>
                    <FilterLink
                        filter = 'SHOW_OPERATIONS'
                        currentFilter = {visibilityFilter}
                    >
                        Operations
                    </FilterLink>
                </nav>
                {visibleTransactions}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        banque : state.banque,
        visibilityFilter: state.visibilityFilter
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

const TransactionApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_TransactionApp);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <TransactionApp/>
        </Provider>,
        document.getElementById('root')
    );
};

//store.subscribe(render);
render();