import React from 'react';
import './Searcher.css'

const Searcher = ({ handleFilter, handleFocus }) => {



    return (
        <div className='searcher-container'>
            <input className='searcher-tf' type="text"
                placeholder='Introduce alguna cripto....'
                onChange={handleFilter}
                onFocus={handleFocus} />


        </div>
    );
};

export default Searcher;