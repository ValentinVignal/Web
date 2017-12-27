import { combineReducers } from 'redux';
import {Action, Banque, Transaction} from "./commun";




const banqueReducer = (state: Banque, action: Action) => {
    if (state == null) {
        return {argent: 0, historique: [], transactions: []};
    }
    switch (action.type) {
        case 'ADD_TRANSACTION':
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
        case 'VALIDATE_TRANSACTION' :
        function renvoie_montant(liste:Transaction[], action:Action){
            for (let t of liste){
                if (t.id === action.id){
                    return(t.montant);
                }
            }
        }

            let h = state.historique.slice(0);
            h.push(state.argent + renvoie_montant(state.transactions, action));
            return {
                transactions : state.transactions.map(t =>
                    (t.id === action.id)
                        ? { ...t, validated : true}
                        : t),
                argent : state.argent + renvoie_montant(state.transactions, action),
                historique : h
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