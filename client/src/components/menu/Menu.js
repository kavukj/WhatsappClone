import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import Conversation from './Conversation';
import Header from './Header';
import Search from './Search';

const usestyles = makeStyles({
})

const Menu = () => {
    const classes = usestyles();
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <div className={classes.root}>
            <Header />
            <Search setSearchValue={setSearchValue} />
            <Conversation searchValue={searchValue} />
        </div>
    )
}

export default Menu;