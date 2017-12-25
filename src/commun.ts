
export interface Transaction {date ?: Date, montant ?: number, id ?: number, validated ?: boolean}
export interface Banque {argent ?: number, historique ?: number[], transactions ?: Transaction[]}
export interface ReduxState {banque: Banque, visibilityFilter: string}
export interface Action {type?: string, montant ?: number, id ?: number, filter ?: string, date ?: Date}
export interface Props {input_date ?: string}

