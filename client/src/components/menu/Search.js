import { makeStyles, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const usestyles = makeStyles((theme) => ({
    root: {
        background: "#F9F9F9",
        display: "flex",
        justifyContent: "center",
        height: "auto",
        padding: 10,
    },
    search: {
        display:"flex",
        width: "95%",
        background: "#FFF",
        borderRadius: "25px",
        '& > *': {
            paddingLeft: "1vw",
            verticalAlign: "middle",
            color: "#51585C",
            fontWeight: 100
        }
    }
}))

const Search = ({setSearchValue}) => {
    const classes = usestyles();
    
    return (
        <div className={classes.root}>
            <Box className={classes.search}>
                <SearchIcon style={{padding:"1vh 1vw"}} />
                <InputBase
                style={{width:"80%"}}
                    placeholder="Search or start new chat"
                    onChange={(e)=>setSearchValue(e.target.value)}
                />
            </Box>
        </div>
    )
}

export default Search;