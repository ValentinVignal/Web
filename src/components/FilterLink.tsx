import * as React from 'react'
import  {connect} from 'react-redux';


const _FilterLink = ({filter,currentFilter, children, setVisibilityFilter})=> {
    if (filter === currentFilter){
        return <span className = 'ongletActif'> {children} </span>
    }
    return (
        <span className = 'ongletInactif'
              onClick={e => {
                  e.preventDefault();
                  setVisibilityFilter(filter)
              }}
        >
            {children}
        </span>
    );
};

const mapStateToProps = state =>{
    return {
        banque : state.banque
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setVisibilityFilter : (filter: string) => dispatch ({
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
        })
    }
};

export const FilterLink =  connect(
    mapStateToProps,
    mapDispatchToProps
)(_FilterLink);