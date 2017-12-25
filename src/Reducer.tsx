import { combineReducers } from 'redux';
import {Action, Banque, Transaction} from "./commun";




const banqueReducer = (state: Banque, action: Action) => {
    if (state == null) {
        return {argent: 0, historique: [], transactions: []};
    }
    switch (action.type) {
        case 'ADD_TRANSACTION':
            console.log("----------");
            console.log("add " + action);
            console.log("previous state :");
            console.log(state);
            console.log("new state :");
            console.log({
                argent: state.argent,
                historique:state.historique.slice(0),
                transactions: [...state.transactions, {
                    id : action.id,
                    date: action.date,
                    montant: action.montant,
                    validated : false
                }]
            });
            return {
                argent: state.argent,
                historique:state.historique.slice(0),
                transactions: [...state.transactions, {
                    id : action.id,
                    date: action.date,
                    montant: action.montant,
                    validated : false
                }]
            };
        case 'VALIDATE_TRANSACTION:' :
            console.log("validate " + action);
            function renvoie_montant(liste:Transaction[], action:Action){
                for (let t of liste){
                    if (t.id == action.id){
                        return(t.montant)
                    }
                }
            }
            return {
                transactions : state.transactions.map(t =>
                    (t.id === action.id)
                        ? { ...t, validated : true}
                        : t),
                argent : state.argent + renvoie_montant(state.transactions, action),
                historique : state.historique.slice(0).push(state.argent + renvoie_montant(state.transactions, action))
            };
        default:
            return state;
    }
};

const visibilityFilter = (state :string = 'SHOW_RESUME', action: Action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};


const transactionApp = combineReducers({
    banque: banqueReducer,
    visibilityFilter
});

export default transactionApp;