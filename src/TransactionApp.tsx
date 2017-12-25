import { createStore } from 'redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

import transactionApp from './Reducer'
import {Banque, ReduxState} from "./commun";
import {Operations} from "./Operations";
import {Resume}from './Resume';
import {Transactions}from './Transactions'


const store = createStore(transactionApp);

const FilterLink = ({filter,currentFilter, children})=> {
    if (filter === currentFilter){
        return <span> {children} </span>
    }
    return (
        <a href='#'
           onClick={e => {
               e.preventDefault();
               store.dispatch({
                   type: 'SET_VISIBILITY_FILTER',
                   filter: filter
               });
           }}
        >
            {children}
        </a>
    );
};




const getVisibleTransactions = (banque: Banque, filter: string) => {
    switch (filter) {
        case 'SHOW_RESUME':
            return (
                <Resume banque={banque}/>
            );
        case 'SHOW_TRANSACTIONS':
            return (
                <Transactions
                    store = {store}
                    banque = {(store.getState() as ReduxState).banque}
                />
            );
        case 'SHOW_OPERATIONS':
            return(
                <Operations
                    banque={(store.getState() as ReduxState).banque}
                    store={store}
                />
            );
    }
};

interface Props {banque: Banque, visibilityFilter:string}
interface State {}

class TransactionApp extends React.Component <Props, State> {
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
            <div>
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
                {visibleTransactions}
            </div>
        )
    }
}


const render = () => {
    ReactDOM.render(
        <TransactionApp
            banque={(store.getState() as ReduxState).banque}
            visibilityFilter = {(store.getState() as ReduxState).visibilityFilter}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();