import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: theme.spacing(3)
    },
    root: {
        flexGrow: 1
    }
}))